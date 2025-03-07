import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

interface Article {
  id: number;
  title: string;
  body: string;
}

// Style constants
const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    padding: '24px',
    maxWidth: '1440px',
    margin: '0 auto'
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0 0 12px 0',
    lineHeight: 1.4
  },
  body: {
    fontSize: '0.875rem',
    color: '#4a4a4a',
    lineHeight: 1.6,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  readMore: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    color: '#ffffff',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 500,
    marginTop: '16px'
  },
  loadingCard: {
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '24px',
    height: '160px'
  }
};

function fetchArticles() {
    return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then(data => data as Article[]);
}

function ArticlesList() {
    const { data, error, isLoading } = useQuery({ 
        queryKey: ["articles"], 
        queryFn: fetchArticles 
    });

    if (isLoading) return (
        <div style={styles.container}>
        {[...Array(6)].map((_, i) => (
            <motion.div 
            key={i}
            style={styles.loadingCard}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            >
            <div style={{ 
                height: '24px', 
                width: '60%', 
                background: '#e2e8f0', 
                marginBottom: '16px',
                borderRadius: '4px'
            }} />
            <div style={{ 
                height: '16px', 
                width: '80%', 
                background: '#e2e8f0', 
                marginBottom: '8px',
                borderRadius: '4px'
            }} />
            <div style={{ 
                height: '16px', 
                width: '70%', 
                background: '#e2e8f0',
                borderRadius: '4px'
            }} />
            </motion.div>
        ))}
        </div>
    );

    if (error) return (
        <div style={{
        padding: '24px',
        background: '#fee2e2',
        color: '#dc2626',
        borderRadius: '12px',
        margin: '24px',
        textAlign: 'center'
        }}>
        Error: {error.message}
        </div>
    );

    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.container}
        >
        {(data || []).map((article) => ( // Added fallback empty array
            <motion.div
            key={article.id}
            style={styles.card as React.CSSProperties}
            whileHover={{ 
                y: -8,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            >
            <div style={{ padding: '24px' }}>
                <h2 style={styles.title}>{article.title}</h2>
                <p style={styles.body as React.CSSProperties}>{article.body}</p>
                <div style={styles.readMore}>
                Read Article
                </div>
            </div>
            </motion.div>
        ))}
        </motion.div>
  );
}

export default ArticlesList;