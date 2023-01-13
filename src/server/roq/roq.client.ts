import { Platform } from "@roq/nodejs";
import { serverConfig } from "config";

export const roqClient = new Platform({
  host: serverConfig.roq.platformUrl,
  environmentId: serverConfig.roq.environmentId,
  apiKey: serverConfig.roq.apiKey,
});
