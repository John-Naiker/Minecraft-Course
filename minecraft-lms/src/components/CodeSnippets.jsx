import { useState } from 'react';
import { Tab } from '@headlessui/react';
import number1 from '../llm_prompts/number1.js?raw';
import number2 from '../llm_prompts/number2.js?raw';
import castle from '../llm_prompts/castle.js?raw';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const snippets = [
  { name: 'Setup', code: number1 },
  { name: 'Environment', code: number2 },
  { name: 'Castle Builder', code: castle },
];

export default function CodeSnippets() {
  return (
    <div className="w-full px-4 py-8">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-[#03041A]/80 p-1">
          {snippets.map((snippet) => (
            <Tab
              key={snippet.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                 ${
                   selected
                     ? 'bg-gradient-to-r from-[#B95DCD] to-[#748DF4] text-white shadow'
                     : 'text-[#F1F2F0]/60 hover:text-[#F1F2F0] hover:bg-white/[0.12]'
                 }`
              }
            >
              {snippet.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {snippets.map((snippet) => (
            <Tab.Panel
              key={snippet.name}
              className="rounded-xl bg-[#03041A]/80 p-4 ring-1 ring-[#B95DCD]/10"
            >
              <SyntaxHighlighter
                language="javascript"
                style={nightOwl}
                customStyle={{
                  background: 'transparent',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                {snippet.code}
              </SyntaxHighlighter>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
