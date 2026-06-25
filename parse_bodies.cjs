const fs = require('fs');

try {
  const data = fs.readFileSync('postman.json.json', 'utf8');
  const collection = JSON.parse(data);

  let output = '';

  function parseItems(items) {
    items.forEach(item => {
      if (item.item) {
        parseItems(item.item);
      } else if (item.request) {
        const method = item.request.method;
        const urlObj = item.request.url;
        let path = '';
        if (urlObj && typeof urlObj === 'object') {
           path = urlObj.raw || (urlObj.path ? urlObj.path.join('/') : 'unknown');
        } else if (typeof urlObj === 'string') {
           path = urlObj;
        }
        
        let body = '';
        if (item.request.body && item.request.body.raw) {
          body = item.request.body.raw;
        } else if (item.request.body && item.request.body.formdata) {
          body = JSON.stringify(item.request.body.formdata.map(f => `${f.key}: ${f.value}`));
        }

        output += `[${method}] ${path}\nBody:\n${body}\n\n`;
      }
    });
  }

  if (collection.item) {
    parseItems(collection.item);
  }

  fs.writeFileSync('endpoints_bodies.txt', output);
  console.log('Successfully generated endpoints_bodies.txt');
} catch (error) {
  console.error('Error parsing Postman collection:', error);
}
