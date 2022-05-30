import { useState } from "react"
import getRandomCard from "./randomCard"


function App() {
  const [message, setMessage] = useState("Want to play a round?")
  const [dealerCards, setDealerCards] = useState([])
  const [dealerSum, setDealerSum] = useState("")
  const [playerCards, setPlayerCards] = useState([])
  const [playerSum, setPlayerSum] = useState("")
  const [player, setPlayer] = useState({
    name: "Player",
    chips: 200
  })
  const [result, setResult] = useState("")
  const [isAlive, setIsAlive] = useState(false)

  function renderGame() {
    setMessage("Do you want another card ?")

    if (playerSum === 21) {
      setMessage("BJ !")
      setResult(player.name + " wins !")
      setPlayer({...player, chips: player.chips + 10})
      setIsAlive(false)
    } else if (playerSum > 21) {
      setMessage("Bust !")
      setResult("Dealer wins !")
      setPlayer({...player, chips: player.chips - 10})
      setIsAlive(false)
    }
  }
  
  const startGame = () => {
    if (isAlive) {
      return
    }
    setIsAlive(true)
    // player always starts with 2 cards
    const firstCard = getRandomCard([])
    const secondCard = getRandomCard([firstCard])
    setPlayerCards([firstCard, secondCard])
    setPlayerSum(firstCard + secondCard)
    const dealerCard = getRandomCard([])
    setDealerCards([dealerCard])
    setDealerSum(dealerCard)
    renderGame()
  }
  const newCard = () => {

  }
  const stand = () => {

  }

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <p id="message-el">{message}</p>
      <p id="dealer-el">Dealer's cards: {dealerCards.join(" ")}</p>
      <p id="dealerSum-el">Dealer's sum: {dealerSum}</p>
      <p id="cards-el">Your cards: {playerCards.join(" ")} </p>
      <p id="sum-el">Sum: {playerSum} </p>
      <button id="startGame-btn" onClick={startGame}>Start Game</button>
      <button id="newCard-btn" onClick={newCard}>New Card</button>
      <button id="stand-btn" onClick={stand}>Stand</button>
      <p id="player-el">{player.name}: ${player.chips}</p>
      <p id="result-el">{result}</p>
    </div>
  );
}

export default App;
