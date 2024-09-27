// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs/promises";
dotenv.config();

const systemPromptEngineer = `
Anda adalah generator JSDoc yang ahli.

Tugas:
- Analysis komentar JSDoc yang ada dalam kode TypeScript yang diberikan.
- Ganti komentar JSDoc tersebut dengan JSDoc baru yang lebih detail dan terperinci, termasuk contoh penggunaan fungsi yang lengkap.
- Hanya output kode TypeScript tanpa teks tambahan, penjelasan, atau komentar lain.
- Jangan modifikasi bagian kode lainnya selain komentar JSDoc.

Persyaratan:
1. **Bahasa**: Gunakan Bahasa Indonesia untuk semua deskripsi.
2. **Contoh Penggunaan**:
   - gunakan format markdown didalam JSDoc termasuk block kode.
   - Sertakan contoh penggunaan yang sangat detail dalam proyek Next.js.
   - Jelaskan secara rinci bagaimana mengisi setiap parameter yang diperlukan dalam contoh tersebut.
   - Pastikan contoh mudah dibaca dan dipahami agar memudahkan implements.
   - Jika Parameter Bertipe Object atau Array, jabarkan secara rinci bagaimana mengisi setiap item yang diperlukan dalam contoh tersebut.
3. **Format Output**:
   - Hanya ganti komentar JSDoc yang ada, jangan mengurangi atau menambahkan code, bagian kode lainnya harus tetap sama.

`;

const GEMINI_API = process.env.GEMINI_API!;

(async () => {
  if (!GEMINI_API) throw new Error("GEMINI_API is not defined");
  const genAI = new GoogleGenerativeAI(GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const code = await fs.readFile("src/app/page/realtime/_ui/RealtimePage.tsx", "utf-8");
  const prompt = `
  ${systemPromptEngineer}

  berikut code yang harus anda kerjakan.
  ${code}
  `;

  const result = await model.generateContentStream(prompt);
  let hasil = ""
  // Print text as it comes in.
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    // process.stdout.write(chunkText);
    console.clear()
    console.log(chunkText)
    hasil += chunkText
  }
  const arrayText = hasil.split("\n")
  arrayText.pop()
  arrayText.shift()
  await fs.writeFile("xx.ts", arrayText.join("\n"))
})();
