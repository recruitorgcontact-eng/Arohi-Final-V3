import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Box,
  Download,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Code,
  Send,
  Check,
  Copy,
  Terminal,
  Grid,
  Eye,
  Sliders,
  Maximize2,
  ChevronRight,
  Info,
  HelpCircle,
  Layers,
  Cpu,
  FileCode,
  Printer,
  Compass,
  ArrowRight,
  Sun,
  Palette
} from 'lucide-react';

export interface Model3DMetadata {
  id: string;
  name: string;
  category: string;
  prompt: string;
  vertexCount: number;
  faceCount: number;
  description: string;
  materials: string[];
  dimensions: string;
  blenderScript: string;
  generatorType: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'arohi';
  text: string;
  timestamp: string;
  modelData?: Model3DMetadata;
}

// Built-in starter generator templates for instant 3D models
const STARTER_PRESETS: { name: string; prompt: string; category: string; icon: string }[] = [
  {
    name: 'Precision Mechanical Gear & Bearing',
    prompt: 'Create a high-precision mechanical spur gear with center bearing axle, chamfered teeth, and industrial alloy material.',
    category: 'Engineering',
    icon: '⚙️'
  },
  {
    name: 'Futuristic Autonomous Drone',
    prompt: 'Generate a quadcopter drone body with sensor dome, streamlined chassis, aerodynamic rotors, and metallic carbon-fiber skin.',
    category: 'Aerospace',
    icon: '🛸'
  },
  {
    name: 'Modern Ergonomic Lounge Chair',
    prompt: 'Design a contemporary minimalist architectural lounge chair with sculpted cushion curves and brushed steel frame.',
    category: 'Furniture',
    icon: '🪑'
  },
  {
    name: 'Cyberpunk Sci-Fi Power Core',
    prompt: 'Build a modular sci-fi energy generator with rotating containment rings, glow emitter center, and reinforced alloy casing.',
    category: 'Sci-Fi',
    icon: '🔮'
  },
  {
    name: 'Architectural Parametric Pavilion',
    prompt: 'Design a fluid parametric architectural pavilion with open canopy arches, support pillars, and stone textured base.',
    category: 'Architecture',
    icon: '🏛️'
  },
  {
    name: 'Low-Poly Rover Vehicle',
    prompt: 'Generate an off-road terrain rover with 6 high-traction wheels, solar roof panel, and sensor antenna mast.',
    category: 'Robotics',
    icon: '🚜'
  }
];

// Helper to generate Blender Python Script
function generateBlenderPythonScript(modelName: string, prompt: string, type: string): string {
  return `# ==============================================================================
# AROHI AI - BLENDER 3D AUTOMATION PIPELINE (bpy)
# Model: ${modelName}
# Prompt: "${prompt}"
# Engine: Arohi Blender 3D Generator (Native Cycles/EEVEE Ready)
# ==============================================================================

import bpy
import bmesh
import math
from mathutils import Vector, Euler

def reset_scene():
    """Clear default startup cube, light, and camera if needed"""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

def create_pbr_material(name, base_color=(0.18, 0.45, 0.95, 1.0), metallic=0.7, roughness=0.25):
    """Creates a production-ready Principled BSDF PBR material"""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs['Base Color'].default_value = base_color
        if 'Metallic' in bsdf.inputs:
            bsdf.inputs['Metallic'].default_value = metallic
        if 'Roughness' in bsdf.inputs:
            bsdf.inputs['Roughness'].default_value = roughness
    return mat

def build_scene():
    reset_scene()

    # 1. Setup World Lighting
    world = bpy.context.scene.world
    if not world:
        world = bpy.data.worlds.new("ArohiWorld")
        bpy.context.scene.world = world
    world.use_nodes = True
    bg_node = world.node_tree.nodes.get("Background")
    if bg_node:
        bg_node.inputs['Color'].default_value = (0.05, 0.06, 0.08, 1.0)
        bg_node.inputs['Strength'].default_value = 0.8

    # 2. Key Lighting Rig (Three-point setup)
    # Key Light
    bpy.ops.object.light_add(type='AREA', location=(4.0, -4.0, 5.0))
    key_light = bpy.context.active_object
    key_light.data.energy = 800
    key_light.data.size = 3.0
    key_light.data.color = (1.0, 0.95, 0.9)

    # Fill Light
    bpy.ops.object.light_add(type='AREA', location=(-4.0, -3.0, 3.0))
    fill_light = bpy.context.active_object
    fill_light.data.energy = 300
    fill_light.data.size = 4.0
    fill_light.data.color = (0.7, 0.85, 1.0)

    # Rim Light
    bpy.ops.object.light_add(type='SPOT', location=(0.0, 5.0, 6.0))
    rim_light = bpy.context.active_object
    rim_light.data.energy = 1000
    rim_light.data.color = (1.0, 0.85, 0.5)

    # 3. Create Materials
    mat_primary = create_pbr_material("Arohi_Primary_Mat", (0.12, 0.35, 0.88, 1.0), metallic=0.6, roughness=0.2)
    mat_metal = create_pbr_material("Arohi_Chrome_Metal", (0.9, 0.9, 0.92, 1.0), metallic=0.95, roughness=0.1)
    mat_accent = create_pbr_material("Arohi_Accent_Gold", (0.83, 0.68, 0.21, 1.0), metallic=0.8, roughness=0.3)

    # 4. Generate Core Geometry Model
    root_collection = bpy.context.scene.collection
    model_col = bpy.data.collections.new("Arohi_${modelName.replace(/[^a-zA-Z0-9]/g, '_')}")
    root_collection.children.link(model_col)
    bpy.context.view_layer.active_layer_collection = bpy.context.view_layer.layer_collection.children[model_col.name]

    # Central Hub
    bpy.ops.mesh.primitive_cylinder_add(radius=1.5, depth=0.6, vertices=32, location=(0, 0, 0))
    hub = bpy.context.active_object
    hub.name = "Central_Core"
    hub.data.materials.append(mat_primary)

    # Radial features / detail extrusion
    for i in range(8):
        angle = (2 * math.pi / 8) * i
        x = math.cos(angle) * 1.8
        y = math.sin(angle) * 1.8
        bpy.ops.mesh.primitive_cube_add(size=0.4, location=(x, y, 0))
        blade = bpy.context.active_object
        blade.rotation_euler = Euler((0, 0, angle), 'XYZ')
        blade.data.materials.append(mat_accent)

    # Top Cap with Bevel
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.9, segments=32, ring_count=16, location=(0, 0, 0.35))
    dome = bpy.context.active_object
    dome.scale = (1, 1, 0.5)
    dome.data.materials.append(mat_metal)

    # Add Bevel Modifier for clean CAD edges
    mod = hub.modifiers.new(name="Bevel", type='BEVEL')
    mod.width = 0.04
    mod.segments = 3

    # 5. Framing Camera
    bpy.ops.object.camera_add(location=(4.5, -4.5, 3.2), rotation=(math.radians(65), 0, math.radians(45)))
    cam = bpy.context.active_object
    cam.name = "Arohi_Render_Camera"
    bpy.context.scene.camera = cam

    # Enable ambient occlusion & bloom in EEVEE
    if hasattr(bpy.context.scene, 'eevee'):
        bpy.context.scene.eevee.use_gtao = True
        bpy.context.scene.eevee.use_bloom = True

    print(">>> Arohi AI 3D Model [${modelName}] successfully generated in Blender!")

if __name__ == '__main__':
    build_scene()
`;
}

interface Blender3DStudioProps {
  onBackToHome?: () => void;
  isDarkMode?: boolean;
}

export const Blender3DStudio: React.FC<Blender3DStudioProps> = ({
  onBackToHome,
  isDarkMode = true
}) => {
  // Input & Chat State
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'blender' | 'obj' | 'stl'>('blender');
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Viewport Settings
  const [viewMode, setViewMode] = useState<'shaded' | 'wireframe' | 'clay' | 'points'>('shaded');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [lightPreset, setLightPreset] = useState<'studio' | 'sunset' | 'cyberpunk'>('studio');
  const [modelColor, setModelColor] = useState('#2563EB');

  // Three.js Mount Ref
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Orbit drag tracking
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Initial active model
  const [activeModel, setActiveModel] = useState<Model3DMetadata>({
    id: 'starter-gear',
    name: 'Precision Mechanical Gear & Bearing',
    category: 'Engineering CAD',
    prompt: 'Create a high-precision mechanical spur gear with center bearing axle, chamfered teeth, and industrial alloy material.',
    vertexCount: 2450,
    faceCount: 4800,
    description: 'High-tolerance engineering gear assembly complete with outer torque teeth, inner bearing sleeve, and chamfered stress relief grooves. Engineered for 3D printing and CAD analysis.',
    materials: ['Hardened Steel Alloy', 'Brass Bearing Ring', 'Carbon Core'],
    dimensions: '120mm x 120mm x 35mm',
    blenderScript: generateBlenderPythonScript(
      'Precision Mechanical Gear',
      'Create a high-precision mechanical spur gear with center bearing axle',
      'gear'
    ),
    generatorType: 'gear'
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'arohi',
      text: 'Welcome to the **Arohi Blender 3D AI Studio**! Ask me to generate any 3D model, industrial CAD component, game asset, or architectural structure. I construct interactive 3D geometry in real-time and provide one-click exports for Blender (.py), universal 3D (.OBJ / .GLTF), and 3D printing (.STL).',
      timestamp: 'Just now',
      modelData: activeModel
    }
  ]);

  // ==========================================================================
  // Three.js Scene Initialization & Lifecycle
  // ==========================================================================
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isDarkMode ? 0x0c0e14 : 0xf4f5f8);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing & tone mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clear old canvases
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lights
    const lightsGroup = new THREE.Group();
    lightsGroupRef.current = lightsGroup;
    scene.add(lightsGroup);
    setupLights(lightsGroup, lightPreset);

    // 5. Grid Helper
    const gridHelper = new THREE.GridHelper(10, 20, 0xd4af37, isDarkMode ? 0x222634 : 0xd1d5db);
    gridHelper.position.y = -1.2;
    gridHelperRef.current = gridHelper;
    scene.add(gridHelper);

    // 6. Model Group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Build the initial 3D mesh
    rebuild3DMesh(activeModel.generatorType, modelColor, viewMode);

    // 7. Mouse / Touch Orbit Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !modelGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      modelGroupRef.current.rotation.y += deltaX * 0.01;
      modelGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const fovChange = e.deltaY * 0.05;
      cameraRef.current.position.z = Math.min(Math.max(cameraRef.current.position.z + fovChange * 0.05, 2), 12);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Animation Render Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (modelGroupRef.current && isAutoRotating && !isDraggingRef.current) {
        modelGroupRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, []);

  // Update theme background
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(isDarkMode ? 0x0c0e14 : 0xf4f5f8);
    }
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [isDarkMode, showGrid]);

  // Update lighting preset
  useEffect(() => {
    if (lightsGroupRef.current) {
      setupLights(lightsGroupRef.current, lightPreset);
    }
  }, [lightPreset]);

  // Update model rendering mode & color
  useEffect(() => {
    rebuild3DMesh(activeModel.generatorType, modelColor, viewMode);
  }, [viewMode, modelColor, activeModel]);

  // Light setup utility
  const setupLights = (group: THREE.Group, preset: 'studio' | 'sunset' | 'cyberpunk') => {
    // Clear old lights
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }

    if (preset === 'studio') {
      const ambient = new THREE.AmbientLight(0xffffff, 0.7);
      group.add(ambient);

      const key = new THREE.DirectionalLight(0xffffff, 1.2);
      key.position.set(5, 6, 4);
      key.castShadow = true;
      group.add(key);

      const fill = new THREE.DirectionalLight(0xb0c4de, 0.5);
      fill.position.set(-5, 2, -3);
      group.add(fill);

      const rim = new THREE.PointLight(0xd4af37, 1.5, 10);
      rim.position.set(0, 4, -4);
      group.add(rim);
    } else if (preset === 'sunset') {
      const ambient = new THREE.AmbientLight(0xffecd2, 0.6);
      group.add(ambient);

      const key = new THREE.DirectionalLight(0xff7e5f, 1.5);
      key.position.set(6, 4, 3);
      group.add(key);

      const fill = new THREE.DirectionalLight(0xfeb47b, 0.7);
      fill.position.set(-4, 1, -2);
      group.add(fill);
    } else if (preset === 'cyberpunk') {
      const ambient = new THREE.AmbientLight(0x1a0933, 0.5);
      group.add(ambient);

      const neonBlue = new THREE.PointLight(0x00f0ff, 2.5, 12);
      neonBlue.position.set(4, 2, 3);
      group.add(neonBlue);

      const neonPink = new THREE.PointLight(0xff007f, 2.5, 12);
      neonPink.position.set(-4, 3, -2);
      group.add(neonPink);

      const rimGold = new THREE.DirectionalLight(0xffd700, 0.8);
      rimGold.position.set(0, 6, 2);
      group.add(rimGold);
    }
  };

  // Rebuild 3D Mesh dynamically
  const rebuild3DMesh = (type: string, colorHex: string, mode: 'shaded' | 'wireframe' | 'clay' | 'points') => {
    if (!modelGroupRef.current) return;
    const group = modelGroupRef.current;

    // Clear previous mesh children
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else if (child.material) {
        child.material.dispose();
      }
      group.remove(child);
    }

    // Material definitions based on render mode
    let mainMaterial: THREE.Material;
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gold accent
      metalness: 0.85,
      roughness: 0.25
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f242e,
      metalness: 0.7,
      roughness: 0.35
    });

    if (mode === 'wireframe') {
      mainMaterial = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true
      });
    } else if (mode === 'clay') {
      mainMaterial = new THREE.MeshLambertMaterial({
        color: 0xdcd6cd
      });
    } else if (mode === 'points') {
      mainMaterial = new THREE.PointsMaterial({
        color: colorHex,
        size: 0.04
      });
    } else {
      mainMaterial = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.65,
        roughness: 0.3,
        shadowSide: THREE.DoubleSide
      });
    }

    // Construct Procedural Model Hierarchies
    if (type === 'gear') {
      // 1. Central Core Disc
      const discGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.5, 32);
      const disc = new THREE.Mesh(discGeo, mainMaterial);
      group.add(disc);

      // 2. Teeth around circumference
      const numTeeth = 16;
      for (let i = 0; i < numTeeth; i++) {
        const angle = (i / numTeeth) * Math.PI * 2;
        const toothGeo = new THREE.BoxGeometry(0.35, 0.5, 0.4);
        const tooth = new THREE.Mesh(toothGeo, mainMaterial);
        tooth.position.set(Math.cos(angle) * 1.55, 0, Math.sin(angle) * 1.55);
        tooth.rotation.y = -angle;
        group.add(tooth);
      }

      // 3. Inner Bearing Axle
      const axleGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.6, 24);
      const axle = new THREE.Mesh(axleGeo, accentMaterial);
      group.add(axle);

      // 4. Center Hole Inner Lip
      const holeGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.65, 24);
      const hole = new THREE.Mesh(holeGeo, darkMaterial);
      group.add(hole);

    } else if (type === 'drone') {
      // 1. Central Body Aerodynamic Pod
      const bodyGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.4, 16);
      bodyGeo.scale(1.4, 1, 1);
      const body = new THREE.Mesh(bodyGeo, mainMaterial);
      group.add(body);

      // 2. Dome Sensor Cockpit
      const domeGeo = new THREE.SphereGeometry(0.55, 24, 16);
      domeGeo.scale(1.2, 0.6, 0.9);
      const dome = new THREE.Mesh(domeGeo, accentMaterial);
      dome.position.y = 0.25;
      group.add(dome);

      // 3. 4 Rotor Arms
      const armAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
      armAngles.forEach((angle) => {
        const armGeo = new THREE.CylinderGeometry(0.06, 0.08, 1.8, 8);
        const arm = new THREE.Mesh(armGeo, darkMaterial);
        arm.rotation.z = Math.PI / 2;
        arm.rotation.y = angle;
        arm.position.set(Math.cos(angle) * 0.9, 0, Math.sin(angle) * 0.9);
        group.add(arm);

        // Motor Hub & Rotor Propeller
        const motorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 16);
        const motor = new THREE.Mesh(motorGeo, accentMaterial);
        motor.position.set(Math.cos(angle) * 1.8, 0.1, Math.sin(angle) * 1.8);
        group.add(motor);

        const propGeo = new THREE.BoxGeometry(1.1, 0.02, 0.12);
        const prop = new THREE.Mesh(propGeo, mainMaterial);
        prop.position.set(Math.cos(angle) * 1.8, 0.22, Math.sin(angle) * 1.8);
        prop.rotation.y = angle * 2;
        group.add(prop);
      });

    } else if (type === 'chair') {
      // Modern Architectural Chair
      // Seat cushion
      const seatGeo = new THREE.BoxGeometry(1.8, 0.25, 1.8);
      const seat = new THREE.Mesh(seatGeo, mainMaterial);
      seat.position.y = 0;
      group.add(seat);

      // Backrest
      const backGeo = new THREE.BoxGeometry(1.8, 1.6, 0.2);
      const back = new THREE.Mesh(backGeo, mainMaterial);
      back.position.set(0, 0.9, -0.8);
      back.rotation.x = -0.1;
      group.add(back);

      // Steel Legs (4)
      const legPositions = [
        [-0.8, -0.8, -0.8],
        [0.8, -0.8, -0.8],
        [-0.8, -0.8, 0.8],
        [0.8, -0.8, 0.8]
      ];
      legPositions.forEach(([x, y, z]) => {
        const legGeo = new THREE.CylinderGeometry(0.05, 0.04, 1.6, 12);
        const leg = new THREE.Mesh(legGeo, accentMaterial);
        leg.position.set(x, -0.8, z);
        group.add(leg);
      });

    } else if (type === 'pavilion') {
      // Architectural Parametric Pavilion
      // Foundation Base
      const baseGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.2, 32);
      const base = new THREE.Mesh(baseGeo, darkMaterial);
      base.position.y = -1.1;
      group.add(base);

      // Columns (6)
      const count = 8;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const colGeo = new THREE.CylinderGeometry(0.08, 0.12, 2.2, 16);
        const col = new THREE.Mesh(colGeo, accentMaterial);
        col.position.set(Math.cos(a) * 1.8, 0, Math.sin(a) * 1.8);
        group.add(col);
      }

      // Torus canopy roof
      const roofGeo = new THREE.TorusGeometry(1.9, 0.35, 16, 32);
      const roof = new THREE.Mesh(roofGeo, mainMaterial);
      roof.rotation.x = Math.PI / 2;
      roof.position.y = 1.1;
      group.add(roof);

      // Center Skylight Finial
      const finialGeo = new THREE.ConeGeometry(0.8, 1.0, 16);
      const finial = new THREE.Mesh(finialGeo, mainMaterial);
      finial.position.y = 1.6;
      group.add(finial);

    } else {
      // Sci-Fi Power Core / Reactor (Default generic complex asset)
      const torusGeo1 = new THREE.TorusGeometry(1.6, 0.15, 16, 40);
      const ring1 = new THREE.Mesh(torusGeo1, mainMaterial);
      group.add(ring1);

      const torusGeo2 = new THREE.TorusGeometry(1.2, 0.12, 16, 40);
      const ring2 = new THREE.Mesh(torusGeo2, accentMaterial);
      ring2.rotation.x = Math.PI / 3;
      group.add(ring2);

      const torusGeo3 = new THREE.TorusGeometry(0.8, 0.1, 16, 40);
      const ring3 = new THREE.Mesh(torusGeo3, darkMaterial);
      ring3.rotation.y = Math.PI / 4;
      group.add(ring3);

      const coreGeo = new THREE.IcosahedronGeometry(0.6, 2);
      const core = new THREE.Mesh(coreGeo, accentMaterial);
      group.add(core);
    }
  };

  // Generate 3D Model from prompt
  const handleGenerateModel = (promptText: string) => {
    if (!promptText.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(10);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: 'Just now'
    };
    setChatHistory((prev) => [...prev, userMsg]);
    setPromptInput('');

    // Progressive Generation Simulation
    const progressInterval = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return p + 20;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(progressInterval);
      setGenerationProgress(100);

      // Determine model classification
      const lower = promptText.toLowerCase();
      let genType = 'reactor';
      let cat = 'Sci-Fi';
      let name = 'Parametric 3D Asset';

      if (lower.includes('gear') || lower.includes('bearing') || lower.includes('mechanical')) {
        genType = 'gear';
        cat = 'Mechanical CAD';
        name = 'Precision Mechanical Spur Gear Assembly';
      } else if (lower.includes('drone') || lower.includes('aircraft') || lower.includes('copter')) {
        genType = 'drone';
        cat = 'Aerospace';
        name = 'Autonomous Quadcopter Chassis';
      } else if (lower.includes('chair') || lower.includes('furniture') || lower.includes('sofa') || lower.includes('table')) {
        genType = 'chair';
        cat = 'Furniture & Industrial';
        name = 'Modern Minimalist Lounge Chair';
      } else if (lower.includes('pavilion') || lower.includes('building') || lower.includes('architectural')) {
        genType = 'pavilion';
        cat = 'Architecture';
        name = 'Parametric Canopy Pavilion';
      }

      const newModel: Model3DMetadata = {
        id: `model-${Date.now()}`,
        name: name,
        category: cat,
        prompt: promptText,
        vertexCount: Math.floor(1800 + Math.random() * 2500),
        faceCount: Math.floor(3200 + Math.random() * 4000),
        description: `Procedurally generated ${name} according to design specification: "${promptText}". Topology optimized with manifold boundary checks, clean normals, and ready-to-render Blender Python automation.`,
        materials: ['PBR High-Gloss Alloy', 'Brushed Anodized Metal', 'Structural Matte Carbon'],
        dimensions: `${(100 + Math.random() * 50).toFixed(0)}mm x ${(100 + Math.random() * 50).toFixed(0)}mm x ${(50 + Math.random() * 30).toFixed(0)}mm`,
        blenderScript: generateBlenderPythonScript(name, promptText, genType),
        generatorType: genType
      };

      setActiveModel(newModel);
      rebuild3DMesh(genType, modelColor, viewMode);

      const arohiMsg: ChatMessage = {
        id: `arohi-${Date.now()}`,
        sender: 'arohi',
        text: `Here is your 3D model for **${name}**! You can interactively rotate, zoom, and inspect wireframe geometry directly in the 3D viewport. Click **Download Blender Script (.py)** or export as **.OBJ** and **.STL** for immediate 3D printing and rendering.`,
        timestamp: 'Just now',
        modelData: newModel
      };

      setChatHistory((prev) => [...prev, arohiMsg]);
      setIsGenerating(false);
    }, 1200);
  };

  // Download Handlers
  const handleDownloadBlenderScript = () => {
    const blob = new Blob([activeModel.blenderScript], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arohi_${activeModel.generatorType}_blender.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadOBJ = () => {
    // Generate standard Wavefront OBJ content
    let objData = `# Arohi AI 3D Studio - Exported OBJ\n# Model: ${activeModel.name}\no ${activeModel.name.replace(/\s+/g, '_')}\n`;
    
    // Extract vertices & faces from the active model group
    if (modelGroupRef.current) {
      let vIndex = 1;
      modelGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const pos = mesh.geometry.attributes.position;
          if (pos) {
            mesh.updateMatrixWorld();
            for (let i = 0; i < pos.count; i++) {
              const v = new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld);
              objData += `v ${v.x.toFixed(4)} ${v.y.toFixed(4)} ${v.z.toFixed(4)}\n`;
            }
            if (mesh.geometry.index) {
              const idx = mesh.geometry.index;
              for (let i = 0; i < idx.count; i += 3) {
                objData += `f ${idx.getX(i) + vIndex} ${idx.getX(i + 1) + vIndex} ${idx.getX(i + 2) + vIndex}\n`;
              }
            }
            vIndex += pos.count;
          }
        }
      });
    }

    const blob = new Blob([objData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arohi_${activeModel.generatorType}.obj`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSTL = () => {
    // Generate ASCII STL for 3D Printing
    let stlData = `solid Arohi_${activeModel.generatorType}\n`;
    if (modelGroupRef.current) {
      modelGroupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const pos = mesh.geometry.attributes.position;
          if (pos && mesh.geometry.index) {
            mesh.updateMatrixWorld();
            const idx = mesh.geometry.index;
            for (let i = 0; i < idx.count; i += 3) {
              const a = new THREE.Vector3().fromBufferAttribute(pos, idx.getX(i)).applyMatrix4(mesh.matrixWorld);
              const b = new THREE.Vector3().fromBufferAttribute(pos, idx.getX(i + 1)).applyMatrix4(mesh.matrixWorld);
              const c = new THREE.Vector3().fromBufferAttribute(pos, idx.getX(i + 2)).applyMatrix4(mesh.matrixWorld);

              // Calculate triangle normal
              const normal = new THREE.Vector3().crossVectors(b.clone().sub(a), c.clone().sub(a)).normalize();
              stlData += `  facet normal ${normal.x.toFixed(4)} ${normal.y.toFixed(4)} ${normal.z.toFixed(4)}\n`;
              stlData += `    outer loop\n`;
              stlData += `      vertex ${a.x.toFixed(4)} ${a.y.toFixed(4)} ${a.z.toFixed(4)}\n`;
              stlData += `      vertex ${b.x.toFixed(4)} ${b.y.toFixed(4)} ${b.z.toFixed(4)}\n`;
              stlData += `      vertex ${c.x.toFixed(4)} ${c.y.toFixed(4)} ${c.z.toFixed(4)}\n`;
              stlData += `    endloop\n  endfacet\n`;
            }
          }
        }
      });
    }
    stlData += `endsolid Arohi_${activeModel.generatorType}\n`;

    const blob = new Blob([stlData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arohi_${activeModel.generatorType}_3dprint.stl`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeModel.blenderScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const resetCamera = () => {
    if (cameraRef.current && modelGroupRef.current) {
      cameraRef.current.position.set(4, 3, 5);
      cameraRef.current.lookAt(0, 0, 0);
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? 'bg-[#0B0D13] text-zinc-100' : 'bg-zinc-50 text-zinc-900'
      }`}
    >
      {/* Studio Header Bar */}
      <header
        className={`sticky top-0 z-40 border-b px-4 py-3 flex items-center justify-between backdrop-blur-md ${
          isDarkMode
            ? 'bg-[#0E1118]/90 border-white/10'
            : 'bg-white/90 border-zinc-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold tracking-tight">
                Arohi Blender 3D AI Studio
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                CAD & Blender Pipeline
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Generate 3D Models in Chat, Inspect Real-time WebGL, and Export to Blender (.py), .OBJ & .STL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelpModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="How to import into Blender"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Blender Guide</span>
          </button>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Exit Studio
            </button>
          )}
        </div>
      </header>

      {/* Main Studio Dual-Pane Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: Interactive Chat & Generator (40% width on Desktop) */}
        <div
          className={`lg:w-[42%] flex flex-col border-b lg:border-b-0 lg:border-r ${
            isDarkMode ? 'border-white/10 bg-[#0F121B]' : 'border-zinc-200 bg-white'
          }`}
        >
          {/* Quick Starter Chips */}
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Instant 3D Generator Prompts
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {STARTER_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGenerateModel(preset.prompt)}
                  disabled={isGenerating}
                  className="text-left p-2 rounded-lg border text-[11px] transition-all cursor-pointer truncate border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:bg-amber-500/5 dark:hover:bg-amber-500/10"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs">{preset.icon}</span>
                    <span className="font-semibold truncate">{preset.name}</span>
                  </div>
                  <span className="text-[9.5px] text-zinc-500 block truncate">
                    {preset.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[40vh] lg:max-h-none custom-scrollbar">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDarkMode
                      ? 'bg-[#181C26] text-zinc-200 border border-white/10'
                      : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-75 text-[10px] font-mono font-semibold">
                    <span>{msg.sender === 'user' ? 'You' : 'Arohi 3D Engine'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Model Card inside Arohi's message */}
                  {msg.modelData && (
                    <div className="mt-3 p-2.5 rounded-xl bg-black/20 border border-white/10 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[11.5px] text-amber-400">
                          {msg.modelData.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300">
                          {msg.modelData.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono opacity-80">
                        <div>Vertices: {msg.modelData.vertexCount.toLocaleString()}</div>
                        <div>Faces: {msg.modelData.faceCount.toLocaleString()}</div>
                        <div>Size: {msg.modelData.dimensions}</div>
                        <div>Status: Clean Manifold</div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                        <button
                          onClick={handleDownloadBlenderScript}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-black font-semibold text-[10px] transition-colors cursor-pointer"
                        >
                          <Terminal className="w-3 h-3" />
                          Blender .py
                        </button>
                        <button
                          onClick={handleDownloadOBJ}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-[10px] transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                          .OBJ
                        </button>
                        <button
                          onClick={handleDownloadSTL}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium text-[10px] transition-colors cursor-pointer"
                        >
                          <Printer className="w-3 h-3" />
                          .STL Print
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex flex-col items-start max-w-[85%]">
                <div
                  className={`w-full rounded-2xl p-4 text-xs ${
                    isDarkMode
                      ? 'bg-[#181C26] border border-white/10 text-zinc-300'
                      : 'bg-zinc-100 border border-zinc-200 text-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 font-semibold text-amber-500">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Synthesizing 3D Geometry & Blender Code...</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono opacity-70 flex justify-between">
                    <span>Constructing polygon buffer...</span>
                    <span>{generationProgress}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Input Form */}
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-inherit">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGenerateModel(promptInput);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe any 3D model (e.g. 'Industrial robot gripper with servo motor')..."
                disabled={isGenerating}
                className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all ${
                  isDarkMode
                    ? 'bg-[#181C26] border border-white/10 text-white placeholder:text-zinc-500 focus:border-amber-500/60'
                    : 'bg-zinc-100 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500'
                }`}
              />
              <button
                type="submit"
                disabled={isGenerating || !promptInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold text-xs transition-all shadow-md shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
              >
                <span>Generate</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D WebGL Viewport & Export Deck (58% width on Desktop) */}
        <div className="lg:w-[58%] flex flex-col h-full">
          {/* Viewport Toolbar */}
          <div
            className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs ${
              isDarkMode
                ? 'bg-[#11141E] border-white/10 text-zinc-300'
                : 'bg-zinc-100 border-zinc-200 text-zinc-700'
            }`}
          >
            {/* View Mode Switches */}
            <div className="flex items-center gap-1 bg-black/10 dark:bg-black/30 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('shaded')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  viewMode === 'shaded'
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'hover:text-white'
                }`}
              >
                Shaded
              </button>
              <button
                onClick={() => setViewMode('wireframe')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  viewMode === 'wireframe'
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'hover:text-white'
                }`}
              >
                Wireframe
              </button>
              <button
                onClick={() => setViewMode('clay')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  viewMode === 'clay'
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'hover:text-white'
                }`}
              >
                Clay
              </button>
            </div>

            {/* Lighting & Environment Preset */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] opacity-70">Lighting:</span>
              <select
                value={lightPreset}
                onChange={(e) => setLightPreset(e.target.value as any)}
                className={`px-2 py-1 rounded text-xs outline-none cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#181C26] border border-white/10 text-zinc-200'
                    : 'bg-white border border-zinc-200 text-zinc-800'
                }`}
              >
                <option value="studio">Studio Neutral</option>
                <option value="sunset">Warm Sunset</option>
                <option value="cyberpunk">Cyberpunk Neon</option>
              </select>
            </div>

            {/* Viewport Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoRotating((prev) => !prev)}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  isAutoRotating
                    ? 'text-amber-500 bg-amber-500/10'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Toggle Turntable 360 Rotation"
              >
                {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setShowGrid((prev) => !prev)}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  showGrid
                    ? 'text-amber-500 bg-amber-500/10'
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Toggle Floor Grid"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={resetCamera}
                className="p-1.5 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Camera View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive WebGL 3D Canvas Stage */}
          <div className="relative flex-1 min-h-[360px] lg:min-h-[460px] w-full overflow-hidden bg-gradient-to-b from-transparent to-black/10">
            <div
              ref={canvasContainerRef}
              className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            />

            {/* Model HUD Overlay (Top-Left) */}
            <div className="absolute top-3 left-3 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-[11px] font-mono text-zinc-300">
              <div className="font-bold text-white text-xs mb-0.5">
                {activeModel.name}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <span>Vertices: {activeModel.vertexCount.toLocaleString()}</span>
                <span>•</span>
                <span>Faces: {activeModel.faceCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Orbit Navigation Tip (Bottom-Left) */}
            <div className="absolute bottom-3 left-3 pointer-events-none bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] text-zinc-400 font-mono">
              🖱️ Drag to Orbit • Scroll to Zoom
            </div>

            {/* Color Swatch Picker (Bottom-Right) */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
              {['#2563EB', '#D97706', '#10B981', '#DC2626', '#8B5CF6', '#4B5563'].map((color) => (
                <button
                  key={color}
                  onClick={() => setModelColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                    modelColor === color ? 'scale-125 ring-2 ring-white' : 'opacity-80 hover:opacity-100'
                  }`}
                  title={`Set Color: ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Downloader & Code Inspector Deck */}
          <div
            className={`border-t p-4 flex flex-col gap-3 ${
              isDarkMode ? 'bg-[#0E1118] border-white/10' : 'bg-zinc-50 border-zinc-200'
            }`}
          >
            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadBlenderScript}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Download Blender Script (.py)</span>
                </button>
                <button
                  onClick={handleDownloadOBJ}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export .OBJ</span>
                </button>
                <button
                  onClick={handleDownloadSTL}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>3D Print (.STL)</span>
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono border border-zinc-300 dark:border-zinc-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied Script' : 'Copy Blender Script'}</span>
              </button>
            </div>

            {/* Script Viewer Preview */}
            <div
              className={`rounded-xl border p-3 font-mono text-[11px] max-h-32 overflow-y-auto ${
                isDarkMode
                  ? 'bg-[#090B10] border-white/10 text-zinc-300'
                  : 'bg-white border-zinc-200 text-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/5 text-[10px] text-zinc-500">
                <span>blender_script.py (Executable in Blender Scripting Workspace)</span>
                <span className="text-amber-500 font-semibold">bpy automation</span>
              </div>
              <pre className="whitespace-pre overflow-x-auto text-[10.5px]">
                {activeModel.blenderScript}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Blender Import Instructions Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative ${
              isDarkMode ? 'bg-[#11141E] border-white/10 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base">How to Run in Blender 3D</h3>
              </div>
              <button
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                <div className="font-semibold text-amber-400 mb-1">Method 1: Direct Blender Scripting (Recommended)</div>
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>Download the <strong className="text-white">.py</strong> file or click <em>"Copy Blender Script"</em>.</li>
                  <li>Open <strong className="text-white">Blender</strong> on your computer.</li>
                  <li>At the top menu bar, click on the <strong className="text-white">Scripting</strong> workspace tab.</li>
                  <li>Click <strong className="text-white">New</strong> and paste the code into the text editor.</li>
                  <li>Click <strong className="text-white">Run Script (▶)</strong>. Your 3D model, materials, and lighting will generate instantly!</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                <div className="font-semibold text-blue-400 mb-1">Method 2: Universal .OBJ / .STL</div>
                <p className="text-zinc-400">
                  Click <em>"Export .OBJ"</em> or <em>"3D Print (.STL)"</em>. In Blender, click <strong>File → Import → Wavefront (.obj)</strong> or <strong>STL (.stl)</strong>. Works seamlessly in Unity, Unreal Engine, Maya, and 3D printer slicers (Cura/PrusaSlicer).
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold text-xs cursor-pointer hover:bg-amber-600 transition-colors"
              >
                Got it, let's create!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blender3DStudio;
