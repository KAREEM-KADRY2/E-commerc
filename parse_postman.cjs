const fs = require('fs');

try {
  const data = fs.readFileSync('postman.json.json', 'utf8');
  const collection = JSON.parse(data);

  let output = '# API Endpoints Summary\n\n';

  function parseItems(items, folderPath = '') {
    items.forEach(item => {
      if (item.item) {
        // It's a folder
        parseItems(item.item, folderPath ? `${folderPath} / ${item.name}` : item.name);
      } else if (item.request) {
        // It's an endpoint
        const method = item.request.method;
        const urlObj = item.request.url;
        let path = '';
        if (urlObj && typeof urlObj === 'object') {
           path = urlObj.raw || (urlObj.path ? urlObj.path.join('/') : 'unknown');
        } else if (typeof urlObj === 'string') {
           path = urlObj;
        }
        output += `**[${folderPath}] ${item.name}**\n- Method: ${method}\n- URL: ${path}\n\n`;
      }
    });
  }

  if (collection.item) {
    parseItems(collection.item);
  }

  fs.writeFileSync('endpoints_summary.txt', output);
  console.log('Successfully generated endpoints_summary.txt');
} catch (error) {
  console.error('Error parsing Postman collection:', error);
}
