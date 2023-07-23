import { useState } from 'react'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function indexOfMax(arr) {
  if(arr.length === 0) {
    return -1;
  }
  let max = arr[0]
  let maxIndex = 0

  for(let i = 0; i < arr.length; i++) {
    if(arr[i] > max) {
      maxIndex = i
      max = arr[i]
    }
  }

  return maxIndex
}

const Header = ({content}) =>  <h1>{content}</h1>
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const changeSelected = () => {
    const index = getRandomIntInclusive(0, anecdotes.length-1)
    setSelected(index)
  }
  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <Header content={"Anecdote of the day"} />
      <div>
        {anecdotes[selected]}<br></br>
        has {votes[selected]} votes
      </div>
      <Button onClick={handleVote} text={"vote"}/>
      <Button onClick={changeSelected} text={"next anecdote"}/>
      <Header content={"Anecdote of the day"} />
      <div>
        {anecdotes[indexOfMax(votes)]}
      </div>
    </>
  )
}

export default App