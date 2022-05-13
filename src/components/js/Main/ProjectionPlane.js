/* Main plane where all components are placed */

import React, { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import "../../css/Main/Canvas.css";
import Card from "./UI/Card";
import Countdown3D from "./ThreeJS/Countdown3D";
import MintUI from "./UI/MintUI.js";
import WelcomeUI from "./UI/WelcomeUI.js";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars, Loader, Plane } from "@react-three/drei";
import disableScroll from "disable-scroll";
import FloppyDisc1 from "./ThreeJS/FloppyDisc1";
import sunpic from "./sunpic.png";
import Mountainsgltf1 from "./ThreeJS/Mountains.js";
import Mountainsgltf2 from "./ThreeJS/Mountains2.js";
import Supportingplane from "./ThreeJS/Plane.js";
import ProfileCard from "./UI/ProfileCard";

disableScroll.on();

/*Converts degrees to radians, as three works with radians*/
const deg2rad = (degrees) => degrees * (Math.PI / 180);


function CameraObject({ rot }) {

  /*Camera movement around [0,0,0] while looking at [0,0,0]*/
  /*
        · → ·
        ↑ · ↓
        . ← .
  */
  /* takes in rot, and calculates its next position then moves the camera acordingly*/

  const xposar = [0, 1, 0, -1]; //correct moving order ↓
  const zposar = [1, 0, -1, 0];
  const xposarrev = [0, -1, 0, 1];
  const zposarrev = [1, 0, -1, 0];

  const vec = new THREE.Vector3();
  useFrame((state) => {
    const step = 0.1;
    
    const x = rot >= 0 ? xposar[rot % 4] : xposarrev[Math.abs(rot % 4)];
    const y = 0;
    const z = rot >= 0 ? zposar[rot % 4] : zposarrev[Math.abs(rot % 4)];
    state.camera.position.lerp(vec.set(x, y, z), step); // sets the camera position to calculated place
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
  return null;
}

const Light = (props) => {
  /* Point light for visibility */
  const pointLight = useRef();
  return (
    <>
      <pointLight
        ref={pointLight}
        args={[props.colr, props.int, 0]}
        position={props.pos}
      />
    </>
  );
};

const ProjectionPlane = ({ rotation }) => {
  const [accounts, setAccounts] = useState([]); //metamask setup
  const domnodeRef = useRef(); //inner html render
  const [mobile, setMobile] = useState(); //mobile device
  const [FOV, setFOV] = useState(); //camera Field Of View dynamicly set depending on screen size
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  }); //window size

  const checkSize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }; 

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []); // chcecks if the window was resized 

  useEffect(() => {
    if (size.width < 1000) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    if (size.width / size.height < 2) {
      setFOV(65);
    } else if (size.width / size.height < 2.7) {
      setFOV(60);
    } else {
      setFOV(55);
    }
  }, [size]); //sets FOV depending on the window size
  return (
    <>
      <Canvas
        colorManagement
        shadows
        style={{ height: "100vh", width: "100vw" }}
        camera={{
          fov: FOV,
          near: 0.1,
          far: 400,
          position: [0, 0, 1],
        }}
      > {/* main canvas where everighing is placed*/}

        
        <ambientLight args={["white", 1]} /> {/* lighting*/}
        <fogExp2 attach="fog" args={["#570296", 0.003]} /> {/* Fog for redused visibility in further parts of canvas*/}
        
        <Supportingplane></Supportingplane> {/* black floor */}


        <Html
          distanceFactor={1}
          zIndexRange={[-10, 0]}
          transform
          position={[-50, 3, 0]}
          scale={[12, 12, 10]}
          rotation={[0, deg2rad(90), 0]}
        >
          <img src={sunpic}></img>
        </Html> {/* sun html component*/}

        
        <Html
          distanceFactor={1}
          zIndexRange={[10, 0]}
          portal={domnodeRef}
          transform
          position={!mobile ? [-8, 0, -25] : [0, 0, -25]}
          scale={[12, 12, 10]}
        >
          <Card num={["400px", "400px"]}>
            <WelcomeUI />
          </Card>
        </Html> {/* Welcome tab  */}

        <Html
          distanceFactor={1}
          zIndexRange={[10, 0]}
          portal={domnodeRef}
          transform
          position={!mobile ? [25, 0, 0] : [25, 0, 0]}
          rotation={[0, deg2rad(-90), 0]}
          scale={[12, 12, 10]}
        >
          <Card num={["400px", "400px"]}>
            <ProfileCard />
          </Card>
        </Html> {/* Card with the manager profile*/}

        <Html
          distanceFactor={1}
          zIndexRange={[10, 0]}
          portal={domnodeRef}
          transform
          position={[0, 0, 25]}
          scale={[12, 12, 1]}
          rotation={[0, deg2rad(180), 0]}
        >
          <Card num={!mobile ? ["800px", "400px"] : ["400px", "400px"]}>
            <MintUI accounts={accounts} setAccounts={setAccounts} />
          </Card>
        </Html> {/* Minting card */}

        <Light colr="#7289da" int={3} pos={[-24, 5, 0]} /> {/* Second light */}
        <Stars
          radius={100}
          depth={100}
          count={5000}
          factor={4}
          saturation={0}
          fade
        /> {/* Background stars*/}
        <Suspense fallback={null}>
          {!mobile && <FloppyDisc1 />}
          <Mountainsgltf1></Mountainsgltf1> {/* Background mountains */}
          <Mountainsgltf2></Mountainsgltf2> 
        </Suspense> {/* suspense is used to display gltf 3d models */}

          

        


        <gridHelper
          args={[1000, 80, "#b30086", "#b30086"]}
          position={[0, -8, 0]}
        /> {/* Floor grid */}
        <Html
          distanceFactor={1}
          zIndexRange={[10, 0]}
          portal={domnodeRef}
          transform
          position={[-25, -3, 0]}
          scale={[12, 12, 1]}
          rotation={[0, deg2rad(90), 0]}
        >
          <Card num={!mobile ? ["600px", "100px"] : ["400px", "100px"]}>
            <p
              style={{
                margin: "20px",
                textAlign: "center",
                fontSize: "1.4rem",
              }}
            >
              Time remaining until next NFTones drop!
            </p>
          </Card>
        </Html> {/* Drop timer info card */}
        <Countdown3D isMobile={mobile} /> {/* Drop timer */}
        <CameraObject rot={rotation} /> {/* Camera placed in canvas */}
      </Canvas>
      <Loader />
    </>
  );
};

export default ProjectionPlane;
