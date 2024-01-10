import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import sitara from "../../assets/3d/extracted_minecraft_java_editions_stars.glb";
import { useFrame } from "@react-three/fiber";

const Stars = ({ isRotating, }) => {
  const { nodes, materials } = useGLTF(sitara);
  const starRef = useRef();
  useFrame((_, delta) => {
    if (isRotating) {
      starRef.current.rotation.y += 0.1 * delta;
    }
  });
  return (
    <group  dispose={null} ref={starRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.star}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

export default Stars;
