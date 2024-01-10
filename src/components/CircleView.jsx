import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Circle, OrbitControls} from "@react-three/drei";

const CircleView = ({url}) => {
  const texture = new THREE.TextureLoader().load(url);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return (
    <Canvas>
      <OrbitControls />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={1} />
      <Circle receiveShadow castShadow args={[3.5, 100]}>
        <meshBasicMaterial
          attach="material"
          map={texture}
          color={"white"}
          side={THREE.DoubleSide}
        />
      </Circle>
    </Canvas>
  );
};

export default CircleView;
