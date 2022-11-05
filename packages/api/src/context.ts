import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "@acme/db";
import jwt from "jsonwebtoken";

const decodeAndVerifyJwtToken = (accessToken: string) => {
  try {
    const decoded = jwt.verify(accessToken, "supersecret") as string;
    return { id: decoded };
  } catch (error) {
    return null;
  }
};

type CreateContextOptions = trpcNext.CreateNextContextOptions;

const getUserFromHeader = async (req: CreateContextOptions["req"]) => {
  if (!req.headers.authorization) {
    return null;
  }

  const user = decodeAndVerifyJwtToken(req.headers.authorization);
  return user;
};

export const createContextInner = async ({ req }: CreateContextOptions) => {
  const user = await getUserFromHeader(req);
  return {
    user,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  return await createContextInner(opts);
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
