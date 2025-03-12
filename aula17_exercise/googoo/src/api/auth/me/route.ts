import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();
const SECRET_KEY = "super-secret-key"

export async function GET(req: Request) {
    try{
        const token = req.headers.get("cookie")?.split("token=")[1];

        if(!token){
            return NextResponse.json({ message: "token não encontrado!", status: 400 });
        }

        const decodedToken:any = jwt.verify(token, SECRET_KEY);
        const user = await prisma.user.findUnique({
            where: { id: decodedToken.id },
            select : {
                id: true,
                email: true
            }
        });

        if(!user){
            return NextResponse.json({ message: "utilizador não encontrado!", status: 400 });
        }

        return NextResponse.json({ user, status: 200 });
    }catch(err){
        return NextResponse.json({ message: "erro ao obter utilizador!", error: err, status: 500 });
    }
}