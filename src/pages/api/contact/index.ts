import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { roqClient } from "server/roq";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const session = getServerSession(req, res);

  const {
    userProfiles: { data },
  } = await roqClient.asSuperAdmin().userProfiles();

  const userIds = data
    .map(({ id }) => id)
    .filter((id) => id !== session.roqUserId);

  const conversation = await roqClient
    .asUser(session.roqUserId)
    .createConversation({
      conversation: {
        ownerId: session.roqUserId,
        memberIds: [session.roqUserId, ...userIds],
        title: "DEMO",
        isGroup: true,
      },
    });

  res.status(200).json({ conversation });
}

export default function filesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
