import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getPets, addPet, updatePet, deletePet } from "../controllers/petController.js";

const router = express.Router();
router.use(protect);
router.get("/", getPets);
router.post("/", addPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

export default router;
