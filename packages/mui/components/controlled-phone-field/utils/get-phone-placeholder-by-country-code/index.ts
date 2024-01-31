import type { CountryCode } from "libphonenumber-js";
import {
  getExampleNumber,
  formatIncompletePhoneNumber,
} from "libphonenumber-js"; // TODO: replace with own implementation
import examples from "libphonenumber-js/examples.mobile.json";

export function getPhonePlaceholderByCountryCode(code: CountryCode): string {
  const number = getExampleNumber(code, examples);

  if (!number) return "### ### ###";

  return formatIncompletePhoneNumber(number.nationalNumber, code);
}
