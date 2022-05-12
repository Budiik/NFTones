import React, {useRef} from 'react'
import { DoubleSide } from "three";



const Supportingplane = () => {
    return (
    
    
    <mesh position={[20, -8.01, 5]} rotation={[Math.PI / 2, 0, 0]} scale={[1000, 1000, 1]}>
        {}
        <planeBufferGeometry />
        {}
        <meshBasicMaterial color="black" side={DoubleSide}/>
    </mesh>
    );
  }

export default Supportingplane