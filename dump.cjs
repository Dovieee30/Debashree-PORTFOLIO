const fs = require('fs');

const glbPath = './public/robot.glb';
const buffer = fs.readFileSync(glbPath);

// Validate Magic Number
const magic = buffer.toString('utf8', 0, 4);
if (magic !== 'glTF') {
  console.error('Not a valid GLB file');
  process.exit(1);
}

// Read Chunk 0 Length and Type
const chunk0Length = buffer.readUInt32LE(12);
const chunk0Type = buffer.toString('utf8', 16, 20);

if (chunk0Type !== 'JSON') {
  console.error('First chunk is not JSON');
  process.exit(1);
}

// Read JSON Data
const jsonData = buffer.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonData);

// Extract all node names
if (gltf.nodes) {
  const nodeNames = gltf.nodes.map(n => n.name).filter(Boolean);
  const armBones = nodeNames.filter(name => name.toLowerCase().includes('arm') || name.toLowerCase().includes('hand') || name.toLowerCase().includes('finger') || name.toLowerCase().includes('shoulder'));
  
  console.log('--- POTENTIAL ARM BONES ---');
  armBones.forEach(name => console.log(name));
  
  if (armBones.length === 0) {
      console.log('\n--- ALL BONES ---');
      nodeNames.slice(0, 50).forEach(name => console.log(name)); // print first 50
  }
} else {
  console.log('No nodes found in GLTF JSON.');
}
