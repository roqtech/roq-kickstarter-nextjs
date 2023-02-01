import * as yup from "yup";
import { setConfig } from "next/config";

export const clientConfig = Object.freeze({
  roq: {
    platformURL: yup
      .string()
      .trim()
      .required("NEXT_PUBLIC_ROQ_PLATFORM_URL is a required variable")
      .validateSync(process.env.NEXT_PUBLIC_ROQ_PLATFORM_URL),
  },
});

setConfig({ clientConfig });
