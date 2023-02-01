import React, { useState } from "react";
import styles from "components/file/upload-file.module.css";
import { useRoqFileUploader, FileUpload } from "@roq/ui-react";

interface UploadFileProps {
  onSuccess?: (file: File) => void;
}

export default function UploadFile({ onSuccess }: UploadFileProps) {
  const [newFile, setNewFile] = useState<File>();

  // To control the file upload - i.e trigger the upload when required,
  // you can use this hook to get the fileUploader object
  const fileUploader = useRoqFileUploader({
    onUploadSuccess: (file) => {
      onSuccess?.(file);
    },
    onUploadFail: (err) => {
      console.error(err);
    },
    onChange: ([file]) => {
      setNewFile(file);
    },
    fileCategory: "USER_FILES",
  });

  // Trigger the upload manually, by calling the uploadFile function
  const handleUpload = async () => {
    fileUploader.uploadFile({
      file: newFile,
      temporaryId: Date.now().toString(),
    });
  };

  return (
    <div className={styles.uploadContainer}>
      {/* Display the file selector button */}
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

      {newFile ? (
        <button disabled={!newFile} className="btn" onClick={handleUpload}>
          Start upload
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
