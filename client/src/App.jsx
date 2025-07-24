import { useState } from 'react';
import CodeEntry from './components/CodeEntry';
import Dashboard from './components/Dashboard';

function App() {
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      {code ? <Dashboard code={code} goBack={() => setCode('')} /> : <CodeEntry onEnter={setCode} />}
    </div>
  );
}

export default App;