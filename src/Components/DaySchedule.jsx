import React from 'react'
import ClassBlock from './ClassBlock'

function DaySchedule(props) {
  return (
    <div>
      {props.day}
      <div style={{display: "grid", gridTemplateRows: "repeat(1440, 1fr)", height: "100vh"}}>
        {props.classes.map((course) => (
          <>
            <ClassBlock name={course.name} start={course.start} end={course.end}/>
          </>
        ))}
      </div>
    </div>
  )
}

export default DaySchedule