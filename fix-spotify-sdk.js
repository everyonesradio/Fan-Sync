const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', '@spotify', 'web-api-ts-sdk', 'dist', 'mjs', 'endpoints', 'SearchEndpoints.d.ts');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const result = data.replace(/<const T extends readonly ItemTypes\[\]>/g, '<T extends readonly ItemTypes[]>');

  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Fixed SearchEndpoints.d.ts');
    }
  });
});