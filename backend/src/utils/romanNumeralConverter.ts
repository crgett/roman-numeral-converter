import logger from "../observability/logger";
import { unexpectedDigitCounter } from "../observability/metrics";

const KEYS: number[] = [1000, 100, 10, 1];
const VALUES: string[] = ["M", "C", "X", "I"];
const FIVE_MODIFIER: { [modifier: string]: string } = {
  I: "V",
  X: "L",
  C: "D",
};

/*
This function receives the current digit and position index, determines the
appropriate Roman numeral, and returns the result. The numeral is determined
based on the VALUE at the current position index. Digits 4 through 8 use
the FIVE_MODIFIER based on the current VALUE, while 9 uses the VALUE from
the previous position index.

Example:

result = []

digit = 8
idx = 2
result = ["L", "X", "X", "X"]

return "LXXX"
*/
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
    result.push(`${VALUES[idx - 1]}`); // safe because of the max number constraint of 3999
  } else {
    logger.error(`getRomanNumeralByDigit | Unexpected digit: ${digit}`);
    unexpectedDigitCounter.inc({ digit });
  }
  return result.join("");
};

/*
This function iterates over the given number to parse the digit at each
position: thousands, hundreds, tens, and ones. The parsed digit and its
position index are passed to the getRomanNumeralByDigit function, which
returns the appropriate Roman numeral. The numerals from each position
are then appended together to form the final result.

Example:

number = 1289

i = 0
current = 1289
divisor = 1000
result = 1
substring = "M"
romanNumeral = "M"

i = 1
current = 289
divisor = 100
result = 2
substring = "CC"
romanNumeral = "MCC"

i = 2
current = 89
divisor = 10
result = 8
substring = "LXXX"
romanNumeral = "MCCLXXX"

i = 3
current = 9
divisor = 1
result = 9
substring = "IX"
romanNumeral = "MCCLXXXIX"

return "MCCLXXXIX"
*/
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
