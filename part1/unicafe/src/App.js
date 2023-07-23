import { useState } from 'react'

const Header = ({content}) =>  <h1>{content}</h1>

const Statistics = (props) => {
  const {good, neutral, bad} = props.feedback
  const total = good + neutral + bad
  const average = (good - bad) / total
  const percentagePositive = `${good / total * 100} %`
  if(total === 0){
    return (
      <p>No feedback given</p>
    )
  }else{
    return(
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={good} /></tr>
          <tr><StatisticLine text="neutral" value={neutral} /></tr>
          <tr><StatisticLine text="bad" value={bad} /></tr>
          <tr><StatisticLine text="all" value={total} /></tr>
          <tr><StatisticLine text="average" value={average} /></tr>
          <tr><StatisticLine text="positive" value={percentagePositive}/></tr>
        </tbody>
      </table>
    )
  }
}

const StatisticLine = (props) => {
  return(
    <>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </>
  )
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback ={
    good: good,
    neutral: neutral,
    bad: bad,
  }

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header content={"give feedback"} />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Header content={"statistics"} />
      <Statistics feedback={feedback}/>
    </div>
  )
}

export default App