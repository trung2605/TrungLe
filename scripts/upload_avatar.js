const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const avatarPath = path.join(__dirname, '../src/assets/information/avatar.png');
const dataFile = path.join(__dirname, '../src/data.js');

async function fixAvatar() {
  if (fs.existsSync(avatarPath)) {
    console.log('Uploading avatar.png...');
    const result = await cloudinary.uploader.upload(avatarPath, {
      folder: 'my-website/assets/information',
      use_filename: true,
      unique_filename: false
    });
    console.log('Uploaded:', result.secure_url);
    
    let content = fs.readFileSync(dataFile, 'utf8');
    // Replace the specific string "./assets/information/avatar.png"
    // Be careful with quotes using replaceAll or regex
    content = content.replace(/"\.\/assets\/information\/avatar\.png"/g, `"${result.secure_url}"`);
    content = content.replace(/'\.\/assets\/information\/avatar\.png'/g, `"${result.secure_url}"`);
    
    fs.writeFileSync(dataFile, content, 'utf8');
    console.log('Updated data.js with avatar URL');
  } else {
    console.log('Avatar not found');
  }
}

fixAvatar();
