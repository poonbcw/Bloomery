import { dbClient, dbConn } from "@db/client.js";
import { flowers, cardTemplates, sharedCards } from "@db/schema.js";
import { eq } from "drizzle-orm";

async function setupInitialData() {
  console.log("--- 1. Setting up Templates & Flowers ---");
  
  // สร้าง Template เริ่มต้น 2 แบบ
  await dbClient.insert(cardTemplates).values([
    { name: "Minimal White", backgroundImageUrl: "/templates/white.jpg" },
    { name: "Vintage Kraft", backgroundImageUrl: "/templates/kraft.jpg" },
  ]).onConflictDoNothing(); // ป้องกันการ insert ซ้ำถ้ามีข้อมูลอยู่แล้ว

  // สร้างดอกไม้ตัวอย่าง (7 ชนิด/สี)
  await dbClient.insert(flowers).values([
    { flowerType: "Rose", colorVariant: "Red", imageUrl: "/flowers/rose-red.png" },
    { flowerType: "Rose", colorVariant: "Pink", imageUrl: "/flowers/rose-pink.png" },
    { flowerType: "Tulip", colorVariant: "Yellow", imageUrl: "/flowers/tulip-yellow.png" },
    { flowerType: "Sunflower", colorVariant: "Standard", imageUrl: "/flowers/sunflower.png" },
    { flowerType: "Lavender", colorVariant: "Purple", imageUrl: "/flowers/lavender.png" },
    { flowerType: "Daisy", colorVariant: "White", imageUrl: "/flowers/daisy.png" },
    { flowerType: "Lily", colorVariant: "White", imageUrl: "/flowers/lily.png" },
  ]).onConflictDoNothing();

  console.log("Initial data ready!");
}

async function createNewCard() {
  console.log("--- 2. User Creating a New Card ---");

  // จำลองว่าผู้ใช้เลือก Template ID 1 และเลือกดอกไม้ ID 1, 2, 3, 1, 2, 4 (รวม 6 ดอก)
  const [newCard] = await dbClient.insert(sharedCards).values({
    templateId: 1,
    selectedFlowerIds: [1, 2, 3, 1, 2, 4], // เก็บเป็น JSON Array ตามที่ตั้งไว้
    message: "ขอให้เป็นวันที่สดใสนะ!",
  }).returning({ insertedId: sharedCards.id });

  console.log(`Card Created! Share this ID: ${newCard.insertedId}`);
  return newCard.insertedId;
}

async function viewCard(cardId: string) {
  console.log(`--- 3. Receiver Opening Link: ${cardId} ---`);

  // ดึงข้อมูลการ์ดพร้อมข้อมูล Template
  const result = await dbClient.query.sharedCards.findFirst({
    where: eq(sharedCards.id, cardId),
    with: {
      template: true, // ตัวเลือกนี้จะใช้งานได้ถ้าคุณตั้งค่า Relations ใน Schema (แนะนำให้ใช้)
    }
  });

  if (!result) {
    console.log("Card not found!");
    return;
  }

  console.log("Card Content:");
  console.log("- Message:", result.message);
  console.log("- Selected Flower IDs:", result.selectedFlowerIds);
  
  // ในหน้าเว็บจริง คุณจะเอา IDs เหล่านี้ไปดึงรูปภาพจากตาราง flowers ต่อ
}

async function runTest() {
  try {
    await setupInitialData();
    const cardId = await createNewCard();
    await viewCard(cardId);
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await dbConn.end(); // วางสายฐานข้อมูลเมื่อเสร็จสิ้น
  }
}

runTest();