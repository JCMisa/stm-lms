import {
    boolean,
    integer,
    json,
    pgTable,
    serial,
    text,
    varchar,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull(),
    isMember: boolean().default(false),
    customerId: varchar("customerId"),
});

export const Courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    courseId: varchar("courseId").unique(),
    courseType: varchar("courseType"),
    topic: varchar("topic"),
    difficultyLevel: varchar("difficultyLevel").default('easy'),
    courseLayout: json("courseLayout"),
    createdBy: varchar("createdBy"),
    createdAt: varchar("createdAt"),
})

export const ChapterNotes = pgTable("chapterNotes", {
    id: serial("id").primaryKey(),
    courseId: varchar("courseId").notNull(),
    chapterId: integer("chapterId"),
    notes: text("notes"),
})

export const PaymentRecord = pgTable("paymentRecord", {
    id: serial("id").primaryKey(),
    customerId: varchar("customerId"),
    sessionId: varchar("sessionId"),
    createdAt: varchar("createdAt"),
})