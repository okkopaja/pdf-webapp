import { File } from "formidable";
import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: NextResponse) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const name = formData.get("name") as string | null;
  const arrayBuffer = await file.arrayBuffer();
  const binary = Buffer.from(arrayBuffer);
  console.log(file);
  await prisma.pdffile
    .create({
      data: {
        name: name,
        pdfData: binary,
      },
    })
    .then((res) => {
      console.log("done");
    })
    .catch((err) => {
      console.log(err);
    });
  return NextResponse.json({ success: "done" }, { status: 200 });
}
