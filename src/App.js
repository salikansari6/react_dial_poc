import { useEffect, useState } from "react";
import Dial from "./Dial";
import "./styles.css";

export default function App() {
  const [data, setData] = useState(null);
  const [creditInput, setCreditInput] = useState(0);

  const remoteCall = (credit) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          credit
        });
      }, 500);
    });
  };

  useEffect(() => {
    remoteCall(800).then((value) => {
      setData(value);
    });
  }, []);

  const handleClick = () => {
    remoteCall(creditInput).then((value) => {
      setData(value);
    });
  };

  return (
    <div className="App">
      <Dial initialAnglePosn={-135} value={data ? data.credit : 900} />

      <div className="credit-input">
        <label for="credit-input">
          Enter credit for testing
          <small>(Value between 0 and 900)</small>
        </label>

        <input
          value={creditInput}
          onChange={(e) => setCreditInput(parseInt(e.target.value, 10))}
          type="number"
          id="credit-input"
        />
      </div>

      <button className="checkBtn" onClick={handleClick}>
        Check
      </button>
    </div>
  );
}
