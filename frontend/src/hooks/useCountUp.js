import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export const useCountUp = (target, { duration = 1600, start = true } = {}) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }
    let startTime;
    const step = (t) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return value;
};

export const useInViewOnce = (margin = "-80px") => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView];
};
