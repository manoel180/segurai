const fs = require('fs');
const path = require('path');

const docsDir = path.join(process.cwd(), 'documents');
const outDir = path.join(process.cwd(), 'src/data');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.txt'));
const docs = files.map(file => ({
  name: file,
  content: fs.readFileSync(path.join(docsDir, file), 'utf-8'),
}));

fs.writeFileSync(path.join(outDir, 'documents.json'), JSON.stringify(docs, null, 2));
console.log(`✅ ${docs.length} documentos embutidos no build`);