export async function GET() {
    const res = await fetch("https://api.pexels.com/videos/search?query=surveillance&per_page=9", {
        headers: {
            Authorization: process.env.API_KEY
        }
    });
    const data = await res.json();
    return Response.json(data);
}
