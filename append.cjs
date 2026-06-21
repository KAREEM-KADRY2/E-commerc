const fs = require('fs');
let raw = fs.readFileSync('public/locales/ar/translation.json', 'utf8');
const append = `,
  "2 Days Left": "يومان متبقيان",
  "4 Days Left": "4 أيام متبقية",
  "Expired": "منتهي",
  "Ended on": "انتهى في",
  "Ends on": "ينتهي في",
  "All Groups": "كل المجموعات",
  "Active": "نشط",
  "Pending": "قيد الانتظار"
}`;
const idx = raw.lastIndexOf('}');
if (idx !== -1) {
  fs.writeFileSync('public/locales/ar/translation.json', raw.substring(0, idx) + append + raw.substring(idx + 1));
}
