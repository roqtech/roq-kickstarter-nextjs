import styles from "components/file/file-card.module.css";
import Card from "components/card/card";
import { UserFile } from "components/file/types";

export default function FileCard({ file }: { file: UserFile }) {
  const { name, url, size, createdAt } = file;

  return (
    <Card className={styles.postCard}>
      <div className={styles.postContent}>
        <div className={styles.postImgContainer}>
          <a href={url} target="_blank" rel="noreferrer">
            <img alt={name.slice(0, 10)} className={styles.postImg} src={url} />
          </a>
        </div>

        <div className={styles.timestamp}>
          {new Date(createdAt)?.toLocaleTimeString()}
        </div>
        <div className={styles.postText}>{name}</div>
      </div>
    </Card>
  );
}
