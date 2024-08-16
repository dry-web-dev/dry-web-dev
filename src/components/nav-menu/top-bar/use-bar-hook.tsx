import { useEffect, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function useBarScrollHook(bar: HTMLDivElement | null) {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    if (!bar) return;

    const bodyScrollTrigger = ScrollTrigger.create({
      trigger: bar,
      start: "+=5 top",
      markers: {
        startColor: "green",
        endColor: "transparent",
        fontSize: "12px",
        indent: 20,
      },
      onEnter: () => {
        setIsTop(false);
      },
      onLeaveBack: () => {
        setIsTop(true);
      },
    });

    return () => bodyScrollTrigger.kill();
  }, [bar]);

  return isTop;
};