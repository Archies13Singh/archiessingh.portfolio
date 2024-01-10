import { useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import skyScene from "../../assets/3d/falling_snow_loop.glb";
import { useFrame } from "@react-three/fiber";

const Snow = () => {
  const ref = useRef();
  const snow = useGLTF(skyScene);
  // const [isFalling, setIsFalling] = useState(true);

  useFrame((_, delta) => {
    ref.current.position.y -= 0.9 * delta;
    if (ref.current.position.y < -7) {
      ref.current.position.y = 10;
    }
  });

  return (
    <mesh ref={ref} scale={[1, 1, 1]}>
      <primitive object={snow.scene} />
    </mesh>
  );
};

export default Snow;
