import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const filePath = path.join(process.cwd(), "src", "content", "resume.pdf");
  const data = await readFile(filePath);

  return new Response(data, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Quintin-Vizza-Resume.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
