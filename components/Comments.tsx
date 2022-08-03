import { CommentBox } from "./commentbox";
import { CommentResponse } from "./CommentResponse";
import MessageBox from "./MessageBox";
import { useState } from "react";
import { Comment } from "../types";

interface Props {
  comment: Comment;
  replyingTo?: string;
}

function Comments({ comment, replyingTo }: Props) {
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <div className="relative">
        <CommentBox
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          replyingTo={replyingTo}
          commentDetails={comment}
          setIsReply={setIsReply}
        />
        {/* {comment.replies?.length > 0 && (
          <a
            href={`#${comment.id}`}
            className="block h-[calc(100%_-_10rem)] absolute left-4 md:left-10 border-r-[1px] border-gray-300"
          >
            <span className="sr-only hidden">Jump to comment-1</span>
          </a>
        )} */}
        {comment.replies?.length > 0 && (
          <CommentResponse response={comment.replies} />
        )}
      </div>
      {isReply && <MessageBox setIsReply={setIsReply} commentid={comment.id} />}
    </>
  );
}

export default Comments;
