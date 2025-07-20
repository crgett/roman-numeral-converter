import request from "supertest";
import express, { Request, Response } from "express";

import romanNumeralController from "../../controllers/romanNumeralController";
import router from "../../routes/romanNumeralRoutes";

jest.mock("../../controllers/romanNumeralController");

const app = express();
app.use(router);

describe("/romannumeral", () => {
  const mockRomanNumeralController =
    romanNumeralController as jest.MockedFunction<
      typeof romanNumeralController
    >;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("routes to the romanNumeralController", async () => {
    mockRomanNumeralController.mockImplementation(
      (req: Request, res: Response): any => {
        res.status(200).json({ input: 123, output: "CXXIII" });
      }
    );

    const res = await request(app).get("/romannumeral").query({ query: "123" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ input: 123, output: "CXXIII" });
    expect(mockRomanNumeralController).toHaveBeenCalled();
  });
});
