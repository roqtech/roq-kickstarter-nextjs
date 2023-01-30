import styles from "components/loader/loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
