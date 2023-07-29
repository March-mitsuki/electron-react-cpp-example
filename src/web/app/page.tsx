import { useEffect, useState } from "react";
import fs from "fs/promises";

export default function Home() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState("");

  useEffect(() => {
    console.log("Home mounted");

    const f = async () => {
      const file = await fs.readFile(process.cwd() + "/test.json", "utf-8");
      setFile(file);
    };

    f().catch((err) => setFile(err.message));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div>
        <p>File: {file}</p>
      </div>
    </div>
  );
}
