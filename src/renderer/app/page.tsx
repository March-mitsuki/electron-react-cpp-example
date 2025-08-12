import { useEffect, useState } from "react";
import { hello } from "@/common";
import fs from "fs/promises";
import addon from "~/addon";

export default function Home() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState("");

  useEffect(() => {
    console.log("Home mounted");

    const f = async () => {
      const file = await fs.readFile("assets/test.json", "utf-8");
      setFile(file);

      // If success, it will print 8
      const ans = addon.add(5, 3);
      console.log(ans);

      // If path resolution ok, will print msg
      hello();
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
