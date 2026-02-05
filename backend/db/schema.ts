import { pgTable, serial, text, varchar, uuid, timestamp, jsonb } from "drizzle-orm/pg-core";

// 1. ตารางเก็บรูปแบบการ์ด (Templates)
// มี 2 แบบที่คุณกำหนดไว้ ปรับแต่งไม่ได้
export const cardTemplates = pgTable("card_templates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(), // เช่น 'Classic', 'Modern'
  backgroundImageUrl: text("background_image_url").notNull(),
});

// 2. ตารางเก็บข้อมูลดอกไม้ (Flowers)
// รองรับ 7 ชนิด และรูปแบบ/สีที่ต่างกัน (Variants)
export const flowers = pgTable("flowers", {
  id: serial("id").primaryKey(),
  flowerType: varchar("flower_type", { length: 50 }).notNull(), // เช่น 'Rose', 'Tulip'
  colorVariant: varchar("color_variant", { length: 50 }).notNull(), // เช่น 'Red', 'Pink'
  imageUrl: text("image_url").notNull(), // ไฟล์ PNG สำหรับเอาไปวางในการ์ด
});

// 3. ตารางเก็บการ์ดที่ผู้ใช้สร้างเสร็จแล้ว (Shared Cards)
// นี่คือตารางที่จะถูกเรียกใช้เมื่อผู้รับกด Link
export const sharedCards = pgTable("shared_cards", {
  id: uuid("id").defaultRandom().primaryKey(), // ใช้ UUID เพื่อให้ Link เดายาก
  templateId: serial("template_id").references(() => cardTemplates.id),
  
  // เก็บ ID ของดอกไม้ 6 ดอกที่เลือก (ใช้ jsonb เพื่อความยืดหยุ่นใน Postgres)
  // รูปแบบข้อมูลจะเป็น [1, 1, 4, 7, 2, 5]
  selectedFlowerIds: jsonb("selected_flower_ids").notNull(), 
  
  message: text("message"), // ข้อความอวยพร (Optional)
  createdAt: timestamp("created_at").defaultNow().notNull(),
});