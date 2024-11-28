import {
    boolean,
    json,
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull(),
    isMember: boolean().default(false)
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