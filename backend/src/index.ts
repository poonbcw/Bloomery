import "dotenv/config";
import { dbClient } from "@db/client.js";
import { flowers, sharedCards, cardTemplates } from "@db/schema.js";
import cors from "cors";
import Debug from "debug";
import { eq } from "drizzle-orm";
import type { ErrorRequestHandler } from "express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const debug = Debug("bloomery-backend");
const app = express();

// --- Middleware ---
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: true })); // อนุญาตให้หน้าบ้านเชื่อมต่อได้
app.use(express.json());

// --- 1. Get All Flowers (ดึงดอกไม้ทั้งหมดไปโชว์ให้ผู้ใช้เลือก) ---
app.get("/api/flowers", async (req, res, next) => {
  try {
    const allFlowers = await dbClient.select().from(flowers);
    res.json(allFlowers);
  } catch (err) {
    next(err);
  }
});

// --- 2. Create Shared Card (บันทึกการ์ดเมื่อผู้ใช้กดสร้าง) ---
app.post("/api/cards", async (req, res, next) => {
  try {
    const { templateId, selectedFlowerIds, message } = req.body;

    // Validation: ต้องเลือกดอกไม้ครบ 6 ดอก
    if (!Array.isArray(selectedFlowerIds) || selectedFlowerIds.length !== 6) {
      throw new Error("Please select exactly 6 flowers.");
    }

    const [newCard] = await dbClient
      .insert(sharedCards)
      .values({
        templateId,
        selectedFlowerIds,
        message,
      })
      .returning();

    res.json({ msg: "Card created successfully", cardId: newCard.id });
  } catch (err) {
    next(err);
  }
});

// --- 3. Get Card by ID (ดึงข้อมูลการ์ดไปโชว์ให้ผู้รับดู) ---
app.get("/api/cards/:id", async (req, res, next) => {
  try {
    const cardId = req.params.id;
    const card = await dbClient.query.sharedCards.findFirst({
      where: eq(sharedCards.id, cardId),
    });

    if (!card) return res.status(404).json({ msg: "Card not found" });

    res.json(card);
  } catch (err) {
    next(err);
  }
});

// --- Error Handling ---
const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  debug(err.message);
  res.status(500).json({
    message: err.message || "Internal Server Error",
    type: err.name || "Error",
  });
};
app.use(jsonErrorHandler);

// --- Server Running ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌸 Bloomery Backend is running on: http://localhost:${PORT}`);
});
