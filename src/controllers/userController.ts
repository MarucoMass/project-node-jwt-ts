import { Request, Response } from "express";
import { hashPassword } from "../services/passwordService";
import prisma from "../models/user";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ message: "Please enter an email" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "Please enter a password" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({ message: "That email already exists!" });
    }
    console.log(error);
    res.status(500).json({ error: "There is an error, please try later" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.findMany();
    res.status(200).json(users.map(({ password, ...user }) => user));
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "There is an error, please try later" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const { password, ...userData} = user;
    res.status(200).json(userData);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "There is an error, please try later" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id);
  const { email, password } = req.body;
  try {
    let dataToUpdate: any = { ...req.body };

    if (password) {
      const hashedPassword = await hashPassword(password);
      dataToUpdate.password = hashedPassword;
    }

    if (email) {
      dataToUpdate.email = email;
    }

    const user = await prisma.update({
      where: {
        id: userId,
      },
      data: dataToUpdate,
    });

    res.status(200).json(user);
  } catch (error: any) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({ error: "That email already exist!" });
    } else if (error?.code == "P2025") {
      res.status(404).json("User not found");
    } else {
      console.log(error);
      res.status(500).json({ error: "There is an error, please try later" });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.delete({
      where: {
        id: userId,
      },
    });

    res
      .status(200)
      .json({
        message: `The user ${userId} has been deleted`,
      })
      .end();
  } catch (error: any) {
    if (error?.code == "P2025") {
      res.status(404).json("User not found");
    } else {
      console.log(error);
      res.status(500).json({ error: "There is an error, please try later" });
    }
  }
};
