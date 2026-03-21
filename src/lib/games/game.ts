import { db } from "@/db";
import { game, userScore } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { createServerFn } from "@tanstack/react-start";

export const fetchLeaderboard = createServerFn({ method: "GET" })   
    .inputValidator((data: number) => data) 
    .handler(async ({ data }) => {
        const targetGameId = data;

        const query = await db.select({ 
            name: userScore.name,
            score: userScore.score,
            accuracy: userScore.accuracy,
            playedAt: userScore.playedAt,
            userId: userScore.userId,
            gameName: game.name,
        })
        .from(userScore)
        .innerJoin(game, eq(userScore.gameId, game.id))
        .where(eq(userScore.gameId, targetGameId))
        .orderBy(desc(userScore.score))
        .limit(10);

        return query;
    })


// export const submitScoreFn = createServerFn({ method: "POST" })
//     .handler(async ({ context }) => {
//         const userId = context.session.user.id; // Get user ID securely from session
//         const { gameId, score, accuracy } = input;

//         await db.insert(gameSessions).values({
//             userId,
//             gameId,
//             score,
//             accuracy,
//         });

//         return { success: true };
//     });