import { useState } from 'react';
import { motion } from 'framer-motion';
import favicon from '../assets/RocketHour Favicon.svg';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import number1 from '../llm_prompts/number1.js?raw';
import number2 from '../llm_prompts/number2.js?raw';
import castle from '../llm_prompts/castle.js?raw';

SyntaxHighlighter.registerLanguage('javascript', js);

export default function CodeSnippets() {
  const [activeStep, setActiveStep] = useState(1);
  const [copySuccess, setCopySuccess] = useState('');

  const snippets = [
    {
      name: 'Setup',
      code: number1,
      description: 'Initialize the Minecraft environment'
    },
    {
      name: 'Environment',
      code: number2,
      description: 'Set up variables and get player position'
    },
    {
      name: 'Castle Builder',
      code: castle,
      description: 'Build an amazing castle with towers and battlements'
    }
  ];

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
      description: "In the Developer Tools, click on the Sources tab, then find the Snippets section in the left sidebar.",
      tip: "Can't find Snippets? Click the >> icon in the left sidebar to see more options",
    },
    {
      number: 3,
      title: "Create New Snippet",
      description: "Right-click in the Snippets section and select 'New snippet'. Name it something memorable.",
      tip: "You can create multiple snippets to organize your code",
    },
  ];

  return (
    <div style={{ width: '800px' }} className="mx-auto px-4">
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
                Code Snippets
              </h2>
              <p className="text-[#F1F2F0]/60">
                Copy and paste these snippets into Chrome DevTools
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: step.number * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white font-medium">
                      {step.number}
                    </span>
                    <h3 className="text-[#F1F2F0] text-lg font-medium">
                      {step.title}
                    </h3>
                  </div>
                  <div className="ml-11 space-y-2">
                    <p className="text-[#F1F2F0]/80">{step.description}</p>
                    <p className="text-[#C9E74C] text-sm">{step.tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Code Snippets */}
            <div className="space-y-8">
              {snippets.map((snippet, index) => (
                <motion.div
                  key={snippet.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-[#F1F2F0] text-lg font-medium">
                      {snippet.name}
                    </h3>
                    <button
                      onClick={() => handleCopy(snippet.code)}
                      className="px-4 py-2 bg-[#03041A] border border-[#F1F2F0]/10 rounded-lg text-[#F1F2F0]/60 hover:text-[#F1F2F0] hover:border-[#B95DCD] transition-all duration-200"
                    >
                      {copySuccess && copySuccess === snippet.name ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-[#F1F2F0]/60 text-sm">{snippet.description}</p>
                  <div className="relative rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language="javascript"
                      style={nightOwl}
                      customStyle={{
                        background: 'transparent',
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                      }}
                    >
                      {snippet.code}
                    </SyntaxHighlighter>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
