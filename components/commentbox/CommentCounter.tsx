import React from "react";
import { useAppContext } from "../../context";
interface Props {
  score: number;
  commentId: number;
  className;
}

function CommentCounter({ score, commentId, className }: Props) {
  const { increaseScore, decreaseScore } = useAppContext();
  return (
    <div className={className}>
      <button
        onClick={() => {
          increaseScore(commentId);
        }}
        className="font-medium outline-0 "
      >
        +
      </button>
      <p className="font-normal py-1 text-primary text-sm font-bold">{score}</p>
      <button
        onClick={() => {
          decreaseScore(commentId);
        }}
        className="font-medium  outline-0"
      >
        -
      </button>
    </div>
  );
}

export default CommentCounter;
