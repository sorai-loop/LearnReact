import { useState } from 'react'
import './App.css'

function Counter(){
  const [count, setCount] = useState(0);

  return (
    <>
      <p>現在のカウント：{count}</p>

      <button onClick={() => {
        setCount(count+1);
        console.log("押された！");
      }}>1増えるよ！</button>
    </>
  );
}

function App() {
  return(
    <>
      <Counter /> 
    </>
  );
}

export default App
