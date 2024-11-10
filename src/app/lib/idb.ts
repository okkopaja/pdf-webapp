"use server";
import prisma from "./prisma";

export async function addPDF(name: string, file: Uint8Array) {
  const filebuffer = Buffer.from(file);
  const res = await prisma.pdffile.create({
    data: {
      name: name,
      pdfData: filebuffer,
    },
  });
}

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
