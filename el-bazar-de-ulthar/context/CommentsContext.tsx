import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { Signal } from "@preact/signals";
import { Comment } from "../types.ts";

export interface CommentsContextType {
  comments: Signal<Comment[]>;
  addComment: (productId: number, text: string) => void;
  removeComment: (commentId: string) => void;
}

export const CommentsContext = createContext<CommentsContextType>({
  comments: { value: [] } as Signal<Comment[]>,
  addComment: () => {},
  removeComment: () => {},
});

export const useComments = () => useContext(CommentsContext);