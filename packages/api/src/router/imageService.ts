import { t } from "../trpc";
import { z } from "zod";
import { authProcedure } from "../procedures/auth-procedure";
import { getPresignedUrl } from "../lib/aws";

export const imageServiceRouter = t.router({
  presignedUrl: authProcedure
    .input(z.object({ key: z.string().optional(), method: z.enum(["GET", "PUT"]) }))
    .mutation(async ({ input: { key, method } }) => {
      const presignedUrl = await getPresignedUrl({ method, key });
      return presignedUrl;
    }),
});
