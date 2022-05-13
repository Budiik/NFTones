import React, {useState, useEffect} from 'react'
import PS2 from "../json/Press Start 2P_Regular.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
extend({ TextGeometry });
 /* 3D countdown timer */

/*Converts degrees to radians, as three works with radians*/
const deg2rad = (degrees) => degrees * (Math.PI / 180);

function Countdown3D({ isMobile }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const positionZnor = 10.330499649047852; // center positions ↓
  const positionZmob = 4.774499893188477;
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // calculates and returns how much time is left until set date every 1000ms 
    return () => clearInterval(timer);
  }, []);
  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (String(timeLeft[interval]).length == 1) {
      timerComponents.push("0" + timeLeft[interval] + interval);
    } else {
      timerComponents.push(timeLeft[interval] + interval);
    } // checks if the number is single or double digit , if it is a single digit number it adds a 0
  });
  function calculateTimeLeft() {
    let futureDate = +new Date("28 July 2022 10:00:00 GMT+1") - +new Date(); // desired date is set and subtracted from current date thus getting date difference
    let timeLeft = {};
    if (futureDate > 0) {
      timeLeft = {
        D: Math.floor(futureDate / (1000 * 60 * 60 * 24)),
        H: Math.floor((futureDate / (1000 * 60 * 60)) % 24),
        M: Math.floor((futureDate / 1000 / 60) % 60),
        S: Math.floor((futureDate / 1000) % 60),
      };
    } // setting the correct time untlill drop and returning it
    return timeLeft;
  }
  const font = new FontLoader().parse(PS2);
  const textOptions = {
    font,
    size: 1,
    height: 1,
  }; //seting font
  return (
    <mesh
      rotation={[0, deg2rad(90), 0]}
      position={[-25, isMobile ? 4 : 0, isMobile ? positionZmob : positionZnor]}
      scale={1}
    >
      <textGeometry
        attach="geometry"
        parameters
        args={[
          String(
            timerComponents.length
              ? isMobile
                ? String(timerComponents.slice(0, 2)).replaceAll(",", ":") +
                  "\n" +
                  String(timerComponents.slice(2, 4)).replaceAll(",", ":")
                : String(timerComponents).replaceAll(",", ":")
              : "MINT NOW!"
          ),
          textOptions,
        ]}
      /> {/* text 3D model of the time left */}
      <meshStandardMaterial attach="material" color="#624AB3" />
    </mesh>
  ); 
}
export default Countdown3D