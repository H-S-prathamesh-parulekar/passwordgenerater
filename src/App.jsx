import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy");

  const passwordRef = useRef(null);

  // Function to generate password
  const generatePassword = useCallback(() => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*-_+=[]{}~`";

    let characters = charset;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    const newPassword = Array.from({ length }, () => 
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");

    setPassword(newPassword);
  }, [length, includeNumbers, includeSymbols]);

  // Function to copy password to clipboard
  const copyToClipboard = useCallback(() => {
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 1500);
    });
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols, generatePassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-5 my-8 bg-gray-900 text-orange-400">
      <h1 className="text-white text-center text-xl font-bold my-3">
        Password Generator
      </h1>

      {/* Password Display */}
      <div className="flex items-center shadow-sm rounded-lg overflow-hidden mb-4 border border-gray-700">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="w-full py-2 px-3 bg-gray-800 text-white rounded-l-md outline-none"
          placeholder="Generated Password"
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-r-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {copyStatus}
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-y-3 text-sm">
        {/* Length Slider */}
        <div className="flex items-center gap-x-3">
          <label className="text-white">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer accent-orange-400"
          />
        </div>

        {/* Number Checkbox */}
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers((prev) => !prev)}
            className="cursor-pointer"
            id="numbers"
          />
          <label htmlFor="numbers" className="text-white cursor-pointer">
            Include Numbers
          </label>
        </div>

        {/* Symbol Checkbox */}
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols((prev) => !prev)}
            className="cursor-pointer"
            id="symbols"
          />
          <label htmlFor="symbols" className="text-white cursor-pointer">
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
