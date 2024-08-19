import { initializeDB } from '../db/sqlite.js';

initializeDB().then(() => {
    console.log('Database initialized');
    process.exit(0);
}).catch(err => {
    console.error('Database initialization failed:', err);
    process.exit(1);
});
