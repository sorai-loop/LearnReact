import { createContext, useState } from 'react';

import WrapperA from './WrapperA';
import ComponentB from './ComponentB';

export const TextContext = createContext();

function App() {
  const [inputText, setInputText] = useState('');

  return(
    <TextContext.Provider value={{inputText, setInputText}}>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <WrapperA/>
        <ComponentB/>
      </div>
    </TextContext.Provider>
  )
}

export default App;