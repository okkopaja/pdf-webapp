// import prisma from "../../lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(request: Request, response: NextResponse) {
//   const formData = await request.formData();
//   const name = formData.get("name") as string | null;
//   if (!name) {
//     return NextResponse.json(
//       { success: false, message: "Name is required." },
//       { status: 400 }
//     );
//   }
//   const res = await prisma.pdffile.findFirst({
//     where: {
//       name: name,
//     },
//   });
//   console.log(res);
//   return NextResponse.json(res, { status: 200 });
// }
// export async function GET(request: Request, response: NextResponse) {
//   return NextResponse.json("ok");
// }
