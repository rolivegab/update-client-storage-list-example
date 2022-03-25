import { useEffect, useRef, useState } from "react";

const LIMIT = 1000;

const App = () => {
  const initialTimeRef = useRef(performance.now());

  const [div1, setDiv1] = useState({
    transform: "rotateZ(0deg)",
    top: 0,
  });

  const [div2, setDiv2] = useState({
    transform: "rotateZ(0deg)",
  });

  const [div3, setDiv3] = useState({
    transform: "rotateZ(0deg)",
    top: 30,
  });

  const playAnimation = () => {
    const progress = Math.min(
      (performance.now() - initialTimeRef.current) / LIMIT,
      1
    );

    const actualDeg = progress * 45;

    setDiv1({
      transform: `rotateZ(${actualDeg}deg)`,
      top: progress * 15,
    });
    setDiv2({
      transform: `scaleX(${1 - progress})`,
    });
    setDiv3({
      transform: `rotateZ(-${actualDeg}deg)`,
      top: 30 - progress * 15,
    });

    if (progress != 1) {
      requestAnimationFrame(playAnimation);
    }
  };

  useEffect(() => {
    requestAnimationFrame(playAnimation);
  }, []);

  return (
    <div style={{ position: "relative", margin: 20 }}>
      <div
        style={{
          position: "absolute",
          width: 50,
          height: 5,
          backgroundColor: "black",
          left: 0,
          transformOrigin: "center",
          ...div1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 50,
          height: 5,
          backgroundColor: "black",
          left: 0,
          top: 15,
          transformOrigin: "center",
          ...div2,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 50,
          height: 5,
          backgroundColor: "black",
          transformOrigin: "center",
          left: 0,
          ...div3,
        }}
      />
    </div>
  );
};

export default App;
