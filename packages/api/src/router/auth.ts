import { t } from "../trpc";
import { z } from "zod";
import { sendInviteMail } from "../lib/nodemailer";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

import { TRPCError } from "@trpc/server";
import { authProcedure } from "../procedures/auth-procedure";

const createAccessToken = (userId: string) => jwt.sign(userId, "supersecret");

export const authRouter = t.router({
  signUp: t.procedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input: { email } }) => {
      try {
        const expires = new Date();
        const code = v4().slice(0, 4);
        expires.setHours(expires.getHours() + 1);

        const user = await ctx.prisma.user.create({
          data: {
            email: email,
            emailVerification: {
              create: {
                expires,
                code,
              },
            },
            onboarding: {
              create: {},
            },
          },
        });

        const jwt = createAccessToken(user.id);
        sendInviteMail({ receiver: email, verificationCode: code });

        return { accessToken: jwt };
      } catch (error: any) {
        if (error.message.includes("Unique")) {
          throw new TRPCError({ code: "CONFLICT", message: "already_exists" });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  signIn: authProcedure.mutation(async ({ ctx }) => {}),
  verifyCode: authProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const emailVerification = await ctx.prisma.emailVerification.findUnique(
          {
            where: { user_id: ctx.user.id },
          }
        );

        if (!emailVerification) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        if (new Date() > emailVerification.expires) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "expired" });
        }

        if (emailVerification.code !== input.code) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "invalid" });
        }

        await ctx.prisma.user.update({
          where: { id: ctx.user.id },
          data: {
            email_verified: true,
          },
        });

        await ctx.prisma.emailVerification.delete({
          where: { user_id: ctx.user.id },
        });

        return {
          email_verified: true,
        };
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  signOut: t.procedure.mutation(() => {}),
  me: t.procedure.query(async ({ ctx }) => {
    if (!ctx?.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.user.id },
      include: {
        onboarding: {
          select: {
            household_complete: true,
            userinfo_complete: true,
          },
        },
      },
    });

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (!user.onboarding)
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return { user };
  }),
});
