import romanNumeral from "../../controllers/romanNumeralController";

import * as metrics from "../../observability/metrics";
import * as converter from "../../utils/romanNumeralConverter";

describe("romanNumeral()", () => {
  const mockJson = jest.fn();
  const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
  const res = { status: mockStatus, json: mockJson } as any;

  beforeEach(() => {
    jest.spyOn(metrics.successCounter, "inc").mockImplementation(() => {});
    jest.spyOn(metrics.errorCounter, "inc").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 for non-string query", () => {
    const req = { query: { query: { key: "value" } } } as any;
    romanNumeral(req, res);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Invalid query type: object",
    });
    expect(metrics.errorCounter.inc).toHaveBeenCalledWith({
      location: "romannumeral",
      type: "invalid_query_type",
    });
  });

  it("returns 400 for non-number string query", () => {
    const req = { query: { query: "hello" } } as any;
    romanNumeral(req, res);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Invalid query string: hello",
    });
    expect(metrics.errorCounter.inc).toHaveBeenCalledWith({
      location: "romannumeral",
      type: "invalid_query_string",
    });
  });

  it("returns 400 for numbers less than 1", () => {
    const req = { query: { query: "0" } } as any;
    romanNumeral(req, res);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Number out of range (1-3999): 0",
    });
    expect(metrics.errorCounter.inc).toHaveBeenCalledWith({
      location: "romannumeral",
      type: "number_out_of_range",
    });
  });

  it("returns 400 for numbers greater than 3999", () => {
    const req = { query: { query: "4000" } } as any;
    romanNumeral(req, res);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Number out of range (1-3999): 4000",
    });
    expect(metrics.errorCounter.inc).toHaveBeenCalledWith({
      location: "romannumeral",
      type: "number_out_of_range",
    });
  });

  it("returns 200 with correct roman numeral", () => {
    jest.spyOn(converter, "default").mockReturnValue("CXXIII");
    const req = { query: { query: "123" } } as any;
    romanNumeral(req, res);
    expect(converter.default).toHaveBeenCalledWith(123);
    expect(res.json).toHaveBeenCalledWith({
      input: 123,
      output: "CXXIII",
    });
    expect(metrics.successCounter.inc).toHaveBeenCalled();
  });
});
