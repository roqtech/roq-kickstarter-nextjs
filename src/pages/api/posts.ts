import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { PostService } from "server/services/post.service";
import { PostsQueryDto } from "server/dtos/posts-query.dto";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }
  const session = getServerSession(req, res);

  const { limit, offset } = req.query as PostsQueryDto;

  const posts = await PostService.listUserPosts(
    session.roqUserId,
    limit,
    offset
  );

  res.status(200).json({ posts });
}

export default function (req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
