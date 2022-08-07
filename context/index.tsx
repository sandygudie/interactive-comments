import moment from "moment";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
const { v4: uuidv4 } = require("uuid");
import  data  from "../data/data.json";
import { Comment, User, AppContextState, Reply } from "../types/index";

export const AppContext = createContext<AppContextState | null>(null);

export const AppProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [comments, setComments] = useState<Comment[]>(data.comments);
  const [currentUser, setCurrentuser] = useState<User>(data.currentUser);

  useEffect(() => {
    if (localStorage.getItem("comments") === null) {
      localStorage.setItem("comments", JSON.stringify(data.comments));
    }
    setComments(JSON.parse(localStorage.getItem("comments") || ""));
  }, [setComments]);

  const deleteComment = (id: number) => {
    comments.find(function (o: Comment, i) {
      o.id === id
        ? comments.splice(i, 1)
        : o.replies.find(function (item: Reply) {
            o.replies = o.replies.filter((s) => s.id != id);
          });
    });
    setComments([...comments]);
    localStorage.setItem("comments", JSON.stringify(comments));
  };

  const AddComment = (comment: string) => {
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

  const editComment = (editMsg: string, commentId: number) => {
    if (editMsg) {
      comments.find((comment) => {
        comment.id === commentId
          ? (comment.content = editMsg)
          : comment.replies.find((subreplies) => {
              subreplies.id === commentId
                ? (subreplies.content = editMsg)
                : subreplies.content;
            });
      });
      setComments([...comments]);
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  };

  const increaseScore = (commentId: number) => {
    const scorecomments = comments.map((comment) => {
      comment.id === commentId
        ? comment.score++
        : comment.replies.find((subreplies) => {
            subreplies.id === commentId ? subreplies.score++ : subreplies.score;
          });
      return comment;
    });
    setComments(scorecomments);
    localStorage.setItem("comments", JSON.stringify(scorecomments));
  };

  const decreaseScore = (commentId: number) => {
    const scorecomments = comments.map((comment) => {
      comment.id === commentId
        ? comment.score--
        : comment.replies.find((subreplies) => {
            subreplies.id === commentId ? subreplies.score-- : subreplies.score;
          });
      return comment;
    });
    setComments(scorecomments);
    localStorage.setItem("comments", JSON.stringify(scorecomments));
  };

  const AddReply = (comment: string, commentid: number) => {
    if (comment) {
      let replyingToName = "";
      comments.find((post) =>
        post.id === commentid
          ? (replyingToName = post.user.username)
          : post.replies?.find((item) => {
              item.id === commentid
                ? (replyingToName = item.user.username)
                : null;
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
                subitem.id === commentid ? item.replies.push(newComment) : item;
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
