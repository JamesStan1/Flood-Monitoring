import pool from "../../lib/db"; // adjust path to your database connection

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM alerts ORDER BY created_at DESC");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch alerts" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { location, level, message } = await req.json();

    if (!location || !level || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const result = await pool.query(
      "INSERT INTO alerts (location, level, message) VALUES ($1, $2, $3) RETURNING *",
      [location, level, message]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error adding alert:", error);
    return new Response(JSON.stringify({ error: "Failed to add alert" }), { status: 500 });
  }
}
