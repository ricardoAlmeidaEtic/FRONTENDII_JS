import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Product {
  createdAt: string;
  description: string;
  id: string;
  image: string;
  name: string;
  price: string;
}

const AxiousComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios.get<Product[]>('https://67b8d8c9699a8a7baef57ad0.mockapi.io/api/products')
      .then(response => {
        setProducts(response.data);
        setError('');
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load products');
      })
      .finally(() => setIsLoading(false));
  };

  const handleCreateProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price) {
      setError('Name and price are required');
      return;
    }

    setIsCreating(true);
    setError('');

    const payload = {
      ...newProduct,
      createdAt: new Date().toISOString(),
      image: newProduct.image || 'https://loremflickr.com/640/480/product'
    };

    axios.post<Product>('https://67b8d8c9699a8a7baef57ad0.mockapi.io/api/products', payload)
      .then(response => {
        setProducts(prev => [response.data, ...prev]);
        setNewProduct({ name: '', description: '', price: '', image: '' });
      })
      .catch(error => {
        console.error(error);
        setError('Failed to create product');
      })
      .finally(() => setIsCreating(false));
  };

  const handleDelete = (id: string) => {
    setIsDeleting(true);
    setError('');
    
    axios.delete(`https://67b8d8c9699a8a7baef57ad0.mockapi.io/api/products/${id}`)
      .then(() => {
        setProducts(prev => prev.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error(error);
        setError('Failed to delete product');
      })
      .finally(() => setIsDeleting(false));
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(price));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      boxSizing: 'border-box' // Fix 2: Added box-sizing
    }}>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          color: 'white',
          margin: 0,
          fontSize: '2rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        Product Manager
      </motion.h1>

      {/* Create Product Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          maxWidth: '600px',
          width: '100%',
          margin: '0 1rem', // Fix 3: Added horizontal margin
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#2d3436' }}>Add New Product</h2>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          boxSizing: 'border-box'  // Add this to container
        }}>
          <input
            type="text"
            value={newProduct.name}
            onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Product name"
            style={{
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              width: '100%',
              boxSizing: 'border-box'  // Add this to all inputs
            }}
          />
          <textarea
            value={newProduct.description}
            onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Product description"
            style={{
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              width: '100%',
              minHeight: '100px',
              boxSizing: 'border-box'  // Add this
            }}
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
            placeholder="Price"
            style={{
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              width: '100%',
              boxSizing: 'border-box'  // Add this
            }}
          />
          <input
            type="url"
            value={newProduct.image}
            onChange={e => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
            placeholder="Image URL (optional)"
            style={{
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              width: '100%',
              boxSizing: 'border-box'  // Add this
            }}
          />
          <motion.button
            onClick={handleCreateProduct}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{
                    width: '1rem',
                    height: '1rem',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%'
                  }}
                />
                Creating...
              </>
            ) : (
              'Add Product'
            )}
          </motion.button>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: '#ff6b6b',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>⚠️</span>
          {error}
        </motion.div>
      )}

      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%'
          }}
        />
      ) : products.length > 0 ? (
        products.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              maxWidth: '600px',
              width: '100%',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '8px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: '#2d3436',
                  margin: '0 0 1rem 0'
                }}>
                  {product.name}
                </h2>
                <p style={{ color: '#636e72', marginBottom: '1rem' }}>
                  {product.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: '#74b9ff',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}>
                    {formatPrice(product.price)}
                  </span>
                  <span style={{
                    background: '#dfe6e9',
                    color: '#2d3436',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}>
                    Added: {formatDate(product.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end'
            }}>
              <motion.button
                onClick={() => handleDelete(product.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.8rem 2rem',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center'
                }}
                disabled={isDeleting}
              >
                🗑️ Delete
              </motion.button>
            </div>
          </motion.div>
        ))
      ) : (
        !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              textAlign: 'center',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ 
              fontSize: '1.5rem',
              color: '#2d3436',
              marginBottom: '1rem'
            }}>
              No products found!
            </div>
            <button
              onClick={fetchData}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Reload Products
            </button>
          </motion.div>
        )
      )}
    </div>
  );
};

export default AxiousComponent;