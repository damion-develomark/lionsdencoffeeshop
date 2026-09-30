"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Script from "next/script";

// Reserve the existing widget space, but fetch vendor code only as it approaches.
export function DeferredEmbed({
  children,
  className,
  src,
}: {
  children: ReactNode;
  className: string;
  src: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
      {ready && <Script src={src} strategy="afterInteractive" />}
    </div>
  );
}
