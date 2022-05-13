import React from "react"

export default function StartPage(props) {
    function handleClick() {
        props.setPlay(old => !old)
    }
    return(
        <div className="start-page">
            <h1 className="title start-title">Quizzical</h1>
            <p className="description">Let's move brain</p>
            <botton className="start-quiz" onClick = {handleClick}>Start quiz</botton>
        </div>
    )
}