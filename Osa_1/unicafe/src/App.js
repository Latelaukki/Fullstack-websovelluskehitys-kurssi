import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }
  return (
    <>
      <StatisticLine value={good} text="good" />
      <StatisticLine value={neutral} text="neutral" />
      <StatisticLine value={bad} text="bad" />
      <StatisticLine value={good + neutral + bad} text="all" />
      <StatisticLine value={(good - bad) / (good + neutral + bad)} text="average" />
      <StatisticLine value={good / (good + neutral + bad) * 100} text="positive" symbol="%"/>
    </>
  )
}

const StatisticLine = ({ value, text, symbol}) => (
  <table>
    <tbody>
      <tr>
        <td width ="65px"> {text}</td><td>{value} {symbol}</td>
      </tr>
    </tbody>
  </table>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = () => {
    setGood(good + 1)
  }

  const setNeutralValue = () => {
    setNeutral(neutral + 1)
  }

  const setBadValue = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodValue(good + 1)} text="good" />
      <Button handleClick={() => setNeutralValue(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBadValue(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App