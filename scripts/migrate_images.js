const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const TARGET_FILE = path.join(__dirname, '../src/data.js');
const ASSETS_DIR = path.join(__dirname, '../src'); // Base for relative paths in imports

async function processFile() {
  console.log(`Reading ${TARGET_FILE}...`);
  let content = fs.readFileSync(TARGET_FILE, 'utf8');
  
  // Regex to find image imports
  // Matches: import VariableName from "./assets/path/to/image.ext";
  const importRegex = /import\s+(\w+)\s+from\s+["'](\.\/assets\/[^"']+)["'];/g;
  
  let match;
  const replacements = [];
  
  // Collect all matches first
  while ((match = importRegex.exec(content)) !== null) {
    replacements.push({
      fullMatch: match[0],
      varName: match[1],
      relPath: match[2],
      index: match.index
    });
  }
  
  console.log(`Found ${replacements.length} images to upload.`);
  
  // Process replacements
  // We'll replace the text in the content. 
  // N.B. Replacing string content iteratively can mess up indices if lengths change.
  // Better to build a map of replacements and do a single pass or use replace() carefully.
  // Actually, string.replace(str, newStr) only replaces first occurrence. 
  // We can just iterate and replace the specific exact string if it's unique enough.
  // The full matching line `import X from "Y";` is quite unique.
  
  for (const item of replacements) {
    const { fullMatch, varName, relPath } = item;
    const absolutePath = path.join(ASSETS_DIR, relPath);
    
    console.log(`Uploading ${relPath} ...`);
    
    try {
      // Check if file exists
      if (!fs.existsSync(absolutePath)) {
        console.error(`  File not found: ${absolutePath}, skipping.`);
        continue;
      }

      // Upload to Cloudinary
      // Use filename as folder/public_id structure to keep it organized? 
      // Or just let Cloudinary handle it.
      // Let's use the folder structure from the path.
      // relPath is like ./assets/projects/Image.png
      // folder: assets/projects
      
      const pathParts = relPath.replace('./', '').split('/');
      const fileName = pathParts.pop(); // Image.png
      const folderPath = pathParts.join('/'); // assets/projects
      const publicIdFromPath = fileName.split('.')[0]; 

      const result = await cloudinary.uploader.upload(absolutePath, {
        folder: `my-website/${folderPath}`,
        use_filename: true,
        unique_filename: false,
        resource_type: 'image'
      });
      
      console.log(`  Uploaded to: ${result.secure_url}`);
      
      const newCode = `const ${varName} = "${result.secure_url}";`;
      
      // Perform replacement in content
      // We use split/join to replace all occurrences if any duplicates (unlikely for imports)
      // or just replace the specific substring.
      content = content.replace(fullMatch, newCode);
      
    } catch (error) {
      console.error(`  Failed to upload ${relPath}:`, error.message);
    }
  }
  
  console.log('Writing updated file...');
  fs.writeFileSync(TARGET_FILE, content, 'utf8');
  console.log('Done!');
}

processFile().catch(err => {
  console.error("Script failed:", err);
});
