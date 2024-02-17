import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import moon from "../../assets/3d/animated_moon.glb";

const Moon = () => {
  const group = useRef();
  const dracoLoader = new DRACOLoader();
  const { nodes, materials, animations } = useGLTF(moon, dracoLoader);
  console.log(nodes);
  const { actions } = useAnimations(animations, group);
  const [moonposition, setMoonPosition] = useState([-2, 2.5, 0]);
  const [moonScale, setMoonScale] = useState([]);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setMoonPosition([-1, 2.5, 0]);
      setMoonScale([1, 1, 1]);
    } else {
      setMoonPosition([-6, 6, -6]);
      setMoonScale([3.5, 3.5, 1.5]);
    }
    actions["8k_moonAction"].setEffectiveTimeScale(0.6);
    actions["8k_moonAction"].play();
  }, [actions]);
  return (
    <group ref={group} dispose={null} position={moonposition} scale={moonScale}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[0, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[0, 0, 0]}>
              <group name="8k_moon_2" rotation={[0, 0, 0]}>
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4.geometry}
                  material={materials["8k_moon"]}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
      <directionalLight color="red" intensity={10} position={moonposition} />
    </group>
  );
};

export default Moon;
