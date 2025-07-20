import request from "supertest";
import express, { Request, Response } from "express";

import router from "../../routes/romanNumeralRoutes";
import * as controller from "../../controllers/romanNumeralController";

const app = express();
app.use(router);

describe("/romannumeral", () => {
  it("routes to the romanNumeralController", async () => {
    const romanNumeralControllerMock = jest
      .spyOn(controller, "default")
      .mockImplementation((req: Request, res: Response): undefined => {
        res.json({ input: 123, output: "CXXIII" });
      });

    const res = await request(app).get("/romannumeral").query({ query: "123" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ input: 123, output: "CXXIII" });
    expect(romanNumeralControllerMock).toHaveBeenCalled();
  });
});
