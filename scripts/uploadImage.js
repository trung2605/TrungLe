// Reusable Cloudinary upload CLI.
// Usage:
//   node scripts/uploadImage.js <file-or-folder> [--folder=my-website/assets/projects]
//
// Examples:
//   node scripts/uploadImage.js ./new-project-screenshot.png
//   node scripts/uploadImage.js ./new-project-screenshot.png --folder=my-website/assets/projects
//   node scripts/uploadImage.js ./certs-batch/            # uploads every image file in the folder
//
// Prints each uploaded file's secure_url (already includes f_auto,q_auto — see below)
// so you can paste it straight into src/data.js.

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
const DEFAULT_FOLDER = 'my-website/assets/uploads';

const parseArgs = () => {
  const args = process.argv.slice(2);
  const target = args.find((a) => !a.startsWith('--'));
  const folderArg = args.find((a) => a.startsWith('--folder='));
  const folder = folderArg ? folderArg.split('=')[1] : DEFAULT_FOLDER;
  return { target, folder };
};

// Cloudinary URLs come back without transforms by default — insert the same
// f_auto,q_auto optimization used across src/data.js so every new upload is
// pre-optimized (see Cloudinary optimization pass from the perf workstream).
const withAutoTransform = (url) => url.replace('/upload/', '/upload/f_auto,q_auto/');

const uploadOne = async (filePath, folder) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    use_filename: true,
    unique_filename: false,
    resource_type: 'image',
  });
  return withAutoTransform(result.secure_url);
};

async function main() {
  const { target, folder } = parseArgs();

  if (!target) {
    console.error('Usage: node scripts/uploadImage.js <file-or-folder> [--folder=my-website/assets/xyz]');
    process.exit(1);
  }

  if (!cloudinary.config().cloud_name) {
    console.error('Missing Cloudinary credentials — check CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET in .env');
    process.exit(1);
  }

  const absTarget = path.resolve(process.cwd(), target);
  if (!fs.existsSync(absTarget)) {
    console.error(`Not found: ${absTarget}`);
    process.exit(1);
  }

  const isDir = fs.statSync(absTarget).isDirectory();
  const files = isDir
    ? fs.readdirSync(absTarget)
        .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
        .map((f) => path.join(absTarget, f))
    : [absTarget];

  if (files.length === 0) {
    console.error('No image files found.');
    process.exit(1);
  }

  console.log(`Uploading ${files.length} file(s) to folder "${folder}"...\n`);

  for (const file of files) {
    try {
      const url = await uploadOne(file, folder);
      console.log(`${path.basename(file)}\n  -> ${url}\n`);
    } catch (err) {
      console.error(`Failed: ${path.basename(file)} — ${err.message}`);
    }
  }
}

main();
