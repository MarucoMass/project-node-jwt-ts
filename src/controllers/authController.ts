import { Request, Response } from "express";
import prisma from "../models/user";
import { hashPassword } from "../services/passwordService";
import { generateToken } from "../services/authService";

export const register = async (req:Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    try {
        const hashedPassword = await hashPassword(password);

        const user = prisma.create({
            data:{
                email,
                password: hashedPassword
            }
        })

        const token = generateToken(user);
        res.send(201).json({token});
    } catch (error) {
        
    }
}