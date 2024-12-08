const code = `
const p = ModAPI.player
const w = ModAPI.world
const b = ModAPI.blocks
const blockPosConstructor = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors.find((x) => x.length === 3);
const setBlockState = ModAPI.hooks.methods.nmw_World_setBlockState;
const worldRef = w.getRef();
const blockStateRef = b.stone.getDefaultState().getRef();
`;

export default code;