import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoArrowUndo } from "react-icons/io5";
import { useAppContext } from "../../context/index";

interface Props {
  username: string;
  commentId: number;
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReplyBox({ setIsReply, commentId, username, setIsEdit }: Props) {
  const { currentUser, deleteComment } = useAppContext();
  const replyMessage = () => {
    setIsReply(true);
  };
  return (
    <div>
      {currentUser.username !== username ? (
        <button
          className="text-primary text-base outline-0 flex items-center"
          onClick={replyMessage}
        >
          <IoArrowUndo />
          <span className="ml-2 font-medium"> Reply</span>
        </button>
      ) : (
        <div className="flex items-center">
          <button
            className="text-error font-medium"
            onClick={() => {
              deleteComment(commentId);
            }}
          >
            {" "}
            <MdDelete className="inline " /> Delete
          </button>
          <button
            className="text-primary ml-4 font-medium"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            {" "}
            <MdEdit className="inline" /> Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default ReplyBox;
