import { integer, numeric, pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "@features/auth/schemas/auth.sql"
import { relations } from "drizzle-orm";

export const game = pgTable('game', {
    id: serial("id").primaryKey(),
    name: text("name").notNull()
});

export const userScore = pgTable('user_score', {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull().references(() => user.id,  { onDelete: "cascade" }),
    name: text("user_name").notNull(),
    gameId: integer("game_id").notNull().references(() => game.id),
    score: integer("score").notNull(),
    accuracy: numeric("accuracy").notNull(), // 0.095 -> 9.5%
    playedAt: timestamp("played_at").defaultNow().notNull()
});

export const userScoreRelations = relations(userScore, ({ one }) => ({
    user: one(user, {
        fields: [userScore.userId],
        references: [user.id],
    }),
    game: one(game, {
        fields: [userScore.gameId],
        references: [game.id],
    }),
}));