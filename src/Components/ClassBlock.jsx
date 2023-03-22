import React from 'react'

function ClassBlock(props) {
    return (
        <>

            <div style={{ gridRowStart: props.start, gridRowEnd: props.end, backgroundColor: "blue", color: "white" }}>
                {props.name}
            </div>
        </>
    )
}

export default ClassBlock