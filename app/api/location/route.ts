import axios from "axios";

export async function GET() {
    try {
        const { data } = await axios(`http://ipwho.is/`)
        return Response.json(data)

    } catch (err) {
        console.error(err)
        return Response.json({status: 500})
    }
}