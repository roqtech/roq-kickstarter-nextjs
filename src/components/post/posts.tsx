import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { routes } from "routes";
import styles from "components/post/posts.module.css";
import PostItem from "components/post/post";
import Loader from "components/loader";
import { PostsFetchResponse } from "components/post/types";

import CreatePost from "components/post/create-post";
import Card from "components/card/card";

export default function Posts() {
  const [creating, setCreating] = useState(false);

  const fetcher: Fetcher<PostsFetchResponse> = (apiURL: string) =>
    fetch(apiURL).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    routes.server.posts,
    fetcher
  );

  const handlePostCreateSuccess = () => {
    mutate();
    setCreating(false);
  };

  return (
    <div>
      <h1 className={styles.title}>Your Feed</h1>

      {creating || !data?.posts?.length ? (
        <Card style={{ marginBottom: 10 }}>
          <CreatePost onSuccess={handlePostCreateSuccess} />
        </Card>
      ) : (
        <button onClick={() => setCreating(true)} className="btn">
          Create a Post
        </button>
      )}

      {isLoading ? <Loader /> : <></>}
      <div className={styles.listContainer}>
        {data?.posts?.map((p) => (
          <PostItem post={p} key={p.id} />
        ))}

        {error ? <>{JSON.stringify(error)}</> : <></>}
      </div>
    </div>
  );
}
