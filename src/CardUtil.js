 // cardPool is the set of cards already drawn by either the player or the dealer
 export function getRandomCard(cardPool) {
    // randomNumber is between 1 and 13 because while you can normaly have a value between 1 and 14 (cards above 10: A,J,Q,K)
    // the game is simplified so that Ace (A) has value 11 the first time you get it and then it has value 1 
    const randomNumber = Math.floor(Math.random() * 12) + 1

    if (randomNumber > 10) {
      return 10
    } else if (randomNumber === 1 && !cardPool.includes(11)) {
      return 11
    }
    return randomNumber
  }

  export const getSum = cards => cards.reduce((total, card) => total + card, 0)
