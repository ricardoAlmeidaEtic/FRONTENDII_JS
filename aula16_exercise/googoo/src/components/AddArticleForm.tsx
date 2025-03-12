import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

// Style constants
const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    minHeight: '120px',
  },
  button: {
    background: '#3b82f6',
    color: 'white',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
  },
  loadingButton: {
    background: '#94a3b8',
  },
  error: {
    color: '#dc2626',
    marginBottom: '1rem',
  },
  success: {
    color: '#16a34a',
    marginBottom: '1rem',
  },
};

function createArticle(newArticle: { title: string; body: string }) {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newArticle),
  }).then(async (res) => {
    if (!res.ok) {
      const error = await res.json();
      console.log("error:", error);
      throw new Error(error.message || 'Failed to create article');
    }
    return res.json();
  });
}

function AddArticleForm() {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const mutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      formRef.current?.reset();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;

    mutation.mutate({ title, body });
  };

  return (
    <div style={styles.container}>
      <form ref={formRef} onSubmit={handleSubmit}>
        {mutation.isError && (
          <div style={styles.error}>
            Error: {(mutation.error as Error).message}
          </div>
        )}

        {mutation.isSuccess && (
          <div style={styles.success}>Article created successfully!</div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Article Title"
          required
          style={styles.input}
          disabled={mutation.isPending}
        />

        <textarea
          name="body"
          placeholder="Article Content"
          required
          style={styles.textarea}
          disabled={mutation.isPending}
        />

        <button
          type="submit"
          style={{
            ...styles.button,
            ...(mutation.isPending ? styles.loadingButton : {}),
          }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Publish Article'}
        </button>
      </form>
    </div>
  );
}

export default AddArticleForm;