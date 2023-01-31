import { ReactNode } from "react";
import styles from "components/card/card.module.css";

interface CardProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function Card({ className, children, style }: CardProps) {
  return (
    <div className={`${styles.card} ${className || ""}`} style={style}>
      {children}
    </div>
  );
}
