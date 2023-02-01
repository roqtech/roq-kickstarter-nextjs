import useSWR, { Fetcher } from "swr";
import { routes } from "routes";
import styles from "components/file/files.module.css";
import FileCard from "components/file/file-card";
import Loader from "components/loader";
import { FilesFetchResponse } from "components/file/types";
import Card from "components/card/card";
import UploadFile from "components/file/upload-file";

export default function Files() {
  const fetcher: Fetcher<FilesFetchResponse> = (apiURL: string) =>
    fetch(apiURL).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    routes.server.files,
    fetcher
  );

  const handleCreateSuccess = () => {
    mutate();
  };

  return (
    <div className={styles.feed}>
      <h1 className={styles.title}>Your Feed</h1>

      <div className={styles.uploadContainer}>
        <Card>
          <UploadFile onSuccess={handleCreateSuccess} />
        </Card>
      </div>

      <div className={styles.listContainer}>
        {isLoading ? <Loader /> : <></>}

        {data?.files?.data?.map((f) => (
          <FileCard file={f} key={f.id} />
        ))}

        {error ? <>{JSON.stringify(error)}</> : <></>}
      </div>
    </div>
  );
}
