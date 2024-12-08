import { useAuth } from '../contexts/AuthContext';

export default function ExampleUsage() {
  const { sessionStartTime } = useAuth();
  
  // Example usage
  const getElapsedTime = () => {
    if (!sessionStartTime) return 0;
    return Math.floor((Date.now() - sessionStartTime) / 1000); // in seconds
  };

  return (
    <div>
      <p>Session started: {new Date(sessionStartTime).toLocaleString()}</p>
      <p>Elapsed time: {getElapsedTime()} seconds</p>
    </div>
  );
} 