import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    return NextResponse.json({ id: 1, name: "John Doe" });
}

export async function POST(req: Request) {
    try{
        const { email, password } = await req.json();
        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ message: "utilizador criado!", data: user, status: 201 });

    }
    catch(err){
        return NextResponse.json({ message: "erro ao criar utilizador!", error: err, status: 500 });
    }
}