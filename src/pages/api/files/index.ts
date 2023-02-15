import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { FileService } from "server/services/file.service";
import { FileCategories, NotificationTypes } from "server/enums";
import { FilesFetchDto } from "server/dtos/files-fetch.dto";
import { roqClient } from "server/roq";

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fileId } = req.body;

    const session = getServerSession(req, res);

    const [{ userProfile }, { file }] = await Promise.all([
      roqClient.asSuperAdmin().userProfile({ id: session.roqUserId }),
      roqClient.asSuperAdmin().file({ id: fileId }),
    ]);

    await roqClient.asSuperAdmin().notify({
      notification: {
        key: NotificationTypes.pokeDrop,
        data: [
          {
            key: "creatorName",
            value: `${userProfile?.firstName ?? ""} ${
              userProfile?.lastName ?? ""
            }`.trim(),
          },
          {
            key: "fileUrl",
            value: file.url,
          },
          {
            key: "url",
            value: file.url,
          },
        ],
        recipients: {
          allUsers: true,
          excludedUserIds: [session.roqUserId],
        },
      },
    });

    res.status(200).json({ notified: true });
  } catch (e) {
    console.dir(e);
    res.status(200).json({ notified: false });
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    if (req.method === "POST") {
      return postHandler(req, res);
    }

    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const { limit, offset } = req.query as FilesFetchDto;
  const session = getServerSession(req, res);

  try {
    const files = await FileService.getFilesForFeed(
      session.roqUserId,
      FileCategories.userFiles,
      limit,
      offset
    );

    res.status(200).json(files);
  } catch (e) {
    res.status(200).json({ files: [], totalCount: 0 });
  }
}

export default function filesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
