"use client"

import {useState} from "react"

export default function Component(){
  const [value, setValue] = useState(0);

  return(
    <>
      <div>
        {value}
        <button onClick={()=>setValue(value+1)}>
        +1
        </button>
      </div>
      <div>
        <button onClick={()=>
          {
            if(value-1>=0){
              setValue(value-1);
            } 
          }
        }>
        -1
        </button>
      </div>
    </>
  )
}