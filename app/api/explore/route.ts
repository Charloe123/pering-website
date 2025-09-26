import { NextResponse } from "next/server";
import connect from "@/db";
import explore from "@/models/explore";


export const GET = async () => {
    try {
        await connect();
        const explores = await explore.find({});
        return new NextResponse(JSON.stringify(explores), { status: 200 });
    } catch (error) {
        return new NextResponse( "Error fetching explores" + error, { status: 500 }
        );
    }
    }
