"use server";
import prisma from "./prisma";
// Retrieve a PDF file by name
export async function getPDF(name: string): Promise<string> {
  const res = await prisma.pdffile.findFirst({
    where: {
      name: name,
    },
  });
  if (res) {
    return res.pdfData.toString("base64");
  }
  return "error"
}
