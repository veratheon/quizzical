import React from "react"

function getButtons(answers, keyOfQuestion, handle) {
    return (
        answers.map((answer, index) => <button
        className = {answer.classes}
        onClick = {() => handle ? handle(answer.text, keyOfQuestion) : null}
        key = {index}>{answer.text}</button>)
    )
}

export default function Question(props) {
    return(
        <div className="question">
            <h2 className="title question-title">{props.question.question}</h2>
            {getButtons(props.question.answers, props.question.key, props.handle)}
        
        </div>
    )
}