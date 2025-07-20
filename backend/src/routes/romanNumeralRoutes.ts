import { Router } from "express";

import romanNumeral from "../controllers/romanNumeralController";

const router = Router();

router.get("/romannumeral", romanNumeral);

export default router;
