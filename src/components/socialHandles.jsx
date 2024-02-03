import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Circle, OrbitControls } from "@react-three/drei";

const SocialHandles = ({ url, link }) => {
  const [texture, setTexture] = useState(
    "https://threedportfolio.000webhostapp.com/css.svg"
  );
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    url,
    (loadedTexture) => {
      setTexture(loadedTexture);
    },
    undefined,
    (err) => {
      console.error("Error loading texture:", err);
    }
  );

  // Fallback material
  const fallbackMaterial = new THREE.MeshBasicMaterial({
    color: "red",
  });

  const handleNavigation = () => {
    window.open(link, "_blank");
  };

  return (
    <Canvas onClick={handleNavigation}>
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={1} />
      <Box receiveShadow castShadow args={[6, 6]}>
        <meshBasicMaterial
          attach="material"
          map={texture || fallbackMaterial}
          color={"white"}
          side={THREE.DoubleSide}
        />
      </Box>
    </Canvas>
  );
};

export default SocialHandles;
