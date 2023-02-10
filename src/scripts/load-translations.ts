import { defaultNS, localeMapping } from "config";
import { existsSync, readFileSync, writeFileSync } from "fs";
import invert from "lodash/invert";
import merge from "lodash/merge";
import { dirname, join } from "path";
import { roqClient } from "server/roq";
import { access, mkdir } from "fs/promises";

const translationsBasePath = join(process.cwd(), "public", "locales");
const localeReverseMapping = invert(localeMapping);

type RecordType = Record<string, any>;

interface NamespaceDetailsInterface {
  namespaceFileName: string;
  namespaceFilePath?: string;
}
export interface TranslationKeyInterface {
  key: string;
  translations?: {
    data: {
      locale: string;
      value: string;
    }[];
  };
}

const getFileContent = async (filePath: string) => {
  if (existsSync(filePath)) {
    const fileContent = JSON.parse(readFileSync(filePath, "utf-8"));
    return fileContent;
  } else {
    return writeFile(filePath, JSON.stringify({}));
  }
};

const putContentToFile = async (
  filePath: string,
  data: string
): Promise<void> => {
  return writeFile(filePath, data);
};

const updateTranslationsFile = async (
  filePath: string,
  obj: Record<string, unknown>
) => {
  const currentContent = await getFileContent(filePath);
  const updatedObj = merge(currentContent, obj);
  await putContentToFile(filePath, JSON.stringify(updatedObj, undefined, 2));
};

const getNameSpaceDetails = (
  namespace: string,
  givenLocale: string,
  returnPath = false
): NamespaceDetailsInterface => {
  const namespaceFileName = `${namespace}.json`;
  const detailsObject: NamespaceDetailsInterface = {
    namespaceFileName,
  };
  if (returnPath) {
    detailsObject.namespaceFilePath = join(
      translationsBasePath,
      localeReverseMapping[givenLocale] || givenLocale,
      namespaceFileName
    );
  }
  return detailsObject;
};

const isExists = async (path: string): Promise<boolean> => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const writeFile = async (filePath: string, data: any) => {
  try {
    const dirName = dirname(filePath);
    const exist = await isExists(dirName);
    if (!exist) {
      await mkdir(dirName, { recursive: true });
    }
    writeFileSync(filePath, data, "utf8");
  } catch (e) {
    throw new Error(e as string);
  }
};

const getObjectFromNestedKey = (splittedKey: string[], value: string) => {
  const obj: any = {};
  let container = obj;
  splittedKey.forEach((k, i, values) => {
    container = container[k] = i === values.length - 1 ? value : {};
  });
  return obj;
};

const createLoadedTranslationsObject = (
  loadedTranslations: RecordType,
  namespaceFilePath: string,
  key: string,
  value: string
) => {
  const splittedKey = key.split(".");
  const isNestedKey = splittedKey.length > 1;
  const loadedTranslationsNamespace = loadedTranslations[namespaceFilePath];
  if (isNestedKey && !loadedTranslationsNamespace) {
    loadedTranslations[namespaceFilePath] = getObjectFromNestedKey(
      splittedKey,
      value
    );
  }
  if (!isNestedKey && !loadedTranslationsNamespace) {
    loadedTranslations[namespaceFilePath] = { [key]: value };
  }
  if (isNestedKey && loadedTranslationsNamespace) {
    merge(
      loadedTranslations[namespaceFilePath],
      getObjectFromNestedKey(splittedKey, value)
    );
  }
  if (!isNestedKey && loadedTranslationsNamespace) {
    loadedTranslations[namespaceFilePath][key] = value;
  }
  return loadedTranslations[namespaceFilePath];
};

export const addTranslations = async (
  translationKeyData: TranslationKeyInterface[]
): Promise<void> => {
  const i18nNamespaces = [defaultNS || "common"];

  const loadedTranslations: any = {};

  for (const translationKey of translationKeyData) {
    const { key } = translationKey;
    if (translationKey.translations?.data) {
      for (const translationDetail of translationKey.translations.data) {
        const { locale, value } = translationDetail;
        for (const ns of i18nNamespaces) {
          const { namespaceFilePath } = getNameSpaceDetails(ns, locale, true);
          loadedTranslations[namespaceFilePath] =
            createLoadedTranslationsObject(
              loadedTranslations,
              namespaceFilePath,
              key,
              value
            );
        }
      }
      for (const translationFilePath in loadedTranslations) {
        if (loadedTranslations[translationFilePath]) {
          await updateTranslationsFile(
            translationFilePath,
            loadedTranslations[translationFilePath]
          );
        }
      }
    }
  }
  console.dir({ loadedTranslations }, { depth: null });
};

const loadTranslations = async (): Promise<void> => {
  const { translationKeys } = await roqClient
    .asSuperAdmin()
    .translationKeys({ withTranslations: true });
  const translations = translationKeys?.data || [];
  await addTranslations(translations);
};

(async () => {
  await loadTranslations();
})().catch((err) => {
  console.log("*******-------Error-------*******");
  console.error(err);
  process.exit(1);
});
