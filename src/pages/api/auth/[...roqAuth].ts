import { RoqAuth } from "@roq/nextjs";
import { UserService } from "server/services/user.service";

/*
    You can export RoqAuth without passing any options if you don't need to customize the behaviour
    
    export default RoqAuth; //handles all the authentication routes automatically
*/

export default RoqAuth({
  hooks: {
    // This hook is optional - and can be used to persist user information,
    // or as in the case below, send them a welcome notification
    onLoginSuccess: async ({ session, user }) => {
      //   If the user was just created, welcome them
      if (Date.now() - new Date(user.createdAt).getTime() < 60000) {
        UserService.welcomeUser(user.id);
      }
    },
  },
});
