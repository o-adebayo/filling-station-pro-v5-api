import { db } from "@/db/db";
import { TypedRequestBody, UserCreateProps, UserLoginProps } from "@/types/types";
import { generateAccessToken, generateRefreshToken, TokenPayload } from "@/utils/tokens";
import bcrypt from "bcrypt"
import { error } from "console";
import { Request, Response } from "express";

export async function createUser(req: TypedRequestBody<UserCreateProps>, res: Response) {
  const data = req.body;
  
  const { email, password, role, name, phone, image, companyId, companyName } = data;

  try {
    // Check if the user already exists
    const existingEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "User with this email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;

    const newUser = await db.user.create({
      data
    });
    console.log(
      `User created successfully: ${newUser.name} (${newUser.id})`
    );
    return res.status(201).json({
      data: newUser,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}

export async function loginUser(req: TypedRequestBody<UserLoginProps>, res: Response) {
  const data = req.body;
  
  const { email, password } = data;

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return res.status(409).json({
        data: null,
        error: "Invalid Credentials",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordValid) {
      return res.status(401).json({
        data: null,
        error: "Invalid Credentials",
      });
    }

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    }
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // store the refresh token in the database
    await db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: existingUser.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30 days
      }
    });

    // remove sensitive data
    const {password: _, ...userWithoutPassword} = existingUser;

    return res.status(200).json({
      data: {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      },
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}

