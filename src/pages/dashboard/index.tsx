import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { useRoqFileUploader, FileUpload } from "@roq/ui-react";
import styles from "pages/dashboard/dashboard.module.css";
import Link from "next/link";

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session]);

  // To control the file upload - i.e trigger the upload when required,
  // you can use this hook to get the fileUploader object
  const fileUploader = useRoqFileUploader({
    onUploadSuccess: (file) => {
      setFile(file);
    },
    onUploadFail: (file) => {
      setFile(undefined);
    },
    onChange: ([file]) => {
      setFile(file);
    },
    fileCategory: "USER_FILES",
  });

  // Trigger the upload manually, by calling the uploadFile function
  const handleUpload = async () => {
    const { url } = await fileUploader.uploadFile({
      file: file,
      temporaryId: file.name,
    });

    setFileUrl(url);
  };

  return (
    <AppLayout>
      <h1 className={styles.pageTitle}>File uploads</h1>
      <h3 className={styles.pageTitle}>
        Here&apos;s an example of a controlled file upload
      </h3>

      <div className={styles.uploadContainer}>
        {/* Display the uploader button */}
        <FileUpload
          fileUploader={fileUploader}
          accept={["image/*"]}
          fileCategory="USER_FILES"
        />

        {/* Images can be previewed using the previews property of the file uploader object */}
        <img
          className={styles.preview}
          width={"100%"}
          src={fileUploader.previews?.[0]?.url}
        />

        {file ? (
          <button className="btn" onClick={handleUpload}>
            Upload File
          </button>
        ) : (
          <></>
        )}

        {fileUrl ? (
          <div className={styles.uploadMeta}>
            Your file is uploaded, and accessible from this S3 URL:
            <Link href={fileUrl} target="_blank">
              {fileUrl}
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </AppLayout>
  );
}
