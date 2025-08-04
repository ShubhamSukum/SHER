import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const Dashboard = () => {
  const { code } = useParams();
  const [contents, setContents] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [type, setType] = useState("text");

  const fetchContents = async () => {
    const res = await api.get(`/content/${code}`);
    setContents(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", code);
    formData.append("type", type);
    if (type === "text") formData.append("text", text);
    else if (file) formData.append("file", file);

    await api.post("/content", formData);
    setText("");
    setFile(null);
    fetchContents();
  };

  useEffect(() => {
    fetchContents();
  }, [code]);

  const handleDelete = async (id) => {
    await api.delete(`/content/${id}`);
    fetchContents();
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Dashboard: {code}</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded-xl w-full">
          <option value="text">Text</option>
          <option value="file">File</option>
          <option value="audio">Audio</option>
        </select>
        {type === "text" ? (
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" className="border p-2 rounded-xl w-full" />
        ) : (
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded-xl w-full" />
        )}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">Upload</button>
      </form>

      <div className="space-y-2">
        {contents.map((item) => (
          <div key={item._id} className="p-4 border rounded-xl flex justify-between items-center bg-white shadow-sm">
            {item.type === "text" && <p>{item.text}</p>}
            {item.type === "file" && <a href={`data:${item.fileData.contentType};base64,${btoa(String.fromCharCode(...new Uint8Array(item.fileData.data.data)))}`} download={item.filename} className="text-blue-600 underline">{item.filename}</a>}
            {item.type === "audio" && <audio controls src={`data:${item.fileData.contentType};base64,${btoa(String.fromCharCode(...new Uint8Array(item.fileData.data.data)))}`} />}
            <button onClick={() => handleDelete(item._id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
