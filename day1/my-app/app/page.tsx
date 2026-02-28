"use client";

import { useState} from "react";

export default function Home(){
  const [count ,setCount] = useState(0);

  return(
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-cold">カウンター</h1>
      <p className="text2xl">{count}</p>
      <button
        className="px-4 py-2 rounded-xl bg-black text-white"
        onClick={() => setCount(count + 1)}
        >
        +1
        </button>
    </main>
  );
}