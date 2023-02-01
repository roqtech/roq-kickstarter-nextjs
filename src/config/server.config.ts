import * as yup from "yup";

export interface ServerConfigInterface {
  roq: {
    baseURL: string;
    clientId: string;
    clientSecret: string;
    environmentId: string;
    apiKey: string;
    platformURL: string;
    authURL: string;
    loginURL: string;
    logoutURL: string;
    authSecret: string;
  };
}

let serverConfig: ServerConfigInterface;

if (typeof window === "undefined") {
  // will be cut out by webpack on client side
  serverConfig = Object.freeze({
    roq: {
      baseURL: yup
        .string()
        .required("ROQ_BASE_URL is a required variable")
        .default("http://localhost:3000")
        .validateSync(process.env.ROQ_BASE_URL),
      clientId: yup
        .string()
        .required("ROQ_CLIENT_ID is a required variable")
        .validateSync(process.env.ROQ_CLIENT_ID),
      clientSecret: yup
        .string()
        .required("ROQ_CLIENT_SECRETis a required variable")
        .validateSync(process.env.ROQ_CLIENT_SECRET),
      environmentId: yup
        .string()
        .required("ROQ_ENVIRONMENT_ID a required variable")
        .validateSync(process.env.ROQ_ENVIRONMENT_ID),
      apiKey: yup.string().required().validateSync(process.env.ROQ_API_KEY),
      authSecret: yup
        .string()
        .required("ROQ_SECRET is a required variable")
        .default("CHANGE_THIS_SECRET")
        .validateSync(process.env.ROQ_SECRET),
      platformURL: yup
        .string()
        .required("ROQ_PLATFORM_URL is a required variable")
        .validateSync(process.env.ROQ_PLATFORM_URL),
      callbackURL: yup
        .string()
        .required()
        .default("http://localhost:3000/api/auth/callback")
        .validateSync(process.env.ROQ_AUTH_CALLBACK_URL),
      loginURL: yup
        .string()
        .required()
        .default("http://localhost:3000/api/auth/login")
        .validateSync(process.env.ROQ_AUTH_LOGIN_URL),
      logoutURL: yup
        .string()
        .required()
        .default("http://localhost:3000/api/auth/logout")
        .validateSync(process.env.ROQ_AUTH_LOGOUT_URL),
      authURL: yup.string().required().validateSync(process.env.ROQ_AUTH_URL),
    },
  });
}
export { serverConfig };
