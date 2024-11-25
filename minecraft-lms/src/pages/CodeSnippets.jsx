import { motion } from 'framer-motion';
import favicon from '../assets/RocketHour Favicon.svg';
import { useState } from 'react';

export default function CodeSnippets() {
  const [activeStep, setActiveStep] = useState(1);
  const [copySuccess, setCopySuccess] = useState('');

  const snippetContents = {
    'number1.txt': `// Initialize variables and get world reference
const worldRef = p.worldObj.getRef();
const blockPosConstructor = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors[0];
const blockStateRef = b.stonebrick.getDefaultState().getRef();`,
    'number2.txt': `// Create variables for castle dimensions
let width = 10;
let height = 5;
let depth = 10;

// Get player position
let startX = p.posX;
let startY = p.posY;
let startZ = p.posZ;`,
    'castle.txt': `let startX = p.posX, startY = p.posY, startZ = p.posZ;
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
}`
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy');
    }
  };

  const steps = [
    {
      number: 1,
      title: "Open Chrome Developer Tools",
      description: "Click the three dots menu in the top right of Chrome, then select More Tools → Developer Tools.",
      tip: "Pro tip: You can also use the keyboard shortcut Cmd + Option + I (Mac) or Ctrl + Shift + I (Windows)",
    },
    {
      number: 2,
      title: "Navigate to Snippets",
      description: "In the Developer Tools window, click on the Sources tab, then select the Snippets section.",
      tip: "Look for the >> symbol if you don't see the Snippets tab immediately",
    },
    {
      number: 3,
      title: "Add Code Snippets",
      description: "Create three new snippets and paste the following code blocks in order:",
      snippets: [
        {
          name: "Number 1",
          file: "number1.txt",
          description: "Initialize variables"
        },
        {
          name: "Number 2",
          file: "number2.txt",
          description: "Setup castle dimensions"
        },
        {
          name: "Castle",
          file: "castle.txt",
          description: "Build the castle"
        }
      ]
    }
  ];

  return (
    <div style={{ width: '800px' }} className="mx-auto px-4 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={favicon} alt="RocketHour" className="h-8 w-8" />
        </div>

        {/* Main Content */}
        <div className="bg-[#03041A]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#B95DCD]/10">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-[#F1F2F0] text-2xl font-medium mb-2">
                Building with Code
              </h2>
              <p className="text-[#F1F2F0]/60">
                Let's create a magnificent castle using JavaScript snippets
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`space-y-4 p-6 rounded-xl transition-all duration-200 ${
                    activeStep === step.number
                      ? 'bg-[#F1F2F0]/5 border border-[#B95DCD]/20'
                      : ''
                  }`}
                  onClick={() => setActiveStep(step.number)}
                >
                  {/* Step Header */}
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white font-medium">
                      {step.number}
                    </span>
                    <h3 className="text-[#F1F2F0] text-lg font-medium">
                      {step.title}
                    </h3>
                  </div>

                  {/* Step Content */}
                  <div className="ml-12">
                    <p className="text-[#F1F2F0]/80 mb-3">{step.description}</p>
                    
                    {/* Snippets Section */}
                    {step.snippets && (
                      <div className="space-y-4 mt-6">
                        {step.snippets.map((snippet, index) => (
                          <div
                            key={index}
                            className="bg-[#03041A] rounded-lg p-4 border border-[#F1F2F0]/10"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[#F1F2F0] font-medium">
                                {snippet.name}
                              </span>
                              <span className="text-[#C9E74C] text-sm">
                                {snippet.description}
                              </span>
                            </div>
                            <div className="mt-4">
                              <pre className="bg-[#03041A] rounded p-4 overflow-x-auto">
                                <code className="text-[#F1F2F0]/80 text-sm font-mono">
                                  {snippetContents[snippet.file]}
                                </code>
                              </pre>
                            </div>
                            <div className="flex items-center justify-end mt-2 space-x-4">
                              <span className="text-[#C9E74C] text-sm">
                                {copySuccess && activeStep === step.number ? copySuccess : ''}
                              </span>
                              <button
                                className="text-[#748DF4] text-sm hover:text-[#B95DCD] transition-colors duration-200 flex items-center space-x-2"
                                onClick={() => handleCopy(snippetContents[snippet.file])}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                <span>Copy Code</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pro Tip */}
                    {step.tip && (
                      <div className="mt-4 flex items-start space-x-2">
                        <span className="text-[#C9E74C]">💡</span>
                        <p className="text-[#F1F2F0]/60 text-sm">{step.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Important Note */}
            <div className="bg-[#DA5A33]/10 rounded-lg p-4 border border-[#DA5A33]/20">
              <p className="text-[#F1F2F0]/80 text-sm">
                <span className="text-[#DA5A33] font-medium">Important:</span>{' '}
                Run the snippets in order (1 → 2 → Castle) by clicking the play button ▶️ in the Sources panel. Each snippet builds upon the previous one to create your castle.
              </p>
            </div>

            {/* Complete Button */}
            <button
              className="w-full bg-gradient-to-r from-[#B95DCD] via-[#9B6BE1] to-[#748DF4] text-white font-medium rounded-lg py-4 text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#B95DCD] before:via-[#9B6BE1] before:to-[#748DF4] before:rounded-lg before:-z-10 before:blur-[2px]"
            >
              I am complete
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
