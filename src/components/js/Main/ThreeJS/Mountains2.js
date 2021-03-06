import React, {useRef} from 'react'
import { useFrame, useLoader } from 'react-three-fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

/* Mountains model loader */

const Hory2 = (props) => {
    const myMesh = useRef();
    
  
    const gltf = useLoader(GLTFLoader, "https://budiik.github.io/NFTones/models/velky.gltf");
    return (
      <>
        <primitive
          ref={myMesh}
          object={gltf.scene}
          scale={10}
          position={[-300, -8, 210]}
        />
      </>
    );
  };
  
  
  export default Hory2