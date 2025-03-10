export async function GET() {
   try {
      const res = await fetch("https://schaledb.com/data/en/voice.min.json");
      if (!res.ok) throw new Error("Failed to fetch voice data");
      const data = await res.json();
      return Response.json(data);
   } catch (error) {
      return Response.json({ error }, { status: 500 });
   }
}
