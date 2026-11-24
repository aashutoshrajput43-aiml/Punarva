const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
const b64 = fs.readFileSync(dbPath).toString('base64');
const outPath = path.join(__dirname, '..', 'src', 'lib', 'db-base64.ts');

fs.writeFileSync(outPath, `// Auto-generated SQLite seed backup for Vercel Serverless
export const DB_BASE64 = "${b64}";
`);
console.log('Successfully generated db-base64.ts with size:', b64.length);
