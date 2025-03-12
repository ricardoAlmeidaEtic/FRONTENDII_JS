import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FetchComponent = () => {
  interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCompleted, setNewCompleted] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingCompleted, setEditingCompleted] = useState(false);

  // Add new state for delete loading
const [isDeleting, setIsDeleting] = useState(false);

// Add delete handler function

useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
        if (!response.ok) throw new Error('Erro ao executar a requisição');
        return response.json();
    })
    .then(json => setTodos([json]))
    .catch(error => console.error(error));
}, []);

const handleDeleteTodo = (id: number) => {
  setIsDeleting(true);
  setError('');

  const isClientSideTodo = id > 1000;

  if (isClientSideTodo) {
    // Immediately remove client-side todos
    setTodos(prev => prev.filter(todo => todo.id !== id));
    setIsDeleting(false);
  } else {
    // Server-side delete
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete todo');
        return response.json();
      })
      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        setIsDeleting(false);
      })
      .catch(error => {
        console.error(error);
        setError('Error deleting server-side todo');
        setIsDeleting(false);
      });
  }
};

const handleCreateTodo = () => {
    setIsPosting(true);
    setError('');

    // Generate a unique client-side ID
    const tempId = Date.now();

    const payload = {
      userId: 1,
      title: newTitle || `New Todo Item ${Math.floor(Math.random() * 1000)}`,
      completed: newCompleted
    };

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao executar a requisição POST');
        return response.json();
      })
      .then(json => {
        // Use the client-side ID instead of the server response ID
        const newTodo = { ...json, id: tempId };
        setTodos(prev => [...prev, newTodo]);
        setIsPosting(false);
        setNewTitle('');
        setNewCompleted(false);
      })
      .catch(error => {
        console.error(error);
        setError('Error creating todo');
        setIsPosting(false);
      });
  };

  const handleUpdateTodo = () => {
    if (editingId === null) return;
    setIsUpdating(true);
    setError('');
  
    // Check if it's a client-generated ID (assuming server IDs are < 1000)
    const isClientSideTodo = editingId > 1000;
  
    if (isClientSideTodo) {
      // Update local state directly for client-generated todos
      setTodos(prev => prev.map(todo => 
        todo.id === editingId ? {
          ...todo,
          title: editingTitle,
          completed: editingCompleted
        } : todo
      ));
      setEditingId(null);
      setIsUpdating(false);
    } else {
      // Server-side update for the initial todo (ID 1)
      const payload = {
        userId: 1,
        id: editingId,
        title: editingTitle,
        completed: editingCompleted
      };
  
      fetch(`https://jsonplaceholder.typicode.com/todos/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) throw new Error('Failed to update todo');
          return response.json();
        })
        .then(json => {
          setTodos(prev => prev.map(todo => (todo.id === editingId ? json : todo)));
          setEditingId(null);
          setIsUpdating(false);
        })
        .catch(error => {
          console.error(error);
          setError('Error updating server-side todo');
          setIsUpdating(false);
        });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '1rem'
      }}
    >
      {todos.map(todo => (
        <motion.div
          key={todo.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            marginBottom: '1rem',
            position: 'relative'
          }}
        >
          <h1 style={{ marginBottom: '1rem', fontSize: '1.5rem', color: '#333' }}>
            Todo Item
          </h1>
          {editingId === todo.id ? (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                  placeholder="Edit Todo Title"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    outline: 'none',
                    transition: 'border 0.3s ease',
                    boxSizing: 'border-box',
                    marginBottom: '0.5rem'
                  }}
                  onFocus={e => (e.target.style.border = '1px solid #667eea')}
                  onBlur={e => (e.target.style.border = '1px solid #ddd')}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={editingCompleted}
                    onChange={e => setEditingCompleted(e.target.checked)}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: '0.5rem',
                      cursor: 'pointer'
                    }}
                  />
                  <label style={{ fontSize: '1rem', color: '#333', cursor: 'pointer' }}>
                    Completed
                  </label>
                </div>
              </div>
              <div>
                <motion.button
                  onClick={handleUpdateTodo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    marginRight: '0.5rem'
                  }}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Save'}
                </motion.button>
                <motion.button
                  onClick={() => setEditingId(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                  disabled={isUpdating}
                >
                  Cancel
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <div style={{ color: '#555' }}>
                <p>
                  <strong>User ID:</strong> {todo.userId}
                </p>
                <p>
                  <strong>ID:</strong> {todo.id}
                </p>
                <p>
                  <strong>Title:</strong> {todo.title}
                </p>
                <p>
                  <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
                </p>
              </div>
              <motion.button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditingTitle(todo.title);
                  setEditingCompleted(todo.completed);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: '#ffc107',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Edit
              </motion.button>

              <motion.button
                    onClick={() => handleDeleteTodo(todo.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        marginTop: '1rem',
                        marginLeft: '0.5rem'
                    }}
                    disabled={isDeleting}
                    >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </motion.button>
            </>
          )}
        </motion.div>
      ))}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* New Todo Form */}
      <div
        style={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          maxWidth: '400px',
          width: '100%',
          marginBottom: '1rem'
        }}
      >
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#333' }}>
          Add New Todo
        </h2>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Todo Title"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            outline: 'none',
            transition: 'border 0.3s ease',
            boxSizing: 'border-box'
          }}
          onFocus={e => (e.target.style.border = '1px solid #667eea')}
          onBlur={e => (e.target.style.border = '1px solid #ddd')}
        />
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type="checkbox"
            checked={newCompleted}
            onChange={e => setNewCompleted(e.target.checked)}
            style={{
              width: '20px',
              height: '20px',
              marginRight: '0.5rem',
              cursor: 'pointer'
            }}
          />
          <label style={{ fontSize: '1rem', color: '#333', cursor: 'pointer' }}>
            Completed
          </label>
        </div>
      </div>
      <motion.button
        onClick={handleCreateTodo}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: '#667eea',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
        disabled={isPosting}
      >
        {isPosting ? 'Creating...' : 'Create New Todo'}
      </motion.button>
    </div>
  );
};

export default FetchComponent;
