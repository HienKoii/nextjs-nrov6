import db from "@/config/db";

export async function getItemTemplate(id) {
  const [row] = await db.query("SELECT * FROM itemtemplate WHERE id = ?", [id]);
  return row?.[0] || null;
}
