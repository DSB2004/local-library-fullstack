import prisma from "../lib/prisma";
import { verifyToken, createToken } from "../util/jwt.util";
import { hashPassword, comparePassword } from "../util/hash.util";
import { UserTokenDetails } from "../types";
export class User {
  static async getUser(token: string) {
    const user = await verifyToken(token);
    if (!user)
      throw new Error(
        JSON.stringify({ message: "Token Expired or Invalid", status: 401 })
      );
    return user as UserTokenDetails;
  }

  static async getUserDetails(token: string) {
    try {
      const user = await this.getUser(token);
      return prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
          borrows: true,
        },
      });
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({ message: "Unable to get user details", status: 500 })
      );
    }
  }

  static async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error(
          JSON.stringify({ message: "User not found", status: 400 })
        );
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error(
          JSON.stringify({ message: "Invalid credentials", status: 400 })
        );
      }

      const token = await createToken(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        "7d"
      );

      return {
        token: "Bearer " + token,
        user: { id: user.id, email: user.email, name: user.name },
      };
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({ message: "Unable to login", status: 500 })
      );
    }
  }

  static async createUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new Error(
          JSON.stringify({ message: "User already exists", status: 400 })
        );
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      const token = await createToken(
        {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        "7d"
      );

      return {
        token: "Bearer " + token,
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
      };
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("{")) throw error;
      throw new Error(
        JSON.stringify({ message: "Unable to create user", status: 500 })
      );
    }
  }
}
