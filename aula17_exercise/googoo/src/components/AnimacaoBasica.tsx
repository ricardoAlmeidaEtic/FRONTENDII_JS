import { motion } from 'framer-motion';

const AnimacaoBasica = () => {
    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
        >
            <motion.h1
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{ 
                    opacity: 1, 
                    scale: [0.5, 1.5, 1], 
                    rotate: [0, 360, 720],
                    x: [0, 100, -100, 0],
                    y: [0, -50, 50, 0],
                    skew: [0, 10, -10, 0],
                    borderRadius: ["0%", "50%", "0%"]
                }}
                transition={{ 
                    duration: 10, 
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 1]
                }}
            >
                Animacao Basica
            </motion.h1>
            <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#f00", color: "#fff" }}
                whileTap={{ scale: 0.9 }}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "20px"
                }}
            >
                Cool Button
            </motion.button>
        </motion.div>
    );
}

export default AnimacaoBasica;