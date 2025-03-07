import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function ScrollAnimation() {
    const ref = useRef(null);
    const isInView = useInView(ref,{once: true});

    return (
        <motion.div
            ref={ref}
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
                y: isInView ? 0 : 100,
                opacity: isInView ? 1 : 0
            }}
            transition={{ duration: 1 }}
        >
            <h1>Scroll Animation</h1>
        </motion.div>
    );
}

export default ScrollAnimation;