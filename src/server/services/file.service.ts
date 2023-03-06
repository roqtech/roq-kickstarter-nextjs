import { roqClient } from "server/roq";

export class FileService {
  static async getFilesForFeed(
    currentUserId: string,
    category: string,
    limit: number = 10,
    offset: number = 0
  ) {
    const filesResult = await roqClient.asUser(currentUserId).files({
      filter: {
        fileCategory: { equalTo: category },
        createdByUserId: { equalTo: currentUserId },
      },
      limit,
      offset,
      withCreatedByUser: true,
    });

    // Remove emails and other private information from the nested users
    const filesClean = filesResult.files?.data?.map((f) => {
      return {
        ...f,
        createdByUser: {
          firstName: f.createdByUser?.firstName,
          lastName: f.createdByUser?.lastName,
        },
      };
    });

    return {
      files: filesClean,
      totalCount: filesResult?.files?.totalCount,
    };
  }
}
