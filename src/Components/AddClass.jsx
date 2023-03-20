import React from 'react'

function AddClass(props) {
  return (
    <>
        <div className='w-screen h-screen absolute bg-white top-0 opacity-50'>
            
        </div>
        <div className='flex justify-center align-middle absolute top-0 w-screen h-screen'>
            <div className='absolute bg-slate-500 m-auto flex flex-col m-16'>
                <input placeholder='Course Title' className='m-8'/>
                <input placeholder='Course Location'className='m-8'/>
                <input type={"time"} className='m-8'/>
                <input type={"time"} className='m-8'/>
                <form className='m-8 flex justify-between '>
                    <input type={"checkbox"}/>
                    <input type={"checkbox"}/>
                    <input type={"checkbox"}/>
                    <input type={"checkbox"}/>
                    <input type={"checkbox"}/>
                    
        
                </form>
            </div>
        </div >
    </>
  )
}

export default AddClass