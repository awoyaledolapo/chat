"use client"
import {useState} from 'react'
import { useSignalR } from '@/hooks/signalR'
import { FiSend } from "react-icons/fi";



const Chatapp = () => {
const [username,setUsername ]=useState("")
const {messages,sendMessage }=useSignalR()
const [input,setInput ]=useState("")

const handleSend = () => {
   
    if (input.trim() && username.trim()) {
      sendMessage(username, input);
      setInput("");
    }
  };


  return (
    <div className='bg-gray-100 p-4 max-w-xs mx-auto rounded-xl shadow-md flex flex-col gap-10'>
        <input className='p-2 border rounded' type="text" name='username' placeholder='user' onChange={e=>{setUsername(e.target.value)}}/>

         <div className="border h-64 overflow-y-auto mb-2 p-2  rounded">
        {messages.map((mes, index) => (
           <div
      key={index}
      className="max-w-sm px-4 py-2 rounded-lg shadow text-white bg-amber-100 flex  flex-col mb-2"
    >
      <span className="text-xs text-gray-500 ">{mes.user}</span>
      <span className="text-[24px]">{mes.message}</span>
    </div>
        ))}


      </div>

      <div className='bg-white '>
        <input className=' p-2 '  value={input} type='text' placeholder='send Text' name="message" onChange={e=>{setInput(e.target.value)}}/>
        <button onClick={handleSend} className='cursor p-2 '>
          <FiSend size={20} />
        </button>
     
      </div>
    </div>
  )
}

export default Chatapp