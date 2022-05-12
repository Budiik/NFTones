import React, {useRef} from 'react'
import { useFrame, useLoader } from 'react-three-fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Hory2 = (props) => {
    const myMesh = useRef();
    
  
    const gltf = useLoader(GLTFLoader, "/models/velky.gltf");
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