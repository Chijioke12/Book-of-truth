import fs from "fs";
import path from "path";
const DATA_PATH = path.join(process.cwd(), "data", "messages.json");
export default function handler(req, res) { try { const manifest = JSON.parse(fs.readFileSync(DATA_PATH, "utf8")); const total = manifest.length; const dates = manifest.map((m) => m.date).filter(Boolean).sort(); const earliest = dates[0] || null; const latest = dates[dates.length - 1] || null; res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=7200"); res.status(200).json({ total, earliest, latest }); } catch (err) { console.error("API /api/stats error:", err); res.status(500).json({ error: "Failed to read stats" }); } }
