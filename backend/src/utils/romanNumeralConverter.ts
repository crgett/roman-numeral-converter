import logger from "../observability/logger";
import { unexpectedDigitCounter } from "../observability/metrics";

const KEYS: number[] = [1000, 100, 10, 1];
const VALUES: string[] = ["M", "C", "X", "I"];
const FIVE_MODIFIER: { [modifier: string]: string } = {
  I: "V",
  X: "L",
  C: "D",
};

const getRomanNumeralByDigit = (digit: number, idx: number): string => {
  const result: string[] = [];
  if (digit <= 3) {
    for (let i = 0; i < digit; i++) {
      result.push(`${VALUES[idx]}`);
    }
  } else if (digit === 4) {
    result.push(`${VALUES[idx]}`);
    result.push(`${FIVE_MODIFIER[VALUES[idx]]}`);
  } else if (digit >= 5 && digit <= 8) {
    result.push(`${FIVE_MODIFIER[VALUES[idx]]}`);
    for (let i = 0; i < digit - 5; i++) {
      result.push(`${VALUES[idx]}`);
    }
  } else if (digit === 9) {
    result.push(`${VALUES[idx]}`);
    result.push(`${VALUES[idx - 1]}`);
  } else {
    logger.error(`getRomanNumeralByDigit | Unexpected digit: ${digit}`);
    unexpectedDigitCounter.inc({ digit });
  }
  return result.join("");
};

const convertToRomanNumeral = (number: number): string => {
  let romanNumeral = "";
  let current = number;

  for (let i = 0; i < KEYS.length; i++) {
    const divisor = KEYS[i];
    const result = Math.floor(current / divisor);

    logger.debug(`current: ${current}`);
    logger.debug(`divisor: ${divisor}`);
    logger.debug(`result: ${result}`);

    const substring = getRomanNumeralByDigit(result, i);
    romanNumeral += substring;
    current = current - result * divisor;
  }

  return romanNumeral;
};

export default convertToRomanNumeral;
