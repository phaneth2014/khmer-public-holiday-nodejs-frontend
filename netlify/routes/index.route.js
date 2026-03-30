import express from "express";
import userRoutes from "./users.route.js";
import dataRoutes from "./data.route.js";

const router = express.Router();

router.use("/", userRoutes);
router.use("/data", dataRoutes);

export default router;