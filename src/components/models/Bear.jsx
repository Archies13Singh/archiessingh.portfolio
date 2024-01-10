import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import bhallu from "../../assets/3d/bear_on_balloons.glb";

const Bear = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(bhallu);
  const { actions } = useAnimations(animations, group);
  const [bearRotation, setBearRotation] = useState([0, 12, 0]);
  useEffect(() => {
    actions["ArmatureAction"].play();

    const rotationTimeOut = setTimeout(() => {
      const newRotation = [0,Math.random() * 360,0]
      setBearRotation(newRotation);
    }, 8000);
    return () => {
      clearTimeout(rotationTimeOut);
    };
  }, [actions,bearRotation]);

  return (
    <group ref={group} {...props} dispose={null} rotation={bearRotation}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Root">
            <group name="Armature" position={[0.704, 0.021, 0.581]}>
              <primitive object={nodes.Armature_rootJoint} />
              <skinnedMesh
                name="bear_0"
                geometry={nodes.bear_0.geometry}
                material={materials.color}
                skeleton={nodes.bear_0.skeleton}
              />
              <skinnedMesh
                name="bear_1"
                geometry={nodes.bear_1.geometry}
                material={materials.Material}
                skeleton={nodes.bear_1.skeleton}
              />
              <skinnedMesh
                name="Icosphere002_0"
                geometry={nodes.Icosphere002_0.geometry}
                material={materials["Material.001"]}
                skeleton={nodes.Icosphere002_0.skeleton}
              />
              <skinnedMesh
                name="Icosphere002_1"
                geometry={nodes.Icosphere002_1.geometry}
                material={materials["Material.003"]}
                skeleton={nodes.Icosphere002_1.skeleton}
              />
              <skinnedMesh
                name="Icosphere002_2"
                geometry={nodes.Icosphere002_2.geometry}
                material={materials["Material.004"]}
                skeleton={nodes.Icosphere002_2.skeleton}
              />
              <skinnedMesh
                name="Icosphere002_3"
                geometry={nodes.Icosphere002_3.geometry}
                material={materials["Material.002"]}
                skeleton={nodes.Icosphere002_3.skeleton}
              />
              <group
                name="bear"
                position={[-0.704, -0.021, -0.581]}
                rotation={[0, 0.657, 0]}
              />
              <group
                name="Icosphere002"
                position={[0.051, -0.537, 2.754]}
                rotation={[0.66, 0.029, -1.522]}
                scale={[0.511, 0.511, 0.717]}
              />
            </group>
            <group
              name="Hemi001"
              position={[-2.845, -1.549, 2.929]}
              rotation={[0.716, -0.749, -0.464]}
            >
              <group name="Hemi001_1" />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Bear;
