const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function generatePngBuffer(width, height, pixelFn) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // Color type: RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdr = makeChunk('IHDR', ihdrData);

  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    raw[y * rowSize] = 0; // Filter none
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      const idx = y * rowSize + 1 + x * 4;
      raw[idx] = r;
      raw[idx + 1] = g;
      raw[idx + 2] = b;
      raw[idx + 3] = a;
    }
  }

  const idat = makeChunk('IDAT', zlib.deflateSync(raw));
  const iend = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

// Visual drawing functions for Arohi AI
function drawIcon(x, y, w, h, isRound = false) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (isRound && dist > w * 0.48) {
    return [0, 0, 0, 0]; // Transparent outside circle
  }

  // Deep royal purple gradient background
  const grad = y / h;
  let r = Math.round(56 - grad * 25);
  let g = Math.round(11 - grad * 5);
  let b = Math.round(72 - grad * 25);
  let a = 255;

  // Outer border ring
  if (isRound && dist > w * 0.45 && dist <= w * 0.48) {
    return [168, 85, 247, 220]; // Light purple glowing edge
  }

  // Draw Arohi "A" Emblem & Central Star
  // Normalise coordinates to -1.0 to 1.0
  const nx = (x - cx) / (w * 0.35);
  const ny = (y - cy) / (h * 0.35);

  // Triangular 'A' shape
  // Left leg: nx = -0.5 to 0, ny = 0.7 to -0.6
  // Right leg: nx = 0 to 0.5, ny = -0.6 to 0.7
  const legWidth = 0.22;
  const leftLeg = Math.abs(ny - (nx * -2.2 - 0.3)) < legWidth && ny > -0.65 && ny < 0.75;
  const rightLeg = Math.abs(ny - (nx * 2.2 - 0.3)) < legWidth && ny > -0.65 && ny < 0.75;
  const crossbar = Math.abs(ny - 0.1) < 0.12 && nx > -0.35 && nx < 0.35;

  if (leftLeg) {
    return [168, 85, 247, 255]; // Purple glow
  }
  if (rightLeg) {
    return [245, 158, 11, 255]; // Gold
  }
  if (crossbar) {
    return [251, 191, 36, 255]; // Warm Gold
  }

  // Central sparkle/star at top right
  const sx = nx - 0.45;
  const sy = ny - (-0.5);
  const sDist = Math.sqrt(sx * sx + sy * sy);
  if (sDist < 0.2) {
    const star = Math.abs(sx * sy) < 0.008;
    if (star) return [255, 255, 255, 255];
  }

  return [r, g, b, a];
}

function drawForeground(x, y, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const nx = (x - cx) / (w * 0.25);
  const ny = (y - cy) / (h * 0.25);

  const legWidth = 0.22;
  const leftLeg = Math.abs(ny - (nx * -2.2 - 0.3)) < legWidth && ny > -0.65 && ny < 0.75;
  const rightLeg = Math.abs(ny - (nx * 2.2 - 0.3)) < legWidth && ny > -0.65 && ny < 0.75;
  const crossbar = Math.abs(ny - 0.1) < 0.12 && nx > -0.35 && nx < 0.35;

  if (leftLeg) {
    return [168, 85, 247, 255]; // Purple
  }
  if (rightLeg) {
    return [245, 158, 11, 255]; // Gold
  }
  if (crossbar) {
    return [251, 191, 36, 255]; // Warm Gold
  }

  // Top sparkle
  const sx = nx - 0.45;
  const sy = ny - (-0.5);
  const sDist = Math.sqrt(sx * sx + sy * sy);
  if (sDist < 0.2) {
    const star = Math.abs(sx * sy) < 0.008;
    if (star) return [255, 255, 255, 255];
  }

  return [0, 0, 0, 0]; // Transparent background for adaptive foreground
}

function drawSplash(x, y, w, h) {
  const grad = y / h;
  const r = Math.round(28 - grad * 15);
  const g = Math.round(5 - grad * 2);
  const b = Math.round(40 - grad * 20);

  // Center logo
  const cx = w / 2;
  const cy = h / 2;
  const size = Math.min(w, h) * 0.25;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < size) {
    const nx = dx / (size * 0.7);
    const ny = dy / (size * 0.7);
    const legWidth = 0.22;
    const leftLeg = Math.abs(ny - (nx * -2.2 - 0.3)) < legWidth && ny > -0.65 && ny < 0.75;
    const rightLeg = Math.abs(ny - (nx * 2.2 - 0.3)) < legWidth && ny > -0.65 && ny < 0.75;
    const crossbar = Math.abs(ny - 0.1) < 0.12 && nx > -0.35 && nx < 0.35;

    if (leftLeg) return [168, 85, 247, 255];
    if (rightLeg) return [245, 158, 11, 255];
    if (crossbar) return [251, 191, 36, 255];
  }

  return [r, g, b, 255];
}

const densities = [
  { name: 'mipmap-mdpi', size: 48, fgSize: 108 },
  { name: 'mipmap-hdpi', size: 72, fgSize: 162 },
  { name: 'mipmap-xhdpi', size: 96, fgSize: 216 },
  { name: 'mipmap-xxhdpi', size: 144, fgSize: 324 },
  { name: 'mipmap-xxxhdpi', size: 192, fgSize: 432 }
];

const splashConfigs = [
  { dir: 'drawable', w: 480, h: 800 },
  { dir: 'drawable-land-mdpi', w: 480, h: 320 },
  { dir: 'drawable-land-hdpi', w: 800, h: 480 },
  { dir: 'drawable-land-xhdpi', w: 1280, h: 720 },
  { dir: 'drawable-land-xxhdpi', w: 1600, h: 960 },
  { dir: 'drawable-land-xxxhdpi', w: 1920, h: 1080 },
  { dir: 'drawable-port-mdpi', w: 320, h: 480 },
  { dir: 'drawable-port-hdpi', w: 480, h: 800 },
  { dir: 'drawable-port-xhdpi', w: 720, h: 1280 },
  { dir: 'drawable-port-xxhdpi', w: 960, h: 1600 },
  { dir: 'drawable-port-xxxhdpi', w: 1080, h: 1920 }
];

const resDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

console.log('Generating clean, valid Android PNG assets in:', resDir);

// 1. Generate Mipmap Icons
densities.forEach(({ name, size, fgSize }) => {
  const targetDir = path.join(resDir, name);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  // Standard Launcher
  const stdBuf = generatePngBuffer(size, size, (x, y, w, h) => drawIcon(x, y, w, h, false));
  fs.writeFileSync(path.join(targetDir, 'ic_launcher.png'), stdBuf);

  // Round Launcher
  const roundBuf = generatePngBuffer(size, size, (x, y, w, h) => drawIcon(x, y, w, h, true));
  fs.writeFileSync(path.join(targetDir, 'ic_launcher_round.png'), roundBuf);

  // Foreground
  const fgBuf = generatePngBuffer(fgSize, fgSize, (x, y, w, h) => drawForeground(x, y, w, h));
  fs.writeFileSync(path.join(targetDir, 'ic_launcher_foreground.png'), fgBuf);

  console.log(`Generated icons for ${name} (${size}x${size}, fg ${fgSize}x${fgSize})`);
});

// 2. Generate Splash Screens
splashConfigs.forEach(({ dir, w, h }) => {
  const targetDir = path.join(resDir, dir);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const splashBuf = generatePngBuffer(w, h, (x, y, width, height) => drawSplash(x, y, width, height));
  fs.writeFileSync(path.join(targetDir, 'splash.png'), splashBuf);
  console.log(`Generated splash for ${dir} (${w}x${h})`);
});

console.log('All Android icons and splash assets successfully generated and verified!');
