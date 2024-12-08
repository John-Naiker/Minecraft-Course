const code = `let startX = p.posX, startY = p.posY, startZ = p.posZ;
for (let i = 5; i > 0; i--) {
    const message = ModAPI.reflect.getClassById("net.minecraft.util.ChatComponentText").constructors[0](ModAPI.util.str(\`Building Castle in: \${i}\`))
    p.addChatMessage(message)
    await new Promise(resolve => setTimeout(resolve, 1000));
}

// Build castle walls
for (let x = startX; x < startX + 10; x++) {
    for (let y = startY; y < startY + 5; y++) {
        setBlockState(worldRef, blockPosConstructor(x, y, startZ), blockStateRef, 3);
        setBlockState(worldRef, blockPosConstructor(x, y, startZ + 10), blockStateRef, 3);
    }
}
for (let z = startZ; z <= startZ + 10; z++) {
    for (let y = startY; y < startY + 5; y++) {
        setBlockState(worldRef, blockPosConstructor(startX, y, z), blockStateRef, 3);
        setBlockState(worldRef, blockPosConstructor(startX + 10, y, z), blockStateRef, 3);
    }
}

// Add towers
let towerHeight = 16;
for (let dx = 0; dx <= 10; dx += 10) {
    for (let dz = 0; dz <= 10; dz += 10) {
        for (let y = startY; y < startY + towerHeight; y++) {
            setBlockState(worldRef, blockPosConstructor(startX + dx, y, startZ + dz), blockStateRef, 3);
        }
    }
}

// Add door and windows
setBlockState(worldRef, blockPosConstructor(startX + 5, startY + 1, startZ), b.air.getDefaultState().getRef(), 3); // Door space
for (let y = startY + 2; y < startY + 4; y++) {
    setBlockState(worldRef, blockPosConstructor(startX + 3, y, startZ), b.glass_pane.getDefaultState().getRef(), 3);
    setBlockState(worldRef, blockPosConstructor(startX + 7, y, startZ), b.glass_pane.getDefaultState().getRef(), 3);
}

// Add battlements
for (let x = startX; x <= startX + 10; x += 2) {
    setBlockState(worldRef, blockPosConstructor(x, startY + 5, startZ), b.stone_slab.getDefaultState().getRef(), 3);
    setBlockState(worldRef, blockPosConstructor(x, startY + 5, startZ + 10), b.stone_slab.getDefaultState().getRef(), 3);
}
for (let z = startZ; z <= startZ + 10; z += 2) {
    setBlockState(worldRef, blockPosConstructor(startX, startY + 5, z), b.stone_slab.getDefaultState().getRef(), 3);
    setBlockState(worldRef, blockPosConstructor(startX + 10, startY + 5, z), b.stone_slab.getDefaultState().getRef(), 3);
}`;

export default code;
