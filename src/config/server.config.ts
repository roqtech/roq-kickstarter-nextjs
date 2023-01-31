import * as yup from "yup";

export interface ServerConfigInterface {
  databaseUrl: string;
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
    databaseUrl: yup
      .string()
      .required()
      .default("postgresql://roqdev:roqdev@localhost:5436/roqkickstarter")
      .validateSync(process.env.DATABASE_URL),
    roq: {
      baseURL: yup
        .string()
        .required()
        .default("http://localhost:3000")
        .validateSync(process.env.ROQ_BASE_URL),
      clientId: yup.string().required().validateSync(process.env.ROQ_CLIENT_ID),
      clientSecret: yup
        .string()
        .required()
        .validateSync(process.env.ROQ_CLIENT_SECRET),
      environmentId: yup
        .string()
        .required()
        .validateSync(process.env.ROQ_ENVIRONMENT_ID),
      apiKey: yup.string().required().validateSync(process.env.ROQ_API_KEY),
      authSecret: yup
        .string()
        .required()
        .default("CHANGE_THIS_SECRET")
        .validateSync(process.env.ROQ_SECRET),
      platformURL: yup
        .string()
        .required()
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
