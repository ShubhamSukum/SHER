export default function CodeEntry({ onEnter }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = e.target.code.value.trim();
    if (!code) return alert('Enter a code');
    onEnter(code);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="code" placeholder="Enter your code" className="p-3 border rounded" />
        <button className="bg-blue-500 text-white p-3 rounded">Enter</button>
      </form>
    </div>
  );
}