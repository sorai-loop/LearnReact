import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function Counter(){
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("読み込まれたよ！");
  }, []);

  useEffect(() => {
    console.log("値が増えたよ！");
  }, [count]);

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
