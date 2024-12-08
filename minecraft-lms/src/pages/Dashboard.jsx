import { useAuth } from '../contexts/AuthContext';
import CodeSnippets from '../components/CodeSnippets';

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-[#03041A] text-[#F1F2F0]">
      <header className="bg-[#03041A]/80 backdrop-blur-sm border-b border-[#B95DCD]/10 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Welcome, {currentUser?.username}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[#F1F2F0]/60">
                {currentUser?.role === 'student' ? 'Student' : 'Admin'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8">
        <div className="bg-[#03041A]/80 backdrop-blur-sm border border-[#B95DCD]/10 rounded-xl">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Minecraft Code Snippets</h2>
            <p className="text-[#F1F2F0]/60 mb-8">
              Use these code snippets to build amazing things in Minecraft!
            </p>
            <CodeSnippets />
          </div>
        </div>
      </main>
    </div>
  );
}
