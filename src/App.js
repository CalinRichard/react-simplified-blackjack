import { useEffect, useState } from "react";
import GameRoom from "./GameRoom";

const App = () => {

    // the setTimeout function along with the useEffect hook were inserted in the app to simulate a slower render of the intended game
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 2000)
    }, [])

    return loaded ? <GameRoom /> : <p>Loading...</p> 
}

export default App;