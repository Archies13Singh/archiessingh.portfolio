import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import scene from "../../assets/3d/jo_on_bike__rigged__animated.glb";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const PostMan = ({ currentAnimatiion, ...props }) => {
  const group = useRef();
  const dracoLoader = new DRACOLoader();
  const { nodes, materials, animations } = useGLTF(scene, dracoLoader);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.stop();
    });
    if (actions[currentAnimatiion]) {
      actions[currentAnimatiion].play();
    }
  }, [actions, currentAnimatiion]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="9ba77f8c997f47a3969ef550b5e04d5afbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="GEO_Jo_body" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="GEO_Jo_keys" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="GEO_Jo_lock" rotation={[-Math.PI / 2, 0, 0]} />
                <group name="GEO_Jo_bagy" rotation={[-Math.PI / 2, 0, 0]} />
                <group
                  name="RIG_Jo"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.752}
                >
                  <group name="Object_9">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_12"
                      geometry={nodes.Object_12.geometry}
                      material={materials.Jo_material}
                      skeleton={nodes.Object_12.skeleton}
                    />
                    <skinnedMesh
                      name="Object_14"
                      geometry={nodes.Object_14.geometry}
                      material={materials.Jo_material}
                      skeleton={nodes.Object_14.skeleton}
                    />
                    <skinnedMesh
                      name="Object_16"
                      geometry={nodes.Object_16.geometry}
                      material={materials.Jo_material}
                      skeleton={nodes.Object_16.skeleton}
                    />
                    <skinnedMesh
                      name="Object_18"
                      geometry={nodes.Object_18.geometry}
                      material={materials.Jo_material}
                      skeleton={nodes.Object_18.skeleton}
                    />
                    <group name="Object_11" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_13" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_15" rotation={[-Math.PI / 2, 0, 0]} />
                    <group name="Object_17" rotation={[-Math.PI / 2, 0, 0]} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default PostMan;
