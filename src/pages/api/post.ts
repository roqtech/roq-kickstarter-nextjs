import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { CreatePostDto } from "server/dtos/create-post.dto";
import { PostService } from "server/services/post.service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const { body, fileId } = req.body as CreatePostDto;
  const session = getServerSession(req, res);

  const post = await PostService.createPost(session.roqUserId, body, fileId);

  res.status(200).json({ post });
}

export default function (req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
