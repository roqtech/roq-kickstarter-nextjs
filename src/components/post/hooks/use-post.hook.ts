import { routes } from "routes";
import { CreatePostInterface, CreatePostResponse } from "components/post/types";

export const usePosts = () => {
  const createPost = async ({
    body,
    fileId,
  }: CreatePostInterface): Promise<CreatePostResponse> => {
    const result = await fetch(routes.server.post, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, fileId }),
    });

    return await result.json();
  };

  return { createPost };
};
