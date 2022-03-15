import { useEffect, useState } from "react";
import Dial from "./Dial";
import "./styles.css";

export default function App() {
  const [data, setData] = useState(null);

  const remoteCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          credit: 900
        });
      }, 1000);
    });
  };

  useEffect(() => {
    remoteCall().then((value) => {
      setData(value);
    });
  }, []);

  return (
    <div className="App">
      <Dial initialAnglePosn={-135} value={data ? data.credit : 900} />
    </div>
  );
}
