import { Locale } from "./config";
import { Dictionary } from "./types";
import ar from "./dictionaries/ar";
import en from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = {
  ar,
  en,
};

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale];
};
