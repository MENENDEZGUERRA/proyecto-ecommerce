import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { CommentsContext } from "../context/CommentsContext.tsx";
import { Comment } from "../types.ts";
import { JSX } from "preact";

interface CommentsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export default function CommentsProvider({ children }: CommentsProviderProps) {
  const comments = useSignal<Comment[]>([]);

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      try {
        comments.value = JSON.parse(savedComments);
      } catch (e) {
        console.error("Error loading comments:", e);
      }
    }
  }, []);

  // Save comments when they change
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments.value));
  }, [comments.value]);

  const addComment = (productId: number, text: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      productId,
      text,
      timestamp: Date.now(),
    };
    
    comments.value = [...comments.value, newComment];
  };

  const removeComment = (commentId: string) => {
    comments.value = comments.value.filter(comment => comment.id !== commentId);
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment, removeComment }}>
      {children}
    </CommentsContext.Provider>
  );
}