import { NextResponse } from 'next/server';
import { openDB } from '../../../../../db/sqlite';

export async function POST(req) {
    const db = await openDB();
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileData = await file.arrayBuffer();
    const buffer = Buffer.from(fileData);

    await db.run(
        'INSERT INTO files (file_name, file_data) VALUES (?, ?)',
        [file.name, buffer]
    );

    return NextResponse.json({ success: true });
}
