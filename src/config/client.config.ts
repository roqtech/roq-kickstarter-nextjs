import * as yup from "yup";
import { setConfig } from "next/config";

export const clientConfig = Object.freeze({
  roq: {
    platformUrl: yup
      .string()
      .trim()
      .validateSync(process.env.NEXT_PUBLIC_ROQ_PLATFORM_URL),
  },
});

setConfig({ clientConfig });
