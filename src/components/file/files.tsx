import useSWR, { Fetcher } from "swr";
import { routes } from "routes";
import styles from "components/file/files.module.css";
import FileCard from "components/file/file-card";
import Loader from "components/loader";
import { FilesFetchResponse } from "components/file/types";
import Card from "components/card";
import UploadFile from "components/file/upload-file";
import { useTranslation } from "react-i18next";

export default function Files() {
  const { t } = useTranslation();
  const fetcher: Fetcher<FilesFetchResponse> = (apiURL: string) =>
    fetch(apiURL).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    routes.server.files,
    fetcher
  );

  const handleCreateSuccess = () => {
    mutate();
  };

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className={styles.feed}>
      <h2 className={styles.title}>{t("files.title")}</h2>

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
