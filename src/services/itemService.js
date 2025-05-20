import db from "@/config/db";

export async function getItemTemplate(id) {
  let sql;
  if (process.env.NEXT_PUBLIC_API_PREFIX == "rose") {
    sql = "SELECT * FROM itemtemplate WHERE id = ?";
  } else {
    sql = "SELECT * FROM item_template WHERE id = ?";
  }
  const [row] = await db.query(sql, [id]);
  return row?.[0] || null;
}
