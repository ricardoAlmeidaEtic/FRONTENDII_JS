import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try{
        const { email, password } = await req.json();
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if(existingUser){
            return NextResponse.json({ message: "utilizador já existe!", status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ message: "utilizador criado!", data: user, status: 201 });
    } catch(err){
        return NextResponse.json({ message: "erro ao criar utilizador!", error: err, status: 500 });
    }
}