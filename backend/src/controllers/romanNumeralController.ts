import { Request, Response } from "express";

import { errorCounter, successCounter } from "../observability/metrics";
import logger from "../observability/logger";

import convertToRomanNumeral from "../utils/romanNumeralConverter";

const handleError = (msg: string, type: string) => {
  logger.error(`romannumeral | ${msg}`);
  errorCounter.inc({ location: "romannumeral", type });
};

const romanNumeral = (req: Request, res: Response) => {
  const { query } = req.query;
  if (typeof query !== "string") {
    const error = `Invalid query type: ${typeof query}`;
    handleError(error, "invalid_query_type");
    return res.status(400).json({ error });
  }
  if (!/^\d+$/.test(query)) {
    const error = `Invalid query string: ${query}`;
    handleError(error, "invalid_query_string");
    return res.status(400).json({ error });
  }
  const number = parseInt(query);
  if (number === 0 || number >= 4000) {
    const error = `Number out of range (1-3999): ${number}`;
    handleError(error, "number_out_of_range");
    return res.status(400).json({ error });
  }
  logger.debug(`Number: ${number}`);
  const result = convertToRomanNumeral(number);
  successCounter.inc();
  logger.debug(`Result: ${result}`);
  res.json({ input: number, output: result });
};

export default romanNumeral;
