const Button = ({isAlive, startGame, newCard, stand}) => {
    return ( 
        <>
            <button id="startGame-btn" className={isAlive ? "buttonDisabled" : ""} onClick={startGame}>Start Game</button>
            <button id="newCard-btn" className={!isAlive ? "buttonDisabled" : ""} onClick={newCard}>New Card</button>
            <button id="stand-btn" className={!isAlive ? "buttonDisabled" : ""} onClick={stand}>Stand</button>
        </>
     );
}
 
export default Button;