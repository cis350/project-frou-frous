import React from 'react'
import DaySchedule from './DaySchedule'

function Schedule() {
    const DUMMY_DATA = [
        {
            day: "Monday",
            classes: [
                {
                    name: "CIS 320",
                    start: 915,
                    end: 1020
                },
                {
                    name: "CIS 300",
                    start: 600,
                    end: 700
                }
            ]
        },
        {
            day: "Tuesday",
            classes: [
                {
                    name: "CIS 320",
                    start: 300,
                    end: 400
                },
                {
                    name: "CIS 300",
                    start: 600,
                    end: 700
                }
            ]
        },
        {
            day: "Monday",
            classes: [
                {
                    name: "CIS 320",
                    start: 915,
                    end: 1020
                },
                {
                    name: "CIS 300",
                    start: 600,
                    end: 700
                }
            ]
        },
        {
            day: "Tuesday",
            classes: [
                {
                    name: "CIS 320",
                    start: 300,
                    end: 400
                },
                {
                    name: "CIS 300",
                    start: 600,
                    end: 700
                }
            ]
        },
        {
            day: "Tuesday",
            classes: [
                {
                    name: "CIS 320",
                    start: 300,
                    end: 400
                },
                {
                    name: "CIS 300",
                    start: 600,
                    end: 700
                }
            ]
        }
    ]
    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(7, 1fr)"}}>
            {DUMMY_DATA.map((day) => (
                <>
                    <DaySchedule day={day.day} classes={day.classes} />

                </>
            ))}
        </div>
    )
}

export default Schedule