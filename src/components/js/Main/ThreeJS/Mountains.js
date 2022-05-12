import React, {useRef} from 'react'
import { useFrame, useLoader } from 'react-three-fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Hory = (props) => {
    const myMesh = useRef();
    
  
    const gltf = useLoader(GLTFLoader, "https://budiik.github.io/NFTones/models/new.gltf");
    return (
      <>
        <primitive
          ref={myMesh}
          object={gltf.scene}
          scale={10}
          position={[300, -3, 0]}
        />
      </>
    );
  };
  
  
  export default Hory