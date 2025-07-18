import React, { useCallback, useEffect, useState, useRef } from 'react';

export default function Password() {
    const [length, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*()_+{}[]";

        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numAllowed, charAllowed]);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 100);
        window.navigator.clipboard.writeText(password);
    }, [password]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numAllowed, charAllowed, passwordGenerator]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-4"> Password Generator</h1>
                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="text"
                        value={password}
                        className="bg-gray-700 text-white w-full py-2 px-3 rounded-lg outline-none"
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        onClick={copyPasswordToClipboard}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Copy
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="range"
                        min={6}
                        max={100}
                        value={length}
                        className="cursor-pointer w-full accent-blue-500"
                        onChange={(e) => setLength(Number(e.target.value))}
                    />
                    <label className="block mt-2">Length: <span className="font-semibold">{length}</span></label>
                </div>
                <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={numAllowed}
                            onChange={() => setNumAllowed((prev) => !prev)}
                            className="accent-blue-500"
                        />
                        Numbers
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={charAllowed}
                            onChange={() => setCharAllowed((prev) => !prev)}
                            className="accent-blue-500"
                        />
                        Characters
                    </label>
                </div>
            </div>
        </div>
    );
}
