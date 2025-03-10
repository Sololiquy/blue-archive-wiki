export async function GET() {
   try {
      const res = await fetch("https://schaledb.com/data/en/raids.min.json");
      if (!res.ok) throw new Error("Failed to fetch enemy data");
      const data = await res.json();
      return Response.json(data);
   } catch (error) {
      return Response.json({ error }, { status: 500 });
   }
}
