import React, { useState } from "react";
import EditMessagebox from "./EditMessagebox";
interface Props {
  content: string;
  replyingTo?: string;
  isEdit?: boolean;
  setIsEdit;
  commentId: number;
}
function CommentMsg({
  content,
  replyingTo,
  commentId,
  isEdit,
  setIsEdit,
}: Props) {
  return (
    <>
      {isEdit ? (
        <EditMessagebox
          content={content}
          commentId={commentId}
          setIsEdit={setIsEdit}
        />
      ) : (
        <div className="text-base my-2">
          {" "}
          {replyingTo && (
            <span className="font-medium text-primary ">@{replyingTo}</span>
          )}{" "}
          {content}
        </div>
      )}
    </>
  );
}

export default CommentMsg;
