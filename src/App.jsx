import React, { useState } from 'react'
import { URL } from './constants';

const App = () => {

  const [question,setQuestion] = useState('');
  const [result,setResult] = useState(undefined)

  const payload ={
    "contents":[
      {
        "parts":[
          {
            "text":question
          }
        ]
      }
    ]
  }
  const askQuestion=async()=>{
    let response = await fetch(URL,{
      method:"POST",
      body:JSON.stringify(payload)
    })

    response = await response.json();
    
    let datastring = response.candidates[0].content.parts[0].text;
    datastring = datastring.split("* ")
    datastring = datastring.map((item)=>item.trim())
   
    setResult(datastring)
  }


  return (

    <div className='grid grid-cols-5'>
     <div className='col-span-1 bg-zinc-800 h-screen'>

     </div>
     <div className='col-span-4  p-10'>
    <div className='container h-110 overflow-y-scroll scroll-smooth mb-5 scrollbar-hide '>
          <div className='text-white '>

          {result}
          </div>

        </div>
        <div className='bg-zinc-800 rounded-4xl  w-1/2 p-1 pr-5 text-white m-auto border border-zinc-700 flex h-16 '>
            <input type='text' value={question} onChange={(event)=>setQuestion(event.target.value)} placeholder='Ask me Anything' className='w-full h-full p-3 outline-none '></input>
            <button onClick={askQuestion}>Ask</button>
        </div>
     </div>
    </div>
  )
}

export default App
