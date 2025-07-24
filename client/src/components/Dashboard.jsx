import { useEffect, useState } from 'react';
import { fetchContentByCode, uploadContent } from '../api';

export default function Dashboard({ code, goBack }) {
  const [content, setContent] = useState([]);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const loadData = async () => {
    const items = await fetchContentByCode(code);
    setContent(items);
  };

  useEffect(() => { loadData(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!text && !file) return alert('Enter text or file');
    const form = new FormData();
    form.append('code', code);
    if (text) form.append('text', text);
    if (file) form.append('file', file);
    await uploadContent(form);
    setText('');
    setFile(null);
    await loadData();
  };

  const renderItem = (item) => {
    if (item.type === 'text') return <p className="whitespace-pre-wrap">{item.text}</p>;
    const blob = new Blob([Uint8Array.from(item.fileData.data)], { type: item.fileData.contentType });
    const url = URL.createObjectURL(blob);
    if (item.type === 'audio') return <audio controls src={url} />;
    return <a href={url} download={item.filename} className="text-blue-500 underline">Download {item.filename}</a>;
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 space-y-4">
      <h2 className="text-xl font-bold text-center">Your Code: {code}</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-2">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." className="p-2 border rounded" />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="bg-green-600 text-white p-2 rounded">Upload</button>
      </form>
      <div className="space-y-4">
        {content.map(item => (
          <div key={item._id} className="bg-white shadow p-3 rounded">{renderItem(item)}</div>
        ))}
      </div>
      <button onClick={goBack} className="text-blue-500 underline block text-center mt-4">← Back</button>
    </div>
  );
}