import { useSignal } from "@preact/signals";
import { useComments } from "../context/CommentsContext.tsx";

interface ProductCommentsProps {
  productId: number;
}

export default function ProductComments({ productId }: ProductCommentsProps) {
  const { comments, addComment, removeComment } = useComments();
  const newComment = useSignal("");

  // Get comments for this product
  const productComments = comments.value.filter(
    comment => comment.productId === productId
  ).sort((a, b) => b.timestamp - a.timestamp);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (newComment.value.trim()) {
      addComment(productId, newComment.value.trim());
      newComment.value = "";
    }
  };

  return (
    <div class="comments-section">
      <h3 class="comments-title">Comentarios Malditos</h3>
      
      <form onSubmit={handleSubmit} class="comment-form">
        <textarea 
          value={newComment.value}
          onInput={(e) => newComment.value = (e.target as HTMLTextAreaElement).value}
          placeholder="Deja tu comentario sobre este objeto maldito..."
          class="comment-textarea"
        />
        <button type="submit" class="comment-submit-btn">Enviar</button>
      </form>
      
      <div class="comments-list">
        {productComments.length === 0 ? (
          <p class="no-comments">No hay comentarios aún. ¡Sé el primero en maldecir este objeto!</p>
        ) : (
          productComments.map((comment) => (
            <div key={comment.id} class="comment">
              <p class="comment-text">{comment.text}</p>
              <div class="comment-footer">
                <span class="comment-date">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
                <button 
                  onClick={() => removeComment(comment.id)}
                  class="comment-delete-btn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}