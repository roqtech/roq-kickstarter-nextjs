import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@roq/nextjs";

export interface UserRegisterDto {
  name: string;
  email: string;
  password: string;
}

// Request handler for registering a new user
function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }
  res.status(200).json({ files: [] });
}

export default function (req: NextApiRequest, res: NextApiResponse) {
  return withAuth(req, res)(handler);
}
