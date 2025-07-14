import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving profiles: ${error.message}` });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      }
    });
    res.json({ message: "User Created Successfully", newUser});
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving profiles: ${error.message}` });
  }
};
