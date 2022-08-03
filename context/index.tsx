import moment from "moment";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
const { v4: uuidv4 } = require("uuid");
import { data } from "../data/data";
import { Comment, CurrentUser, AppContextState } from "../types/index";

export const AppContext = createContext<AppContextState | null>(null);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [comments, setComments] = useState<Comment[] | any>(data.comments);
  const [currentUser, setCurrentuser] = useState<CurrentUser>(data.currentUser);

  useEffect(() => {
    if (localStorage.getItem("comments") === null) {
      localStorage.setItem("comments", JSON.stringify(data.comments));
    }
    if (localStorage.getItem("commentsUser") === null) {
      localStorage.setItem("commentsUser", JSON.stringify(data.currentUser));
    }
    setComments(JSON.parse(localStorage.getItem("comments") || ""));
    setCurrentuser(JSON.parse(localStorage.getItem("commentsUser") || ""));
  }, [setComments, setCurrentuser]);

  // function remove( id) {
  //   return comments.some((o, i, a) =>
  //     o.id === id ? a.splice(i, 1) : o.replies.filter(s => s.id != id)
  //   );
  // }
  const deleteComment = (id) => {
    comments.forEach(function (o, i) {
      o.id === id
        ? comments.splice(i, 1)
        : o.replies.forEach(function (item, i) {
            item.id === id
              ? (o.replies = o.replies.filter((s) => s.id != id))
              : (item.replies = item.replies?.filter((s) => s.id != id));
          });
    });
    setComments([...comments]);
    localStorage.setItem("comments", JSON.stringify([...comments]));
  };

  const AddComment = (comment) => {
    if (comment) {
      const newComment: Comment = {
        id: uuidv4(),
        content: comment,
        createdAt: moment().startOf("minute").fromNow(),
        score: 0,
        user: currentUser,
        replies: [],
      };
      setComments((prevState: Comment[]) => [...prevState, newComment]);
      localStorage.setItem(
        "comments",
        JSON.stringify([...comments, newComment])
      );
    }
    return;
  };

  const editComment = (editMsg, commentId) => {
    if (editMsg) {
      const editMessage = comments.map((comment) => {
        comment.id === commentId
          ? (comment.content = editMsg)
          : comment.replies.forEach((subreplies) => {
              subreplies.id === commentId
                ? (subreplies.content = editMsg)
                : subreplies.replies?.forEach((subitem) => {
                    subitem.id === commentId
                      ? (subitem.content = editMsg)
                      : subitem.content;

                    return subreplies;
                  });
            });
        return comment;
      });
      setComments(editMessage);
      localStorage.setItem("comments", JSON.stringify(editMessage));
    }
  };

  const increaseScore = (commentId) => {
    const scorecomments = comments.map((comment) => {
      comment.id === commentId
        ? comment.score++
        : comment.replies.forEach((subreplies) => {
            subreplies.id === commentId
              ? subreplies.score++
              : subreplies.replies?.forEach((subitem) => {
                  subitem.id === commentId ? subitem.score++ : subitem.content;

                  return subreplies;
                });
          });
      return comment;
    });
    setComments(scorecomments);
    localStorage.setItem("comments", JSON.stringify(scorecomments));
  };

  const decreaseScore = (commentId) => {
    const scorecomments = comments.map((comment) => {
      comment.id === commentId
        ? comment.score--
        : comment.replies.forEach((subreplies) => {
            subreplies.id === commentId
              ? subreplies.score--
              : subreplies.replies?.forEach((subitem) => {
                  subitem.id === commentId ? subitem.score-- : subitem.content;

                  return subreplies;
                });
          });
      return comment;
    });
    setComments(scorecomments);
    localStorage.setItem("comments", JSON.stringify(scorecomments));
  };

  const AddReply = (comment, commentid) => {
    if (comment) {
      let replyingToName = "";
      comments.forEach((post) =>
        post.replies?.filter((item) => {
          item.id === commentid ? (replyingToName = item.replyingTo) : null;
        })
      );
      const newComment = {
        id: uuidv4(),
        content: comment,
        createdAt: moment().startOf("minute").fromNow(),
        score: 0,
        replyingTo: replyingToName,
        user: currentUser,
      };
      setComments(
        comments.map((item) => {
          item.id === commentid
            ? item.replies.push(newComment)
            : item.replies.map((subitem) => {
                subitem.id === commentid
                  ? subitem.replies === undefined
                    ? (subitem.replies = [newComment])
                    : subitem.replies.push(newComment)
                  : subitem;
              });
          return item;
        })
      );
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  };

  return (
    <AppContext.Provider
      value={{
        comments,
        currentUser,
        AddComment,
        deleteComment,
        AddReply,
        editComment,
        increaseScore,
        decreaseScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext) as AppContextState;
}
