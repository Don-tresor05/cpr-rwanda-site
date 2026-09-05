const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Thierry\\.gemini\\antigravity-ide\\brain\\5393d4eb-6bf6-4f11-88f3-c5f0b7db365e\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = content.split('\n');
for (const line of lines) {
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT' && obj.content && obj.content.includes('const b64 = ')) {
      const start = obj.content.indexOf('const b64 = "');
      console.log('Found start at ' + start);
      if (start !== -1) {
        const strStart = start + 13;
        const end = obj.content.indexOf('"', strStart);
        console.log('Found end at ' + end);
        if (end > strStart) {
          const b64str = obj.content.substring(strStart, end);
          console.log('Extracted length: ' + b64str.length);
          const buffer = Buffer.from(b64str, 'base64');
          fs.writeFileSync('cpr-schema-fix.patch', buffer);
          console.log('Successfully wrote cpr-schema-fix.patch. Size: ' + buffer.length + ' bytes.');
          process.exit(0);
        }
      }
    }
  } catch (e) {}
}
console.log('Failed to find it.');
