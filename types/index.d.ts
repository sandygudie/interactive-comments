export interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}
export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
  // replies?: Reply[];for deep nesting
}

export interface AppContextState {
  comments: Comment[];
  currentUser: User;
  deleteComment: (id: number) => void;
  AddComment: (comments: string) => void;
  AddReply: (comment: string, commentid: number) => void;
  editComment: (comment: string, commentid: number) => void;
  increaseScore: (commentid: number) => void;
  decreaseScore: (commentid: number) => void;
}
