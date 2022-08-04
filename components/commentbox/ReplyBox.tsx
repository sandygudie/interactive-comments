import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoArrowUndo } from "react-icons/io5";
import { useAppContext } from "../../context/index";
import DeleteModal from "../DeleteModal";

interface Props {
  username: string;
  commentId: number;
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReplyBox({ setIsReply, username, setIsEdit, commentId }: Props) {
  const { currentUser } = useAppContext();

  const replyMessage = () => {
    setIsReply(true);
  };
  const [isDelete, setisDelete] = useState(false);
  return (
    <>
      {isDelete && (
        <DeleteModal commentId={commentId} setisDelete={setisDelete} />
      )}
      <div>
        {currentUser.username !== username ? (
          <button
            className="text-primary text-sm outline-0 flex items-center"
            onClick={replyMessage}
          >
            <IoArrowUndo />
            <span className="ml-2 font-semibold"> Reply</span>
          </button>
        ) : (
          <div className="flex items-center font-semibold">
            <button
              className="text-error "
              onClick={() => {
                setisDelete(true);
              }}
            >
              {" "}
              <MdDelete className="inline" /> Delete
            </button>
            <button
              className="text-primary ml-4"
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
    </>
  );
}

export default ReplyBox;
