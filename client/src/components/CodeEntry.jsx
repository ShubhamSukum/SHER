import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CodeEntry = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      navigate(`/dashboard/${code}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg space-y-4 w-80">
        <h1 className="text-2xl font-bold text-center">CODE</h1>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Your Secret Code"
          className="w-full border p-2 rounded-xl"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
          ENTER / CREATE CODE
        </button>
      </form>
    </div>
  );
};

export default CodeEntry;
