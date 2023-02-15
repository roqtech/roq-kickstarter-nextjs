import useSWR, { Fetcher } from "swr";
import { routes } from "routes";
import styles from "components/file/files.module.css";
import FileCard from "components/file/file-card";
import Loader from "components/loader";
import { FilesFetchResponse } from "components/file/types";
import Card from "components/card";
import UploadFile from "components/file/upload-file";

export default function Files() {
  const fetcher: Fetcher<FilesFetchResponse> = (apiURL: string) =>
    fetch(apiURL).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    routes.server.files,
    fetcher
  );

  const notify = (fileId: string) => fetch(routes.server.files, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId }),
  });

  const handleCreateSuccess = (file: File) => {
    mutate();
    notify((file as unknown as { id: string }).id);
  };

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className={styles.feed}>
      <h2 className={styles.title}>Recent files from users of this app</h2>

      <div className={styles.uploadContainer}>
        <Card>
          <UploadFile onSuccess={handleCreateSuccess} onDelete={handleDelete} />
        </Card>
      </div>

      <div className={styles.listContainer}>
        {isLoading ? <Loader /> : <></>}

        {data?.files?.map((f) => (
          <FileCard file={f} key={f.id} />
        ))}

        {error ? <>{JSON.stringify(error)}</> : <></>}
      </div>
    </div>
  );
}
