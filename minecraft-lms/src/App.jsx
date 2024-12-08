import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Intro from './pages/Intro';
import Setup from './pages/Setup';
import Instructions from './pages/Instructions';
import CodeSnippets from './pages/CodeSnippets';
import AdminLayout from './pages/admin/AdminLayout';
import Classes from './pages/admin/Classes';
import Users from './pages/admin/Users';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/code-snippets" element={<CodeSnippets />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="classes" element={<Classes />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
