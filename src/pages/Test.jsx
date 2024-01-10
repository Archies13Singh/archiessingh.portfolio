import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Circle, OrbitControls, Text } from "@react-three/drei";
import imagee from "../assets/icons/html.png";

const Test = () => {
  const texture = new THREE.TextureLoader().load(imagee);

  return (
    <Canvas>
      <OrbitControls />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={1} />

      {/* Front Side with Image */}
      <Circle receiveShadow castShadow args={[3.5, 100]}>
        <meshBasicMaterial attach="material" map={texture} side={THREE.FrontSide} />
      </Circle>

      {/* Back Side with Text */}
      <Circle receiveShadow castShadow args={[3.5, 100]} rotation={[0, Math.PI, 0]}>
        <meshBasicMaterial attach="material" color="black" side={THREE.BackSide} />
        <Text
          position={[0, 0, 0]}
          fontSize={2.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          HTML
        </Text>
      </Circle>
    </Canvas>
  );
};

export default Test;
