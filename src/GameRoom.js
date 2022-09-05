import { useCallback, useState } from "react"
import Button from "./Button"
import { getRandomCard } from "./CardUtil"
import NameSection from "./NameSection"


function GameRoom() {
  // Setup global state
  const [user, setUser] = useState({
    name: 'GUEST',
    chips: 200
  })
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [playerSum, setPlayerSum] = useState(0)
  const [dealerSum, setDealerSum] = useState(0)
  const [isAlive, setIsAlive] = useState(false)
  const [message, setMessage] = useState("Want to play a round?")

  // function called uppon hittin the Start Game button
  const startGame = () => {
    // in order for the game to be able to start, the isAlive state should be false
    if (isAlive) {
      return
    }
    // as soon as we set the isAlive state to true, the player should not be able to start the game again until the stand function is called uppon and the isAlive state will change back to false 
    setIsAlive(true)
    setMessage("Would you like another card?")
    const firstCard = getRandomCard([])
    const secondCard = getRandomCard([firstCard])
    // player always starts with 2 cards
    setPlayerCards([firstCard, secondCard])
    setPlayerSum(firstCard + secondCard)
    const dealerCard = getRandomCard([])
    // dealer always shows 1 card untill player stands
    setDealerCards([dealerCard])
    setDealerSum(dealerCard)
    // the newPlayerSum variable was defined in order to be able to render the corect message via bustOrBj function in a synchronous way
    let newPlayerSum = (firstCard + secondCard)
    bustOrBj(newPlayerSum)
  }

  // function called uppon hiting the New Card button
  const newCard = () => {
    // in order to draw a new card the isAlive state should be true - this means the game started
    // if the isAlive state is false, then it doesn't make sense for the player to draw a card
    if (isAlive) {
      const randomCard = getRandomCard([])
      playerCards.push(randomCard)
      setPlayerCards([...playerCards])
      setPlayerSum(playerCards.reduce((total, card) => {
        return total + card
      }, 0))
      // the newPlayerSum variable was defined in order to be able to be able to render the corect message via bustOrBj function in a synchronous way
      let newPlayerSum = (playerCards.reduce((total, card) => {
        return total + card
      }, 0))
      bustOrBj(newPlayerSum)
    }
  }

  // function called uppon hiting the stand button
  const stand = () => {
    // the stand function should only fire all the logic inside only if the isAlive state is true
    if (!isAlive) {
      return
    }
    // as soon as the stand function is called, the isAlive state will return to it's initial state (false) in order for the player to be able to start a new game
    setIsAlive(false)
    // the two variables (newDealerSum and newDealerCards) were defined in order to be able to deal with the while loop in a synchronous way and to avoid manually changing the react state
    let newDealerSum = dealerSum
    let newDealerCards = [...dealerCards]
    while (newDealerSum < 16 || playerSum > newDealerSum) {
      const randomCard = getRandomCard([newDealerCards])
      newDealerCards.push(randomCard)
      newDealerSum += randomCard
    }
    setDealerCards([...newDealerCards])
    setDealerSum(newDealerCards.reduce((total, card) => {
      return total + card
    }, 0))
    endGame(newDealerSum)
  }

  // the values shown (rendered) with a space between them
  const renderedPlayerCards = playerCards.join(' ')
  const renderedDealerCards = dealerCards.join(' ')

  // the end game logics in case that the player wins or loses (BJ or Bust) before the dealer cards are even needed to be taken in consideration
  const bustOrBj = newPlayerSum => {
    if (newPlayerSum > 21) {
      setMessage('Bust! - You lose!')
      setIsAlive(false)
      setUser({...user, chips: user.chips - 10})
    }
    if (newPlayerSum == 21 && playerCards.length == 2) {
      setMessage('BLACKJACK! - You win!')
      setIsAlive(false)
      setUser({...user, chips: user.chips + 10})
    }
  }

  // the end game logic: after the player decides to hit stand, the player didn't get blackjack or didn't go above 21 just by drawing new cards
  const endGame = (newDealerSum) => {
    if (playerSum == newDealerSum) {
      setMessage('Draw! - Money back!')
      return
    }
    if (newDealerSum > playerSum && newDealerSum <= 21) {
      setMessage('You lose!')
      setUser({...user, chips: user.chips - 10})
      return
    }
      setMessage('You win!')
      setUser({...user, chips: user.chips + 10})
  }

  const changeName = newName => {
    setUser({...user, name: newName.toUpperCase()})
   }

  return (
    <>
      <NameSection changeName={changeName}/>
      <span id="game-section">
        <h1>Blackjack</h1>
        <p id="message-el">{message}</p>
        <p id="dealer-el">Dealer's cards: {renderedDealerCards}</p>
        <p id="dealerSum-el">Dealer's sum: {dealerSum}</p>
        <p id="cards-el">Your cards: {renderedPlayerCards}</p>
        <p id="sum-el">Sum: {playerSum}</p>
        <Button isAlive={isAlive} startGame={startGame} newCard={newCard} stand={stand}/>
        <p id="player-el">{user.name} : ${user.chips}</p>
        <p id="result-el"></p>
      </span>
    </>
  )

}

export default GameRoom;
