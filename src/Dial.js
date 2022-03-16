import { useCallback, useEffect, useMemo, useState } from "react";
import needle from "./needle2.png";
import gradientOutline from "./gradient_outline.png";

const Dial = ({ value, initialAnglePosn }) => {
  const clamp = (value, start, end) => Math.min(Math.max(value, start), end);

  const [rotation, setRotation] = useState(initialAnglePosn);

  const ranges = useMemo(
    () => ({
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
    }),
    []
  );

  const calculateRotation = useCallback(
    (value) => {
      let range = Object.values(ranges).find(
        (r) => value <= r.breakpointEnd && value >= r.breakpointStart
      );

      if (!range) {
        return initialAnglePosn;
      }

      const valuePercentage =
        (value - range.breakpointStart) /
        (range.breakpointEnd - range.breakpointStart);

      const addedRotation =
        valuePercentage * (range.endAngle - range.startAngle);

      return range.startAngle + addedRotation;
    },
    [ranges, initialAnglePosn]
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
          <img src={needle} alt="needle" className="needle" />
        </div>
      </div>
    </div>
  );
};

export default Dial;
