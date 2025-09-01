import { useScroll, useTransform } from 'framer-motion';

export default function useParallax(range = 40) {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 1], [0, range]);
}
