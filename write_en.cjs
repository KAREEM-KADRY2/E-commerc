const fs = require('fs');

const file = 'public/locales/en/translation.json';
let buf = fs.readFileSync(file);
if (buf[0] === 0xef && buf[1] === 0xbf && buf[2] === 0xbd) {
  buf = buf.slice(3);
}

let str = buf.toString('utf8');
str = str.replace(/[\x00-\x1F\x7F-\x9F]/g, function(c) {
  return (c === '\n' || c === '\r' || c === '\t') ? c : '';
});

try {
  const data = JSON.parse(str);
  const fixedEnData = {};
  for (const key of Object.keys(data)) {
    // Just map the key to itself for English!
    fixedEnData[key] = key;
  }
  
  // Add some known missing ones just in case
  const extraKeys = [
    "Home", "Deals", "Active Group Buys", "Track every group you've joined or started.",
    "My Deals Overview", "Your Group Buying Power", "The more you team up, the more you save.",
    "Create New Group", "Start a new group and unlock up to 15% off when you shop together.",
    "Join Existing Group", "Enter a group code from your friend to join their group.",
    "Enter Group Code (e.g., GB-X72A)", "Join Now", "All Groups", "Active", "Expired",
    "Pending", "Members", "Discount Unlocked", "Ends on", "Ended on", "Sort by: Recent",
    "No groups found in this category.", "2 Days Left", "4 Days Left", "Sort by",
    "Most Popular", "Price: Low to High", "Price: High to Low", "Wallet", "Search products",
    "Language", "Account", "Welcome to BuySAWA", "Contact Us", "Help Center / FAQs",
    "About BuySAWA", "Privacy Policy", "Terms & Conditions", "My Profile", "My Orders",
    "My Groups", "Wishlist", "Settings", "Logout", "Back", "Loading products..."
  ];

  for (const k of extraKeys) {
    fixedEnData[k] = k;
  }

  fs.writeFileSync(file, JSON.stringify(fixedEnData, null, 2), 'utf8');
  console.log('English translation file rebuilt successfully!');
} catch (e) {
  console.log('JSON Parse Error:', e.message);
}
