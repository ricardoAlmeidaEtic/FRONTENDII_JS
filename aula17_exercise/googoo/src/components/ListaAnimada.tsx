import { motion } from 'framer-motion'

const itemVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
}

function ListaAnimada() {
  return (
    <motion.ul initial="hidden" animate="visible">
      {[1, 2, 3, 4, 5].map((item) => (
        <motion.li 
          variants={itemVariant}
          key={item}
          transition={({ duration: 1, delay: item * 0.2 })}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}

export default ListaAnimada;
      