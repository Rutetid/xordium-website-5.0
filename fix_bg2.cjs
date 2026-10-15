const fs = require('fs');
const filePath = 'C:\\Users\\aayus\\WebstormProjects\\xordium-website-5.0\\src\\frontend\\components\\BackgroundCollage.tsx';
const content = fs.readFileSync(filePath, 'utf8');

// Fix the leading "use client"; issue
let fixedContent = content;
if (content.startsWith('use client";')) {
    fixedContent = content.replace(/^use client";/, 'use client;');
    console.log('Fixed leading quote issue');
}

fs.writeFileSync(filePath, fixedContent, 'utf8');
console.log('Fixed');