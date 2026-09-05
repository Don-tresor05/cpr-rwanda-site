const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\Thierry\\.gemini\\antigravity-ide\\brain\\5393d4eb-6bf6-4f11-88f3-c5f0b7db365e\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = content.split('\n');
for (const line of lines) {
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT' && obj.content && obj.content.includes('const b64 = ')) {
      console.log('Ends with: ' + obj.content.substring(obj.content.length - 200));
    }
  } catch (e) {}
}
