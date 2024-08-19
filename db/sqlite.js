import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDB() {
    return open({
        filename: './db/database.sqlite',
        driver: sqlite3.Database
    });
}

export async function initializeDB() {
    const db = await openDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS files (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_name TEXT,
            file_data BLOB,
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
}
