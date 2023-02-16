import { NotificationTypes } from "server/enums";
import { roqClient } from "server/roq";

export class NotificationService {
  static async notifyNftDrop(creatorId: string, nftUrl?: string, userIds?: string[]) {
    const { firstName, lastName } = (await roqClient.asSuperAdmin().user({ id: creatorId }))?.user ?? {}
    await roqClient.asSuperAdmin().notify({
      notification: {
        key: NotificationTypes.nftDrop,
        recipients: userIds ? { userIds } : { allUsers: true },
        data: [{
          key: 'creatorName',
          value: `${firstName} ${lastName}`
        }, {
          key: 'nftUrl',
          value: nftUrl
        }]
      },
    });
  }
}
