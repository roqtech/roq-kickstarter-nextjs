import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { NotificationService } from "server/services/notification.service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const { url } = req.body ?? {}
  const session = getServerSession(req, res);

  try {
    await NotificationService.notifyNftDrop(session.roqUserId, url)
    res.status(200).send({})
  } catch (e) {
    res.status(400).send({})
  }
}

export default function notifyHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
