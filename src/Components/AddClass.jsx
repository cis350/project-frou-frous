import React, { useRef, useState } from 'react'
import axios from 'axios'

function AddClass(props) {
    const baseURL = "http://localhost:3000"
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [days, setDays] = useState(new Array(5).fill(false))
    const submitClass = (e) => {
        console.log(start)
        const addNewClass = async () => {
            for (var i =0; i <= 5; i++){
                if (days[i]){
                    try{
                        const prev = await axios.get(`${baseURL}/classes/${i}`)
                        var prevObj = prev.data
                        prevObj.classes.push({
                            name: title,
                            location : location,
                            start: start,
                            end: end
                        })
                        await axios.put(`${baseURL}/classes/${i}`, prevObj)
                    } catch (error) {
                        console.log(error)
                    }
                }
                
            }
            
            
        }
        addNewClass()

    }
    const handleDay = (e, i) => {
        var newDays = days
        newDays[i] = (e.target.checked)
        setDays(newDays)
    }
    const handleTime = (e, i) => {
        const splitTime = e.target.value.split(":")
        const newTime = Number(splitTime[0]) * 60 + Number(splitTime[1])
        if (i===0){
            setStart(newTime)
        } else {
            setEnd(newTime)
        }
    }
    return (
        <>

            <div className='flex justify-center align-middle items-center absolute top-0 w-screen h-screen z-10 m-0 p-0'>
                <div className='w-screen h-screen absolute bg-white top-0 opacity-50 m-0 p-0' onClick={props.handleChild} />
                <div className='absolute bg-slate-500 p-8 flex flex-col justify-center items-center '>
                    <form  className='m-8 flex justify-between flex-col'>
                        <input placeholder='Course Title' value={title} className='' onChange={(e) => setTitle(e.target.value)}/>
                        <input placeholder='Course Location' className='m-4' onChange={(e) => setLocation(e.target.value)}/>
                        <input type={"time"} className='m-8' onChange={(e) => handleTime(e, 0)}/>
                        <input type={"time"} className='m-8' onChange={(e) => handleTime(e, 1)}/>

                        <div className='flex items-center justify-center mb-8'>
                            <input type={"checkbox"} name="m" onChange={(e) => handleDay(e, 0)}/>
                            <label htmlFor="m" >M</label>
                            <input type={"checkbox"} name="t" onChange={(e) => handleDay(e, 1)}/>
                            <label htmlFor="t">T</label>
                            <input type={"checkbox"} name="w" onChange={(e) => handleDay(e, 2)}/>
                            <label htmlFor="w">W</label>
                            <input type={"checkbox"} name="th" onChange={(e) => handleDay(e, 4)}/>
                            <label htmlFor="th">T</label>
                            <input type={"checkbox"} name="f" onChange={(e) => handleDay(e, 5)}/>
                            <label htmlFor="f">F</label>
                        </div>
                        
                    </form>
                    <button className='bg-white' onClick={(e) => submitClass(e)}>Add Class</button>

                </div>
            </div >
        </>
    )
}

export default AddClass