import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import dancingCactus from "../../assets/3d/cactus.glb";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const Cactus = (props) => {
  const group = useRef();
  const dracoLoader = new DRACOLoader();
  const { nodes, materials, animations } = useGLTF(dancingCactus, dracoLoader);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["ArmatureAction"].play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.128}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="pot_0">
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.cactus}
                />
              </group>
              <group name="Armature_10" position={[-0.051, 1.275, 0]}>
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.cactus}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <group name="body_9" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default Cactus;
