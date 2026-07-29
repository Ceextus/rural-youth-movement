const fs = require('fs');
const content = fs.readFileSync('public/ng.svg', 'utf8');
const regex = /<path d="([^"]+)" id="([^"]+)" name="([^"]+)">/gs;
let match;
const states = [];
while ((match = regex.exec(content)) !== null) {
  states.push({ id: match[2].toLowerCase(), name: match[3], d: match[1] });
}
fs.writeFileSync('states.json', JSON.stringify(states, null, 2));
console.log(`Extracted ${states.length} states.`);
