import pool from "../../lib/db.js";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Query user by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return Response.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const user = result.rows[0];

    // ⚠️ For production, use bcrypt for password hashing!
    if (user.password !== password) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Temporary fake token (replace with JWT later)
    const token = `fake-token-${user.id}`;

    return Response.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
