import { roqClient } from "server/roq";

export class FileService {
  static async getFiles(
    currentUserId: string,
    category: string,
    limit: number = 10,
    offset: number = 0
  ) {
    console.log({ currentUserId, category, limit, offset });

    return roqClient.asUser(currentUserId).files({
      filter: { fileCategory: { equalTo: category } },
      limit,
      offset,
    });
  }
}
