import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const SECRET_KEY = "super-secret-key"

export default async function POST(req: Request) {
    try{
        const { email, password } = await req.json();
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        
        if(!existingUser){
            return NextResponse.json({ message: "utilizador não existe!", status: 400 });
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if(!isValidPassword){
            return NextResponse.json({ message: "password inválida!", status: 400 });
        }

        const token = jwt.sign({ id: existingUser.id }, SECRET_KEY, { expiresIn: "1h" });

        const response = NextResponse.json({ message: "login efetuado!", token, status: 200 });
        response.headers.set("Set-Cookie", "token=" + token + "; Path=/; HttpOnly; Max-Age=3600");

        return response;
    }catch(err){
        return NextResponse.json({ message: "erro ao efetuar login!", error: err, status: 500 });
    }
}