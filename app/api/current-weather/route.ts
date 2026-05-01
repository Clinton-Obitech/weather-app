import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { lat, long } = await req.json();
        const current = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`)
    
        return Response.json(current.data.current_weather)
    } catch (err) {
        return Response.json({
            error: "failed to fetch weather",
            status: 500
        })
    }
}