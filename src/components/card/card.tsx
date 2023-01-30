import { ReactNode } from "react";
import styles from "components/card/card.module.css";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>;
}
