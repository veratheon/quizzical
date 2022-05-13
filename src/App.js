import React from "react"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"

export default function App() {
  const [isPlay, setIsPlay] = React.useState(true)

  return(
    <div>
    {isPlay && <StartPage setPlay={setIsPlay}/>}
    {!isPlay && <QuizPage setPlay={setIsPlay}/>}
    </div>
  )
}


