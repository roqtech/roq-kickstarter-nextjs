import { Platform } from "@roq/nextjs";
import { serverConfig } from "config";

export const roqClient = new Platform({
  host: serverConfig.roq.platformURL,
  environmentId: serverConfig.roq.environmentId,
  apiKey: serverConfig.roq.apiKey,
});
