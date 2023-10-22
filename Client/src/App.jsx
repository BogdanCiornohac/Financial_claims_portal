import Router from "./Router";
import "./App.css";
import Counter from "./Counter";
import { useState, useEffect, useRef} from "react";

function App() {
  let [counter1, setCounter1] = useState(0)
  let referinta_button = useRef(null)

  useEffect(() => {
    console.log("S-a schimbat counterul")
  },[counter1]);

  return (
    <>
      <button 

        ref={referinta_button}

        onClick={() => {
          console.log(counter1)
          setCounter1((counter1) => {
            return ++counter1;
          });
        }}
      >
        BUTTON
      </button>

      <Counter counter={counter1} />
    </>
  );
}

export default App;
