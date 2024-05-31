import { useState ,useCallback,useEffect,useRef } from 'react'

function App() {
  const [len, setlen] = useState(8);
  const[num,setmum]=useState(false);
  const[char,setchar]=useState(false);
  const[Password,setpassword]=useState("");
  //use ref hook
  const passref=useRef(null)
  //use call back docs
  const Passwordgene=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num){
      str+="0123456789"
    }
    if (char) {
      str+="!@#$%^&*()-_+=[]{}~`"
    }
    for (let i = 1; i <len ; i++){
       let char=Math.floor(Math.random()*str.length+1)
       pass+=str.charAt(char)
    }
    setpassword(pass)

  },[len,num,char,Password])
  
  const copytoclipboard=useCallback(()=>{
    // passref.current?.select() use of
    window.navigator.clipboard.writeText(Password)
    alert("copied to clipboard")
  },[Password])

  //use effect hook 
  useEffect(()=>{
    Passwordgene()
  },[len,num,char,setpassword])
  return (
    <div className='flex items-center justify-center mt-20' >
     
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600 '
     >
      <h1 className='text-2xl text-center text-white my-1'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-2 my-2'>
        <input type='text'
        value={Password}
        className='outlne-none w-full py-1 px-3 '
        placeholder='password'
        readOnly
        ref={passref}></input>
        <button className='outline-none bg-blue-700 text-white
         px-3 py-0.5 shrink-0 hover:bg-orange-600'
         onClick={copytoclipboard}>copy</button>
      </div>
      <div className=' text-sm flex gap-x-2 my-1'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
            min={8}
            max={50}
            value={len}
            className=' cursor-pointer'
            onChange={(e)=>{setlen(e.target.value)}}/>
            <label>length: {len}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
          defaultChecked={num}
          id="numberInput"
          onChange={()=>{
            setmum((prev)=>!prev)}}></input>
          <label htmlFor="numberInput">number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
          defaultChecked={char}
          id="charInput"
          onChange={()=>{
            setchar((prev)=>!prev)}}></input>
          <label htmlFor="charInput">specialCharacter</label>
        </div>
      </div>
     </div>
    </div>
  )
}

export default App

