import React from "react"
import Question from "./Question"




export default function QuizPage(props) {

    const [questions, setQuestions] = React.useState(null)
    const [isChecked, setIsChecked] = React.useState(false)
    const [rollQuiz, setRollQuiz] = React.useState(false)
    let score = 0;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5)
      }

    function txtReader(txt) {
        const text = document.createElement("textarea")
        text.innerHTML = txt
        return text.value
    }
    
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response => response.json())
        .then(data => {
            const questions = []
            data.results.map((question, index) => {
                const allAnswers = shuffle([question.correct_answer, ...question.incorrect_answers])
                const answers = allAnswers.map(answer => ({text: txtReader(answer), isHold: false, classes: "answer"}))
                questions.push({
                    question: txtReader(question.question),
                    answers: answers,
                    correctAnswer: txtReader(question.correct_answer),
                    key: index
                })
            })
            setQuestions(questions)
            })
    }, [rollQuiz])

    function handle(answerValue, questionKey) { 
        setQuestions(oldQuestions => {
            const newQuestion = []
            oldQuestions.map((question, index) => {
                if (index === questionKey){
                    newQuestion.push({
                        ...question, 
                        answers: question.answers.map(answer => {
                            return (answer.text === answerValue ? 
                                {...answer, isHold: !answer.isHold, classes: "answer hold"} : 
                                {...answer, isHold: false, classes: "answer"} )
                        }
                    )})
                } else {
                    newQuestion.push(question)
                }
        })
        return newQuestion
        })
    }

    function handleCheck() {
        setIsChecked(old => !old)
        setQuestions(oldQuestions => {
            const newQuestions = []
            oldQuestions.map(question =>{
                newQuestions.push({...question, answers: question.answers.map(answer => {
                    if (answer.text === question.correctAnswer){
                        return {...answer, classes: "answer correct"}
                        if (answer.isHold){
                            score = score + 1
                        }
                        }else {
                            if (answer.text !== question.correctAnswer && answer.isHold){
                                return {...answer, classes: "answer wrong"}
                            }else {
                                return {...answer, classes: "answer inactive"}
                            }
                        }
                    })})
            })
            return newQuestions
        })
        
    }

    function playAgain() {
        setIsChecked(old => !old)
        setRollQuiz(old => !old)
    }

    return(
        <div className="start-page question-container">
            {questions ? 
            questions.map((question, index) => 
                <Question key={index} question={question} handle={handle}/>) : 
            <p>wait a little</p>
            }
            <div className="bottom-info">
                {!isChecked && <button className="check-quiz no-checked" onClick={handleCheck}>Check Quiz</button>}
                {isChecked && <button className="check-quiz" onClick={playAgain}>Play again</button>}
                {isChecked && <p className="score">Your score: {score} / 5</p>}
            </div>
        </div>
    )
}