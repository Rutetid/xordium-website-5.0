const fs = require('fs');
const filePath = 'C:\\Users\\aayus\\WebstormProjects\\xordium-website-5.0\\src\\frontend\\components\\BackgroundCollage.tsx';
const content = fs.readFileSync(filePath, 'utf8');

// Fix leading quote if present
let fixedContent = content;
if (content.charCodeAt(0) === 34) { // double quote
  fixedContent = content.slice(1);
  console.log('Removed leading quote');
}

fs.writeFileSync(filePath, fixedContent, 'utf8');
console.log('Fixed');