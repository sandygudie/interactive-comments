export interface CurrentUser {
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
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: {
      image: {
        png: string;
        webp: string;
      };
      username: string;
    };
  }[];
}

export interface AppContextState {
  comments: Comment[];
  currentUser: CurrentUser;
  deleteComment: (id: number) => void;
  AddComment: (comments: string) => void;
  AddReply: (comment: string,commentid: number) => void;
  editComment: (comment: string,commentid: number) => void;
  increaseScore: (commentid: number) => void;
  decreaseScore: (commentid: number) => void;
  isDelete:boolean, 
  setisDelete :React.Dispatch<React.SetStateAction<boolean>>;
}
