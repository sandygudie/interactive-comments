import React, { useState } from "react";
import { useAppContext } from "../../context";

function EditMessagebox({ setIsEdit, content, commentId }) {
  const { editComment } = useAppContext();
  const [editMsg, setEditMsg] = useState("");
  const handleChange = (event) => {
    setEditMsg(event.target.value);
  };

  const editCommenthandler = (event) => {
    event.preventDefault();

    editComment(editMsg, commentId), setIsEdit(false);
  };
  return (
    <div className="w-full rounded-md">
      <textarea
        className="h-20 text-black outline-0 w-full border-[1px] border-gray-100 rounded-md p-2"
        placeholder="Add a comment"
        onChange={(e) => handleChange(e)}
        value={editMsg ? editMsg : content}
      />
      <button
        onClick={(e) => editCommenthandler(e)}
        className="text-white text-sm rounded-lg py-2 px-6 bg-primary flex ml-auto  outline-0"
        type="button"
      >
        UPDATE
      </button>
    </div>
  );
}

export default EditMessagebox;
