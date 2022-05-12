import React, {useRef, useState} from 'react'
import { useFrame, useLoader} from 'react-three-fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import song1 from "./sounds/Song1.mp3"
import song2 from "./sounds/Song2.mp3"
import song3 from "./sounds/Song3.mp3"
import song4 from "./sounds/Song4.mp3"
import song5 from "./sounds/Song6.mp3"
import song6 from "./sounds/Song7.mp3"
import song7 from "./sounds/Song8.mp3"

const FloppyDisc1 = (props) => {
  const myMesh = useRef();
  useFrame(({ clock }) => {
    myMesh.current.rotation.y = clock.getElapsedTime() / 1.5;
  });

  const Song1 = new Audio(song1)
  const Song2 = new Audio(song2)
  const Song3 = new Audio(song3)
  const Song4 = new Audio(song4)
  const Song5 = new Audio(song5)
  const Song6 = new Audio(song6)
  const Song7 = new Audio(song7)
  const songs = [Song1,Song2,Song3,Song4,Song5,Song6,Song7]

  
  const gltf = useLoader(GLTFLoader, "https://budiik.github.io/NFTones/models/model3/scene.gltf");
  return (
    <>
      <primitive
        ref={myMesh}
        object={gltf.scene}
        scale={2}
        position={[10, 0, -25]}
        onClick={() =>{songs[Math.floor(Math.random()*songs.length)].play()}}
      />
    </>
  );
};


export default FloppyDisc1