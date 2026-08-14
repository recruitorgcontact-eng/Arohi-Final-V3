import * as THREE from 'three';

// Cache generated textures so we don't recreate them on every render
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Helper to turn a HTMLCanvasElement into a THREE.CanvasTexture with repetition setup
 */
function createTextureFromCanvas(
  key: string,
  drawCanvas: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
  width = 512,
  height = 512,
  repeatX = 1,
  repeatY = 1
): THREE.CanvasTexture {
  if (textureCache.has(key)) {
    return textureCache.get(key)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    drawCanvas(ctx, width, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;

  textureCache.set(key, texture);
  return texture;
}

/**
 * Organic Muscle & Tissue Striation Normal Map
 * Generates realistic muscle fibers, cardiac striations, and micro-capillary bumps
 */
export function getOrganicNormalMap(): THREE.CanvasTexture {
  return createTextureFromCanvas('organic_normal', (ctx, width, height) => {
    // Base normal map color (#8080FF is flat surface pointing +Z)
    ctx.fillStyle = '#8080ff';
    ctx.fillRect(0, 0, width, height);

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Generate directional fiber striations + noise
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;

        // Fiber direction wave
        const wave1 = Math.sin(x * 0.15 + y * 0.05) * 20;
        const wave2 = Math.cos(y * 0.2) * 15;
        const noise = (Math.random() - 0.5) * 30;

        const deltaX = wave1 + noise;
        const deltaY = wave2 + noise;

        // Perturb R (X-normal) and G (Y-normal)
        data[idx] = Math.min(255, Math.max(0, 128 + deltaX));     // Red (X)
        data[idx + 1] = Math.min(255, Math.max(0, 128 + deltaY)); // Green (Y)
        data[idx + 2] = 255;                                      // Blue (Z)
        data[idx + 3] = 255;                                      // Alpha
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, 512, 512, 2, 2);
}

/**
 * Organic Tissue Roughness / Wet Specular Map
 * Creates micro-moisture variations across cardiac muscle and cellular organelles
 */
export function getOrganicRoughnessMap(): THREE.CanvasTexture {
  return createTextureFromCanvas('organic_roughness', (ctx, width, height) => {
    ctx.fillStyle = '#444444'; // Base roughness ~0.27
    ctx.fillRect(0, 0, width, height);

    // Add soft wet patches (darker = glossier/wetter in roughness map)
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const radius = 15 + Math.random() * 40;

      const grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, radius);
      grad.addColorStop(0, 'rgba(15, 15, 15, 0.8)'); // Very glossy wet sheen
      grad.addColorStop(1, 'rgba(80, 80, 80, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(rx, ry, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 256, 256, 2, 2);
}

/**
 * Brushed Metal Normal Map for Engine Components (Pistons, Crankshaft, Cylinder Block)
 */
export function getBrushedMetalNormalMap(): THREE.CanvasTexture {
  return createTextureFromCanvas('brushed_metal_normal', (ctx, width, height) => {
    ctx.fillStyle = '#8080ff';
    ctx.fillRect(0, 0, width, height);

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    // Horizontal brush scratches
    for (let y = 0; y < height; y++) {
      const linePerturb = (Math.random() - 0.5) * 45;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const xPerturb = (Math.random() - 0.5) * 10;

        data[idx] = Math.min(255, Math.max(0, 128 + xPerturb));
        data[idx + 1] = Math.min(255, Math.max(0, 128 + linePerturb));
        data[idx + 2] = 240;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, 512, 512, 4, 4);
}

/**
 * Metallic Roughness Map for Mechanical Parts
 */
export function getMetalRoughnessMap(): THREE.CanvasTexture {
  return createTextureFromCanvas('metal_roughness', (ctx, width, height) => {
    ctx.fillStyle = '#222222'; // Smooth polished metal (low roughness)
    ctx.fillRect(0, 0, width, height);

    // Subtle micro-abrasions and grease streaks
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.15)';
    ctx.lineWidth = 1;

    for (let i = 0; i < 60; i++) {
      const y = Math.random() * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + (Math.random() - 0.5) * 20);
      ctx.stroke();
    }
  }, 256, 256, 2, 2);
}

/**
 * Coronary Vascular Map for Epicardium / Heart Surface
 */
export function getHeartVascularTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas('heart_vascular', (ctx, width, height) => {
    // Rich cardiac muscle crimson-red background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#a81c1c');
    bgGrad.addColorStop(0.5, '#881313');
    bgGrad.addColorStop(1, '#6b0c0c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Fat deposit streaks (myocardial fat grooves)
    ctx.fillStyle = 'rgba(230, 200, 120, 0.35)';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.ellipse(width * 0.3 + i * 80, height * 0.4, 30, 120, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Branching Coronary Arteries (Bright Red) and Cardiac Veins (Blue)
    const drawVessel = (color: string, startX: number, startY: number, branches: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';

      let currX = startX;
      let currY = startY;

      ctx.beginPath();
      ctx.moveTo(currX, currY);

      for (let i = 0; i < branches; i++) {
        const nextX = currX + (Math.random() - 0.3) * 60;
        const nextY = currY + 40 + Math.random() * 40;
        ctx.quadraticCurveTo(currX + (Math.random() - 0.5) * 30, currY + 20, nextX, nextY);

        // Sub-branch
        if (Math.random() > 0.4) {
          ctx.save();
          ctx.lineWidth = ctx.lineWidth * 0.6;
          ctx.beginPath();
          ctx.moveTo(nextX, nextY);
          ctx.lineTo(nextX + (Math.random() > 0.5 ? 40 : -40), nextY + 30);
          ctx.stroke();
          ctx.restore();
        }

        currX = nextX;
        currY = nextY;
      }
      ctx.stroke();
    };

    // Main Left Anterior Descending Artery (LAD)
    drawVessel('#ef4444', width * 0.5, 20, 6);
    // Right Coronary Artery (RCA)
    drawVessel('#dc2626', width * 0.25, 40, 5);
    // Great Cardiac Vein (Blue)
    drawVessel('#3b82f6', width * 0.55, 30, 6);
    drawVessel('#60a5fa', width * 0.7, 50, 4);

  }, 512, 512);
}

/**
 * Cell Lipid Bilayer Membrane Normal & Texture
 */
export function getCellMembraneTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas('cell_membrane', (ctx, width, height) => {
    const grad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, width / 2);
    grad.addColorStop(0, '#a855f7');
    grad.addColorStop(0.7, '#7e22ce');
    grad.addColorStop(1, '#581c87');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Micro lipid bilayer nodes
    ctx.fillStyle = 'rgba(236, 72, 153, 0.4)';
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 2 + Math.random() * 5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 256, 256, 2, 2);
}

/**
 * Solar System - Earth Map Texture
 */
export function getEarthTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas('earth_map', (ctx, width, height) => {
    // Deep Pacific Ocean Blue
    ctx.fillStyle = '#0f4c81';
    ctx.fillRect(0, 0, width, height);

    // Continents (Green/Brown)
    ctx.fillStyle = '#2d6a4f';

    // Eurasia / Africa
    ctx.beginPath();
    ctx.ellipse(width * 0.55, height * 0.35, width * 0.18, height * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.fillStyle = '#1b4332';
    ctx.beginPath();
    ctx.ellipse(width * 0.25, height * 0.45, width * 0.1, height * 0.3, -Math.PI / 8, 0, Math.PI * 2);
    ctx.fill();

    // Polar Ice Caps
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height * 0.08);
    ctx.fillRect(0, height * 0.92, width, height * 0.08);

    // Atmospheric Cloud Swirls
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * width, Math.random() * height, 80, 15, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 512, 256);
}

/**
 * Sun Solar Flare Emission Map
 */
export function getSunTexture(): THREE.CanvasTexture {
  return createTextureFromCanvas('sun_map', (ctx, width, height) => {
    const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
    grad.addColorStop(0, '#fffbeb');
    grad.addColorStop(0.3, '#fde047');
    grad.addColorStop(0.7, '#f97316');
    grad.addColorStop(1, '#dc2626');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Sunspots & Granulation
    ctx.fillStyle = 'rgba(120, 20, 0, 0.3)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = 1 + Math.random() * 8;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 512, 256);
}
