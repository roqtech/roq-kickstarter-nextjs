import * as yup from "yup";
import { SessionOptions, SessionStrategy } from "next-auth";
import { v4 as uuid } from "uuid";

export interface ServerConfigInterface {
  nextAuth: {
    secret: string;
    session: SessionOptions;
    jwt: {
      secret?: string;
    };
  };
  roq: {
    environmentId: string;
    platformUrl: string;
    apiKey: string;
    jwtSecret: string;
  };
}

let serverConfig: ServerConfigInterface;

if (typeof window === "undefined") {
  // will be cutted by webpack on client side
  serverConfig = Object.freeze({
    nextAuth: {
      secret: yup
        .string()
        .trim()
        .default("JWT_SECRET_LOCAL")
        .validateSync(process.env.NEXTAUTH_SECRET),
      session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 1 * 24 * 60 * 60,
        generateSessionToken: uuid,
      },
      jwt: {
        secret: yup
          .string()
          .trim()
          .default("JWT_ENCRYPTION_KEY_LOCAL")
          .validateSync(process.env.NEXTAUTH_ENCRYPTION_KEY),
      },
    },
    roq: {
      environmentId: yup
        .string()
        .required()
        .validateSync(process.env.ROQ_ENV_ID),
      apiKey: yup.string().required().validateSync(process.env.ROQ_API_KEY),
      platformUrl: yup
        .string()
        .required()
        .validateSync(process.env.ROQ_PLATFORM_URL),
      jwtSecret: yup.string().required().validateSync(process.env.JWT_SECRET),
    },
  });
}
export { serverConfig };
