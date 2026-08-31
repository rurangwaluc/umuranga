"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  staggerChildren?: boolean;
};

type ChildProps = {
  className?: string;
  style?: CSSProperties;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
  staggerChildren = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.requestAnimationFrame(() => {
            setVisible(true);
          });

          if (once) {
            observer.unobserve(element);
          }

          return;
        }

        if (!once) {
          window.requestAnimationFrame(() => {
            setVisible(false);
          });
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  const content = staggerChildren
    ? Children.map(children, (child, index) => {
        if (!isValidElement<ChildProps>(child)) {
          return child;
        }

        return cloneElement(child as ReactElement<ChildProps>, {
          className: cn(child.props.className, "reveal-child"),
          style: {
            ...child.props.style,
            "--reveal-delay": `${delay + index * 85}ms`,
          } as CSSProperties,
        });
      })
    : children;

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {content}
    </div>
  );
}