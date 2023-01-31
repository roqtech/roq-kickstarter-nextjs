import { prisma } from "server/db";
import { roqClient } from "server/roq";
import { map, uniq, find } from "lodash";

export class PostService {
  static async createPost(userId: string, body: string, fileId: string) {
    const post = await prisma.post.create({ data: { userId, body, fileId } });

    // Associate the file to the post for future queries. This is optional
    await roqClient.asUser(userId).createFileAssociation({
      createFileAssociationDto: {
        fileId,
        entityName: "Post",
        entityReference: post.id,
      },
    });

    return post;
  }

  static async listUserPosts(userId: string, limit: number, offset: number) {
    const posts = await prisma.post.findMany({
      where: { userId },
      take: limit,
      skip: offset,
    });

    const fileIds = uniq(map(posts, "fileId"));
    if (fileIds.length === 0) {
      return posts;
    }

    const postImages = await roqClient.asUser(userId).files({
      filter: {
        id: {
          valueIn: fileIds,
        },
      },
    });

    return posts.map((p) => ({
      ...p,
      imgUrl: find(postImages?.files?.data, { id: p.fileId })?.url,
    }));
  }
}
