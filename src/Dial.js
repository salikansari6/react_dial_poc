import { useCallback, useEffect, useState } from "react";
import needle from "./needle.png";
import gradientOutline from "./gradient_outline.png";

const Dial = ({ value, initialAnglePosn }) => {
  const clamp = (value, start, end) => Math.min(Math.max(value, start), end);

  const [rotation, setRotation] = useState(initialAnglePosn);

  const ranges = {
    excellent: {
      startAngle: -90,
      endAngle: -135,
      breakpointStart: 750,
      breakpointEnd: 900
    },
    good: {
      startAngle: 0,
      endAngle: -90,
      breakpointStart: 600,
      breakpointEnd: 750
    },
    bad: {
      startAngle: 90,
      endAngle: 0,
      breakpointStart: 0,
      breakpointEnd: 600
    }
  };

  const calculateRotation = useCallback(
    (value) => {
      let range;
      if (value > 750) {
        range = ranges.excellent;
      } else if (value <= 750 && value >= 600) {
        range = ranges.good;
      } else {
        range = ranges.bad;
      }
      const valuePercentage =
        (value - range.breakpointStart) /
        (range.breakpointEnd - range.breakpointStart);

      const addedRotation =
        valuePercentage * (range.endAngle - range.startAngle);

      return range.startAngle + addedRotation;
    },
    [ranges.bad, ranges.excellent, ranges.good]
  );

  useEffect(() => {
    const computedRotation = calculateRotation(value);
    console.log("computed rotation " + computedRotation);
    setRotation(computedRotation);
  }, [value, calculateRotation]);

  return (
    <div className="dial">
      <img
        src={gradientOutline}
        className="gradient-outline"
        alt="dial outline"
      />
      <div className="outer-circle">
        <div
          className="inner-circle"
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          <div className="needle" />
        </div>
      </div>
    </div>
  );
};

export default Dial;
