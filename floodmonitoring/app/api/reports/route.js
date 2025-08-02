import pool from "../../lib/db"; // adjust path to your database connection

// ✅ Fetch all reports
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM reports ORDER BY reported_at DESC");
    return Response.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("GET /reports error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Add a new report
export async function POST(req) {
  try {
    const { location, status, water_level, reported_by, details } = await req.json();

    // 🛑 Validate inputs
    if (!location || !status || !water_level || !reported_by) {
      return Response.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    const query = `
      INSERT INTO reports (location, status, water_level, reported_by, details)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [location, status, water_level, reported_by, details || null];
    const result = await pool.query(query, values);

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /reports error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
