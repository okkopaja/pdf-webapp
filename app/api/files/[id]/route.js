import { NextResponse } from 'next/server';
import { openDB } from '../../../../db/sqlite';

export async function GET(req, { params }) {
    const db = await openDB();
    const { id } = params;
    
    const file = await db.get('SELECT * FROM files WHERE id = ?', [id]);
    
    if (!file) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return new NextResponse(file.file_data, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${file.file_name}"`
        }
    });
}
