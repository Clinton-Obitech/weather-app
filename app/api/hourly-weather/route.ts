import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const { lat, long } = await req.json();
        const { data } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&past_days=0&forecast_days=7`)

        return Response.json(data.hourly)
    } catch (err) {
        return Response.json({
            error: "failed to fetch weather",
            status: 500
        })
    }
}