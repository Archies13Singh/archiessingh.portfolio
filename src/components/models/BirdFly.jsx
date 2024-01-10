import React, { useEffect, useRef } from "react";
// import birdScene from "../../assets/3d/bird.glb";
import birdScene from "../../assets/3d/bird_flying_animation.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const BirdFly = () => {
  const ref = useRef();
  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, ref);


  useEffect(() => {
    actions["Armature|ArmatureAction"].play();
  }, [actions]);

  useFrame(({ clock, camera }) => {
    ref.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if bird reached to certain endpoint relative to camera
    // console.log(ref.current.position.x,camera.position.x + 10 ,"greater")
    if (ref.current.position.x > camera.position.x + 15) {
      // change direction to backward and rotate the bird 180deg on the y-axis
      ref.current.rotation.y = 0;
      
    } else if (ref.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird rotation
      ref.current.rotation.y = Math.PI;

    }

    if (ref.current.rotation.y === 0) {
      ref.current.position.x -= 0.01;
      ref.current.position.z += 0.01;
    } else {
      ref.current.position.x += 0.01;
      ref.current.position.z -= 0.01;
    }
  });
  return (
    <mesh position={[-6, 2, 1]} scale={[0.7, 0.7, 0.7]} rotation={[0,-10,0]} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};

export default BirdFly;
