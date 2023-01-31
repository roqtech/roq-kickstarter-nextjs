import styles from "components/post/post.module.css";
import Card from "components/card/card";
import { Post } from "components/post/types";

export default function PostItem({ post }: { post: Post }) {
  const { body, imgUrl, createdAt } = post;

  return (
    <Card className={styles.postCard}>
      <div className={styles.postContent}>
        <div className={styles.postImgContainer}>
          <a href={imgUrl} target="_blank" rel="noreferrer">
            <img
              alt={body.slice(0, 10)}
              className={styles.postImg}
              src={imgUrl}
            />
          </a>
        </div>

        <div className={styles.timestamp}>
          {new Date(createdAt)?.toLocaleTimeString()}
        </div>
        <div className={styles.postText}>{body}</div>
      </div>
    </Card>
  );
}
