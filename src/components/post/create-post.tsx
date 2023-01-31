import React, { ChangeEvent, useState } from "react";
import styles from "components/post/create-post.module.css";
import { useRoqFileUploader, FileUpload } from "@roq/ui-react";
import { usePosts } from "components/post/hooks/use-post.hook";

interface CreatePostProps {
  onSuccess: () => void;
}

export default function CreatePost({ onSuccess }: CreatePostProps) {
  const [newFile, setNewFile] = useState<File>();

  const [text, setText] = useState("");

  const { createPost } = usePosts();

  // To control the file upload - i.e trigger the upload when required,
  // you can use this hook to get the fileUploader object
  const fileUploader = useRoqFileUploader({
    onUploadSuccess: (file) => {
      setNewFile(file);
    },
    onUploadFail: (file) => {
      setNewFile(undefined);
    },
    onChange: ([file]) => {
      setNewFile(file);
    },
    fileCategory: "USER_FILES",
  });

  // Trigger the upload manually, by calling the uploadFile function
  const handlePostCreate = async () => {
    try {
      const { fileId } = await fileUploader.uploadFile({
        file: newFile,
        temporaryId: Date.now().toString(),
      });

      await createPost({ body: text, fileId });

      onSuccess?.();
    } catch (e) {
      console.error(e);
      alert(JSON.stringify(e));
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <textarea
        className={styles.inputText}
        placeholder="What's on your mind?"
        rows={5}
        onChange={handleTextChange}
        autoFocus
      />

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

        <button
          disabled={!newFile || text.length === 0}
          className="btn"
          onClick={handlePostCreate}
        >
          Publish Post
        </button>
      </div>
    </div>
  );
}
