import styles from "components/file/file-card.module.css";
import Card from "components/card";
import { UserFile } from "components/file/types";

export default function FileCard({ file }: { file: UserFile }) {
  const { name, url, createdAt, createdByUser } = file;

  const userName = createdByUser?.firstName || "Anonymous";

  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <a href={url} target="_blank" rel="noreferrer">
            <img alt={name.slice(0, 10)} className={styles.img} src={url} />
          </a>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {userName.slice(0, 1) || ""}
            {userName.slice(-1) || ""}
          </div>
          <div>
            {userName}
            <div className={styles.timestamp}>
              {new Date(createdAt)?.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className={styles.filename}>{name}</div>
      </div>
    </Card>
  );
}
