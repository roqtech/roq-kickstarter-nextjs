export interface Post {
  id: string;
  userId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  imgUrl: string;
}

export interface CreatePostInterface {
  body: string;
  fileId: string;
}

export interface CreatePostResponse {
  post: Post;
}

export interface PostsFetchResponse {
  posts: Post[];
  totalCount: number;
}
