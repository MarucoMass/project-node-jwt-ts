import { Request, Response } from "express";
import prisma from "../models/user";
import { hashPassword, comparePasswords } from "../services/passwordService";
import { generateToken } from "../services/authService";

export const register = async (req:Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    try {

        if (!email) {
            res.status(400).json({ message: 'Please enter an email' })
            return
        }
        if (!password) {
            res.status(400).json({ message: 'Please enter a password' })
            return
        }
        const hashedPassword = await hashPassword(password);

        const user = await prisma.create({
            data:{
                email,
                password: hashedPassword
            }
        })

        const token = generateToken(user);
        res.status(201).json({token});
    } catch (error: any) {

        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ message: 'The email has been already registered' })
        }
        console.log(error);
        res.status(500).json({error: "There's an error"});
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body

    try {

        if (!email) {
            res.status(400).json({ message: 'Please enter an email' })
            return
        }
        if (!password) {
            res.status(400).json({ message: 'Please enter a password' })
            return
        }

        const user = await prisma.findUnique({ where: { email } })
        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        const passwordMatch = await comparePasswords(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: "User and password doesn't match" })
        }

        const token = generateToken(user)
        res.status(200).json({ token })


    } catch (error: any) {
        console.log('Error: ', error)
    }

}