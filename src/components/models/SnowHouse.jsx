

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import tavrenScene from "../../assets/3d/tavern_in_snow.glb"
import { useFrame,useThree } from "@react-three/fiber";


const SnowHouse = ({ isRotating, setIsRotating,setCurrentStage, ...props })=>{
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(tavrenScene);
  const { actions } = useAnimations(animations, group);
  const { gl, viewport } = useThree();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;
  const handlePointerDown = (e) => {
    // console.log(e)
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    lastX.current = clientX;
  };

  // when releasing the hold
  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  // for rotation
  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width; // is used to calculate the changein horizontal position

      group.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // KeyBoard Functionalities
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) {
        setIsRotating(true);
        group.current.rotation.y += 0.01 * Math.PI;
        rotationSpeed.current = 0.0125
      }
    } else if (e.key === "ArrowRight") {
      if (!isRotating) {
        setIsRotating(true);
        group.current.rotation.y -= 0.01 * Math.PI;
        rotationSpeed.current = -0.0125

      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // useFrame will help to work all the moving functionalties by manipulating the canvas value.
  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      group.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = group.current.rotation.y;
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          position={[1.345, 8.179, -1.74]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="RootNode_(gltf_orientation_matrix)_0"
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <group name="RootNode_(model_correction_matrix)_1">
                  <group
                    name="d421919634394db3b65836f92eb6016cfbx_2"
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <group name="_3">
                      <group name="RootNode_4">
                        <group
                          name="Barrel_bottom003_5"
                          position={[308.954, 79.281, -412.237]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[49.471, 49.471, 67.575]}
                        >
                          <group name="Barrel_bottom003_Wood1_0_6">
                            <mesh
                              name="Object_10"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_10.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Barrel_bottom003_Metal_ring_0_7">
                            <mesh
                              name="Object_12"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_12.geometry}
                              material={materials.Metal_ring}
                            />
                          </group>
                        </group>
                        <group
                          name="Barrel_flat003_8"
                          position={[175.73, 65.981, -427.528]}
                          rotation={[Math.PI, -0.575, Math.PI / 2]}
                          scale={[49.471, 49.471, 66.147]}
                        >
                          <group name="Barrel_flat003_Wood1_0_9">
                            <mesh
                              name="Object_15"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_15.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Barrel_flat003_Metal_ring_0_10">
                            <mesh
                              name="Object_17"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_17.geometry}
                              material={materials.Metal_ring}
                            />
                          </group>
                        </group>
                        <group
                          name="Barrel_top003_11"
                          position={[308.954, 214.432, -412.237]}
                          rotation={[-1.614, -0.015, -0.006]}
                          scale={[49.471, 49.471, 67.575]}
                        >
                          <group name="Barrel_top003_Wood1_0_12">
                            <mesh
                              name="Object_20"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_20.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Barrel_top003_Metal_ring_0_13">
                            <mesh
                              name="Object_22"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_22.geometry}
                              material={materials.Metal_ring}
                            />
                          </group>
                        </group>
                        <group
                          name="Barrel_open003_14"
                          position={[34.511, 76.376, -423.213]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[48.644, 48.644, 64.053]}
                        >
                          <group name="Barrel_open003_Wood1_0_15">
                            <mesh
                              name="Object_25"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_25.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Barrel_open003_Metal_ring_0_16">
                            <mesh
                              name="Object_27"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_27.geometry}
                              material={materials.Metal_ring}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube713_17"
                          position={[1047.157, 91.009, -215.985]}
                          rotation={[0.047, 0.477, 1.554]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube713_Wood1_0_18">
                            <mesh
                              name="Object_30"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_30.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube714_19"
                          position={[1052.817, 95.334, -250.477]}
                          rotation={[-1.577, -0.002, 2.048]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube714_Wood2_0_20">
                            <mesh
                              name="Object_33"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_33.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube715_21"
                          position={[1050.002, 12.918, -254.722]}
                          rotation={[-1.623, -0.029, 2.036]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube715_Wood1_0_22">
                            <mesh
                              name="Object_36"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_36.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube716_23"
                          position={[847.137, 91.009, -586.989]}
                          rotation={[0, 1.414, Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube716_Wood3_0_24">
                            <mesh
                              name="Object_39"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_39.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube717_25"
                          position={[817.617, 97.829, -612.232]}
                          rotation={[-1.567, 0.035, 2.988]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube717_Wood1_0_26">
                            <mesh
                              name="Object_42"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_42.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube718_27"
                          position={[817.617, 12.918, -612.232]}
                          rotation={[-Math.PI / 2, 0, 2.985]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube718_Wood3_0_28">
                            <mesh
                              name="Object_45"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_45.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube719_29"
                          position={[411.533, 91.009, -655.325]}
                          rotation={[0, 1.354, Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube719_Wood1_0_30">
                            <mesh
                              name="Object_48"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_48.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube720_31"
                          position={[383.582, 114.605, -682.296]}
                          rotation={[-1.578, -0.027, 2.918]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube720_Wood3_0_32">
                            <mesh
                              name="Object_51"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_51.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube721_33"
                          position={[383.582, 29.694, -682.296]}
                          rotation={[-Math.PI / 2, 0, 2.925]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube721_Wood1_0_34">
                            <mesh
                              name="Object_54"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_54.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube722_35"
                          position={[-19.933, 91.009, -751.916]}
                          rotation={[0, 1.153, Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube722_Wood1_0_36">
                            <mesh
                              name="Object_57"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_57.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube723_37"
                          position={[-41.939, 119.228, -783.923]}
                          rotation={[-Math.PI / 2, 0, 2.724]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube723_Wood2_0_38">
                            <mesh
                              name="Object_60"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_60.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube724_39"
                          position={[-41.939, 34.316, -783.923]}
                          rotation={[-Math.PI / 2, 0, 2.724]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube724_Wood1_0_40">
                            <mesh
                              name="Object_63"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_63.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube725_41"
                          position={[-422.16, 91.009, -933.932]}
                          rotation={[Math.PI, 1.265, -Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube725_Wood1_0_42">
                            <mesh
                              name="Object_66"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_66.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube726_43"
                          position={[-459.841, 114.404, -943.352]}
                          rotation={[-1.581, 0.026, -2.826]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube726_Wood1_0_44">
                            <mesh
                              name="Object_69"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_69.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube727_45"
                          position={[-459.841, 29.493, -943.352]}
                          rotation={[-Math.PI / 2, 0, -2.836]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube727_Wood3_0_46">
                            <mesh
                              name="Object_72"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_72.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube728_47"
                          position={[-833.576, 91.009, -796.922]}
                          rotation={[-Math.PI, 0.778, -Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube728_Wood1_0_48">
                            <mesh
                              name="Object_75"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_75.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube729_49"
                          position={[-871.285, 97.829, -787.614]}
                          rotation={[-1.549, -0.026, -2.358]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube729_Wood1_0_50">
                            <mesh
                              name="Object_78"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_78.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube730_51"
                          position={[-871.285, 12.918, -787.614]}
                          rotation={[-Math.PI / 2, 0, -2.349]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube730_Wood1_0_52">
                            <mesh
                              name="Object_81"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_81.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube731_53"
                          position={[-1125.275, 82.29, -489.747]}
                          rotation={[Math.PI, 0.006, -Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube731_Wood3_0_54">
                            <mesh
                              name="Object_84"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_84.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube732_55"
                          position={[-1145.819, 97.829, -456.783]}
                          rotation={[-Math.PI / 2, 0, -1.577]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube732_Wood1_0_56">
                            <mesh
                              name="Object_87"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_87.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube733_57"
                          position={[-1145.819, 12.918, -456.783]}
                          rotation={[-Math.PI / 2, 0, -1.577]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube733_Wood1_0_58">
                            <mesh
                              name="Object_90"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_90.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube734_59"
                          position={[-1126.859, 91.009, -52.299]}
                          rotation={[Math.PI, 0.006, -Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube734_Wood1_0_60">
                            <mesh
                              name="Object_93"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_93.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube735_61"
                          position={[-1150.041, 97.829, -15.497]}
                          rotation={[-1.165, 0.091, -1.601]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube735_Wood3_0_62">
                            <mesh
                              name="Object_96"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_96.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube736_63"
                          position={[-1147.382, 12.918, -18.9]}
                          rotation={[-Math.PI / 2, 0, -1.566]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube736_Wood1_0_64">
                            <mesh
                              name="Object_99"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_99.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube737_65"
                          position={[-1121.535, 91.009, 367.088]}
                          rotation={[-Math.PI, -0.814, -Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube737_Wood1_0_66">
                            <mesh
                              name="Object_102"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_102.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube738_67"
                          position={[-1111.443, 97.829, 404.595]}
                          rotation={[-Math.PI / 2, 0, -0.757]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube738_Wood1_0_68">
                            <mesh
                              name="Object_105"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_105.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube739_69"
                          position={[-1111.443, 12.918, 404.595]}
                          rotation={[-Math.PI / 2, 0, -0.757]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube739_Wood1_0_70">
                            <mesh
                              name="Object_108"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_108.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube740_71"
                          position={[-808.453, 91.009, 653.893]}
                          rotation={[-Math.PI, -1.396, -Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube740_Wood1_0_72">
                            <mesh
                              name="Object_111"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_111.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube741_73"
                          position={[-779.4, 97.829, 679.672]}
                          rotation={[-Math.PI / 2, 0, -0.175]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube741_Wood1_0_74">
                            <mesh
                              name="Object_114"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_114.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube742_75"
                          position={[-779.4, 12.918, 679.672]}
                          rotation={[-Math.PI / 2, 0, -0.175]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube742_Wood1_0_76">
                            <mesh
                              name="Object_117"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_117.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube743_77"
                          position={[-382.616, 91.009, 726.033]}
                          rotation={[0, -1.497, Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube743_Wood1_0_78">
                            <mesh
                              name="Object_120"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_120.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube744_79"
                          position={[-348.11, 107.735, 743.865]}
                          rotation={[-Math.PI / 2, 0, 0.074]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube744_Wood2_0_80">
                            <mesh
                              name="Object_123"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_123.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube745_81"
                          position={[-348.11, 22.824, 743.865]}
                          rotation={[-Math.PI / 2, 0, 0.074]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube745_Wood1_0_82">
                            <mesh
                              name="Object_126"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_126.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube746_83"
                          position={[57.072, 91.009, 693.312]}
                          rotation={[0, -1.558, 1.571]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube746_Wood1_0_84">
                            <mesh
                              name="Object_129"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_129.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube747_85"
                          position={[90.428, 110.456, 713.211]}
                          rotation={[-Math.PI / 2, 0, 0.013]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube747_Wood1_0_86">
                            <mesh
                              name="Object_132"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_132.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube748_87"
                          position={[90.428, 25.545, 713.211]}
                          rotation={[-Math.PI / 2, 0, 0.013]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube748_Wood2_0_88">
                            <mesh
                              name="Object_135"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_135.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube749_89"
                          position={[487.883, 91.009, 682.768]}
                          rotation={[0, -1.179, Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube749_Wood1_0_90">
                            <mesh
                              name="Object_138"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_138.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube750_91"
                          position={[526.232, 97.829, 688.932]}
                          rotation={[-1.552, -0.013, 0.397]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube750_Wood1_0_92">
                            <mesh
                              name="Object_141"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_141.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube751_93"
                          position={[526.232, 12.918, 688.932]}
                          rotation={[-Math.PI / 2, 0, 0.392]}
                          scale={[-456.323, 2.429, 20.602]}
                        >
                          <group name="Cube751_Wood1_0_94">
                            <mesh
                              name="Object_144"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_144.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube752_95"
                          position={[882.662, 91.009, 518.517]}
                          rotation={[0.073, -1.179, Math.PI / 2]}
                          scale={[165.974, 17.904, 17.904]}
                        >
                          <group name="Cube752_Wood3_0_96">
                            <mesh
                              name="Object_147"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_147.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_sides001_97"
                          position={[-46.467, 14.547, -432.251]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[41.134, 49.127, 133.864]}
                        >
                          <group name="Brick_row_lower_sides001_Bricks0_0_98">
                            <mesh
                              name="Object_150"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_150.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_sides003_99"
                          position={[-225.062, 14.547, -432.251]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[41.134, 49.127, 133.864]}
                        >
                          <group name="Brick_row_lower_sides003_Bricks0_0_100">
                            <mesh
                              name="Object_153"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_153.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_sides002_101"
                          position={[-136.701, 14.547, -530.787]}
                          rotation={[-Math.PI / 2, 0, -Math.PI]}
                          scale={[52.644, 29.102, 113.071]}
                        >
                          <group name="Brick_row_lower_sides002_Bricks0_0_102">
                            <mesh
                              name="Object_156"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_156.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_sides004_103"
                          position={[-136.634, 16.577, -343.581]}
                          rotation={[-Math.PI / 2, 0, -Math.PI]}
                          scale={[55.613, 48.267, 48.267]}
                        >
                          <group name="Brick_row_lower_sides004_Bricks0_0_104">
                            <mesh
                              name="Object_159"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_159.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row007_105"
                          position={[-135.672, 66.686, -343.425]}
                          rotation={[0, 0, -Math.PI]}
                          scale={[9.473, 9.473, 14.281]}
                        >
                          <group name="Brick_row007_Bricks0_0_106">
                            <mesh
                              name="Object_162"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_162.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane010_107"
                          position={[-87.944, 24.058, -440.82]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1248.807, 1666.625, 1679.728]}
                        >
                          <group name="Plane010_Wood1_0_108">
                            <mesh
                              name="Object_165"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_165.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Grid_109"
                          position={[-137.602, 76.12, -341.359]}
                          scale={111.393}
                        >
                          <group name="Grid_Metal_sword_0_110">
                            <mesh
                              name="Object_168"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_168.geometry}
                              material={materials.Metal_sword}
                            />
                          </group>
                        </group>
                        <group
                          name="Torus001_111"
                          position={[-121.203, 29.924, -436.409]}
                          rotation={[-1.75, 0, Math.PI / 2]}
                          scale={8.377}
                        >
                          <group name="Torus001_Metal_sword001_0_112">
                            <mesh
                              name="Object_171"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_171.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder010_113"
                          position={[-121.156, 30.828, -437.879]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[3.054, 3.054, 6.104]}
                        >
                          <group name="Cylinder010_Metal_sword001_0_114">
                            <mesh
                              name="Object_174"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_174.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Torus002_115"
                          position={[-148.586, 29.924, -435.685]}
                          rotation={[-1.724, 0.002, 2.129]}
                          scale={8.377}
                        >
                          <group name="Torus002_Metal_sword001_0_116">
                            <mesh
                              name="Object_177"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_177.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder011_117"
                          position={[-149.094, 30.828, -437.879]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[3.054, 3.054, 6.104]}
                        >
                          <group name="Cylinder011_Metal_sword001_0_118">
                            <mesh
                              name="Object_180"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_180.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder009_119"
                          position={[-76.649, 26.056, -385.995]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={3.973}
                        >
                          <group name="Cylinder009_Metal_sword001_0_120">
                            <mesh
                              name="Object_183"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_183.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder013_121"
                          position={[-193.99, 26.056, -494.658]}
                          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                          scale={[-3.973, 3.973, 3.973]}
                        >
                          <group name="Cylinder013_Metal_sword001_0_122">
                            <mesh
                              name="Object_186"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_186.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder014_123"
                          position={[-193.99, 26.056, -385.995]}
                          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                          scale={[-3.973, 3.973, 3.973]}
                        >
                          <group name="Cylinder014_Metal_sword001_0_124">
                            <mesh
                              name="Object_189"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_189.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane011_125"
                          position={[-108.645, 24.058, -440.82]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1248.807, 1468.242, 1679.728]}
                        >
                          <group name="Plane011_Wood1_0_126">
                            <mesh
                              name="Object_192"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_192.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane012_127"
                          position={[-128.336, 24.058, -440.82]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1248.807, 1351.467, 1679.728]}
                        >
                          <group name="Plane012_Wood1_0_128">
                            <mesh
                              name="Object_195"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_195.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane013_129"
                          position={[-151.538, 24.058, -440.82]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1248.807, 1405.158, 1679.728]}
                        >
                          <group name="Plane013_Wood1_0_130">
                            <mesh
                              name="Object_198"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_198.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane009_131"
                          position={[-182.625, 24.058, -440.82]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1248.807, 1666.625, 1679.728]}
                        >
                          <group name="Plane009_Wood1_0_132">
                            <mesh
                              name="Object_201"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_201.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane014_133"
                          position={[-203.326, 24.058, -440.82]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1248.807, 1468.242, 1679.728]}
                        >
                          <group name="Plane014_Wood1_0_134">
                            <mesh
                              name="Object_204"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_204.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane015_135"
                          position={[-223.017, 24.058, -440.82]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1248.807, 1351.467, 1679.728]}
                        >
                          <group name="Plane015_Wood1_0_136">
                            <mesh
                              name="Object_207"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_207.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane016_137"
                          position={[-246.219, 24.058, -440.82]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1248.807, 1405.158, 1679.728]}
                        >
                          <group name="Plane016_Wood1_0_138">
                            <mesh
                              name="Object_210"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_210.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube039_139"
                          position={[-55.019, 22.593, 263.696]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube039_Chimney_stones1_0_140">
                            <mesh
                              name="Object_213"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_213.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube041_141"
                          position={[-55.019, 22.593, 263.743]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube041_Chimney_stones3_0_142">
                            <mesh
                              name="Object_216"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_216.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube043_143"
                          position={[-55.019, 22.593, 266.963]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube043_Chimney_stones2_0_144">
                            <mesh
                              name="Object_219"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_219.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube045_145"
                          position={[-55.019, 22.593, 265.334]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube045_Chimney_stones1_0_146">
                            <mesh
                              name="Object_222"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_222.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube047_147"
                          position={[-55.019, 22.593, 264.86]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube047_Chimney_stones1_0_148">
                            <mesh
                              name="Object_225"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_225.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube049_149"
                          position={[-55.019, 22.593, 263.34]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube049_Chimney_stones2_0_150">
                            <mesh
                              name="Object_228"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_228.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube051_151"
                          position={[-55.019, 22.593, 264.73]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube051_Chimney_stones3_0_152">
                            <mesh
                              name="Object_231"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_231.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube053_153"
                          position={[-55.019, 22.593, 265.587]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube053_Chimney_stones1_0_154">
                            <mesh
                              name="Object_234"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_234.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube055_155"
                          position={[-55.019, 22.593, 264.272]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube055_Material002_0_156">
                            <mesh
                              name="Object_237"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_237.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube057_157"
                          position={[-55.019, 22.593, 263.645]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube057_Material002_0_158">
                            <mesh
                              name="Object_240"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_240.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube059_159"
                          position={[-55.019, 22.593, 267.063]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube059_Chimney_stones1_0_160">
                            <mesh
                              name="Object_243"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_243.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube061_161"
                          position={[-55.019, 22.593, 266.861]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube061_Chimney_stones3_0_162">
                            <mesh
                              name="Object_246"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_246.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube063_163"
                          position={[-55.019, 22.593, 264.592]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube063_Material002_0_164">
                            <mesh
                              name="Object_249"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_249.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube065_165"
                          position={[-55.019, 22.593, 263.897]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube065_Chimney_stones1_0_166">
                            <mesh
                              name="Object_252"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_252.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube067_167"
                          position={[-55.019, 22.593, 266.087]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube067_Chimney_stones1_0_168">
                            <mesh
                              name="Object_255"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_255.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube069_169"
                          position={[-55.019, 22.593, 264.239]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube069_Chimney_stones1_0_170">
                            <mesh
                              name="Object_258"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_258.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube071_171"
                          position={[-55.019, 22.593, 263.486]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube071_Chimney_stones3_0_172">
                            <mesh
                              name="Object_261"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_261.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube073_173"
                          position={[-55.019, 22.593, 266.445]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube073_Chimney_stones1_0_174">
                            <mesh
                              name="Object_264"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_264.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube075_175"
                          position={[-55.019, 22.593, 264.492]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube075_Chimney_stones1_0_176">
                            <mesh
                              name="Object_267"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_267.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube077_177"
                          position={[-55.019, 22.593, 265.86]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube077_Material002_0_178">
                            <mesh
                              name="Object_270"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_270.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube079_179"
                          position={[-55.019, 22.593, 266.934]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube079_Chimney_stones3_0_180">
                            <mesh
                              name="Object_273"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_273.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube081_181"
                          position={[-55.019, 22.593, 265.574]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube081_Material002_0_182">
                            <mesh
                              name="Object_276"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_276.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube083_183"
                          position={[-55.019, 22.593, 265.086]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube083_Chimney_stones1_0_184">
                            <mesh
                              name="Object_279"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_279.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube085_185"
                          position={[-55.019, 22.593, 265.729]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube085_Chimney_stones1_0_186">
                            <mesh
                              name="Object_282"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_282.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube087_187"
                          position={[-55.019, 22.593, 263.144]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube087_Chimney_stones1_0_188">
                            <mesh
                              name="Object_285"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_285.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube089_189"
                          position={[-55.019, 22.593, 263.721]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube089_Chimney_stones3_0_190">
                            <mesh
                              name="Object_288"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_288.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube091_191"
                          position={[-55.019, 22.593, 264.881]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube091_Chimney_stones2_0_192">
                            <mesh
                              name="Object_291"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_291.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube093_193"
                          position={[-55.019, 22.593, 263.958]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube093_Chimney_stones1_0_194">
                            <mesh
                              name="Object_294"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_294.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube095_195"
                          position={[-55.019, 22.593, 265.255]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube095_Chimney_stones1_0_196">
                            <mesh
                              name="Object_297"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_297.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube097_197"
                          position={[-55.019, 22.593, 266.926]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube097_Chimney_stones1_0_198">
                            <mesh
                              name="Object_300"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_300.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube099_199"
                          position={[-55.019, 22.593, 263.443]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube099_Chimney_stones1_0_200">
                            <mesh
                              name="Object_303"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_303.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube101_201"
                          position={[-55.019, 22.593, 266.927]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube101_Chimney_stones1_0_202">
                            <mesh
                              name="Object_306"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_306.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube103_203"
                          position={[-55.019, 22.593, 263.206]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube103_Chimney_stones1_0_204">
                            <mesh
                              name="Object_309"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_309.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube105_205"
                          position={[-55.019, 22.593, 266.049]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube105_Chimney_stones1_0_206">
                            <mesh
                              name="Object_312"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_312.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube107_207"
                          position={[-55.019, 22.593, 264.512]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube107_Chimney_stones1_0_208">
                            <mesh
                              name="Object_315"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_315.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube109_209"
                          position={[-55.019, 22.593, 265.748]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube109_Chimney_stones3_0_210">
                            <mesh
                              name="Object_318"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_318.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube111_211"
                          position={[-55.019, 22.593, 266.802]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube111_Material002_0_212">
                            <mesh
                              name="Object_321"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_321.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube113_213"
                          position={[-55.019, 22.593, 263.906]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube113_Chimney_stones1_0_214">
                            <mesh
                              name="Object_324"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_324.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube115_215"
                          position={[-55.019, 22.593, 265.028]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube115_Chimney_stones1_0_216">
                            <mesh
                              name="Object_327"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_327.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube117_217"
                          position={[-55.019, 22.593, 263.87]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube117_Chimney_stones1_0_218">
                            <mesh
                              name="Object_330"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_330.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube119_219"
                          position={[-55.019, 22.593, 264.415]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube119_Chimney_stones1_0_220">
                            <mesh
                              name="Object_333"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_333.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube121_221"
                          position={[-55.019, 22.593, 265.503]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube121_Chimney_stones3_0_222">
                            <mesh
                              name="Object_336"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_336.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube123_223"
                          position={[-55.019, 22.593, 266.533]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube123_Chimney_stones1_0_224">
                            <mesh
                              name="Object_339"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_339.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube125_225"
                          position={[-55.019, 22.593, 264.971]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube125_Chimney_stones1_0_226">
                            <mesh
                              name="Object_342"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_342.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube127_227"
                          position={[-55.019, 22.593, 266.185]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube127_Chimney_stones1_0_228">
                            <mesh
                              name="Object_345"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_345.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube129_229"
                          position={[-55.019, 22.593, 265.039]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube129_Chimney_stones2_0_230">
                            <mesh
                              name="Object_348"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_348.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube131_231"
                          position={[-55.019, 22.593, 264.281]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube131_Chimney_stones1_0_232">
                            <mesh
                              name="Object_351"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_351.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube133_233"
                          position={[-55.019, 22.593, 266.215]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube133_Chimney_stones1_0_234">
                            <mesh
                              name="Object_354"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_354.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube135_235"
                          position={[-55.019, 22.593, 264.166]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube135_Chimney_stones1_0_236">
                            <mesh
                              name="Object_357"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_357.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube137_237"
                          position={[-55.019, 22.593, 263.983]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube137_Chimney_stones1_0_238">
                            <mesh
                              name="Object_360"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_360.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube139_239"
                          position={[-55.019, 22.593, 265.354]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube139_Chimney_stones1_0_240">
                            <mesh
                              name="Object_363"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_363.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube141_241"
                          position={[-55.019, 22.593, 266.613]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube141_Chimney_stones3_0_242">
                            <mesh
                              name="Object_366"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_366.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube143_243"
                          position={[-55.019, 22.593, 264.663]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube143_Chimney_stones1_0_244">
                            <mesh
                              name="Object_369"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_369.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube145_245"
                          position={[-55.019, 22.593, 263.921]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube145_Chimney_stones3_0_246">
                            <mesh
                              name="Object_372"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_372.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube270_247"
                          position={[-97.226, 421.976, 286.974]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube270_Chimney_stones1_0_248">
                            <mesh
                              name="Object_375"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_375.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube272_249"
                          position={[-97.226, 421.976, 287.564]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube272_Material002_0_250">
                            <mesh
                              name="Object_378"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_378.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube274_251"
                          position={[-97.226, 421.976, 286.312]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube274_Chimney_stones1_0_252">
                            <mesh
                              name="Object_381"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_381.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube276_253"
                          position={[-97.226, 421.976, 288.095]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube276_Chimney_stones1_0_254">
                            <mesh
                              name="Object_384"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_384.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube278_255"
                          position={[-97.226, 421.976, 286.474]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube278_Chimney_stones3_0_256">
                            <mesh
                              name="Object_387"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_387.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube280_257"
                          position={[-97.226, 421.976, 286.554]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube280_Material002_0_258">
                            <mesh
                              name="Object_390"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_390.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube282_259"
                          position={[-97.226, 421.976, 285.127]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube282_Chimney_stones1_0_260">
                            <mesh
                              name="Object_393"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_393.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube284_261"
                          position={[-97.226, 421.976, 284.725]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube284_Chimney_stones1_0_262">
                            <mesh
                              name="Object_396"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_396.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube286_263"
                          position={[-97.226, 421.976, 287.502]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube286_Chimney_stones1_0_264">
                            <mesh
                              name="Object_399"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_399.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube288_265"
                          position={[-97.226, 421.976, 285.483]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube288_Chimney_stones3_0_266">
                            <mesh
                              name="Object_402"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_402.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube290_267"
                          position={[-97.226, 421.976, 287.279]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube290_Chimney_stones3_0_268">
                            <mesh
                              name="Object_405"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_405.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube292_269"
                          position={[-97.226, 421.976, 287.436]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube292_Material002_0_270">
                            <mesh
                              name="Object_408"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_408.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube294_271"
                          position={[-97.226, 421.976, 284.951]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube294_Chimney_stones3_0_272">
                            <mesh
                              name="Object_411"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_411.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube296_273"
                          position={[-97.226, 421.976, 285.62]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube296_Chimney_stones2_0_274">
                            <mesh
                              name="Object_414"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_414.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube298_275"
                          position={[-97.226, 421.976, 286.336]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube298_Chimney_stones3_0_276">
                            <mesh
                              name="Object_417"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_417.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube300_277"
                          position={[-97.226, 421.976, 286.666]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube300_Chimney_stones3_0_278">
                            <mesh
                              name="Object_420"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_420.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube302_279"
                          position={[-97.226, 421.976, 287.71]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube302_Chimney_stones1_0_280">
                            <mesh
                              name="Object_423"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_423.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube304_281"
                          position={[-97.226, 421.976, 284.254]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube304_Chimney_stones1_0_282">
                            <mesh
                              name="Object_426"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_426.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube306_283"
                          position={[-97.226, 421.976, 286.599]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube306_Chimney_stones1_0_284">
                            <mesh
                              name="Object_429"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_429.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube308_285"
                          position={[-97.226, 421.976, 285.736]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube308_Chimney_stones1_0_286">
                            <mesh
                              name="Object_432"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_432.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube310_287"
                          position={[-97.226, 421.976, 284.435]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube310_Chimney_stones2_0_288">
                            <mesh
                              name="Object_435"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_435.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube312_289"
                          position={[-97.226, 421.976, 287.882]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube312_Chimney_stones1_0_290">
                            <mesh
                              name="Object_438"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_438.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube314_291"
                          position={[-97.226, 421.976, 287.939]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube314_Chimney_stones2_0_292">
                            <mesh
                              name="Object_441"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_441.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube316_293"
                          position={[-97.226, 421.976, 285.458]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube316_Chimney_stones1_0_294">
                            <mesh
                              name="Object_444"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_444.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube318_295"
                          position={[-97.226, 421.976, 286.712]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube318_Material002_0_296">
                            <mesh
                              name="Object_447"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_447.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube320_297"
                          position={[-97.226, 421.976, 286.414]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube320_Chimney_stones1_0_298">
                            <mesh
                              name="Object_450"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_450.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube322_299"
                          position={[-97.226, 421.976, 284.436]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube322_Material002_0_300">
                            <mesh
                              name="Object_453"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_453.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube324_301"
                          position={[-97.226, 421.976, 287.95]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube324_Chimney_stones3_0_302">
                            <mesh
                              name="Object_456"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_456.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube326_303"
                          position={[-97.226, 421.976, 287.749]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube326_Chimney_stones1_0_304">
                            <mesh
                              name="Object_459"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_459.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube328_305"
                          position={[-97.226, 421.976, 284.883]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube328_Chimney_stones1_0_306">
                            <mesh
                              name="Object_462"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_462.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube330_307"
                          position={[-97.226, 421.976, 284.285]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube330_Chimney_stones1_0_308">
                            <mesh
                              name="Object_465"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_465.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube332_309"
                          position={[-97.226, 421.976, 285.968]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube332_Chimney_stones3_0_310">
                            <mesh
                              name="Object_468"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_468.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube334_311"
                          position={[-97.226, 421.976, 285.811]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube334_Chimney_stones3_0_312">
                            <mesh
                              name="Object_471"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_471.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube336_313"
                          position={[-97.226, 421.976, 286.106]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube336_Chimney_stones2_0_314">
                            <mesh
                              name="Object_474"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_474.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube338_315"
                          position={[-97.226, 421.976, 284.459]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube338_Chimney_stones1_0_316">
                            <mesh
                              name="Object_477"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_477.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube340_317"
                          position={[-97.226, 421.976, 285.808]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube340_Chimney_stones1_0_318">
                            <mesh
                              name="Object_480"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_480.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube429_319"
                          position={[-118.642, 443.392, 285.757]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube429_Chimney_stones1_0_320">
                            <mesh
                              name="Object_483"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_483.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube431_321"
                          position={[-118.642, 443.392, 285.971]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube431_Chimney_stones1_0_322">
                            <mesh
                              name="Object_486"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_486.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube433_323"
                          position={[-118.642, 443.392, 285.51]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube433_Chimney_stones2_0_324">
                            <mesh
                              name="Object_489"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_489.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube435_325"
                          position={[-118.642, 443.392, 284.225]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube435_Chimney_stones1_0_326">
                            <mesh
                              name="Object_492"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_492.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube437_327"
                          position={[-118.642, 443.392, 285.438]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube437_Chimney_stones1_0_328">
                            <mesh
                              name="Object_495"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_495.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube439_329"
                          position={[-118.642, 443.392, 284.534]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube439_Chimney_stones1_0_330">
                            <mesh
                              name="Object_498"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_498.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube441_331"
                          position={[-118.642, 443.392, 285.782]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube441_Chimney_stones3_0_332">
                            <mesh
                              name="Object_501"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_501.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube443_333"
                          position={[-118.642, 443.392, 283.732]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube443_Chimney_stones1_0_334">
                            <mesh
                              name="Object_504"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_504.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube445_335"
                          position={[-118.642, 443.392, 285.096]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube445_Chimney_stones1_0_336">
                            <mesh
                              name="Object_507"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_507.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube447_337"
                          position={[-118.642, 443.392, 283.637]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube447_Chimney_stones1_0_338">
                            <mesh
                              name="Object_510"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_510.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube449_339"
                          position={[-118.642, 443.392, 283.915]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube449_Material002_0_340">
                            <mesh
                              name="Object_513"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_513.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube451_341"
                          position={[-118.642, 443.392, 285.791]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube451_Chimney_stones1_0_342">
                            <mesh
                              name="Object_516"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_516.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube453_343"
                          position={[-118.642, 443.392, 286.467]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube453_Chimney_stones1_0_344">
                            <mesh
                              name="Object_519"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_519.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube455_345"
                          position={[-118.642, 443.392, 284.754]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube455_Chimney_stones1_0_346">
                            <mesh
                              name="Object_522"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_522.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube457_347"
                          position={[-118.642, 443.392, 286.603]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube457_Chimney_stones1_0_348">
                            <mesh
                              name="Object_525"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_525.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube459_349"
                          position={[-118.642, 443.392, 285.417]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube459_Chimney_stones1_0_350">
                            <mesh
                              name="Object_528"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_528.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube461_351"
                          position={[-118.642, 443.392, 287.141]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube461_Chimney_stones1_0_352">
                            <mesh
                              name="Object_531"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_531.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube463_353"
                          position={[-118.642, 443.392, 286.057]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube463_Chimney_stones3_0_354">
                            <mesh
                              name="Object_534"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_534.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube465_355"
                          position={[-118.642, 443.392, 283.994]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube465_Chimney_stones1_0_356">
                            <mesh
                              name="Object_537"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_537.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube467_357"
                          position={[-118.642, 443.392, 285.436]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube467_Chimney_stones2_0_358">
                            <mesh
                              name="Object_540"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_540.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube469_359"
                          position={[-118.642, 443.392, 283.741]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube469_Chimney_stones1_0_360">
                            <mesh
                              name="Object_543"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_543.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube471_361"
                          position={[-118.642, 443.392, 285.969]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube471_Chimney_stones1_0_362">
                            <mesh
                              name="Object_546"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_546.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube473_363"
                          position={[-118.642, 443.392, 285.96]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube473_Chimney_stones1_0_364">
                            <mesh
                              name="Object_549"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_549.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube475_365"
                          position={[-118.642, 443.392, 286.891]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube475_Chimney_stones3_0_366">
                            <mesh
                              name="Object_552"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_552.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube477_367"
                          position={[-118.642, 443.392, 284.049]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube477_Chimney_stones1_0_368">
                            <mesh
                              name="Object_555"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_555.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube479_369"
                          position={[-118.642, 443.392, 284.804]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube479_Chimney_stones1_0_370">
                            <mesh
                              name="Object_558"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_558.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube481_371"
                          position={[-118.642, 443.392, 287.535]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube481_Chimney_stones1_0_372">
                            <mesh
                              name="Object_561"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_561.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube482_373"
                          position={[-76.435, 44.009, 264.517]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube482_Material002_0_374">
                            <mesh
                              name="Object_564"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_564.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube484_375"
                          position={[-76.435, 44.009, 263.691]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube484_Chimney_stones1_0_376">
                            <mesh
                              name="Object_567"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_567.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube486_377"
                          position={[-76.435, 44.009, 264.037]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube486_Chimney_stones1_0_378">
                            <mesh
                              name="Object_570"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_570.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube488_379"
                          position={[-76.435, 44.009, 264.026]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube488_Chimney_stones1_0_380">
                            <mesh
                              name="Object_573"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_573.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube490_381"
                          position={[-76.435, 44.009, 264.448]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube490_Chimney_stones1_0_382">
                            <mesh
                              name="Object_576"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_576.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube492_383"
                          position={[-76.435, 44.009, 264.852]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube492_Chimney_stones1_0_384">
                            <mesh
                              name="Object_579"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_579.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube494_385"
                          position={[-76.435, 44.009, 263.973]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube494_Chimney_stones1_0_386">
                            <mesh
                              name="Object_582"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_582.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube496_387"
                          position={[-76.435, 44.009, 265.968]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube496_Chimney_stones1_0_388">
                            <mesh
                              name="Object_585"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_585.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube498_389"
                          position={[-76.435, 44.009, 265.952]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube498_Chimney_stones1_0_390">
                            <mesh
                              name="Object_588"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_588.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube500_391"
                          position={[-76.435, 44.009, 264.176]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube500_Chimney_stones1_0_392">
                            <mesh
                              name="Object_591"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_591.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube502_393"
                          position={[-76.435, 44.009, 263.474]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube502_Chimney_stones1_0_394">
                            <mesh
                              name="Object_594"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_594.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube504_395"
                          position={[-76.435, 44.009, 263.774]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube504_Chimney_stones1_0_396">
                            <mesh
                              name="Object_597"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_597.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube506_397"
                          position={[-76.435, 44.009, 262.955]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube506_Material002_0_398">
                            <mesh
                              name="Object_600"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_600.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube508_399"
                          position={[-76.435, 44.009, 265.956]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube508_Chimney_stones1_0_400">
                            <mesh
                              name="Object_603"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_603.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube510_401"
                          position={[-76.435, 44.009, 266.368]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube510_Chimney_stones3_0_402">
                            <mesh
                              name="Object_606"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_606.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube512_403"
                          position={[-76.435, 44.009, 266.367]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube512_Chimney_stones2_0_404">
                            <mesh
                              name="Object_609"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_609.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube514_405"
                          position={[-76.435, 44.009, 266.504]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube514_Chimney_stones3_0_406">
                            <mesh
                              name="Object_612"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_612.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube516_407"
                          position={[-76.435, 44.009, 263.964]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube516_Chimney_stones1_0_408">
                            <mesh
                              name="Object_615"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_615.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube518_409"
                          position={[-76.435, 44.009, 264.423]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube518_Chimney_stones1_0_410">
                            <mesh
                              name="Object_618"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_618.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube520_411"
                          position={[-76.435, 44.009, 265.859]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube520_Chimney_stones3_0_412">
                            <mesh
                              name="Object_621"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_621.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube522_413"
                          position={[-76.435, 44.009, 266.516]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube522_Chimney_stones1_0_414">
                            <mesh
                              name="Object_624"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_624.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube524_415"
                          position={[-76.435, 44.009, 262.662]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube524_Chimney_stones1_0_416">
                            <mesh
                              name="Object_627"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_627.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube526_417"
                          position={[-76.435, 44.009, 264.249]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube526_Chimney_stones1_0_418">
                            <mesh
                              name="Object_630"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_630.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube528_419"
                          position={[-76.435, 44.009, 264.444]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube528_Chimney_stones3_0_420">
                            <mesh
                              name="Object_633"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_633.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube530_421"
                          position={[-76.435, 44.009, 262.679]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube530_Chimney_stones1_0_422">
                            <mesh
                              name="Object_636"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_636.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube532_423"
                          position={[-76.435, 44.009, 263.761]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube532_Chimney_stones3_0_424">
                            <mesh
                              name="Object_639"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_639.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube534_425"
                          position={[-76.435, 44.009, 265.788]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube534_Chimney_stones1_0_426">
                            <mesh
                              name="Object_642"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_642.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube536_427"
                          position={[-76.435, 44.009, 265.246]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube536_Chimney_stones1_0_428">
                            <mesh
                              name="Object_645"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_645.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube538_429"
                          position={[-76.435, 44.009, 265.805]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube538_Material002_0_430">
                            <mesh
                              name="Object_648"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_648.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube540_431"
                          position={[-76.435, 44.009, 265.808]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube540_Chimney_stones1_0_432">
                            <mesh
                              name="Object_651"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_651.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube542_433"
                          position={[-76.435, 44.009, 266.074]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube542_Chimney_stones1_0_434">
                            <mesh
                              name="Object_654"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_654.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube544_435"
                          position={[-76.435, 44.009, 263.237]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube544_Chimney_stones1_0_436">
                            <mesh
                              name="Object_657"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_657.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube546_437"
                          position={[-76.435, 44.009, 265.43]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube546_Chimney_stones1_0_438">
                            <mesh
                              name="Object_660"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_660.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube548_439"
                          position={[-76.435, 44.009, 263.342]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube548_Chimney_stones1_0_440">
                            <mesh
                              name="Object_663"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_663.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube550_441"
                          position={[-76.435, 44.009, 266.105]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube550_Material002_0_442">
                            <mesh
                              name="Object_666"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_666.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube552_443"
                          position={[-76.435, 44.009, 266.576]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube552_Chimney_stones3_0_444">
                            <mesh
                              name="Object_669"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_669.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube554_445"
                          position={[-76.435, 44.009, 263.905]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube554_Chimney_stones1_0_446">
                            <mesh
                              name="Object_672"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_672.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube556_447"
                          position={[-76.435, 44.009, 263.267]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube556_Chimney_stones1_0_448">
                            <mesh
                              name="Object_675"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_675.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube558_449"
                          position={[-76.435, 44.009, 262.959]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube558_Chimney_stones1_0_450">
                            <mesh
                              name="Object_678"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_678.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube560_451"
                          position={[-76.435, 44.009, 264.552]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube560_Chimney_stones1_0_452">
                            <mesh
                              name="Object_681"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_681.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube562_453"
                          position={[-76.435, 44.009, 264.757]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube562_Chimney_stones1_0_454">
                            <mesh
                              name="Object_684"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_684.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube564_455"
                          position={[-76.435, 44.009, 263.249]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube564_Chimney_stones1_0_456">
                            <mesh
                              name="Object_687"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_687.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube566_457"
                          position={[-76.435, 44.009, 262.852]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube566_Chimney_stones1_0_458">
                            <mesh
                              name="Object_690"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_690.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube568_459"
                          position={[-76.435, 44.009, 263.187]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube568_Chimney_stones1_0_460">
                            <mesh
                              name="Object_693"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_693.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube570_461"
                          position={[-76.435, 44.009, 266.137]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube570_Chimney_stones1_0_462">
                            <mesh
                              name="Object_696"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_696.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube571_463"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube571_Chimney_stones1_0_464">
                            <mesh
                              name="Object_699"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_699.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube572_465"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube572_Chimney_stones2_0_466">
                            <mesh
                              name="Object_702"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_702.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube579_467"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube579_Chimney_stones3_0_468">
                            <mesh
                              name="Object_705"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_705.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube580_469"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube580_Chimney_stones3_0_470">
                            <mesh
                              name="Object_708"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_708.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube587_471"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube587_Chimney_stones1_0_472">
                            <mesh
                              name="Object_711"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_711.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube588_473"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube588_Chimney_stones1_0_474">
                            <mesh
                              name="Object_714"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_714.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube595_475"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube595_Material002_0_476">
                            <mesh
                              name="Object_717"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_717.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube596_477"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube596_Chimney_stones3_0_478">
                            <mesh
                              name="Object_720"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_720.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube603_479"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube603_Chimney_stones1_0_480">
                            <mesh
                              name="Object_723"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_723.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube604_481"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube604_Chimney_stones1_0_482">
                            <mesh
                              name="Object_726"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_726.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube611_483"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube611_Chimney_stones3_0_484">
                            <mesh
                              name="Object_729"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_729.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube612_485"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube612_Chimney_stones1_0_486">
                            <mesh
                              name="Object_732"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_732.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube619_487"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube619_Chimney_stones1_0_488">
                            <mesh
                              name="Object_735"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_735.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube620_489"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube620_Chimney_stones3_0_490">
                            <mesh
                              name="Object_738"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_738.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube627_491"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube627_Chimney_stones1_0_492">
                            <mesh
                              name="Object_741"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_741.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube628_493"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube628_Chimney_stones1_0_494">
                            <mesh
                              name="Object_744"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_744.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube635_495"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube635_Chimney_stones1_0_496">
                            <mesh
                              name="Object_747"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_747.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube636_497"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube636_Chimney_stones1_0_498">
                            <mesh
                              name="Object_750"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_750.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube642_499"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube642_Chimney_stones1_0_500">
                            <mesh
                              name="Object_753"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_753.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube643_501"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube643_Chimney_stones1_0_502">
                            <mesh
                              name="Object_756"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_756.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube650_503"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube650_Material002_0_504">
                            <mesh
                              name="Object_759"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_759.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube651_505"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube651_Chimney_stones1_0_506">
                            <mesh
                              name="Object_762"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_762.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube658_507"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube658_Chimney_stones1_0_508">
                            <mesh
                              name="Object_765"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_765.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube659_509"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube659_Chimney_stones1_0_510">
                            <mesh
                              name="Object_768"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_768.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube666_511"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube666_Chimney_stones1_0_512">
                            <mesh
                              name="Object_771"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_771.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube667_513"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube667_Chimney_stones1_0_514">
                            <mesh
                              name="Object_774"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_774.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube674_515"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube674_Chimney_stones3_0_516">
                            <mesh
                              name="Object_777"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_777.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube675_517"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube675_Chimney_stones1_0_518">
                            <mesh
                              name="Object_780"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_780.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube682_519"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube682_Chimney_stones1_0_520">
                            <mesh
                              name="Object_783"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_783.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube683_521"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube683_Chimney_stones3_0_522">
                            <mesh
                              name="Object_786"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_786.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube690_523"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube690_Chimney_stones1_0_524">
                            <mesh
                              name="Object_789"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_789.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube691_525"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube691_Chimney_stones1_0_526">
                            <mesh
                              name="Object_792"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_792.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube698_527"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube698_Chimney_stones1_0_528">
                            <mesh
                              name="Object_795"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_795.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube699_529"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube699_Chimney_stones3_0_530">
                            <mesh
                              name="Object_798"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_798.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube029_531"
                          position={[-282.35, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube029_Chimney_stones2_0_532">
                            <mesh
                              name="Object_801"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_801.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube034_533"
                          position={[-282.774, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube034_Chimney_stones1_0_534">
                            <mesh
                              name="Object_804"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_804.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube031_535"
                          position={[-321.488, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube031_Chimney_stones1_0_536">
                            <mesh
                              name="Object_807"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_807.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube033_537"
                          position={[-331.017, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube033_Chimney_stones3_0_538">
                            <mesh
                              name="Object_810"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_810.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube038_539"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube038_Chimney_stones3_0_540">
                            <mesh
                              name="Object_813"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_813.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube147_541"
                          position={[-280.042, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube147_Chimney_stones1_0_542">
                            <mesh
                              name="Object_816"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_816.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube149_543"
                          position={[-280.866, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube149_Chimney_stones3_0_544">
                            <mesh
                              name="Object_819"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_819.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube151_545"
                          position={[-280.189, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube151_Material002_0_546">
                            <mesh
                              name="Object_822"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_822.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube153_547"
                          position={[-282.713, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube153_Chimney_stones1_0_548">
                            <mesh
                              name="Object_825"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_825.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube155_549"
                          position={[-280.729, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube155_Material002_0_550">
                            <mesh
                              name="Object_828"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_828.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube157_551"
                          position={[-279.059, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube157_Chimney_stones1_0_552">
                            <mesh
                              name="Object_831"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_831.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube159_553"
                          position={[-281.183, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube159_Chimney_stones2_0_554">
                            <mesh
                              name="Object_834"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_834.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube161_555"
                          position={[-280.733, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube161_Chimney_stones1_0_556">
                            <mesh
                              name="Object_837"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_837.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube163_557"
                          position={[-279.693, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube163_Chimney_stones3_0_558">
                            <mesh
                              name="Object_840"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_840.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube165_559"
                          position={[-279.865, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube165_Chimney_stones1_0_560">
                            <mesh
                              name="Object_843"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_843.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube167_561"
                          position={[-281.796, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube167_Chimney_stones1_0_562">
                            <mesh
                              name="Object_846"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_846.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube169_563"
                          position={[-282.452, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube169_Chimney_stones3_0_564">
                            <mesh
                              name="Object_849"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_849.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube171_565"
                          position={[-280.012, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube171_Chimney_stones1_0_566">
                            <mesh
                              name="Object_852"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_852.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube173_567"
                          position={[-281.994, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube173_Chimney_stones2_0_568">
                            <mesh
                              name="Object_855"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_855.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube175_569"
                          position={[-279.385, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube175_Chimney_stones1_0_570">
                            <mesh
                              name="Object_858"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_858.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube177_571"
                          position={[-279.372, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube177_Chimney_stones1_0_572">
                            <mesh
                              name="Object_861"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_861.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube179_573"
                          position={[-280.852, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube179_Chimney_stones3_0_574">
                            <mesh
                              name="Object_864"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_864.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube181_575"
                          position={[-281.703, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube181_Chimney_stones1_0_576">
                            <mesh
                              name="Object_867"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_867.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube183_577"
                          position={[-279.756, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube183_Chimney_stones1_0_578">
                            <mesh
                              name="Object_870"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_870.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube185_579"
                          position={[-280.949, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube185_Chimney_stones1_0_580">
                            <mesh
                              name="Object_873"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_873.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube187_581"
                          position={[-280.486, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube187_Chimney_stones1_0_582">
                            <mesh
                              name="Object_876"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_876.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube189_583"
                          position={[-282.346, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube189_Material002_0_584">
                            <mesh
                              name="Object_879"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_879.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube191_585"
                          position={[-280.426, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube191_Chimney_stones1_0_586">
                            <mesh
                              name="Object_882"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_882.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube193_587"
                          position={[-279.187, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube193_Material002_0_588">
                            <mesh
                              name="Object_885"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_885.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube195_589"
                          position={[-279.347, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube195_Chimney_stones1_0_590">
                            <mesh
                              name="Object_888"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_888.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube197_591"
                          position={[-282.476, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube197_Chimney_stones1_0_592">
                            <mesh
                              name="Object_891"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_891.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube200_593"
                          position={[-280.279, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube200_Chimney_stones1_0_594">
                            <mesh
                              name="Object_894"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_894.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube202_595"
                          position={[-279.234, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube202_Chimney_stones1_0_596">
                            <mesh
                              name="Object_897"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_897.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube204_597"
                          position={[-280.24, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube204_Chimney_stones3_0_598">
                            <mesh
                              name="Object_900"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_900.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube206_599"
                          position={[-280.279, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube206_Chimney_stones1_0_600">
                            <mesh
                              name="Object_903"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_903.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube208_601"
                          position={[-281.676, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube208_Chimney_stones1_0_602">
                            <mesh
                              name="Object_906"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_906.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube210_603"
                          position={[-280.682, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube210_Chimney_stones1_0_604">
                            <mesh
                              name="Object_909"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_909.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube212_605"
                          position={[-280.881, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube212_Chimney_stones1_0_606">
                            <mesh
                              name="Object_912"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_912.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube214_607"
                          position={[-282.46, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube214_Chimney_stones1_0_608">
                            <mesh
                              name="Object_915"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_915.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube216_609"
                          position={[-279.275, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube216_Chimney_stones1_0_610">
                            <mesh
                              name="Object_918"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_918.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube218_611"
                          position={[-280.028, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube218_Chimney_stones1_0_612">
                            <mesh
                              name="Object_921"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_921.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube220_613"
                          position={[-281.074, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube220_Chimney_stones1_0_614">
                            <mesh
                              name="Object_924"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_924.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube222_615"
                          position={[-281.467, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube222_Chimney_stones1_0_616">
                            <mesh
                              name="Object_927"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_927.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube224_617"
                          position={[-282.857, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube224_Chimney_stones1_0_618">
                            <mesh
                              name="Object_930"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_930.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube226_619"
                          position={[-280.972, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube226_Chimney_stones1_0_620">
                            <mesh
                              name="Object_933"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_933.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube228_621"
                          position={[-282.601, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube228_Chimney_stones1_0_622">
                            <mesh
                              name="Object_936"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_936.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube230_623"
                          position={[-281.401, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube230_Chimney_stones3_0_624">
                            <mesh
                              name="Object_939"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_939.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube232_625"
                          position={[-281.885, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube232_Chimney_stones1_0_626">
                            <mesh
                              name="Object_942"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_942.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube234_627"
                          position={[-282.228, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube234_Chimney_stones3_0_628">
                            <mesh
                              name="Object_945"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_945.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube236_629"
                          position={[-282.331, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube236_Chimney_stones1_0_630">
                            <mesh
                              name="Object_948"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_948.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube238_631"
                          position={[-279.676, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube238_Chimney_stones1_0_632">
                            <mesh
                              name="Object_951"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_951.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube240_633"
                          position={[-281.254, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube240_Material002_0_634">
                            <mesh
                              name="Object_954"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_954.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube242_635"
                          position={[-280.377, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube242_Chimney_stones1_0_636">
                            <mesh
                              name="Object_957"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_957.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube244_637"
                          position={[-280.153, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube244_Chimney_stones1_0_638">
                            <mesh
                              name="Object_960"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_960.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube246_639"
                          position={[-281.354, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube246_Chimney_stones1_0_640">
                            <mesh
                              name="Object_963"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_963.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube248_641"
                          position={[-278.993, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube248_Chimney_stones1_0_642">
                            <mesh
                              name="Object_966"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_966.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube250_643"
                          position={[-281.118, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube250_Chimney_stones1_0_644">
                            <mesh
                              name="Object_969"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_969.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube252_645"
                          position={[-282.072, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube252_Chimney_stones1_0_646">
                            <mesh
                              name="Object_972"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_972.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube254_647"
                          position={[-279.549, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube254_Chimney_stones1_0_648">
                            <mesh
                              name="Object_975"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_975.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube256_649"
                          position={[-282.873, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube256_Chimney_stones1_0_650">
                            <mesh
                              name="Object_978"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_978.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube258_651"
                          position={[-280.916, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube258_Chimney_stones1_0_652">
                            <mesh
                              name="Object_981"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_981.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube260_653"
                          position={[-279.757, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube260_Material002_0_654">
                            <mesh
                              name="Object_984"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_984.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube262_655"
                          position={[-280.71, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube262_Chimney_stones1_0_656">
                            <mesh
                              name="Object_987"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_987.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube264_657"
                          position={[-281.466, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube264_Chimney_stones1_0_658">
                            <mesh
                              name="Object_990"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_990.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube266_659"
                          position={[-282.052, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube266_Chimney_stones1_0_660">
                            <mesh
                              name="Object_993"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_993.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube268_661"
                          position={[-279.94, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube268_Chimney_stones1_0_662">
                            <mesh
                              name="Object_996"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_996.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube342_663"
                          position={[-324.405, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube342_Chimney_stones1_0_664">
                            <mesh
                              name="Object_999"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_999.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube344_665"
                          position={[-321.497, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube344_Chimney_stones1_0_666">
                            <mesh
                              name="Object_1002"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1002.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube346_667"
                          position={[-321.202, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube346_Chimney_stones1_0_668">
                            <mesh
                              name="Object_1005"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1005.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube348_669"
                          position={[-322.231, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube348_Chimney_stones1_0_670">
                            <mesh
                              name="Object_1008"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1008.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube350_671"
                          position={[-323.125, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube350_Chimney_stones1_0_672">
                            <mesh
                              name="Object_1011"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1011.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube352_673"
                          position={[-321.835, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube352_Chimney_stones1_0_674">
                            <mesh
                              name="Object_1014"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1014.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube354_675"
                          position={[-323.114, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube354_Chimney_stones1_0_676">
                            <mesh
                              name="Object_1017"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1017.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube356_677"
                          position={[-323.774, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube356_Chimney_stones1_0_678">
                            <mesh
                              name="Object_1020"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1020.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube358_679"
                          position={[-322.773, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube358_Chimney_stones3_0_680">
                            <mesh
                              name="Object_1023"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1023.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube360_681"
                          position={[-322.435, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube360_Material002_0_682">
                            <mesh
                              name="Object_1026"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1026.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube362_683"
                          position={[-321.732, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube362_Chimney_stones1_0_684">
                            <mesh
                              name="Object_1029"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1029.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube364_685"
                          position={[-321.712, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube364_Chimney_stones1_0_686">
                            <mesh
                              name="Object_1032"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1032.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube366_687"
                          position={[-322.732, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube366_Chimney_stones1_0_688">
                            <mesh
                              name="Object_1035"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1035.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube368_689"
                          position={[-321.574, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube368_Chimney_stones1_0_690">
                            <mesh
                              name="Object_1038"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1038.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube370_691"
                          position={[-324.49, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube370_Chimney_stones1_0_692">
                            <mesh
                              name="Object_1041"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1041.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube372_693"
                          position={[-321.155, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube372_Chimney_stones1_0_694">
                            <mesh
                              name="Object_1044"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1044.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube374_695"
                          position={[-322.996, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube374_Chimney_stones1_0_696">
                            <mesh
                              name="Object_1047"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1047.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube377_697"
                          position={[-328.726, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube377_Chimney_stones1_0_698">
                            <mesh
                              name="Object_1050"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1050.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube379_699"
                          position={[-328.769, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube379_Chimney_stones3_0_700">
                            <mesh
                              name="Object_1053"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1053.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube381_701"
                          position={[-329.099, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube381_Chimney_stones1_0_702">
                            <mesh
                              name="Object_1056"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1056.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube383_703"
                          position={[-330.522, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube383_Chimney_stones2_0_704">
                            <mesh
                              name="Object_1059"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1059.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube385_705"
                          position={[-328.91, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube385_Chimney_stones1_0_706">
                            <mesh
                              name="Object_1062"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1062.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube387_707"
                          position={[-329.985, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube387_Chimney_stones2_0_708">
                            <mesh
                              name="Object_1065"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1065.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube389_709"
                          position={[-329.809, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube389_Chimney_stones3_0_710">
                            <mesh
                              name="Object_1068"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1068.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube391_711"
                          position={[-330.294, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube391_Material002_0_712">
                            <mesh
                              name="Object_1071"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1071.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube393_713"
                          position={[-331.165, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube393_Chimney_stones1_0_714">
                            <mesh
                              name="Object_1074"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1074.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube395_715"
                          position={[-329.375, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube395_Chimney_stones3_0_716">
                            <mesh
                              name="Object_1077"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1077.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube397_717"
                          position={[-330.431, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube397_Chimney_stones2_0_718">
                            <mesh
                              name="Object_1080"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1080.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube399_719"
                          position={[-329.201, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube399_Chimney_stones2_0_720">
                            <mesh
                              name="Object_1083"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1083.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube401_721"
                          position={[-328.917, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube401_Chimney_stones1_0_722">
                            <mesh
                              name="Object_1086"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1086.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube403_723"
                          position={[-328.499, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube403_Chimney_stones1_0_724">
                            <mesh
                              name="Object_1089"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1089.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube405_725"
                          position={[-328.916, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube405_Chimney_stones1_0_726">
                            <mesh
                              name="Object_1092"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1092.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube407_727"
                          position={[-330.271, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube407_Chimney_stones1_0_728">
                            <mesh
                              name="Object_1095"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1095.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube409_729"
                          position={[-329.357, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube409_Chimney_stones1_0_730">
                            <mesh
                              name="Object_1098"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1098.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube411_731"
                          position={[-328.309, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube411_Chimney_stones2_0_732">
                            <mesh
                              name="Object_1101"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1101.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube413_733"
                          position={[-330.558, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube413_Chimney_stones1_0_734">
                            <mesh
                              name="Object_1104"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1104.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube415_735"
                          position={[-329.546, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube415_Chimney_stones1_0_736">
                            <mesh
                              name="Object_1107"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1107.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube417_737"
                          position={[-329.961, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube417_Chimney_stones1_0_738">
                            <mesh
                              name="Object_1110"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1110.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube419_739"
                          position={[-331.799, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube419_Chimney_stones3_0_740">
                            <mesh
                              name="Object_1113"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1113.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube421_741"
                          position={[-327.921, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube421_Chimney_stones1_0_742">
                            <mesh
                              name="Object_1116"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1116.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube423_743"
                          position={[-329.217, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube423_Chimney_stones3_0_744">
                            <mesh
                              name="Object_1119"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1119.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube425_745"
                          position={[-331.555, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube425_Chimney_stones1_0_746">
                            <mesh
                              name="Object_1122"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1122.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube427_747"
                          position={[-330.358, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube427_Chimney_stones1_0_748">
                            <mesh
                              name="Object_1125"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1125.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube573_749"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube573_Chimney_stones3_0_750">
                            <mesh
                              name="Object_1128"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1128.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube578_751"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube578_Chimney_stones1_0_752">
                            <mesh
                              name="Object_1131"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1131.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube581_753"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube581_Chimney_stones1_0_754">
                            <mesh
                              name="Object_1134"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1134.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube586_755"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube586_Chimney_stones1_0_756">
                            <mesh
                              name="Object_1137"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1137.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube589_757"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube589_Chimney_stones1_0_758">
                            <mesh
                              name="Object_1140"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1140.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube594_759"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube594_Chimney_stones3_0_760">
                            <mesh
                              name="Object_1143"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1143.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube597_761"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube597_Chimney_stones3_0_762">
                            <mesh
                              name="Object_1146"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1146.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube602_763"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube602_Chimney_stones1_0_764">
                            <mesh
                              name="Object_1149"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1149.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube605_765"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube605_Chimney_stones1_0_766">
                            <mesh
                              name="Object_1152"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1152.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube610_767"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube610_Chimney_stones1_0_768">
                            <mesh
                              name="Object_1155"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1155.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube613_769"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube613_Chimney_stones1_0_770">
                            <mesh
                              name="Object_1158"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1158.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube618_771"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube618_Chimney_stones3_0_772">
                            <mesh
                              name="Object_1161"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1161.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube621_773"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube621_Chimney_stones1_0_774">
                            <mesh
                              name="Object_1164"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1164.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube626_775"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube626_Chimney_stones1_0_776">
                            <mesh
                              name="Object_1167"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1167.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube629_777"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube629_Chimney_stones1_0_778">
                            <mesh
                              name="Object_1170"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1170.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube634_779"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube634_Chimney_stones2_0_780">
                            <mesh
                              name="Object_1173"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1173.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube637_781"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube637_Chimney_stones1_0_782">
                            <mesh
                              name="Object_1176"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1176.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube645_783"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube645_Chimney_stones3_0_784">
                            <mesh
                              name="Object_1179"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1179.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube646_785"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube646_Chimney_stones1_0_786">
                            <mesh
                              name="Object_1182"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1182.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube653_787"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube653_Chimney_stones3_0_788">
                            <mesh
                              name="Object_1185"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1185.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube654_789"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube654_Chimney_stones1_0_790">
                            <mesh
                              name="Object_1188"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1188.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube661_791"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube661_Chimney_stones1_0_792">
                            <mesh
                              name="Object_1191"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1191.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube662_793"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube662_Chimney_stones1_0_794">
                            <mesh
                              name="Object_1194"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1194.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube669_795"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube669_Chimney_stones1_0_796">
                            <mesh
                              name="Object_1197"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1197.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube670_797"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube670_Chimney_stones1_0_798">
                            <mesh
                              name="Object_1200"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1200.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube677_799"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube677_Chimney_stones1_0_800">
                            <mesh
                              name="Object_1203"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1203.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube678_801"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube678_Chimney_stones1_0_802">
                            <mesh
                              name="Object_1206"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1206.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube685_803"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube685_Chimney_stones2_0_804">
                            <mesh
                              name="Object_1209"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1209.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube686_805"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube686_Chimney_stones1_0_806">
                            <mesh
                              name="Object_1212"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1212.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube693_807"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube693_Chimney_stones1_0_808">
                            <mesh
                              name="Object_1215"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1215.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube694_809"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube694_Chimney_stones3_0_810">
                            <mesh
                              name="Object_1218"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1218.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube701_811"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube701_Chimney_stones1_0_812">
                            <mesh
                              name="Object_1221"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1221.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube702_813"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube702_Chimney_stones3_0_814">
                            <mesh
                              name="Object_1224"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1224.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube027_815"
                          position={[-55.019, 22.593, 265.678]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube027_Chimney_stones1_0_816">
                            <mesh
                              name="Object_1227"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1227.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube030_817"
                          position={[-97.226, 421.976, 287.512]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube030_Chimney_stones1_0_818">
                            <mesh
                              name="Object_1230"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1230.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube032_819"
                          position={[-118.642, 443.392, 284.192]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube032_Material002_0_820">
                            <mesh
                              name="Object_1233"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1233.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube035_821"
                          position={[-76.435, 44.009, 265.844]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube035_Chimney_stones1_0_822">
                            <mesh
                              name="Object_1236"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1236.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube040_823"
                          position={[-55.019, 22.593, 263.654]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube040_Chimney_stones3_0_824">
                            <mesh
                              name="Object_1239"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1239.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube042_825"
                          position={[-55.019, 22.593, 264.63]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube042_Chimney_stones1_0_826">
                            <mesh
                              name="Object_1242"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1242.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube044_827"
                          position={[-55.019, 22.593, 263.318]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube044_Chimney_stones1_0_828">
                            <mesh
                              name="Object_1245"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1245.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube046_829"
                          position={[-55.019, 22.593, 265.84]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube046_Chimney_stones2_0_830">
                            <mesh
                              name="Object_1248"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1248.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube048_831"
                          position={[-55.019, 22.593, 265.186]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube048_Chimney_stones1_0_832">
                            <mesh
                              name="Object_1251"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1251.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube050_833"
                          position={[-55.019, 22.593, 266.431]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube050_Chimney_stones1_0_834">
                            <mesh
                              name="Object_1254"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1254.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube052_835"
                          position={[-55.019, 22.593, 266.3]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube052_Chimney_stones1_0_836">
                            <mesh
                              name="Object_1257"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1257.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube054_837"
                          position={[-55.019, 22.593, 266.941]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube054_Chimney_stones1_0_838">
                            <mesh
                              name="Object_1260"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1260.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube056_839"
                          position={[-55.019, 22.593, 263.098]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube056_Chimney_stones1_0_840">
                            <mesh
                              name="Object_1263"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1263.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube058_841"
                          position={[-55.019, 22.593, 263.649]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube058_Chimney_stones1_0_842">
                            <mesh
                              name="Object_1266"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1266.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube060_843"
                          position={[-55.019, 22.593, 263.282]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube060_Chimney_stones1_0_844">
                            <mesh
                              name="Object_1269"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1269.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube062_845"
                          position={[-55.019, 22.593, 264.824]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube062_Chimney_stones1_0_846">
                            <mesh
                              name="Object_1272"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1272.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube064_847"
                          position={[-55.019, 22.593, 263.59]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube064_Chimney_stones1_0_848">
                            <mesh
                              name="Object_1275"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1275.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube066_849"
                          position={[-55.019, 22.593, 266.932]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube066_Chimney_stones1_0_850">
                            <mesh
                              name="Object_1278"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1278.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube068_851"
                          position={[-55.019, 22.593, 264.875]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube068_Chimney_stones1_0_852">
                            <mesh
                              name="Object_1281"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1281.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube070_853"
                          position={[-55.019, 22.593, 264.335]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube070_Chimney_stones1_0_854">
                            <mesh
                              name="Object_1284"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1284.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube072_855"
                          position={[-55.019, 22.593, 263.269]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube072_Chimney_stones1_0_856">
                            <mesh
                              name="Object_1287"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1287.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube074_857"
                          position={[-55.019, 22.593, 264.468]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube074_Chimney_stones3_0_858">
                            <mesh
                              name="Object_1290"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1290.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube076_859"
                          position={[-55.019, 22.593, 263.439]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube076_Chimney_stones1_0_860">
                            <mesh
                              name="Object_1293"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1293.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube078_861"
                          position={[-55.019, 22.593, 263.265]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube078_Chimney_stones1_0_862">
                            <mesh
                              name="Object_1296"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1296.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube080_863"
                          position={[-55.019, 22.593, 264.467]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube080_Chimney_stones1_0_864">
                            <mesh
                              name="Object_1299"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1299.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube082_865"
                          position={[-55.019, 22.593, 266.696]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube082_Chimney_stones1_0_866">
                            <mesh
                              name="Object_1302"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1302.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube084_867"
                          position={[-55.019, 22.593, 265.286]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube084_Chimney_stones1_0_868">
                            <mesh
                              name="Object_1305"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1305.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube086_869"
                          position={[-55.019, 22.593, 263.891]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube086_Chimney_stones1_0_870">
                            <mesh
                              name="Object_1308"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1308.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube088_871"
                          position={[-55.019, 22.593, 265.213]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube088_Chimney_stones1_0_872">
                            <mesh
                              name="Object_1311"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1311.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube090_873"
                          position={[-55.019, 22.593, 265.175]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube090_Chimney_stones1_0_874">
                            <mesh
                              name="Object_1314"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1314.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube092_875"
                          position={[-55.019, 22.593, 263.577]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube092_Chimney_stones3_0_876">
                            <mesh
                              name="Object_1317"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1317.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube094_877"
                          position={[-55.019, 22.593, 265.137]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube094_Chimney_stones1_0_878">
                            <mesh
                              name="Object_1320"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1320.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube096_879"
                          position={[-55.019, 22.593, 265.303]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube096_Chimney_stones1_0_880">
                            <mesh
                              name="Object_1323"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1323.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube098_881"
                          position={[-55.019, 22.593, 264.191]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube098_Chimney_stones1_0_882">
                            <mesh
                              name="Object_1326"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1326.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube100_883"
                          position={[-55.019, 22.593, 266.285]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube100_Chimney_stones1_0_884">
                            <mesh
                              name="Object_1329"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1329.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube102_885"
                          position={[-55.019, 22.593, 265.639]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube102_Chimney_stones1_0_886">
                            <mesh
                              name="Object_1332"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1332.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube104_887"
                          position={[-55.019, 22.593, 264.291]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube104_Chimney_stones1_0_888">
                            <mesh
                              name="Object_1335"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1335.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube106_889"
                          position={[-55.019, 22.593, 266.197]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube106_Chimney_stones1_0_890">
                            <mesh
                              name="Object_1338"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1338.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube108_891"
                          position={[-55.019, 22.593, 265.454]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube108_Chimney_stones1_0_892">
                            <mesh
                              name="Object_1341"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1341.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube110_893"
                          position={[-55.019, 22.593, 264.535]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube110_Chimney_stones1_0_894">
                            <mesh
                              name="Object_1344"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1344.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube112_895"
                          position={[-55.019, 22.593, 266.606]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube112_Chimney_stones1_0_896">
                            <mesh
                              name="Object_1347"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1347.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube114_897"
                          position={[-55.019, 22.593, 265.651]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube114_Chimney_stones1_0_898">
                            <mesh
                              name="Object_1350"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1350.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube116_899"
                          position={[-55.019, 22.593, 266.515]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube116_Chimney_stones1_0_900">
                            <mesh
                              name="Object_1353"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1353.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube118_901"
                          position={[-55.019, 22.593, 264.209]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube118_Chimney_stones1_0_902">
                            <mesh
                              name="Object_1356"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1356.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube120_903"
                          position={[-55.019, 22.593, 263.832]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube120_Chimney_stones3_0_904">
                            <mesh
                              name="Object_1359"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1359.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube122_905"
                          position={[-55.019, 22.593, 264.417]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube122_Material002_0_906">
                            <mesh
                              name="Object_1362"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1362.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube124_907"
                          position={[-55.019, 22.593, 266.824]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube124_Chimney_stones1_0_908">
                            <mesh
                              name="Object_1365"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1365.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube126_909"
                          position={[-55.019, 22.593, 263.81]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube126_Chimney_stones1_0_910">
                            <mesh
                              name="Object_1368"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1368.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube128_911"
                          position={[-55.019, 22.593, 263.97]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube128_Chimney_stones1_0_912">
                            <mesh
                              name="Object_1371"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1371.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube130_913"
                          position={[-55.019, 22.593, 266.104]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube130_Material002_0_914">
                            <mesh
                              name="Object_1374"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1374.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube132_915"
                          position={[-55.019, 22.593, 266.817]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube132_Chimney_stones1_0_916">
                            <mesh
                              name="Object_1377"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1377.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube134_917"
                          position={[-55.019, 22.593, 263.309]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube134_Chimney_stones1_0_918">
                            <mesh
                              name="Object_1380"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1380.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube136_919"
                          position={[-55.019, 22.593, 266.817]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube136_Chimney_stones1_0_920">
                            <mesh
                              name="Object_1383"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1383.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube138_921"
                          position={[-55.019, 22.593, 266.736]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube138_Chimney_stones1_0_922">
                            <mesh
                              name="Object_1386"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1386.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube140_923"
                          position={[-55.019, 22.593, 266.922]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube140_Chimney_stones1_0_924">
                            <mesh
                              name="Object_1389"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1389.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube142_925"
                          position={[-55.019, 22.593, 265.175]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube142_Chimney_stones1_0_926">
                            <mesh
                              name="Object_1392"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1392.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube144_927"
                          position={[-55.019, 22.593, 264.451]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube144_Chimney_stones1_0_928">
                            <mesh
                              name="Object_1395"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1395.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube271_929"
                          position={[-97.226, 421.976, 287.858]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube271_Chimney_stones1_0_930">
                            <mesh
                              name="Object_1398"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1398.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube273_931"
                          position={[-97.226, 421.976, 286.898]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube273_Material002_0_932">
                            <mesh
                              name="Object_1401"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1401.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube275_933"
                          position={[-97.226, 421.976, 287.61]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube275_Chimney_stones1_0_934">
                            <mesh
                              name="Object_1404"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1404.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube277_935"
                          position={[-97.226, 421.976, 284.264]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube277_Chimney_stones3_0_936">
                            <mesh
                              name="Object_1407"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1407.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube279_937"
                          position={[-97.226, 421.976, 286.321]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube279_Chimney_stones1_0_938">
                            <mesh
                              name="Object_1410"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1410.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube281_939"
                          position={[-97.226, 421.976, 285.89]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube281_Chimney_stones2_0_940">
                            <mesh
                              name="Object_1413"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1413.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube283_941"
                          position={[-97.226, 421.976, 285.859]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube283_Chimney_stones1_0_942">
                            <mesh
                              name="Object_1416"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1416.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube285_943"
                          position={[-97.226, 421.976, 285.667]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube285_Chimney_stones1_0_944">
                            <mesh
                              name="Object_1419"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1419.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube287_945"
                          position={[-97.226, 421.976, 284.816]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube287_Chimney_stones3_0_946">
                            <mesh
                              name="Object_1422"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1422.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube289_947"
                          position={[-97.226, 421.976, 284.341]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube289_Chimney_stones1_0_948">
                            <mesh
                              name="Object_1425"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1425.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube291_949"
                          position={[-97.226, 421.976, 287.681]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube291_Chimney_stones1_0_950">
                            <mesh
                              name="Object_1428"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1428.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube293_951"
                          position={[-97.226, 421.976, 284.517]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube293_Chimney_stones1_0_952">
                            <mesh
                              name="Object_1431"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1431.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube295_953"
                          position={[-97.226, 421.976, 284.682]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube295_Chimney_stones1_0_954">
                            <mesh
                              name="Object_1434"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1434.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube297_955"
                          position={[-97.226, 421.976, 287.399]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube297_Chimney_stones3_0_956">
                            <mesh
                              name="Object_1437"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1437.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube299_957"
                          position={[-97.226, 421.976, 285.607]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube299_Chimney_stones1_0_958">
                            <mesh
                              name="Object_1440"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1440.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube301_959"
                          position={[-97.226, 421.976, 285.729]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube301_Chimney_stones1_0_960">
                            <mesh
                              name="Object_1443"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1443.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube303_961"
                          position={[-97.226, 421.976, 284.502]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube303_Chimney_stones1_0_962">
                            <mesh
                              name="Object_1446"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1446.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube305_963"
                          position={[-97.226, 421.976, 286.485]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube305_Chimney_stones1_0_964">
                            <mesh
                              name="Object_1449"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1449.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube307_965"
                          position={[-97.226, 421.976, 287.178]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube307_Chimney_stones1_0_966">
                            <mesh
                              name="Object_1452"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1452.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube309_967"
                          position={[-97.226, 421.976, 286.72]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube309_Chimney_stones1_0_968">
                            <mesh
                              name="Object_1455"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1455.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube311_969"
                          position={[-97.226, 421.976, 284.685]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube311_Chimney_stones1_0_970">
                            <mesh
                              name="Object_1458"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1458.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube313_971"
                          position={[-97.226, 421.976, 286.867]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube313_Chimney_stones1_0_972">
                            <mesh
                              name="Object_1461"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1461.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube315_973"
                          position={[-97.226, 421.976, 287.52]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube315_Chimney_stones1_0_974">
                            <mesh
                              name="Object_1464"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1464.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube317_975"
                          position={[-97.226, 421.976, 285.625]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube317_Chimney_stones1_0_976">
                            <mesh
                              name="Object_1467"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1467.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube319_977"
                          position={[-97.226, 421.976, 287.231]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube319_Chimney_stones1_0_978">
                            <mesh
                              name="Object_1470"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1470.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube321_979"
                          position={[-97.226, 421.976, 285.251]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube321_Chimney_stones1_0_980">
                            <mesh
                              name="Object_1473"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1473.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube323_981"
                          position={[-97.226, 421.976, 285.684]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube323_Chimney_stones3_0_982">
                            <mesh
                              name="Object_1476"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1476.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube325_983"
                          position={[-97.226, 421.976, 287.941]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube325_Chimney_stones1_0_984">
                            <mesh
                              name="Object_1479"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1479.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube327_985"
                          position={[-97.226, 421.976, 285.617]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube327_Chimney_stones3_0_986">
                            <mesh
                              name="Object_1482"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1482.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube329_987"
                          position={[-97.226, 421.976, 284.312]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube329_Material002_0_988">
                            <mesh
                              name="Object_1485"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1485.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube331_989"
                          position={[-97.226, 421.976, 288.079]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube331_Chimney_stones1_0_990">
                            <mesh
                              name="Object_1488"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1488.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube333_991"
                          position={[-97.226, 421.976, 286.193]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube333_Chimney_stones1_0_992">
                            <mesh
                              name="Object_1491"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1491.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube335_993"
                          position={[-97.226, 421.976, 284.589]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube335_Chimney_stones1_0_994">
                            <mesh
                              name="Object_1494"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1494.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube337_995"
                          position={[-97.226, 421.976, 286.552]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube337_Chimney_stones1_0_996">
                            <mesh
                              name="Object_1497"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1497.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube339_997"
                          position={[-97.226, 421.976, 287.347]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube339_Chimney_stones1_0_998">
                            <mesh
                              name="Object_1500"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1500.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube430_999"
                          position={[-118.642, 443.392, 287.556]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube430_Chimney_stones1_0_1000">
                            <mesh
                              name="Object_1503"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1503.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube432_1001"
                          position={[-118.642, 443.392, 284.366]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube432_Chimney_stones3_0_1002">
                            <mesh
                              name="Object_1506"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1506.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube434_1003"
                          position={[-118.642, 443.392, 286.145]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube434_Chimney_stones1_0_1004">
                            <mesh
                              name="Object_1509"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1509.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube436_1005"
                          position={[-118.642, 443.392, 286.107]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube436_Chimney_stones1_0_1006">
                            <mesh
                              name="Object_1512"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1512.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube438_1007"
                          position={[-118.642, 443.392, 287.372]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube438_Chimney_stones3_0_1008">
                            <mesh
                              name="Object_1515"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1515.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube440_1009"
                          position={[-118.642, 443.392, 284.908]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube440_Chimney_stones1_0_1010">
                            <mesh
                              name="Object_1518"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1518.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube442_1011"
                          position={[-118.642, 443.392, 284.697]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube442_Chimney_stones1_0_1012">
                            <mesh
                              name="Object_1521"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1521.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube444_1013"
                          position={[-118.642, 443.392, 284.965]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube444_Material002_0_1014">
                            <mesh
                              name="Object_1524"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1524.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube446_1015"
                          position={[-118.642, 443.392, 285.727]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube446_Chimney_stones2_0_1016">
                            <mesh
                              name="Object_1527"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1527.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube448_1017"
                          position={[-118.642, 443.392, 286.372]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube448_Chimney_stones1_0_1018">
                            <mesh
                              name="Object_1530"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1530.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube450_1019"
                          position={[-118.642, 443.392, 284.236]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube450_Chimney_stones3_0_1020">
                            <mesh
                              name="Object_1533"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1533.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube452_1021"
                          position={[-118.642, 443.392, 287.597]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube452_Chimney_stones3_0_1022">
                            <mesh
                              name="Object_1536"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1536.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube454_1023"
                          position={[-118.642, 443.392, 285.864]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube454_Chimney_stones3_0_1024">
                            <mesh
                              name="Object_1539"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1539.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube456_1025"
                          position={[-118.642, 443.392, 287.302]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube456_Chimney_stones1_0_1026">
                            <mesh
                              name="Object_1542"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1542.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube458_1027"
                          position={[-118.642, 443.392, 286.928]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube458_Chimney_stones1_0_1028">
                            <mesh
                              name="Object_1545"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1545.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube460_1029"
                          position={[-118.642, 443.392, 286.18]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube460_Chimney_stones1_0_1030">
                            <mesh
                              name="Object_1548"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1548.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube462_1031"
                          position={[-118.642, 443.392, 286.974]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube462_Chimney_stones3_0_1032">
                            <mesh
                              name="Object_1551"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1551.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube464_1033"
                          position={[-118.642, 443.392, 286.925]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube464_Chimney_stones2_0_1034">
                            <mesh
                              name="Object_1554"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1554.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube466_1035"
                          position={[-118.642, 443.392, 286.784]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube466_Chimney_stones3_0_1036">
                            <mesh
                              name="Object_1557"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1557.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube468_1037"
                          position={[-118.642, 443.392, 285.85]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube468_Chimney_stones1_0_1038">
                            <mesh
                              name="Object_1560"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1560.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube470_1039"
                          position={[-118.642, 443.392, 283.767]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube470_Chimney_stones1_0_1040">
                            <mesh
                              name="Object_1563"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1563.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube472_1041"
                          position={[-118.642, 443.392, 284.25]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube472_Chimney_stones2_0_1042">
                            <mesh
                              name="Object_1566"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1566.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube474_1043"
                          position={[-118.642, 443.392, 286.419]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube474_Chimney_stones1_0_1044">
                            <mesh
                              name="Object_1569"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1569.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube476_1045"
                          position={[-118.642, 443.392, 286.993]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube476_Chimney_stones1_0_1046">
                            <mesh
                              name="Object_1572"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1572.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube478_1047"
                          position={[-118.642, 443.392, 285.172]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube478_Chimney_stones1_0_1048">
                            <mesh
                              name="Object_1575"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1575.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube480_1049"
                          position={[-118.642, 443.392, 284.734]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube480_Chimney_stones1_0_1050">
                            <mesh
                              name="Object_1578"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1578.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube483_1051"
                          position={[-76.435, 44.009, 265.01]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube483_Chimney_stones1_0_1052">
                            <mesh
                              name="Object_1581"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1581.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube485_1053"
                          position={[-76.435, 44.009, 263.507]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube485_Chimney_stones1_0_1054">
                            <mesh
                              name="Object_1584"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1584.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube487_1055"
                          position={[-76.435, 44.009, 263.444]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube487_Chimney_stones1_0_1056">
                            <mesh
                              name="Object_1587"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1587.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube489_1057"
                          position={[-76.435, 44.009, 263.648]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube489_Chimney_stones3_0_1058">
                            <mesh
                              name="Object_1590"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1590.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube491_1059"
                          position={[-76.435, 44.009, 264.973]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube491_Chimney_stones1_0_1060">
                            <mesh
                              name="Object_1593"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1593.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube493_1061"
                          position={[-76.435, 44.009, 263.699]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube493_Chimney_stones3_0_1062">
                            <mesh
                              name="Object_1596"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1596.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube495_1063"
                          position={[-76.435, 44.009, 266.005]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube495_Chimney_stones3_0_1064">
                            <mesh
                              name="Object_1599"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1599.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube497_1065"
                          position={[-76.435, 44.009, 264.17]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube497_Chimney_stones2_0_1066">
                            <mesh
                              name="Object_1602"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1602.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube499_1067"
                          position={[-76.435, 44.009, 265.516]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube499_Chimney_stones1_0_1068">
                            <mesh
                              name="Object_1605"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1605.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube501_1069"
                          position={[-76.435, 44.009, 264.728]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube501_Chimney_stones1_0_1070">
                            <mesh
                              name="Object_1608"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1608.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube503_1071"
                          position={[-76.435, 44.009, 264.931]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube503_Chimney_stones1_0_1072">
                            <mesh
                              name="Object_1611"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1611.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube505_1073"
                          position={[-76.435, 44.009, 264.294]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube505_Chimney_stones1_0_1074">
                            <mesh
                              name="Object_1614"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1614.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube507_1075"
                          position={[-76.435, 44.009, 265.287]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube507_Chimney_stones1_0_1076">
                            <mesh
                              name="Object_1617"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1617.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube509_1077"
                          position={[-76.435, 44.009, 263.106]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube509_Material002_0_1078">
                            <mesh
                              name="Object_1620"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1620.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube511_1079"
                          position={[-76.435, 44.009, 262.736]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube511_Chimney_stones1_0_1080">
                            <mesh
                              name="Object_1623"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1623.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube513_1081"
                          position={[-76.435, 44.009, 266.213]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube513_Chimney_stones1_0_1082">
                            <mesh
                              name="Object_1626"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1626.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube515_1083"
                          position={[-76.435, 44.009, 265.699]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube515_Chimney_stones1_0_1084">
                            <mesh
                              name="Object_1629"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1629.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube517_1085"
                          position={[-76.435, 44.009, 266.143]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube517_Chimney_stones1_0_1086">
                            <mesh
                              name="Object_1632"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1632.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube519_1087"
                          position={[-76.435, 44.009, 263.106]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube519_Material002_0_1088">
                            <mesh
                              name="Object_1635"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1635.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube521_1089"
                          position={[-76.435, 44.009, 264.886]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube521_Material002_0_1090">
                            <mesh
                              name="Object_1638"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1638.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube523_1091"
                          position={[-76.435, 44.009, 265.285]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube523_Chimney_stones2_0_1092">
                            <mesh
                              name="Object_1641"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1641.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube525_1093"
                          position={[-76.435, 44.009, 266.524]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube525_Chimney_stones3_0_1094">
                            <mesh
                              name="Object_1644"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1644.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube527_1095"
                          position={[-76.435, 44.009, 265.11]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube527_Chimney_stones1_0_1096">
                            <mesh
                              name="Object_1647"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1647.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube529_1097"
                          position={[-76.435, 44.009, 264.237]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube529_Chimney_stones3_0_1098">
                            <mesh
                              name="Object_1650"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1650.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube531_1099"
                          position={[-76.435, 44.009, 265.699]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube531_Chimney_stones1_0_1100">
                            <mesh
                              name="Object_1653"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1653.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube533_1101"
                          position={[-76.435, 44.009, 263.499]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube533_Chimney_stones3_0_1102">
                            <mesh
                              name="Object_1656"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1656.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube535_1103"
                          position={[-76.435, 44.009, 264.694]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube535_Chimney_stones3_0_1104">
                            <mesh
                              name="Object_1659"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1659.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube537_1105"
                          position={[-76.435, 44.009, 265.356]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube537_Chimney_stones3_0_1106">
                            <mesh
                              name="Object_1662"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1662.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube539_1107"
                          position={[-76.435, 44.009, 265.257]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube539_Chimney_stones3_0_1108">
                            <mesh
                              name="Object_1665"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1665.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube541_1109"
                          position={[-76.435, 44.009, 263.394]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube541_Chimney_stones1_0_1110">
                            <mesh
                              name="Object_1668"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1668.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube543_1111"
                          position={[-76.435, 44.009, 263.047]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube543_Chimney_stones1_0_1112">
                            <mesh
                              name="Object_1671"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1671.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube545_1113"
                          position={[-76.435, 44.009, 264.121]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube545_Material002_0_1114">
                            <mesh
                              name="Object_1674"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1674.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube547_1115"
                          position={[-76.435, 44.009, 266.46]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube547_Chimney_stones1_0_1116">
                            <mesh
                              name="Object_1677"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1677.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube549_1117"
                          position={[-76.435, 44.009, 263.422]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube549_Chimney_stones1_0_1118">
                            <mesh
                              name="Object_1680"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1680.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube551_1119"
                          position={[-76.435, 44.009, 264.846]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube551_Chimney_stones1_0_1120">
                            <mesh
                              name="Object_1683"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1683.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube553_1121"
                          position={[-76.435, 44.009, 263.406]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube553_Chimney_stones1_0_1122">
                            <mesh
                              name="Object_1686"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1686.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube555_1123"
                          position={[-76.435, 44.009, 264.033]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube555_Chimney_stones2_0_1124">
                            <mesh
                              name="Object_1689"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1689.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube557_1125"
                          position={[-76.435, 44.009, 263.814]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube557_Chimney_stones1_0_1126">
                            <mesh
                              name="Object_1692"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1692.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube559_1127"
                          position={[-76.435, 44.009, 266.551]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube559_Chimney_stones1_0_1128">
                            <mesh
                              name="Object_1695"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1695.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube561_1129"
                          position={[-76.435, 44.009, 263.869]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube561_Material002_0_1130">
                            <mesh
                              name="Object_1698"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1698.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube563_1131"
                          position={[-76.435, 44.009, 264.123]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube563_Chimney_stones1_0_1132">
                            <mesh
                              name="Object_1701"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1701.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube565_1133"
                          position={[-76.435, 44.009, 264.783]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube565_Chimney_stones3_0_1134">
                            <mesh
                              name="Object_1704"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1704.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube567_1135"
                          position={[-76.435, 44.009, 265.56]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube567_Chimney_stones1_0_1136">
                            <mesh
                              name="Object_1707"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1707.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube569_1137"
                          position={[-76.435, 44.009, 264.443]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube569_Material002_0_1138">
                            <mesh
                              name="Object_1710"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1710.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube647_1139"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube647_Chimney_stones3_0_1140">
                            <mesh
                              name="Object_1713"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1713.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube648_1141"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube648_Chimney_stones1_0_1142">
                            <mesh
                              name="Object_1716"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1716.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube655_1143"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube655_Chimney_stones1_0_1144">
                            <mesh
                              name="Object_1719"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1719.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube656_1145"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube656_Chimney_stones1_0_1146">
                            <mesh
                              name="Object_1722"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1722.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube663_1147"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube663_Chimney_stones2_0_1148">
                            <mesh
                              name="Object_1725"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1725.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube664_1149"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube664_Chimney_stones1_0_1150">
                            <mesh
                              name="Object_1728"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1728.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube671_1151"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube671_Chimney_stones1_0_1152">
                            <mesh
                              name="Object_1731"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1731.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube672_1153"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube672_Chimney_stones1_0_1154">
                            <mesh
                              name="Object_1734"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1734.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube679_1155"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube679_Chimney_stones3_0_1156">
                            <mesh
                              name="Object_1737"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1737.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube680_1157"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube680_Chimney_stones1_0_1158">
                            <mesh
                              name="Object_1740"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1740.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube687_1159"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube687_Chimney_stones1_0_1160">
                            <mesh
                              name="Object_1743"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1743.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube688_1161"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube688_Material002_0_1162">
                            <mesh
                              name="Object_1746"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1746.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube695_1163"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube695_Chimney_stones1_0_1164">
                            <mesh
                              name="Object_1749"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1749.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube696_1165"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube696_Chimney_stones1_0_1166">
                            <mesh
                              name="Object_1752"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1752.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube703_1167"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube703_Chimney_stones1_0_1168">
                            <mesh
                              name="Object_1755"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1755.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube704_1169"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube704_Chimney_stones1_0_1170">
                            <mesh
                              name="Object_1758"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1758.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube576_1171"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube576_Material002_0_1172">
                            <mesh
                              name="Object_1761"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1761.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube577_1173"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube577_Chimney_stones1_0_1174">
                            <mesh
                              name="Object_1764"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1764.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube584_1175"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube584_Chimney_stones1_0_1176">
                            <mesh
                              name="Object_1767"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1767.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube585_1177"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube585_Material002_0_1178">
                            <mesh
                              name="Object_1770"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1770.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube592_1179"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube592_Chimney_stones1_0_1180">
                            <mesh
                              name="Object_1773"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1773.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube593_1181"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube593_Chimney_stones3_0_1182">
                            <mesh
                              name="Object_1776"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1776.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube600_1183"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube600_Chimney_stones1_0_1184">
                            <mesh
                              name="Object_1779"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1779.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube601_1185"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube601_Chimney_stones1_0_1186">
                            <mesh
                              name="Object_1782"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1782.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube608_1187"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube608_Chimney_stones1_0_1188">
                            <mesh
                              name="Object_1785"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1785.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube609_1189"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube609_Chimney_stones1_0_1190">
                            <mesh
                              name="Object_1788"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1788.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube616_1191"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube616_Chimney_stones1_0_1192">
                            <mesh
                              name="Object_1791"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1791.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube617_1193"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube617_Chimney_stones3_0_1194">
                            <mesh
                              name="Object_1794"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1794.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube624_1195"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube624_Chimney_stones1_0_1196">
                            <mesh
                              name="Object_1797"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1797.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube625_1197"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube625_Chimney_stones2_0_1198">
                            <mesh
                              name="Object_1800"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1800.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube632_1199"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube632_Material002_0_1200">
                            <mesh
                              name="Object_1803"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1803.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube633_1201"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube633_Chimney_stones1_0_1202">
                            <mesh
                              name="Object_1806"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1806.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube640_1203"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube640_Chimney_stones2_0_1204">
                            <mesh
                              name="Object_1809"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1809.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube641_1205"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube641_Chimney_stones1_0_1206">
                            <mesh
                              name="Object_1812"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1812.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube146_1207"
                          position={[-278.943, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube146_Chimney_stones3_0_1208">
                            <mesh
                              name="Object_1815"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1815.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube148_1209"
                          position={[-281.331, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube148_Chimney_stones3_0_1210">
                            <mesh
                              name="Object_1818"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1818.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube150_1211"
                          position={[-279.963, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube150_Chimney_stones2_0_1212">
                            <mesh
                              name="Object_1821"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1821.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube152_1213"
                          position={[-281.876, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube152_Chimney_stones1_0_1214">
                            <mesh
                              name="Object_1824"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1824.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube154_1215"
                          position={[-281.322, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube154_Chimney_stones1_0_1216">
                            <mesh
                              name="Object_1827"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1827.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube156_1217"
                          position={[-280.523, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube156_Chimney_stones1_0_1218">
                            <mesh
                              name="Object_1830"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1830.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube158_1219"
                          position={[-281.46, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube158_Chimney_stones1_0_1220">
                            <mesh
                              name="Object_1833"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1833.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube160_1221"
                          position={[-281.033, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube160_Chimney_stones1_0_1222">
                            <mesh
                              name="Object_1836"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1836.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube162_1223"
                          position={[-281.625, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube162_Chimney_stones1_0_1224">
                            <mesh
                              name="Object_1839"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1839.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube164_1225"
                          position={[-280.856, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube164_Chimney_stones3_0_1226">
                            <mesh
                              name="Object_1842"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1842.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube166_1227"
                          position={[-281.869, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube166_Material002_0_1228">
                            <mesh
                              name="Object_1845"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1845.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube168_1229"
                          position={[-280.333, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube168_Chimney_stones1_0_1230">
                            <mesh
                              name="Object_1848"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1848.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube170_1231"
                          position={[-282.496, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube170_Chimney_stones1_0_1232">
                            <mesh
                              name="Object_1851"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1851.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube172_1233"
                          position={[-279.19, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube172_Chimney_stones1_0_1234">
                            <mesh
                              name="Object_1854"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1854.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube174_1235"
                          position={[-282.127, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube174_Chimney_stones2_0_1236">
                            <mesh
                              name="Object_1857"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1857.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube176_1237"
                          position={[-279.264, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube176_Chimney_stones1_0_1238">
                            <mesh
                              name="Object_1860"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1860.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube178_1239"
                          position={[-278.925, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube178_Chimney_stones3_0_1240">
                            <mesh
                              name="Object_1863"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1863.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube180_1241"
                          position={[-281.005, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube180_Chimney_stones1_0_1242">
                            <mesh
                              name="Object_1866"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1866.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube182_1243"
                          position={[-280.53, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube182_Chimney_stones1_0_1244">
                            <mesh
                              name="Object_1869"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1869.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube184_1245"
                          position={[-280.585, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube184_Chimney_stones1_0_1246">
                            <mesh
                              name="Object_1872"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1872.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube186_1247"
                          position={[-280.556, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube186_Chimney_stones1_0_1248">
                            <mesh
                              name="Object_1875"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1875.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube188_1249"
                          position={[-281.587, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube188_Chimney_stones1_0_1250">
                            <mesh
                              name="Object_1878"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1878.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube190_1251"
                          position={[-279.48, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube190_Chimney_stones1_0_1252">
                            <mesh
                              name="Object_1881"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1881.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube192_1253"
                          position={[-280.592, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube192_Chimney_stones3_0_1254">
                            <mesh
                              name="Object_1884"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1884.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube194_1255"
                          position={[-281.836, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube194_Chimney_stones1_0_1256">
                            <mesh
                              name="Object_1887"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1887.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube196_1257"
                          position={[-282.587, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube196_Chimney_stones3_0_1258">
                            <mesh
                              name="Object_1890"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1890.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube198_1259"
                          position={[-281.625, 22.593, 296.21]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube198_Chimney_stones1_0_1260">
                            <mesh
                              name="Object_1893"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1893.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube199_1261"
                          position={[-282.098, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube199_Chimney_stones3_0_1262">
                            <mesh
                              name="Object_1896"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1896.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube201_1263"
                          position={[-281.547, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube201_Chimney_stones3_0_1264">
                            <mesh
                              name="Object_1899"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1899.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube203_1265"
                          position={[-280.679, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube203_Chimney_stones1_0_1266">
                            <mesh
                              name="Object_1902"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1902.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube205_1267"
                          position={[-280.925, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube205_Chimney_stones1_0_1268">
                            <mesh
                              name="Object_1905"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1905.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube207_1269"
                          position={[-281.182, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube207_Material002_0_1270">
                            <mesh
                              name="Object_1908"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1908.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube209_1271"
                          position={[-280.057, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube209_Chimney_stones3_0_1272">
                            <mesh
                              name="Object_1911"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1911.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube211_1273"
                          position={[-280.686, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube211_Material002_0_1274">
                            <mesh
                              name="Object_1914"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1914.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube213_1275"
                          position={[-280.185, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube213_Chimney_stones1_0_1276">
                            <mesh
                              name="Object_1917"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1917.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube215_1277"
                          position={[-281.057, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube215_Chimney_stones3_0_1278">
                            <mesh
                              name="Object_1920"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1920.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube217_1279"
                          position={[-281.138, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube217_Chimney_stones3_0_1280">
                            <mesh
                              name="Object_1923"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1923.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube219_1281"
                          position={[-281.535, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube219_Chimney_stones3_0_1282">
                            <mesh
                              name="Object_1926"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1926.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube221_1283"
                          position={[-282.374, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube221_Chimney_stones3_0_1284">
                            <mesh
                              name="Object_1929"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1929.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube223_1285"
                          position={[-280.871, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube223_Chimney_stones1_0_1286">
                            <mesh
                              name="Object_1932"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1932.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube225_1287"
                          position={[-282.091, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube225_Chimney_stones1_0_1288">
                            <mesh
                              name="Object_1935"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1935.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube227_1289"
                          position={[-278.929, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube227_Chimney_stones3_0_1290">
                            <mesh
                              name="Object_1938"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1938.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube229_1291"
                          position={[-281.404, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube229_Chimney_stones3_0_1292">
                            <mesh
                              name="Object_1941"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1941.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube231_1293"
                          position={[-281.783, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube231_Chimney_stones1_0_1294">
                            <mesh
                              name="Object_1944"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1944.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube233_1295"
                          position={[-278.929, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube233_Chimney_stones1_0_1296">
                            <mesh
                              name="Object_1947"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1947.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube235_1297"
                          position={[-278.973, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube235_Chimney_stones1_0_1298">
                            <mesh
                              name="Object_1950"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1950.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube237_1299"
                          position={[-281.556, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube237_Chimney_stones1_0_1300">
                            <mesh
                              name="Object_1953"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1953.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube239_1301"
                          position={[-282.044, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube239_Material002_0_1302">
                            <mesh
                              name="Object_1956"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1956.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube241_1303"
                          position={[-280.327, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube241_Material002_0_1304">
                            <mesh
                              name="Object_1959"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1959.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube243_1305"
                          position={[-279.555, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube243_Chimney_stones1_0_1306">
                            <mesh
                              name="Object_1962"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1962.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube245_1307"
                          position={[-282.41, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube245_Chimney_stones1_0_1308">
                            <mesh
                              name="Object_1965"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1965.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube247_1309"
                          position={[-281.196, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube247_Material002_0_1310">
                            <mesh
                              name="Object_1968"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1968.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube249_1311"
                          position={[-280.425, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube249_Chimney_stones1_0_1312">
                            <mesh
                              name="Object_1971"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1971.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube251_1313"
                          position={[-282.432, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube251_Chimney_stones1_0_1314">
                            <mesh
                              name="Object_1974"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1974.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube253_1315"
                          position={[-281.062, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube253_Chimney_stones1_0_1316">
                            <mesh
                              name="Object_1977"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1977.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube255_1317"
                          position={[-280.042, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube255_Chimney_stones3_0_1318">
                            <mesh
                              name="Object_1980"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1980.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube257_1319"
                          position={[-282.201, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube257_Chimney_stones3_0_1320">
                            <mesh
                              name="Object_1983"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1983.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube259_1321"
                          position={[-282.61, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube259_Chimney_stones3_0_1322">
                            <mesh
                              name="Object_1986"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1986.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube261_1323"
                          position={[-279.406, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube261_Chimney_stones1_0_1324">
                            <mesh
                              name="Object_1989"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1989.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube263_1325"
                          position={[-281.804, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube263_Chimney_stones1_0_1326">
                            <mesh
                              name="Object_1992"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1992.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube265_1327"
                          position={[-282.689, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube265_Chimney_stones1_0_1328">
                            <mesh
                              name="Object_1995"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1995.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube267_1329"
                          position={[-281.975, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube267_Chimney_stones1_0_1330">
                            <mesh
                              name="Object_1998"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_1998.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube269_1331"
                          position={[-280.564, 44.009, 274.794]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube269_Chimney_stones2_0_1332">
                            <mesh
                              name="Object_2001"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2001.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube341_1333"
                          position={[-324.261, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube341_Material002_0_1334">
                            <mesh
                              name="Object_2004"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2004.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube343_1335"
                          position={[-322.519, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube343_Chimney_stones1_0_1336">
                            <mesh
                              name="Object_2007"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2007.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube345_1337"
                          position={[-323.173, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube345_Chimney_stones1_0_1338">
                            <mesh
                              name="Object_2010"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2010.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube347_1339"
                          position={[-322.825, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube347_Chimney_stones1_0_1340">
                            <mesh
                              name="Object_2013"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2013.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube349_1341"
                          position={[-322.461, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube349_Chimney_stones1_0_1342">
                            <mesh
                              name="Object_2016"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2016.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube351_1343"
                          position={[-323.144, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube351_Material002_0_1344">
                            <mesh
                              name="Object_2019"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2019.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube353_1345"
                          position={[-322.478, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube353_Chimney_stones3_0_1346">
                            <mesh
                              name="Object_2022"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2022.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube355_1347"
                          position={[-322.826, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube355_Chimney_stones1_0_1348">
                            <mesh
                              name="Object_2025"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2025.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube357_1349"
                          position={[-322.13, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube357_Chimney_stones1_0_1350">
                            <mesh
                              name="Object_2028"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2028.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube359_1351"
                          position={[-325.041, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube359_Material002_0_1352">
                            <mesh
                              name="Object_2031"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2031.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube361_1353"
                          position={[-323.343, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube361_Chimney_stones1_0_1354">
                            <mesh
                              name="Object_2034"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2034.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube363_1355"
                          position={[-321.762, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube363_Chimney_stones1_0_1356">
                            <mesh
                              name="Object_2037"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2037.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube365_1357"
                          position={[-324.857, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube365_Chimney_stones1_0_1358">
                            <mesh
                              name="Object_2040"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2040.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube367_1359"
                          position={[-324.372, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube367_Chimney_stones1_0_1360">
                            <mesh
                              name="Object_2043"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2043.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube369_1361"
                          position={[-322.632, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube369_Chimney_stones1_0_1362">
                            <mesh
                              name="Object_2046"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2046.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube371_1363"
                          position={[-323.574, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube371_Chimney_stones1_0_1364">
                            <mesh
                              name="Object_2049"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2049.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube373_1365"
                          position={[-322.206, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube373_Chimney_stones1_0_1366">
                            <mesh
                              name="Object_2052"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2052.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube375_1367"
                          position={[-321.192, 421.976, 317.234]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube375_Chimney_stones1_0_1368">
                            <mesh
                              name="Object_2055"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2055.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube376_1369"
                          position={[-329.678, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube376_Chimney_stones1_0_1370">
                            <mesh
                              name="Object_2058"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2058.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube378_1371"
                          position={[-331.689, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube378_Chimney_stones1_0_1372">
                            <mesh
                              name="Object_2061"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2061.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube380_1373"
                          position={[-328.94, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube380_Chimney_stones1_0_1374">
                            <mesh
                              name="Object_2064"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2064.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube382_1375"
                          position={[-330.088, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube382_Material002_0_1376">
                            <mesh
                              name="Object_2067"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2067.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube384_1377"
                          position={[-331.847, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube384_Chimney_stones1_0_1378">
                            <mesh
                              name="Object_2070"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2070.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube386_1379"
                          position={[-329.946, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube386_Chimney_stones1_0_1380">
                            <mesh
                              name="Object_2073"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2073.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube388_1381"
                          position={[-329.362, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube388_Chimney_stones1_0_1382">
                            <mesh
                              name="Object_2076"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2076.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube390_1383"
                          position={[-330.94, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube390_Chimney_stones1_0_1384">
                            <mesh
                              name="Object_2079"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2079.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube392_1385"
                          position={[-330.527, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube392_Chimney_stones1_0_1386">
                            <mesh
                              name="Object_2082"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2082.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube394_1387"
                          position={[-330.314, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube394_Chimney_stones1_0_1388">
                            <mesh
                              name="Object_2085"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2085.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube396_1389"
                          position={[-328.545, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube396_Chimney_stones1_0_1390">
                            <mesh
                              name="Object_2088"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2088.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube398_1391"
                          position={[-331.531, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube398_Chimney_stones1_0_1392">
                            <mesh
                              name="Object_2091"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2091.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube400_1393"
                          position={[-329.735, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube400_Chimney_stones3_0_1394">
                            <mesh
                              name="Object_2094"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2094.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube402_1395"
                          position={[-328.031, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube402_Chimney_stones1_0_1396">
                            <mesh
                              name="Object_2097"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2097.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube404_1397"
                          position={[-331.355, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube404_Chimney_stones1_0_1398">
                            <mesh
                              name="Object_2100"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2100.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube406_1399"
                          position={[-329.645, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube406_Chimney_stones2_0_1400">
                            <mesh
                              name="Object_2103"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2103.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube408_1401"
                          position={[-328.355, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube408_Chimney_stones3_0_1402">
                            <mesh
                              name="Object_2106"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2106.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube410_1403"
                          position={[-328.715, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube410_Chimney_stones1_0_1404">
                            <mesh
                              name="Object_2109"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2109.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube412_1405"
                          position={[-329.296, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube412_Chimney_stones1_0_1406">
                            <mesh
                              name="Object_2112"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2112.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube414_1407"
                          position={[-331.08, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube414_Chimney_stones3_0_1408">
                            <mesh
                              name="Object_2115"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2115.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube416_1409"
                          position={[-328.644, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube416_Material002_0_1410">
                            <mesh
                              name="Object_2118"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2118.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube418_1411"
                          position={[-328.281, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube418_Chimney_stones3_0_1412">
                            <mesh
                              name="Object_2121"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2121.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube420_1413"
                          position={[-328.539, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube420_Chimney_stones1_0_1414">
                            <mesh
                              name="Object_2124"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2124.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube422_1415"
                          position={[-331.797, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube422_Chimney_stones1_0_1416">
                            <mesh
                              name="Object_2127"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2127.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube424_1417"
                          position={[-329.208, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube424_Chimney_stones1_0_1418">
                            <mesh
                              name="Object_2130"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2130.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube426_1419"
                          position={[-330.152, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube426_Chimney_stones1_0_1420">
                            <mesh
                              name="Object_2133"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2133.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube428_1421"
                          position={[-329.287, 443.392, 295.818]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[10.708, 21.416, 10.708]}
                        >
                          <group name="Cube428_Chimney_stones1_0_1422">
                            <mesh
                              name="Object_2136"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2136.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube574_1423"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube574_Chimney_stones3_0_1424">
                            <mesh
                              name="Object_2139"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2139.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube575_1425"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube575_Chimney_stones1_0_1426">
                            <mesh
                              name="Object_2142"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2142.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube582_1427"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube582_Chimney_stones1_0_1428">
                            <mesh
                              name="Object_2145"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2145.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube583_1429"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube583_Chimney_stones2_0_1430">
                            <mesh
                              name="Object_2148"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2148.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube590_1431"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube590_Chimney_stones3_0_1432">
                            <mesh
                              name="Object_2151"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2151.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube591_1433"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube591_Chimney_stones3_0_1434">
                            <mesh
                              name="Object_2154"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2154.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube598_1435"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube598_Chimney_stones1_0_1436">
                            <mesh
                              name="Object_2157"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2157.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube599_1437"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube599_Chimney_stones1_0_1438">
                            <mesh
                              name="Object_2160"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2160.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube606_1439"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube606_Chimney_stones1_0_1440">
                            <mesh
                              name="Object_2163"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2163.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube607_1441"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube607_Chimney_stones2_0_1442">
                            <mesh
                              name="Object_2166"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2166.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube614_1443"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube614_Chimney_stones1_0_1444">
                            <mesh
                              name="Object_2169"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2169.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube615_1445"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube615_Chimney_stones1_0_1446">
                            <mesh
                              name="Object_2172"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2172.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube622_1447"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube622_Chimney_stones3_0_1448">
                            <mesh
                              name="Object_2175"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2175.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube623_1449"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube623_Chimney_stones1_0_1450">
                            <mesh
                              name="Object_2178"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2178.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube630_1451"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube630_Chimney_stones1_0_1452">
                            <mesh
                              name="Object_2181"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2181.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube631_1453"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube631_Chimney_stones3_0_1454">
                            <mesh
                              name="Object_2184"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2184.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube638_1455"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube638_Material002_0_1456">
                            <mesh
                              name="Object_2187"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2187.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube639_1457"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube639_Chimney_stones3_0_1458">
                            <mesh
                              name="Object_2190"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2190.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube037_1459"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube037_Chimney_stones1_0_1460">
                            <mesh
                              name="Object_2193"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2193.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube644_1461"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube644_Chimney_stones1_0_1462">
                            <mesh
                              name="Object_2196"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2196.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube649_1463"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube649_Chimney_stones3_0_1464">
                            <mesh
                              name="Object_2199"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2199.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube652_1465"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube652_Chimney_stones1_0_1466">
                            <mesh
                              name="Object_2202"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2202.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube657_1467"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube657_Chimney_stones1_0_1468">
                            <mesh
                              name="Object_2205"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2205.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube660_1469"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube660_Chimney_stones1_0_1470">
                            <mesh
                              name="Object_2208"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2208.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube665_1471"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube665_Chimney_stones1_0_1472">
                            <mesh
                              name="Object_2211"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2211.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube668_1473"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube668_Chimney_stones1_0_1474">
                            <mesh
                              name="Object_2214"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2214.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube673_1475"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube673_Material002_0_1476">
                            <mesh
                              name="Object_2217"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2217.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube676_1477"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube676_Chimney_stones3_0_1478">
                            <mesh
                              name="Object_2220"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2220.geometry}
                              material={materials.Chimney_stones3}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube681_1479"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube681_Chimney_stones2_0_1480">
                            <mesh
                              name="Object_2223"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2223.geometry}
                              material={materials.Chimney_stones2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube684_1481"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube684_Chimney_stones1_0_1482">
                            <mesh
                              name="Object_2226"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2226.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube689_1483"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube689_Material002_0_1484">
                            <mesh
                              name="Object_2229"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2229.geometry}
                              material={materials["Material.002"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube692_1485"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube692_Chimney_stones1_0_1486">
                            <mesh
                              name="Object_2232"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2232.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube697_1487"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube697_Chimney_stones1_0_1488">
                            <mesh
                              name="Object_2235"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2235.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube700_1489"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Cube700_Chimney_stones1_0_1490">
                            <mesh
                              name="Object_2238"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2238.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube028_1491"
                          position={[-156.64, 404.321, 339.741]}
                          rotation={[-Math.PI / 2, 0, -0.019]}
                          scale={[59.625, 166.939, 6.947]}
                        >
                          <group name="Cube028_Chimney_stones1_0_1492">
                            <mesh
                              name="Object_2241"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2241.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube036_1493"
                          position={[-159.72, 803.704, 339.741]}
                          rotation={[-Math.PI / 2, 0, -0.053]}
                          scale={[40.926, 146.4, 6.947]}
                        >
                          <group name="Cube036_Chimney_stones1_0_1494">
                            <mesh
                              name="Object_2244"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2244.geometry}
                              material={materials.Chimney_stones1}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_1495"
                          position={[332.262, 429.498, 131.74]}
                          rotation={[Math.PI, -Math.PI / 2, 0]}
                          scale={8.504}
                        >
                          <group name="Brick_row_Bricks0_0_1496">
                            <mesh
                              name="Object_2247"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2247.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row005_1497"
                          position={[332.262, 174.574, 232.074]}
                          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                          scale={8.504}
                        >
                          <group name="Brick_row005_Bricks0_0_1498">
                            <mesh
                              name="Object_2250"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2250.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row006_1499"
                          position={[332.262, 168.64, 31.335]}
                          rotation={[-1.571, -Math.PI / 2, 0]}
                          scale={8.504}
                        >
                          <group name="Brick_row006_Bricks0_0_1500">
                            <mesh
                              name="Object_2253"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2253.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder007_1501"
                          position={[336.681, 241.998, 148.565]}
                          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                          scale={8.049}
                        >
                          <group name="Cylinder007_Metal_sword001_0_1502">
                            <mesh
                              name="Object_2256"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2256.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                          <group name="Cylinder007_Wood1_0_1503">
                            <mesh
                              name="Object_2258"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2258.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Torus_1504"
                          position={[346.452, 231.364, 63.255]}
                          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                          scale={16.007}
                        >
                          <group name="Torus_Metal_sword001_0_1505">
                            <mesh
                              name="Object_2261"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2261.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder_1506"
                          position={[345.601, 244.309, 63.457]}
                          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                          scale={[5.835, 5.835, 11.662]}
                        >
                          <group name="Cylinder_Metal_sword001_0_1507">
                            <mesh
                              name="Object_2264"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2264.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Circle_1508"
                          position={[334.291, 345.385, 76.052]}
                          rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                          scale={21.312}
                        >
                          <group name="Circle_Flag_red_0_1509">
                            <mesh
                              name="Object_2267"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2267.geometry}
                              material={materials.Flag_red}
                            />
                          </group>
                          <group name="Circle_Black_sign_0_1510">
                            <mesh
                              name="Object_2269"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2269.geometry}
                              material={materials.Black_sign}
                            />
                          </group>
                          <group name="Circle_Material_0_1511">
                            <mesh
                              name="Object_2271"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2271.geometry}
                              material={materials.Material}
                            />
                          </group>
                        </group>
                        <group
                          name="House_outline_1512"
                          position={[0, 268.727, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={327.433}
                        >
                          <group name="House_outline_Material_0_1513">
                            <mesh
                              name="Object_2274"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2274.geometry}
                              material={materials.Material}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_sides_1514"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[39.598, 45.673, 45.673]}
                        >
                          <group name="Brick_row_lower_sides_Bricks0_0_1515">
                            <mesh
                              name="Object_2277"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2277.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front_1516"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[39.598, 45.673, 45.673]}
                        >
                          <group name="Brick_row_lower_front_Bricks0_0_1517">
                            <mesh
                              name="Object_2280"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2280.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube003_1518"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[-377.613, 31.222, 31.222]}
                        >
                          <group name="Cube003_Wood1_0_1519">
                            <mesh
                              name="Object_2283"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2283.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Window_frame001_1520"
                          position={[0, 21.222, 0]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={88.894}
                        >
                          <group name="Window_frame001_Wood1_0_1521">
                            <mesh
                              name="Object_2286"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2286.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Window_frame001_Window_glass_emission_0_1522">
                            <mesh
                              name="Object_2288"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2288.geometry}
                              material={materials.Window_glass_emission}
                            />
                          </group>
                        </group>
                        <group
                          name="Window_frame002_1523"
                          position={[-329.981, 300.95, 5.075]}
                          rotation={[-Math.PI / 2, 0, -Math.PI]}
                          scale={88.894}
                        >
                          <group name="Window_frame002_Wood1_0_1524">
                            <mesh
                              name="Object_2291"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2291.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Window_frame002_Window_glass_emission_0_1525">
                            <mesh
                              name="Object_2293"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2293.geometry}
                              material={materials.Window_glass_emission}
                            />
                          </group>
                        </group>
                        <group
                          name="Window_frame004_1526"
                          position={[330.378, 300.95, -127.627]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={88.894}
                        >
                          <group name="Window_frame004_Wood1_0_1527">
                            <mesh
                              name="Object_2296"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2296.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Window_frame004_Window_glass_emission_0_1528">
                            <mesh
                              name="Object_2298"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2298.geometry}
                              material={materials.Window_glass_emission}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder012_1529"
                          position={[-84.173, 26.29, -487.727]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={3.567}
                        >
                          <group name="Cylinder012_Metal_sword001_0_1530">
                            <mesh
                              name="Object_2301"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2301.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube004_1531"
                          position={[0, -33.294, 17.011]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-377.613, 31.222, 31.222]}
                        >
                          <group name="Cube004_Wood1_0_1532">
                            <mesh
                              name="Object_2304"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2304.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_panel_1533"
                          position={[0, -33.294, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={327.433}
                        >
                          <group name="Roof_panel_Wood1_0_1534">
                            <mesh
                              name="Object_2307"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2307.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_beams_1535"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Roof_beams_Wood1_0_1536">
                            <mesh
                              name="Object_2310"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2310.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Window_frame_1537"
                          position={[341.2, 736.526, 0.969]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Window_frame_Wood1_0_1538">
                            <mesh
                              name="Object_2313"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2313.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Window_frame_Window_glass_no_emission_0_1539">
                            <mesh
                              name="Object_2315"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2315.geometry}
                              material={materials.Window_glass_no_emission}
                            />
                          </group>
                        </group>
                        <group
                          name="Window_frame003_1540"
                          position={[-340.044, 736.526, 0.969]}
                          rotation={[-Math.PI / 2, 0, -Math.PI]}
                          scale={100}
                        >
                          <group name="Window_frame003_Wood1_0_1541">
                            <mesh
                              name="Object_2318"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2318.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Window_frame003_Window_glass_no_emission_0_1542">
                            <mesh
                              name="Object_2320"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2320.geometry}
                              material={materials.Window_glass_no_emission}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube010_1543"
                          position={[-3.8, 573.078, -300.862]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[31.526, 88.582, 88.582]}
                        >
                          <group name="Cube010_Wood1_0_1544">
                            <mesh
                              name="Object_2323"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2323.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Window_frame005_1545"
                          position={[0, 736.526, -325.31]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={100}
                        >
                          <group name="Window_frame005_Wood1_0_1546">
                            <mesh
                              name="Object_2326"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2326.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Window_frame005_Window_glass_emission_0_1547">
                            <mesh
                              name="Object_2328"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2328.geometry}
                              material={materials.Window_glass_emission}
                            />
                          </group>
                        </group>
                        <group
                          name="House_outline002_1548"
                          position={[0, 712.989, -202.355]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[109.143, 109.143, 155.627]}
                        >
                          <group name="House_outline002_Material_0_1549">
                            <mesh
                              name="Object_2331"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2331.geometry}
                              material={materials.Material}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_panel001_1550"
                          position={[0, 52.597, -188.077]}
                          rotation={[-1.586, 0, 0]}
                          scale={[454.388, 327.433, 327.433]}
                        >
                          <group name="Roof_panel001_Wood1_0_1551">
                            <mesh
                              name="Object_2334"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2334.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Arrow003_1552"
                          position={[-354.772, 1045.34, 58.313]}
                          rotation={[-1.955, 0.398, 0.938]}
                          scale={14.752}
                        >
                          <group name="Arrow003_Metal_sword_0_1553">
                            <mesh
                              name="Object_2337"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2337.geometry}
                              material={materials.Metal_sword}
                            />
                          </group>
                          <group name="Arrow003_Wood1_0_1554">
                            <mesh
                              name="Object_2339"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2339.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Arrow003_Feather_dark_0_1555">
                            <mesh
                              name="Object_2341"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2341.geometry}
                              material={materials.Feather_dark}
                            />
                          </group>
                          <group name="Arrow003_Feather_light_0_1556">
                            <mesh
                              name="Object_2343"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2343.geometry}
                              material={materials.Feather_light}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles014_1557"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.553, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles014_Roof_tiles2_0_1558">
                            <mesh
                              name="Object_2346"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2346.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles014_Roof_tiles4_0_1559">
                            <mesh
                              name="Object_2348"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2348.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles014_Roof_tiles3_0_1560">
                            <mesh
                              name="Object_2350"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2350.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles015_1561"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.412, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles015_Roof_tiles3_0_1562">
                            <mesh
                              name="Object_2353"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2353.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles015_Roof_tiles2_0_1563">
                            <mesh
                              name="Object_2355"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2355.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles015_Roof_tiles1_0_1564">
                            <mesh
                              name="Object_2357"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2357.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles015_Roof_tiles4_0_1565">
                            <mesh
                              name="Object_2359"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2359.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles016_1566"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.413, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles016_Roof_tiles3_0_1567">
                            <mesh
                              name="Object_2362"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2362.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles016_Roof_tiles4_0_1568">
                            <mesh
                              name="Object_2364"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2364.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles016_Roof_tiles5_0_1569">
                            <mesh
                              name="Object_2366"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2366.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                          <group name="Roof_tiles016_Roof_tiles2_0_1570">
                            <mesh
                              name="Object_2368"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2368.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles016_Roof_tiles1_0_1571">
                            <mesh
                              name="Object_2370"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2370.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles017_1572"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.413, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles017_Roof_tiles1_0_1573">
                            <mesh
                              name="Object_2373"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2373.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles017_Roof_tiles2_0_1574">
                            <mesh
                              name="Object_2375"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2375.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles017_Roof_tiles4_0_1575">
                            <mesh
                              name="Object_2377"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2377.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles017_Roof_tiles3_0_1576">
                            <mesh
                              name="Object_2379"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2379.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles018_1577"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.413, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles018_Roof_tiles2_0_1578">
                            <mesh
                              name="Object_2382"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2382.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles018_Roof_tiles1_0_1579">
                            <mesh
                              name="Object_2384"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2384.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles018_Roof_tiles3_0_1580">
                            <mesh
                              name="Object_2386"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2386.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles018_Roof_tiles5_0_1581">
                            <mesh
                              name="Object_2388"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2388.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                          <group name="Roof_tiles018_Roof_tiles4_0_1582">
                            <mesh
                              name="Object_2390"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2390.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles019_1583"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.413, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles019_Roof_tiles1_0_1584">
                            <mesh
                              name="Object_2393"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2393.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles019_Roof_tiles3_0_1585">
                            <mesh
                              name="Object_2395"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2395.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles019_Roof_tiles2_0_1586">
                            <mesh
                              name="Object_2397"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2397.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles019_Roof_tiles4_0_1587">
                            <mesh
                              name="Object_2399"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2399.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles020_1588"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.392, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles020_Roof_tiles1_0_1589">
                            <mesh
                              name="Object_2402"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2402.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles020_Roof_tiles5_0_1590">
                            <mesh
                              name="Object_2404"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2404.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                          <group name="Roof_tiles020_Roof_tiles3_0_1591">
                            <mesh
                              name="Object_2406"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2406.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles020_Roof_tiles2_0_1592">
                            <mesh
                              name="Object_2408"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2408.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles020_Roof_tiles4_0_1593">
                            <mesh
                              name="Object_2410"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2410.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles021_1594"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.399, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles021_Roof_tiles1_0_1595">
                            <mesh
                              name="Object_2413"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2413.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles021_Roof_tiles4_0_1596">
                            <mesh
                              name="Object_2415"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2415.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles021_Roof_tiles3_0_1597">
                            <mesh
                              name="Object_2417"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2417.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles021_Roof_tiles2_0_1598">
                            <mesh
                              name="Object_2419"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2419.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles022_1599"
                          position={[0, -33.294, 0.15]}
                          rotation={[-2.384, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles022_Roof_tiles1_0_1600">
                            <mesh
                              name="Object_2422"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2422.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles022_Roof_tiles3_0_1601">
                            <mesh
                              name="Object_2424"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2424.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles022_Roof_tiles2_0_1602">
                            <mesh
                              name="Object_2426"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2426.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles023_1603"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.371, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles023_Roof_tiles2_0_1604">
                            <mesh
                              name="Object_2429"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2429.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles023_Roof_tiles3_0_1605">
                            <mesh
                              name="Object_2431"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2431.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles023_Roof_tiles1_0_1606">
                            <mesh
                              name="Object_2433"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2433.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles023_Roof_tiles4_0_1607">
                            <mesh
                              name="Object_2435"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2435.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles023_Roof_tiles5_0_1608">
                            <mesh
                              name="Object_2437"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2437.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles024_1609"
                          position={[0, -33.294, 0.15]}
                          rotation={[-2.399, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles024_Roof_tiles1_0_1610">
                            <mesh
                              name="Object_2440"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2440.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles024_Roof_tiles2_0_1611">
                            <mesh
                              name="Object_2442"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2442.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles024_Roof_tiles3_0_1612">
                            <mesh
                              name="Object_2444"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2444.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles025_1613"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.412, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles025_Roof_tiles3_0_1614">
                            <mesh
                              name="Object_2447"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2447.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles025_Roof_tiles1_0_1615">
                            <mesh
                              name="Object_2449"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2449.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles025_Roof_tiles2_0_1616">
                            <mesh
                              name="Object_2451"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2451.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles025_Roof_tiles4_0_1617">
                            <mesh
                              name="Object_2453"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2453.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles026_1618"
                          position={[0, -33.294, 0.151]}
                          rotation={[-2.404, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles026_Roof_tiles2_0_1619">
                            <mesh
                              name="Object_2456"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2456.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles026_Roof_tiles4_0_1620">
                            <mesh
                              name="Object_2458"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2458.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles026_Roof_tiles1_0_1621">
                            <mesh
                              name="Object_2460"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2460.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles026_Roof_tiles3_0_1622">
                            <mesh
                              name="Object_2462"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2462.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles027_1623"
                          position={[-122.504, 831.838, -332.832]}
                          rotation={[-1.958, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles027_Roof_tiles2_0_1624">
                            <mesh
                              name="Object_2465"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2465.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles027_Roof_tiles1_0_1625">
                            <mesh
                              name="Object_2467"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2467.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles027_Roof_tiles4_0_1626">
                            <mesh
                              name="Object_2469"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2469.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles028_1627"
                          position={[-260.95, 858.432, -280.828]}
                          rotation={[-1.82, 0, -Math.PI]}
                          scale={[-49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles028_Roof_tiles2_0_1628">
                            <mesh
                              name="Object_2472"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2472.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles028_Roof_tiles1_0_1629">
                            <mesh
                              name="Object_2474"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2474.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles028_Roof_tiles3_0_1630">
                            <mesh
                              name="Object_2476"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2476.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles029_1631"
                          position={[-430.054, 879.966, -226.354]}
                          rotation={[-1.82, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles029_Roof_tiles3_0_1632">
                            <mesh
                              name="Object_2479"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2479.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles029_Roof_tiles2_0_1633">
                            <mesh
                              name="Object_2481"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2481.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles029_Roof_tiles1_0_1634">
                            <mesh
                              name="Object_2483"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2483.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles029_Roof_tiles4_0_1635">
                            <mesh
                              name="Object_2485"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2485.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles030_1636"
                          position={[22.39, 902.982, -167.985]}
                          rotation={[-1.837, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles030_Roof_tiles4_0_1637">
                            <mesh
                              name="Object_2488"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2488.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles030_Roof_tiles2_0_1638">
                            <mesh
                              name="Object_2490"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2490.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles030_Roof_tiles1_0_1639">
                            <mesh
                              name="Object_2492"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2492.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles030_Roof_tiles3_0_1640">
                            <mesh
                              name="Object_2494"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2494.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles031_1641"
                          position={[-158.631, 925.231, -112.855]}
                          rotation={[-1.828, 0, -Math.PI]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles031_Roof_tiles2_0_1642">
                            <mesh
                              name="Object_2497"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2497.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles031_Roof_tiles1_0_1643">
                            <mesh
                              name="Object_2499"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2499.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles031_Roof_tiles4_0_1644">
                            <mesh
                              name="Object_2501"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2501.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles035_1645"
                          position={[8.249, 471.591, 374.248]}
                          rotation={[-0.589, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles035_Roof_tiles2_0_1646">
                            <mesh
                              name="Object_2504"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2504.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles035_Roof_tiles4_0_1647">
                            <mesh
                              name="Object_2506"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2506.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles035_Roof_tiles3_0_1648">
                            <mesh
                              name="Object_2508"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2508.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles036_1649"
                          position={[2.27, 511.584, 354.567]}
                          rotation={[-0.729, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles036_Roof_tiles3_0_1650">
                            <mesh
                              name="Object_2511"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2511.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles036_Roof_tiles2_0_1651">
                            <mesh
                              name="Object_2513"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2513.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles036_Roof_tiles1_0_1652">
                            <mesh
                              name="Object_2515"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2515.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles036_Roof_tiles4_0_1653">
                            <mesh
                              name="Object_2517"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2517.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles037_1654"
                          position={[7.933, 558.311, 322.292]}
                          rotation={[-0.729, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles037_Roof_tiles3_0_1655">
                            <mesh
                              name="Object_2520"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2520.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles037_Roof_tiles4_0_1656">
                            <mesh
                              name="Object_2522"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2522.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles037_Roof_tiles1_0_1657">
                            <mesh
                              name="Object_2524"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2524.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles037_Roof_tiles2_0_1658">
                            <mesh
                              name="Object_2526"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2526.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles037_Roof_tiles5_0_1659">
                            <mesh
                              name="Object_2528"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2528.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles038_1660"
                          position={[11.999, 599.358, 295.311]}
                          rotation={[-0.729, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles038_Roof_tiles1_0_1661">
                            <mesh
                              name="Object_2531"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2531.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles038_Roof_tiles2_0_1662">
                            <mesh
                              name="Object_2533"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2533.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles038_Roof_tiles4_0_1663">
                            <mesh
                              name="Object_2535"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2535.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles038_Roof_tiles5_0_1664">
                            <mesh
                              name="Object_2537"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2537.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                          <group name="Roof_tiles038_Roof_tiles3_0_1665">
                            <mesh
                              name="Object_2539"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2539.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles039_1666"
                          position={[1.359, 640.02, 268.607]}
                          rotation={[-0.729, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles039_Roof_tiles2_0_1667">
                            <mesh
                              name="Object_2542"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2542.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles039_Roof_tiles1_0_1668">
                            <mesh
                              name="Object_2544"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2544.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles039_Roof_tiles3_0_1669">
                            <mesh
                              name="Object_2546"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2546.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles039_Roof_tiles5_0_1670">
                            <mesh
                              name="Object_2548"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2548.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                          <group name="Roof_tiles039_Roof_tiles4_0_1671">
                            <mesh
                              name="Object_2550"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2550.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles040_1672"
                          position={[32.331, 683.951, 239.168]}
                          rotation={[-0.729, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles040_Roof_tiles1_0_1673">
                            <mesh
                              name="Object_2553"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2553.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles040_Roof_tiles3_0_1674">
                            <mesh
                              name="Object_2555"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2555.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles040_Roof_tiles2_0_1675">
                            <mesh
                              name="Object_2557"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2557.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles040_Roof_tiles4_0_1676">
                            <mesh
                              name="Object_2559"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2559.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles040_Roof_tiles5_0_1677">
                            <mesh
                              name="Object_2561"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2561.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles041_1678"
                          position={[18.953, 722.513, 214.186]}
                          rotation={[-0.749, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles041_Roof_tiles1_0_1679">
                            <mesh
                              name="Object_2564"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2564.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles041_Roof_tiles2_0_1680">
                            <mesh
                              name="Object_2566"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2566.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles041_Roof_tiles3_0_1681">
                            <mesh
                              name="Object_2568"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2568.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles041_Roof_tiles4_0_1682">
                            <mesh
                              name="Object_2570"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2570.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles042_1683"
                          position={[18.807, 759.159, 189.853]}
                          rotation={[-0.743, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles042_Roof_tiles1_0_1684">
                            <mesh
                              name="Object_2573"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2573.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles042_Roof_tiles4_0_1685">
                            <mesh
                              name="Object_2575"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2575.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles042_Roof_tiles3_0_1686">
                            <mesh
                              name="Object_2577"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2577.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles042_Roof_tiles2_0_1687">
                            <mesh
                              name="Object_2579"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2579.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles042_Roof_tiles5_0_1688">
                            <mesh
                              name="Object_2581"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2581.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles043_1689"
                          position={[17.584, 797.588, 159.786]}
                          rotation={[-0.757, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles043_Roof_tiles1_0_1690">
                            <mesh
                              name="Object_2584"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2584.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles043_Roof_tiles3_0_1691">
                            <mesh
                              name="Object_2586"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2586.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles043_Roof_tiles2_0_1692">
                            <mesh
                              name="Object_2588"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2588.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles044_1693"
                          position={[13.243, 829.083, 144.133]}
                          rotation={[-0.77, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles044_Roof_tiles2_0_1694">
                            <mesh
                              name="Object_2591"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2591.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles044_Roof_tiles3_0_1695">
                            <mesh
                              name="Object_2593"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2593.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles044_Roof_tiles1_0_1696">
                            <mesh
                              name="Object_2595"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2595.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles044_Roof_tiles5_0_1697">
                            <mesh
                              name="Object_2597"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2597.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                          <group name="Roof_tiles044_Roof_tiles4_0_1698">
                            <mesh
                              name="Object_2599"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2599.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles045_1699"
                          position={[-18.728, 869.71, 115.538]}
                          rotation={[-0.742, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles045_Roof_tiles1_0_1700">
                            <mesh
                              name="Object_2602"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2602.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles045_Roof_tiles4_0_1701">
                            <mesh
                              name="Object_2604"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2604.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles045_Roof_tiles2_0_1702">
                            <mesh
                              name="Object_2606"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2606.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles045_Roof_tiles3_0_1703">
                            <mesh
                              name="Object_2608"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2608.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles045_Roof_tiles5_0_1704">
                            <mesh
                              name="Object_2610"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2610.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles046_1705"
                          position={[30.503, 913.965, 85.047]}
                          rotation={[-0.729, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles046_Roof_tiles3_0_1706">
                            <mesh
                              name="Object_2613"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2613.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles046_Roof_tiles1_0_1707">
                            <mesh
                              name="Object_2615"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2615.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles046_Roof_tiles2_0_1708">
                            <mesh
                              name="Object_2617"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2617.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles046_Roof_tiles4_0_1709">
                            <mesh
                              name="Object_2619"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2619.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tiles047_1710"
                          position={[8.535, 955.409, 57.116]}
                          rotation={[-0.737, 0, 0]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tiles047_Roof_tiles2_0_1711">
                            <mesh
                              name="Object_2622"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2622.geometry}
                              material={materials.Roof_tiles2}
                            />
                          </group>
                          <group name="Roof_tiles047_Roof_tiles4_0_1712">
                            <mesh
                              name="Object_2624"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2624.geometry}
                              material={materials.Roof_tiles4}
                            />
                          </group>
                          <group name="Roof_tiles047_Roof_tiles1_0_1713">
                            <mesh
                              name="Object_2626"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2626.geometry}
                              material={materials.Roof_tiles1}
                            />
                          </group>
                          <group name="Roof_tiles047_Roof_tiles3_0_1714">
                            <mesh
                              name="Object_2628"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2628.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                          <group name="Roof_tiles047_Roof_tiles5_0_1715">
                            <mesh
                              name="Object_2630"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2630.geometry}
                              material={materials.Roof_tiles5}
                            />
                          </group>
                        </group>
                        <group
                          name="House_outline003_1716"
                          position={[0, 294.139, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={327.433}
                        >
                          <group name="House_outline003_Wood1_0_1717">
                            <mesh
                              name="Object_2633"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2633.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="House_outline003_Material_0_1718">
                            <mesh
                              name="Object_2635"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2635.geometry}
                              material={materials.Material}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_top_beam_1719"
                          position={[-4.595, 1027.549, 0.334]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[-500.642, 28.488, 28.488]}
                        >
                          <group name="Roof_top_beam_Wood1_0_1720">
                            <mesh
                              name="Object_2638"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2638.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_panel003_1721"
                          position={[0, -33.294, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={327.433}
                        >
                          <group name="Roof_panel003_Wood1_0_1722">
                            <mesh
                              name="Object_2641"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2641.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_beams001_1723"
                          position={[0, 11.908, 0]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="Roof_beams001_Wood1_0_1724">
                            <mesh
                              name="Object_2644"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2644.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane001_1725"
                          position={[440.09, 106.959, -293.939]}
                          rotation={[-1.604, 0, 0.011]}
                          scale={1589.444}
                        >
                          <group name="Plane001_Wood3_0_1726">
                            <mesh
                              name="Object_2647"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2647.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane002_1727"
                          position={[442.645, 106.959, -202.437]}
                          rotation={[-1.557, 0, 0]}
                          scale={1589.444}
                        >
                          <group name="Plane002_Wood1_0_1728">
                            <mesh
                              name="Object_2650"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2650.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane003_1729"
                          position={[440.09, 106.959, -105.003]}
                          rotation={[-Math.PI / 2, -0.002, 0.006]}
                          scale={[1589.444, 1761.944, 1589.444]}
                        >
                          <group name="Plane003_Wood1_0_1730">
                            <mesh
                              name="Object_2653"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2653.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane004_1731"
                          position={[440.09, 106.959, -2.68]}
                          rotation={[-Math.PI / 2, 0.005, 0]}
                          scale={[1589.444, 1805.517, 1589.444]}
                        >
                          <group name="Plane004_Wood1_0_1732">
                            <mesh
                              name="Object_2656"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2656.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane005_1733"
                          position={[440.09, 106.959, 97.678]}
                          rotation={[-1.55, 0, -0.02]}
                          scale={[1589.444, 1715.544, 1589.444]}
                        >
                          <group name="Plane005_Wood3_0_1734">
                            <mesh
                              name="Object_2659"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2659.geometry}
                              material={materials.Wood3}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane006_1735"
                          position={[440.09, 106.959, 195.381]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[1589.444, 1714.246, 1589.444]}
                        >
                          <group name="Plane006_Wood2_0_1736">
                            <mesh
                              name="Object_2662"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2662.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane007_1737"
                          position={[440.09, 106.959, 289.646]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={1589.444}
                        >
                          <group name="Plane007_Wood1_0_1738">
                            <mesh
                              name="Object_2665"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2665.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube001_1739"
                          position={[534.567, 96.109, -0.78]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-392.37, 5.489, 5.489]}
                        >
                          <group name="Cube001_Wood1_0_1740">
                            <mesh
                              name="Object_2668"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2668.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube005_1741"
                          position={[374.534, 95.723, -0.78]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-392.37, 5.489, 5.489]}
                        >
                          <group name="Cube005_Wood1_0_1742">
                            <mesh
                              name="Object_2671"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2671.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube006_1743"
                          position={[535.924, 158.239, -329.336]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[168.649, 16.085, 16.085]}
                        >
                          <group name="Cube006_Wood2_0_1744">
                            <mesh
                              name="Object_2674"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2674.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube007_1745"
                          position={[535.924, 158.239, 329.091]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[168.649, 16.085, 16.085]}
                        >
                          <group name="Cube007_Wood1_0_1746">
                            <mesh
                              name="Object_2677"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2677.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane008_1747"
                          position={[560.393, 87.987, 131.514]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[1589.444, 857.691, 1589.444]}
                        >
                          <group name="Plane008_Wood1_0_1748">
                            <mesh
                              name="Object_2680"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2680.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Plane008_Wood2_0_1749">
                            <mesh
                              name="Object_2682"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2682.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube011_1750"
                          position={[534.567, 202.083, -0.78]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-392.37, 5.489, 5.489]}
                        >
                          <group name="Cube011_Wood1_0_1751">
                            <mesh
                              name="Object_2685"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2685.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube012_1752"
                          position={[528.769, 202.083, -327.152]}
                          rotation={[-Math.PI / 2, 0, -Math.PI]}
                          scale={[-233.76, 5.489, 5.489]}
                        >
                          <group name="Cube012_Wood1_0_1753">
                            <mesh
                              name="Object_2688"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2688.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube014_1754"
                          position={[528.769, 202.083, 324.797]}
                          rotation={[-Math.PI / 2, 0, -Math.PI]}
                          scale={[-233.76, 5.489, 5.489]}
                        >
                          <group name="Cube014_Wood1_0_1755">
                            <mesh
                              name="Object_2691"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2691.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube015_1756"
                          position={[535.924, 158.239, 240.666]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[195.884, 9.151, 9.151]}
                        >
                          <group name="Cube015_Wood1_0_1757">
                            <mesh
                              name="Object_2694"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2694.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube016_1758"
                          position={[535.924, 158.239, 22.363]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[195.884, 9.151, 9.151]}
                        >
                          <group name="Cube016_Wood1_0_1759">
                            <mesh
                              name="Object_2697"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2697.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube017_1760"
                          position={[721.967, 158.239, 240.666]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[195.884, 9.151, 9.151]}
                        >
                          <group name="Cube017_Wood1_0_1761">
                            <mesh
                              name="Object_2700"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2700.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube018_1762"
                          position={[721.967, 158.239, 22.363]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[195.884, 9.151, 9.151]}
                        >
                          <group name="Cube018_Wood1_0_1763">
                            <mesh
                              name="Object_2703"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2703.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube019_1764"
                          position={[640.275, 155.434, 241.619]}
                          rotation={[-Math.PI / 2, 0.439, -Math.PI]}
                          scale={[-233.76, 5.489, 5.489]}
                        >
                          <group name="Cube019_Wood1_0_1765">
                            <mesh
                              name="Object_2706"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2706.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube020_1766"
                          position={[640.275, 155.434, 21.216]}
                          rotation={[-Math.PI / 2, 0.439, -Math.PI]}
                          scale={[-233.76, 5.489, 5.489]}
                        >
                          <group name="Cube020_Wood1_0_1767">
                            <mesh
                              name="Object_2709"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2709.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube013_1768"
                          position={[534.567, 202.083, -0.78]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-392.37, 5.489, 5.489]}
                        >
                          <group name="Cube013_Wood1_0_1769">
                            <mesh
                              name="Object_2712"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2712.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube024_1770"
                          position={[640.275, 42.433, 237.003]}
                          rotation={[-Math.PI / 2, 0.439, -Math.PI]}
                          scale={[-233.76, 5.489, 5.489]}
                        >
                          <group name="Cube024_Wood1_0_1771">
                            <mesh
                              name="Object_2715"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2715.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube025_1772"
                          position={[640.275, 42.433, 26.025]}
                          rotation={[-Math.PI / 2, 0.439, -Math.PI]}
                          scale={[-233.76, 5.489, 5.489]}
                        >
                          <group name="Cube025_Wood1_0_1773">
                            <mesh
                              name="Object_2718"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2718.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder072_1774"
                          position={[540.053, 201.994, -14.266]}
                          rotation={[-1.477, Math.PI / 2, 0]}
                          scale={[3.374, 3.374, 7.803]}
                        >
                          <group name="Cylinder072_Wood1_0_1775">
                            <mesh
                              name="Object_2721"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2721.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder073_1776"
                          position={[540.053, 201.994, -37.066]}
                          rotation={[-2.64, Math.PI / 2, 0]}
                          scale={[3.374, 3.374, 7.803]}
                        >
                          <group name="Cylinder073_Wood1_0_1777">
                            <mesh
                              name="Object_2724"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2724.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder074_1778"
                          position={[540.053, 201.994, -60.846]}
                          rotation={[-2.283, Math.PI / 2, 0]}
                          scale={[3.374, 3.374, 7.803]}
                        >
                          <group name="Cylinder074_Wood1_0_1779">
                            <mesh
                              name="Object_2727"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2727.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder075_1780"
                          position={[540.053, 201.994, -88.058]}
                          rotation={[0.457, Math.PI / 2, 0]}
                          scale={[3.374, 3.374, 7.803]}
                        >
                          <group name="Cylinder075_Wood1_0_1781">
                            <mesh
                              name="Object_2730"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2730.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder076_1782"
                          position={[540.053, 201.994, -112.451]}
                          rotation={[2.912, Math.PI / 2, 0]}
                          scale={[3.374, 3.374, 7.803]}
                        >
                          <group name="Cylinder076_Wood1_0_1783">
                            <mesh
                              name="Object_2733"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2733.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder077_1784"
                          position={[540.053, 201.994, -133.779]}
                          rotation={[-2.736, Math.PI / 2, 0]}
                          scale={[3.374, 3.374, 7.803]}
                        >
                          <group name="Cylinder077_Wood1_0_1785">
                            <mesh
                              name="Object_2736"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2736.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank009_1786"
                          position={[-456.348, 150.107, 330.938]}
                          rotation={[Math.PI, 0, Math.PI]}
                          scale={[30.548, 138.851, 3.667]}
                        >
                          <group name="Plank009_Wood1_0_1787">
                            <mesh
                              name="Object_2739"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2739.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank010_1788"
                          position={[-519.139, 148.054, 333.175]}
                          rotation={[Math.PI, 0, 0]}
                          scale={[30.217, 138.851, 3.667]}
                        >
                          <group name="Plank010_Wood1_0_1789">
                            <mesh
                              name="Object_2742"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2742.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank011_1790"
                          position={[-389.587, 148.831, 333.175]}
                          rotation={[Math.PI, 0, 0]}
                          scale={[34.871, 138.851, 3.667]}
                        >
                          <group name="Plank011_Wood2_0_1791">
                            <mesh
                              name="Object_2745"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2745.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank012_1792"
                          position={[-424.909, 147.37, 122.535]}
                          rotation={[Math.PI, 0, 0]}
                          scale={[30.548, 138.851, 3.667]}
                        >
                          <group name="Plank012_Wood1_0_1793">
                            <mesh
                              name="Object_2748"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2748.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank016_1794"
                          position={[-359.493, 149.423, 125.349]}
                          rotation={[Math.PI, 0, -Math.PI]}
                          scale={[30.217, 138.851, 3.667]}
                        >
                          <group name="Plank016_Wood1_0_1795">
                            <mesh
                              name="Object_2751"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2751.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank017_1796"
                          position={[-495.041, 149.423, 125.349]}
                          rotation={[Math.PI, 0, 3.123]}
                          scale={[34.871, 138.851, 3.667]}
                        >
                          <group name="Plank017_Wood1_0_1797">
                            <mesh
                              name="Object_2754"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2754.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank018_1798"
                          position={[-445.794, 347.414, 263.682]}
                          rotation={[-Math.PI / 2, -0.366, Math.PI / 2]}
                          scale={[30.217, 96.615, 3.667]}
                        >
                          <group name="Plank018_Wood1_0_1799">
                            <mesh
                              name="Object_2757"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2757.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank019_1800"
                          position={[-428.509, 356.148, 209.46]}
                          rotation={[1.576, 0.409, -1.585]}
                          scale={[24.352, 92.217, 3.667]}
                        >
                          <group name="Plank019_Wood1_0_1801">
                            <mesh
                              name="Object_2760"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2760.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank020_1802"
                          position={[-463.247, 340.687, 146.998]}
                          rotation={[1.579, 0.366, 1.549]}
                          scale={[28.116, 92.217, 3.667]}
                        >
                          <group name="Plank020_Wood2_0_1803">
                            <mesh
                              name="Object_2763"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2763.geometry}
                              material={materials.Wood2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank021_1804"
                          position={[-455.142, 343.292, 319.583]}
                          rotation={[1.572, 0.37, 1.567]}
                          scale={[28.683, 92.217, 3.667]}
                        >
                          <group name="Plank021_Wood1_0_1805">
                            <mesh
                              name="Object_2766"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2766.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plank022_1806"
                          position={[-342.76, 384.136, 201.971]}
                          rotation={[1.557, 0, 0]}
                          scale={[13.525, 72.718, 1.921]}
                        >
                          <group name="Plank022_Wood1_0_1807">
                            <mesh
                              name="Object_2769"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2769.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube705_1808"
                          position={[-358.825, 154.516, 316.68]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[169.596, 11.563, 11.563]}
                        >
                          <group name="Cube705_Wood1_0_1809">
                            <mesh
                              name="Object_2772"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2772.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube706_1810"
                          position={[-351.211, 154.516, 141.424]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[169.596, 11.563, 11.563]}
                        >
                          <group name="Cube706_Wood1_0_1811">
                            <mesh
                              name="Object_2775"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2775.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube707_1812"
                          position={[-514.84, 154.516, 316.68]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[169.596, 11.563, 11.563]}
                        >
                          <group name="Cube707_Wood1_0_1813">
                            <mesh
                              name="Object_2778"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2778.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube708_1814"
                          position={[-514.84, 154.516, 141.424]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[169.596, 11.563, 11.563]}
                        >
                          <group name="Cube708_Wood1_0_1815">
                            <mesh
                              name="Object_2781"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2781.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube709_1816"
                          position={[-515.629, 307.973, 228.773]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[113.297, 5.809, 5.809]}
                        >
                          <group name="Cube709_Wood1_0_1817">
                            <mesh
                              name="Object_2784"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2784.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube710_1818"
                          position={[-359.549, 307.973, 228.773]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[113.297, 5.809, 5.809]}
                        >
                          <group name="Cube710_Wood1_0_1819">
                            <mesh
                              name="Object_2787"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2787.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front001_1820"
                          position={[-455.443, 16.132, 249.513]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-19.43, 18.014, 5.254]}
                        >
                          <group name="Brick_row_lower_front001_Bricks0_0_1821">
                            <mesh
                              name="Object_2790"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2790.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front002_1822"
                          position={[-401.116, 16.132, 267.413]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-18.406, 34.581, 4.976]}
                        >
                          <group name="Brick_row_lower_front002_Bricks0_0_1823">
                            <mesh
                              name="Object_2793"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2793.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front003_1824"
                          position={[-484.084, 16.132, 318.415]}
                          rotation={[Math.PI / 2, 0, 1.542]}
                          scale={[-18.406, 45.673, 4.976]}
                        >
                          <group name="Brick_row_lower_front003_Bricks0_0_1825">
                            <mesh
                              name="Object_2796"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2796.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front004_1826"
                          position={[-399.482, 16.132, 326.995]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-14.58, 36.18, 4.976]}
                        >
                          <group name="Brick_row_lower_front004_Bricks0_0_1827">
                            <mesh
                              name="Object_2799"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2799.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front008_1828"
                          position={[-403.397, 16.132, 207.428]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-14.264, 31.252, 3.857]}
                        >
                          <group name="Brick_row_lower_front008_Bricks0_0_1829">
                            <mesh
                              name="Object_2802"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2802.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front009_1830"
                          position={[-406.451, 16.132, 146.994]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-18.406, 33.784, 4.976]}
                        >
                          <group name="Brick_row_lower_front009_Bricks0_0_1831">
                            <mesh
                              name="Object_2805"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2805.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front010_1832"
                          position={[-506.52, 16.132, 251.412]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[-18.406, 30.436, 4.976]}
                        >
                          <group name="Brick_row_lower_front010_Bricks0_0_1833">
                            <mesh
                              name="Object_2808"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2808.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front011_1834"
                          position={[-490.902, 16.132, 148.728]}
                          rotation={[Math.PI / 2, 0, 1.517]}
                          scale={[-18.406, 45.673, 4.976]}
                        >
                          <group name="Brick_row_lower_front011_Bricks0_0_1835">
                            <mesh
                              name="Object_2811"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2811.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front013_1836"
                          position={[-461.073, 16.132, 197.842]}
                          rotation={[Math.PI / 2, 0, 1.546]}
                          scale={[-9.636, 23.912, 2.605]}
                        >
                          <group name="Brick_row_lower_front013_Bricks0_0_1837">
                            <mesh
                              name="Object_2814"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2814.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_row_lower_front014_1838"
                          position={[-510.582, 16.132, 200.856]}
                          rotation={[Math.PI / 2, 0, 1.546]}
                          scale={[-9.636, 23.912, 4.558]}
                        >
                          <group name="Brick_row_lower_front014_Bricks0_0_1839">
                            <mesh
                              name="Object_2817"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2817.geometry}
                              material={materials.Bricks0}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube711_1840"
                          position={[-359.193, 368.111, 228.773]}
                          rotation={[Math.PI / 2, 0, Math.PI / 2]}
                          scale={[113.297, 5.809, 5.809]}
                        >
                          <group name="Cube711_Wood1_0_1841">
                            <mesh
                              name="Object_2820"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2820.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Beams_roof_1842"
                          position={[-640.089, 309.275, -591.278]}
                          rotation={[Math.PI, 0.998, 2.117]}
                          scale={[12.249, 10.53, 15.677]}
                        >
                          <group name="Beams_roof_Wood1_0_1843">
                            <mesh
                              name="Object_2823"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2823.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Beams_standing_1844"
                          position={[-668.673, 88.207, -575.089]}
                          rotation={[-0.878, 0.391, -2.711]}
                          scale={[13.529, 13.529, 6.995]}
                        >
                          <group name="Beams_standing_Wood1_0_1845">
                            <mesh
                              name="Object_2826"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2826.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_ring_1846"
                          position={[-639.215, 130.842, -589.408]}
                          rotation={[-Math.PI / 2, 0, 1.397]}
                          scale={[17.606, 17.606, 18.684]}
                        >
                          <group name="Brick_ring_Bricks1_0_1847">
                            <mesh
                              name="Object_2829"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2829.geometry}
                              material={materials.Bricks1}
                            />
                          </group>
                          <group name="Brick_ring_Bricks3_0_1848">
                            <mesh
                              name="Object_2831"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2831.geometry}
                              material={materials.Bricks3}
                            />
                          </group>
                          <group name="Brick_ring_Bricks0001_0_1849">
                            <mesh
                              name="Object_2833"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2833.geometry}
                              material={materials["Bricks0.001"]}
                            />
                          </group>
                          <group name="Brick_ring_Bricks2_0_1850">
                            <mesh
                              name="Object_2835"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2835.geometry}
                              material={materials.Bricks2}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_ring001_1851"
                          position={[-647.701, 17.313, -588.484]}
                          rotation={[-Math.PI / 2, 0, 0.573]}
                          scale={18.684}
                        >
                          <group name="Brick_ring001_Bricks0001_0_1852">
                            <mesh
                              name="Object_2838"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2838.geometry}
                              material={materials["Bricks0.001"]}
                            />
                          </group>
                          <group name="Brick_ring001_Bricks1_0_1853">
                            <mesh
                              name="Object_2840"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2840.geometry}
                              material={materials.Bricks1}
                            />
                          </group>
                          <group name="Brick_ring001_Bricks3_0_1854">
                            <mesh
                              name="Object_2842"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2842.geometry}
                              material={materials.Bricks3}
                            />
                          </group>
                          <group name="Brick_ring001_Bricks2_0_1855">
                            <mesh
                              name="Object_2844"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2844.geometry}
                              material={materials.Bricks2}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_ring002_1856"
                          position={[-639.213, 55.554, -589.443]}
                          rotation={[-Math.PI / 2, 0, 2.346]}
                          scale={[18.08, 18.08, 18.684]}
                        >
                          <group name="Brick_ring002_Bricks0001_0_1857">
                            <mesh
                              name="Object_2847"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2847.geometry}
                              material={materials["Bricks0.001"]}
                            />
                          </group>
                          <group name="Brick_ring002_Bricks2_0_1858">
                            <mesh
                              name="Object_2849"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2849.geometry}
                              material={materials.Bricks2}
                            />
                          </group>
                          <group name="Brick_ring002_Bricks1_0_1859">
                            <mesh
                              name="Object_2851"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2851.geometry}
                              material={materials.Bricks1}
                            />
                          </group>
                          <group name="Brick_ring002_Bricks3_0_1860">
                            <mesh
                              name="Object_2853"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2853.geometry}
                              material={materials.Bricks3}
                            />
                          </group>
                        </group>
                        <group
                          name="Brick_ring003_1861"
                          position={[-639.222, 93.176, -589.533]}
                          rotation={[-Math.PI / 2, 0, -2.157]}
                          scale={[17.044, 17.044, 18.684]}
                        >
                          <group name="Brick_ring003_Bricks0001_0_1862">
                            <mesh
                              name="Object_2856"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2856.geometry}
                              material={materials["Bricks0.001"]}
                            />
                          </group>
                          <group name="Brick_ring003_Bricks2_0_1863">
                            <mesh
                              name="Object_2858"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2858.geometry}
                              material={materials.Bricks2}
                            />
                          </group>
                          <group name="Brick_ring003_Bricks1_0_1864">
                            <mesh
                              name="Object_2860"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2860.geometry}
                              material={materials.Bricks1}
                            />
                          </group>
                        </group>
                        <group
                          name="Bucket_1865"
                          position={[-594.822, 185.414, -495.323]}
                          rotation={[-Math.PI / 2, 0, 1.337]}
                          scale={24.573}
                        >
                          <group name="Bucket_Bucket_0_1866">
                            <mesh
                              name="Object_2863"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2863.geometry}
                              material={materials.Bucket}
                            />
                          </group>
                        </group>
                        <group
                          name="Bucket_handle_1867"
                          position={[-589.734, 188.356, -517.43]}
                          rotation={[-1.859, 0.068, 1.346]}
                          scale={19.132}
                        >
                          <group name="Bucket_handle_Bucket_handle_0_1868">
                            <mesh
                              name="Object_2866"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2866.geometry}
                              material={materials.Bucket_handle}
                            />
                          </group>
                        </group>
                        <group
                          name="Central_rod_well_1869"
                          position={[-691.228, 224.862, -556.674]}
                          rotation={[-Math.PI / 2, 0, 0.573]}
                          scale={18.684}
                        >
                          <group name="Central_rod_well_Wood1_0_1870">
                            <mesh
                              name="Object_2869"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2869.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder001_1871"
                          position={[-658.362, 225.125, -577.926]}
                          rotation={[-3.079, 0.997, 1.518]}
                          scale={[14.176, 14.176, 3.659]}
                        >
                          <group name="Cylinder001_Rope_0_1872">
                            <mesh
                              name="Object_2872"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2872.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder002_1873"
                          position={[-652.685, 225.125, -581.59]}
                          rotation={[3.059, 0.996, 1.64]}
                          scale={[13.333, 13.333, 3.442]}
                        >
                          <group name="Cylinder002_Rope_0_1874">
                            <mesh
                              name="Object_2875"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2875.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder003_1875"
                          position={[-647.211, 225.125, -585.123]}
                          rotation={[-3.016, 0.994, 1.465]}
                          scale={[12.583, 12.583, 3.248]}
                        >
                          <group name="Cylinder003_Rope_0_1876">
                            <mesh
                              name="Object_2878"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2878.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder004_1877"
                          position={[-642.148, 225.125, -588.392]}
                          rotation={[3.004, 0.993, 1.686]}
                          scale={[11.986, 11.986, 3.094]}
                        >
                          <group name="Cylinder004_Rope_0_1878">
                            <mesh
                              name="Object_2881"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2881.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder005_1879"
                          position={[-637.55, 225.125, -591.36]}
                          rotation={[-3.088, 0.997, 1.526]}
                          scale={[10.911, 10.911, 2.817]}
                        >
                          <group name="Cylinder005_Rope_0_1880">
                            <mesh
                              name="Object_2884"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2884.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder006_1881"
                          position={[-633.389, 225.125, -594.022]}
                          rotation={[3.042, 0.995, 1.655]}
                          scale={[10.11, 10.11, 2.61]}
                        >
                          <group name="Cylinder006_Rope_0_1882">
                            <mesh
                              name="Object_2887"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2887.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="Rope_1883"
                          position={[-598.472, 157.108, -553.653]}
                          rotation={[-Math.PI / 2, 0, 2.144]}
                          scale={18.684}
                        >
                          <group name="Rope_Rope_0_1884">
                            <mesh
                              name="Object_2890"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2890.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="Tiles_tilted_well_1885"
                          position={[-673.524, 331.296, -657.989]}
                          rotation={[-2.128, -0.188, -1.091]}
                          scale={[22.69, 20.196, 22.69]}
                        >
                          <group name="Tiles_tilted_well_Tiles1_0_1886">
                            <mesh
                              name="Object_2893"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2893.geometry}
                              material={materials.Tiles1}
                            />
                          </group>
                          <group name="Tiles_tilted_well_Tiles3_0_1887">
                            <mesh
                              name="Object_2895"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2895.geometry}
                              material={materials.Tiles3}
                            />
                          </group>
                          <group name="Tiles_tilted_well_Tiles0_0_1888">
                            <mesh
                              name="Object_2897"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2897.geometry}
                              material={materials.Tiles0}
                            />
                          </group>
                          <group name="Tiles_tilted_well_Tiles2_0_1889">
                            <mesh
                              name="Object_2899"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2899.geometry}
                              material={materials.Tiles2}
                            />
                          </group>
                        </group>
                        <group
                          name="Tiles_tlted_well_2_1890"
                          position={[-596.524, 331.869, -526.57]}
                          rotation={[-1.013, 0.188, 2.051]}
                          scale={[22.258, 19.811, 22.258]}
                        >
                          <group name="Tiles_tlted_well_2_Tiles3_0_1891">
                            <mesh
                              name="Object_2902"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2902.geometry}
                              material={materials.Tiles3}
                            />
                          </group>
                          <group name="Tiles_tlted_well_2_Tiles2_0_1892">
                            <mesh
                              name="Object_2904"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2904.geometry}
                              material={materials.Tiles2}
                            />
                          </group>
                          <group name="Tiles_tlted_well_2_Tiles1_0_1893">
                            <mesh
                              name="Object_2906"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2906.geometry}
                              material={materials.Tiles1}
                            />
                          </group>
                          <group name="Tiles_tlted_well_2_Tiles0_0_1894">
                            <mesh
                              name="Object_2908"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2908.geometry}
                              material={materials.Tiles0}
                            />
                          </group>
                        </group>
                        <group
                          name="Top_beam_1895"
                          position={[-641.046, 383.514, -588.289]}
                          rotation={[-Math.PI, 0.998, Math.PI / 2]}
                          scale={[26.346, 22.648, 19.595]}
                        >
                          <group name="Top_beam_Wood1_0_1896">
                            <mesh
                              name="Object_2911"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2911.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Well_handle_1897"
                          position={[-489.186, 173.339, -704.168]}
                          rotation={[-1.333, 0.151, -2.586]}
                          scale={[2.436, 12.28, 12.28]}
                        >
                          <group name="Well_handle_Wood1_0_1898">
                            <mesh
                              name="Object_2914"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2914.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Sword_flat003_1899"
                          position={[556.382, 190.945, -227.293]}
                          rotation={[1.571, 0, -0.706]}
                          scale={[13.222, 13.222, 22.049]}
                        >
                          <group name="Sword_flat003_Grip_0_1900">
                            <mesh
                              name="Object_2917"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2917.geometry}
                              material={materials.Grip}
                            />
                          </group>
                          <group name="Sword_flat003_Metal_ring_0_1901">
                            <mesh
                              name="Object_2919"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2919.geometry}
                              material={materials.Metal_ring}
                            />
                          </group>
                          <group name="Sword_flat003_Metal_sword_0_1902">
                            <mesh
                              name="Object_2921"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2921.geometry}
                              material={materials.Metal_sword}
                            />
                          </group>
                        </group>
                        <group
                          name="Sword_flat001_1903"
                          position={[557.337, 206.403, 10.958]}
                          rotation={[1.742, 0.025, 1.057]}
                          scale={[12.38, 12.38, 20.645]}
                        >
                          <group name="Sword_flat001_Grip_bottom_0_1904">
                            <mesh
                              name="Object_2924"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2924.geometry}
                              material={materials.Grip_bottom}
                            />
                          </group>
                          <group name="Sword_flat001_Grip_0_1905">
                            <mesh
                              name="Object_2926"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2926.geometry}
                              material={materials.Grip}
                            />
                          </group>
                          <group name="Sword_flat001_Metal_ring_0_1906">
                            <mesh
                              name="Object_2928"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2928.geometry}
                              material={materials.Metal_ring}
                            />
                          </group>
                          <group name="Sword_flat001_Metal_sword_0_1907">
                            <mesh
                              name="Object_2930"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2930.geometry}
                              material={materials.Metal_sword}
                            />
                          </group>
                        </group>
                        <group
                          name="Axe_1908"
                          position={[544.949, 238.047, -92.572]}
                          rotation={[-1.616, 1.42, 1.672]}
                          scale={[-50.716, 50.716, 50.716]}
                        >
                          <group name="Axe_Metal_sword001_0_1909">
                            <mesh
                              name="Object_2933"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2933.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                          <group name="Axe_Wood1_0_1910">
                            <mesh
                              name="Object_2935"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2935.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane019_1911"
                          position={[672.154, 90.39, -99.426]}
                          rotation={[0, Math.PI / 2, 0]}
                          scale={[1589.444, 453.864, 1589.444]}
                        >
                          <group name="Plane019_Wood1_0_1912">
                            <mesh
                              name="Object_2938"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2938.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane020_1913"
                          position={[671.988, 63.524, -99.426]}
                          rotation={[0, Math.PI / 2, 0]}
                          scale={[1589.444, 490.731, 1589.444]}
                        >
                          <group name="Plane020_Wood1_0_1914">
                            <mesh
                              name="Object_2941"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2941.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane017_1915"
                          position={[672.177, 36.641, -99.426]}
                          rotation={[0, Math.PI / 2, 0]}
                          scale={[1589.444, 453.864, 1589.444]}
                        >
                          <group name="Plane017_Wood1_0_1916">
                            <mesh
                              name="Object_2944"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2944.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane018_1917"
                          position={[610.871, 90.39, -203.377]}
                          rotation={[Math.PI, 0, Math.PI]}
                          scale={[1035.54, 453.864, 1589.444]}
                        >
                          <group name="Plane018_Wood1_0_1918">
                            <mesh
                              name="Object_2947"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2947.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane021_1919"
                          position={[610.871, 63.524, -203.939]}
                          rotation={[Math.PI, 0, Math.PI]}
                          scale={[1035.54, 503.121, 1589.444]}
                        >
                          <group name="Plane021_Wood1_0_1920">
                            <mesh
                              name="Object_2950"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2950.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane022_1921"
                          position={[610.871, 36.641, -203.377]}
                          rotation={[Math.PI, 0, Math.PI]}
                          scale={[1035.54, 453.864, 1589.444]}
                        >
                          <group name="Plane022_Wood1_0_1922">
                            <mesh
                              name="Object_2953"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2953.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane023_1923"
                          position={[549.635, 90.39, -99.225]}
                          rotation={[0, -Math.PI / 2, 0]}
                          scale={[1589.444, 453.864, 1589.444]}
                        >
                          <group name="Plane023_Wood1_0_1924">
                            <mesh
                              name="Object_2956"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2956.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane024_1925"
                          position={[549.635, 63.524, -99.225]}
                          rotation={[0, -Math.PI / 2, 0]}
                          scale={[1589.444, 503.121, 1589.444]}
                        >
                          <group name="Plane024_Wood1_0_1926">
                            <mesh
                              name="Object_2959"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2959.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane025_1927"
                          position={[549.635, 36.641, -99.225]}
                          rotation={[0, -Math.PI / 2, 0]}
                          scale={[1589.444, 453.864, 1589.444]}
                        >
                          <group name="Plane025_Wood1_0_1928">
                            <mesh
                              name="Object_2962"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2962.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane026_1929"
                          position={[610.941, 90.39, 4.92]}
                          scale={[1035.54, 453.864, 1589.444]}
                        >
                          <group name="Plane026_Wood1_0_1930">
                            <mesh
                              name="Object_2965"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2965.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane027_1931"
                          position={[610.941, 63.524, 4.92]}
                          scale={[1035.54, 503.121, 1589.444]}
                        >
                          <group name="Plane027_Wood1_0_1932">
                            <mesh
                              name="Object_2968"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2968.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane028_1933"
                          position={[610.941, 36.641, 4.92]}
                          scale={[1035.54, 453.864, 1589.444]}
                        >
                          <group name="Plane028_Wood1_0_1934">
                            <mesh
                              name="Object_2971"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2971.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane029_1935"
                          position={[550.181, 57.69, -202.947]}
                          rotation={[-Math.PI, Math.PI / 2, 0]}
                          scale={[-79.303, 22.645, 79.303]}
                        >
                          <group name="Plane029_Metal_sword001_0_1936">
                            <mesh
                              name="Object_2974"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2974.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane030_1937"
                          position={[550.181, 57.69, 5.155]}
                          rotation={[-Math.PI, Math.PI / 2, 0]}
                          scale={[-79.303, 22.645, 79.303]}
                        >
                          <group name="Plane030_Metal_sword001_0_1938">
                            <mesh
                              name="Object_2977"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2977.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane031_1939"
                          position={[671.812, 57.69, -202.947]}
                          rotation={[-Math.PI, Math.PI / 2, 0]}
                          scale={[-79.303, 22.645, 79.303]}
                        >
                          <group name="Plane031_Metal_sword001_0_1940">
                            <mesh
                              name="Object_2980"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2980.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane032_1941"
                          position={[671.812, 57.69, 5.155]}
                          rotation={[-Math.PI, Math.PI / 2, 0]}
                          scale={[-79.303, 22.645, 79.303]}
                        >
                          <group name="Plane032_Metal_sword001_0_1942">
                            <mesh
                              name="Object_2983"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2983.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane034_1943"
                          position={[549.795, 98.29, -98.896]}
                          rotation={[Math.PI / 2, Math.PI / 2, 0]}
                          scale={[-79.303, 22.645, 66.492]}
                        >
                          <group name="Plane034_Metal_sword001_0_1944">
                            <mesh
                              name="Object_2986"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2986.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane033_1945"
                          position={[671.871, 98.29, -98.896]}
                          rotation={[Math.PI / 2, Math.PI / 2, 0]}
                          scale={[-79.303, 22.645, 66.492]}
                        >
                          <group name="Plane033_Metal_sword001_0_1946">
                            <mesh
                              name="Object_2989"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2989.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane035_1947"
                          position={[549.795, 21.841, -98.896]}
                          rotation={[Math.PI / 2, Math.PI / 2, 0]}
                          scale={[-79.303, 22.645, 66.492]}
                        >
                          <group name="Plane035_Metal_sword001_0_1948">
                            <mesh
                              name="Object_2992"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2992.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane036_1949"
                          position={[671.871, 21.841, -98.896]}
                          rotation={[Math.PI / 2, Math.PI / 2, 0]}
                          scale={[-79.303, 22.645, 66.492]}
                        >
                          <group name="Plane036_Metal_sword001_0_1950">
                            <mesh
                              name="Object_2995"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2995.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane037_1951"
                          position={[610.996, 98.29, -203.15]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[-79.303, 22.645, 66.492]}
                        >
                          <group name="Plane037_Metal_sword001_0_1952">
                            <mesh
                              name="Object_2998"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_2998.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane038_1953"
                          position={[610.996, 98.29, 4.977]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[-79.303, 22.645, 66.492]}
                        >
                          <group name="Plane038_Metal_sword001_0_1954">
                            <mesh
                              name="Object_3001"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3001.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane039_1955"
                          position={[610.996, 21.842, -203.15]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[-79.303, 22.645, 66.492]}
                        >
                          <group name="Plane039_Metal_sword001_0_1956">
                            <mesh
                              name="Object_3004"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3004.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane040_1957"
                          position={[610.996, 21.842, 4.977]}
                          rotation={[0, 0, Math.PI / 2]}
                          scale={[-79.303, 22.645, 66.492]}
                        >
                          <group name="Plane040_Metal_sword001_0_1958">
                            <mesh
                              name="Object_3007"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3007.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube753_1959"
                          position={[610.906, 20.945, -99.231]}
                          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                          scale={[64.112, 64.112, 2.994]}
                        >
                          <group name="Cube753_Wood1_0_1960">
                            <mesh
                              name="Object_3010"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3010.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Axe002_1961"
                          position={[-744.162, 78.172, 371.83]}
                          rotation={[2.948, 0.785, 1.841]}
                          scale={[-50.716, 50.716, 50.716]}
                        >
                          <group name="Axe002_Metal_sword001_0_1962">
                            <mesh
                              name="Object_3013"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3013.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                          <group name="Axe002_Wood1_0_1963">
                            <mesh
                              name="Object_3015"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3015.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Axe004_1964"
                          position={[1462.682, 258.815, -107.088]}
                          rotation={[Math.PI / 2, 0, 3.142]}
                          scale={[-45.738, 45.738, 45.738]}
                        >
                          <group name="Axe004_Wood1_0_1965">
                            <mesh
                              name="Object_3018"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3018.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Axe005_1966"
                          position={[545.083, 251.843, -123.69]}
                          rotation={[0, 0, 0.157]}
                          scale={[-45.738, 45.738, 45.738]}
                        >
                          <group name="Axe005_Wood1_0_1967">
                            <mesh
                              name="Object_3021"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3021.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Axe005_Metal_sword001_0_1968">
                            <mesh
                              name="Object_3023"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3023.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                          <group name="Axe005_Staff_blue_orb_0_1969">
                            <mesh
                              name="Object_3025"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3025.geometry}
                              material={materials.Staff_blue_orb}
                            />
                          </group>
                        </group>
                        <group
                          name="Shield003_1970"
                          position={[681.276, 58.472, -215.124]}
                          rotation={[-1.548, -0.113, 1.77]}
                          scale={55.457}
                        >
                          <group name="Shield003_Shield_outer_ring_0_1971">
                            <mesh
                              name="Object_3028"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3028.geometry}
                              material={materials.Shield_outer_ring}
                            />
                          </group>
                          <group name="Shield003_Shield_center_0_1972">
                            <mesh
                              name="Object_3030"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3030.geometry}
                              material={materials.Shield_center}
                            />
                          </group>
                        </group>
                        <group
                          name="Shield002_1973"
                          position={[612.636, 74.726, -103.403]}
                          rotation={[-1.78, 0, -0.001]}
                          scale={53.054}
                        >
                          <group name="Shield002_Shield_outer_ring_0_1974">
                            <mesh
                              name="Object_3033"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3033.geometry}
                              material={materials.Shield_outer_ring}
                            />
                          </group>
                          <group name="Shield002_Shield_center_0_1975">
                            <mesh
                              name="Object_3035"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3035.geometry}
                              material={materials.Shield_center}
                            />
                          </group>
                        </group>
                        <group
                          name="NurbsPath_1979"
                          position={[1130.475, 279.933, 590.956]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="NurbsPath_Rope_0_1980">
                            <mesh
                              name="Object_3038"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3038.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="NurbsPath001_1981"
                          position={[1113.988, 280.615, 504.781]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={100}
                        >
                          <group name="NurbsPath001_Rope_0_1982">
                            <mesh
                              name="Object_3041"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3041.geometry}
                              material={materials.Rope}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube712_1983"
                          position={[647.067, 87.175, 891.435]}
                          rotation={[-1.459, 0.001, 0.087]}
                          scale={[148.292, 148.292, 188.254]}
                        >
                          <group name="Cube712_Wood1_0_1984">
                            <mesh
                              name="Object_3044"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3044.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Cube712_Wood_inside_tree_0_1985">
                            <mesh
                              name="Object_3046"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3046.geometry}
                              material={materials.Wood_inside_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube026_1986"
                          position={[-140.158, 75.797, 1268.212]}
                          rotation={[-1.5, -0.013, -0.006]}
                          scale={[164.725, 164.725, 209.115]}
                        >
                          <group name="Cube026_Wood1_0_1987">
                            <mesh
                              name="Object_3049"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3049.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube757_1988"
                          position={[-145.241, -106.543, 1269.976]}
                          rotation={[-1.434, 0.589, 1.602]}
                          scale={[0.608, 2.111, 1.089]}
                        >
                          <group name="Cube757_Creature_red_eyes_0_1989">
                            <mesh
                              name="Object_3052"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3052.geometry}
                              material={materials.Creature_red_eyes}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere005_1990"
                          position={[-144.81, -111.631, 1291.033]}
                          rotation={[Math.PI / 2, 0, 0]}
                          scale={[-22.784, 22.784, 16.454]}
                        >
                          <group name="Icosphere005_Creature_black_0_1991">
                            <mesh
                              name="Object_3055"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3055.geometry}
                              material={materials.Creature_black}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube758_1992"
                          position={[-137.966, -107.422, 1270.256]}
                          rotation={[2.013, 0.711, -1.422]}
                          scale={[0.634, 2.2, 1.135]}
                        >
                          <group name="Cube758_Creature_red_eyes_0_1993">
                            <mesh
                              name="Object_3058"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3058.geometry}
                              material={materials.Creature_red_eyes}
                            />
                          </group>
                        </group>
                        <group
                          name="Cone_1994"
                          position={[-131.024, -49.393, 1402.621]}
                          rotation={[Math.PI / 2, 0, 0]}
                          scale={[45.491, 45.491, 12.949]}
                        >
                          <group name="Cone_Mushroom_tree_0_1995">
                            <mesh
                              name="Object_3061"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3061.geometry}
                              material={materials.Mushroom_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="Cone001_1996"
                          position={[-144.506, -30.325, 1402.621]}
                          rotation={[Math.PI / 2, 0, 0]}
                          scale={[35.244, 35.244, 10.032]}
                        >
                          <group name="Cone001_Mushroom_tree_0_1997">
                            <mesh
                              name="Object_3064"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3064.geometry}
                              material={materials.Mushroom_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="Cone002_1998"
                          position={[-129.935, -17.084, 1402.621]}
                          rotation={[Math.PI / 2, 0, 0]}
                          scale={[28.165, 28.165, 8.017]}
                        >
                          <group name="Cone002_Mushroom_tree_0_1999">
                            <mesh
                              name="Object_3067"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3067.geometry}
                              material={materials.Mushroom_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder021_2000"
                          position={[275.235, 472.529, 847.035]}
                          rotation={[Math.PI / 2, 0, Math.PI]}
                          scale={[-42.288, 42.288, 553.396]}
                        >
                          <group name="Cylinder021_Wood1_0_2001">
                            <mesh
                              name="Object_3070"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3070.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder023_2002"
                          position={[264.572, 214.173, 833.41]}
                          rotation={[1.381, 0.097, 2.631]}
                          scale={[-48.087, 50.925, 629.284]}
                        >
                          <group name="Cylinder023_Leaves2_0_2003">
                            <mesh
                              name="Object_3073"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3073.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder022_2004"
                          position={[283.678, 214.173, 855.108]}
                          rotation={[1.44, -0.243, -1.93]}
                          scale={[-49.135, 52.035, 643.003]}
                        >
                          <group name="Cylinder022_Leaves1_0_2005">
                            <mesh
                              name="Object_3076"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3076.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder024_2006"
                          position={[283.117, 214.173, 883.862]}
                          rotation={[1.818, -0.031, 0.06]}
                          scale={[-45.244, 47.915, 592.086]}
                        >
                          <group name="Cylinder024_Leaves2_0_2007">
                            <mesh
                              name="Object_3079"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3079.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder025_2008"
                          position={[292.887, 265.391, 842.524]}
                          rotation={[Math.PI / 2, 0, -2.249]}
                          scale={[-40.867, 43.279, 534.806]}
                        >
                          <group name="Cylinder025_Leaves2_0_2009">
                            <mesh
                              name="Object_3082"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3082.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder026_2010"
                          position={[266.386, 265.391, 865.185]}
                          rotation={[1.471, -0.146, -0.634]}
                          scale={[-42.296, 44.793, 553.507]}
                        >
                          <group name="Cylinder026_Leaves2_0_2011">
                            <mesh
                              name="Object_3085"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3085.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder027_2012"
                          position={[260.375, 247.271, 860.948]}
                          rotation={[Math.PI / 2, 0, 1.908]}
                          scale={[-34.223, 36.242, 447.853]}
                        >
                          <group name="Cylinder027_Leaves2_0_2013">
                            <mesh
                              name="Object_3088"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3088.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder028_2014"
                          position={[276.572, 317.415, 826.512]}
                          rotation={[1.547, 0.013, -3.076]}
                          scale={[-42.18, 44.669, 551.986]}
                        >
                          <group name="Cylinder028_Leaves2_0_2015">
                            <mesh
                              name="Object_3091"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3091.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder029_2016"
                          position={[275.248, 318.264, 862.467]}
                          rotation={[1.372, -0.013, -1.453]}
                          scale={[-40.904, 43.318, 535.286]}
                        >
                          <group name="Cylinder029_Leaves2_0_2017">
                            <mesh
                              name="Object_3094"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3094.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder030_2018"
                          position={[267.828, 318.205, 864.07]}
                          rotation={[1.547, 0.013, 1.082]}
                          scale={[-32.465, 34.381, 424.855]}
                        >
                          <group name="Cylinder030_Leaves2_0_2019">
                            <mesh
                              name="Object_3097"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3097.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder031_2020"
                          position={[297.798, 367.43, 829.369]}
                          rotation={[1.669, 0.024, -1.991]}
                          scale={[-44.63, 47.264, 584.048]}
                        >
                          <group name="Cylinder031_Leaves1_0_2021">
                            <mesh
                              name="Object_3100"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3100.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder032_2022"
                          position={[263.507, 364.991, 845.746]}
                          rotation={[1.61, -0.143, -0.372]}
                          scale={[-43.28, 45.834, 566.377]}
                        >
                          <group name="Cylinder032_Leaves1_0_2023">
                            <mesh
                              name="Object_3103"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3103.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder033_2024"
                          position={[258.343, 365.472, 839.612]}
                          rotation={[1.669, 0.024, 2.167]}
                          scale={[-34.351, 36.378, 449.532]}
                        >
                          <group name="Cylinder033_Leaves2_0_2025">
                            <mesh
                              name="Object_3106"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3106.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder034_2026"
                          position={[303.585, 405.676, 841.043]}
                          rotation={[1.632, 0.081, -1.302]}
                          scale={[-39.881, 42.235, 521.898]}
                        >
                          <group name="Cylinder034_Leaves2_0_2027">
                            <mesh
                              name="Object_3109"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3109.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder035_2028"
                          position={[262.349, 402.949, 830.76]}
                          rotation={[1.692, -0.085, 0.321]}
                          scale={[-45.153, 47.817, 590.886]}
                        >
                          <group name="Cylinder035_Leaves2_0_2029">
                            <mesh
                              name="Object_3112"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3112.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder036_2030"
                          position={[262.261, 403.487, 821.794]}
                          rotation={[1.632, 0.081, 2.855]}
                          scale={[-38.416, 40.683, 502.727]}
                        >
                          <group name="Cylinder036_Leaves2_0_2031">
                            <mesh
                              name="Object_3115"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3115.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder037_2032"
                          position={[287.015, 476.426, 853.817]}
                          rotation={[1.643, 0.184, -0.589]}
                          scale={[-33.438, 35.411, 437.577]}
                        >
                          <group name="Cylinder037_Leaves2_0_2033">
                            <mesh
                              name="Object_3118"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3118.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder038_2034"
                          position={[267.916, 474.081, 822.666]}
                          rotation={[1.717, 0.024, 1.09]}
                          scale={[-41.615, 44.07, 544.584]}
                        >
                          <group name="Cylinder038_Leaves2_0_2035">
                            <mesh
                              name="Object_3121"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3121.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder039_2036"
                          position={[273.264, 474.544, 817.114]}
                          rotation={[1.557, 0.1, -2.648]}
                          scale={[-33.029, 34.979, 432.235]}
                        >
                          <group name="Cylinder039_Leaves2_0_2037">
                            <mesh
                              name="Object_3124"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3124.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder040_2038"
                          position={[294.413, 525.376, 831.255]}
                          rotation={[1.374, 0.049, -0.956]}
                          scale={[-28.877, 30.581, 377.89]}
                        >
                          <group name="Cylinder040_Leaves2_0_2039">
                            <mesh
                              name="Object_3127"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3127.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder041_2040"
                          position={[266.462, 560.604, 827.313]}
                          rotation={[1.714, -0.038, 0.671]}
                          scale={[-36.541, 38.698, 478.192]}
                        >
                          <group name="Cylinder041_Leaves2_0_2041">
                            <mesh
                              name="Object_3130"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3130.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder042_2042"
                          position={[268.737, 538.645, 820.936]}
                          rotation={[1.63, 0.082, 2.876]}
                          scale={[-29.003, 30.714, 379.54]}
                        >
                          <group name="Cylinder042_Leaves2_0_2043">
                            <mesh
                              name="Object_3133"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3133.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder043_2044"
                          position={[258.891, 554.439, 837.519]}
                          rotation={[1.672, 0.004, 1.965]}
                          scale={[-29.003, 30.714, 379.54]}
                        >
                          <group name="Cylinder043_Leaves2_0_2045">
                            <mesh
                              name="Object_3136"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3136.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder044_2046"
                          position={[272.398, 192.612, 854.984]}
                          rotation={[1.28, 0.236, 1.194]}
                          scale={[-47.47, 50.272, 621.216]}
                        >
                          <group name="Cylinder044_Leaves1_0_2047">
                            <mesh
                              name="Object_3139"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3139.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder045_2048"
                          position={[272.248, 637.579, 841.654]}
                          rotation={[1.447, 0.056, 0.089]}
                          scale={[-33.569, 35.55, 439.299]}
                        >
                          <group name="Cylinder045_Leaves1_0_2049">
                            <mesh
                              name="Object_3142"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3142.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder046_2050"
                          position={[275.917, 632.963, 810.048]}
                          rotation={[1.605, -0.023, 1.774]}
                          scale={[-36.541, 38.698, 478.192]}
                        >
                          <group name="Cylinder046_Leaves1_0_2051">
                            <mesh
                              name="Object_3145"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3145.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder047_2052"
                          position={[279.661, 610.299, 810.635]}
                          rotation={[1.433, -0.063, -1.982]}
                          scale={[-29.003, 30.714, 379.54]}
                        >
                          <group name="Cylinder047_Leaves2_0_2053">
                            <mesh
                              name="Object_3148"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3148.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder048_2054"
                          position={[262.677, 628.388, 808.246]}
                          rotation={[1.549, -0.041, 3.067]}
                          scale={[-29.003, 30.714, 379.54]}
                        >
                          <group name="Cylinder048_Leaves2_0_2055">
                            <mesh
                              name="Object_3151"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3151.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder049_2056"
                          position={[260.238, 716.427, 835.077]}
                          rotation={[1.507, 0.024, 0.692]}
                          scale={[-28.95, 30.659, 378.854]}
                        >
                          <group name="Cylinder049_Leaves2_0_2057">
                            <mesh
                              name="Object_3154"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3154.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder050_2058"
                          position={[278.429, 714.779, 814.218]}
                          rotation={[1.682, 0.049, 2.372]}
                          scale={[-31.513, 33.373, 412.396]}
                        >
                          <group name="Cylinder050_Leaves2_0_2059">
                            <mesh
                              name="Object_3157"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3157.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder051_2060"
                          position={[281.746, 695.262, 815.093]}
                          rotation={[1.563, -0.082, -1.378]}
                          scale={[-25.012, 26.488, 327.317]}
                        >
                          <group name="Cylinder051_Leaves1_0_2061">
                            <mesh
                              name="Object_3160"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3160.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder052_2062"
                          position={[270.09, 710.981, 806.194]}
                          rotation={[1.646, 0.002, -2.615]}
                          scale={[-25.012, 26.488, 327.317]}
                        >
                          <group name="Cylinder052_Leaves2_0_2063">
                            <mesh
                              name="Object_3163"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3163.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder053_2064"
                          position={[252.049, 777.896, 831.569]}
                          rotation={[1.504, -0.013, 1.251]}
                          scale={[-25.951, 27.482, 339.6]}
                        >
                          <group name="Cylinder053_Leaves2_0_2065">
                            <mesh
                              name="Object_3166"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3166.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder054_2066"
                          position={[275.804, 776.419, 824.409]}
                          rotation={[1.639, 0.101, 2.933]}
                          scale={[-28.248, 29.915, 369.665]}
                        >
                          <group name="Cylinder054_Leaves2_0_2067">
                            <mesh
                              name="Object_3169"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3169.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder055_2068"
                          position={[277.905, 758.924, 826.655]}
                          rotation={[1.608, -0.073, -0.816]}
                          scale={[-22.42, 23.744, 293.403]}
                        >
                          <group name="Cylinder055_Leaves2_0_2069">
                            <mesh
                              name="Object_3172"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3172.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder056_2070"
                          position={[273.3, 773.014, 814.342]}
                          rotation={[1.634, 0.042, -2.055]}
                          scale={[-22.42, 23.744, 293.403]}
                        >
                          <group name="Cylinder056_Leaves2_0_2071">
                            <mesh
                              name="Object_3175"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3175.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder057_2072"
                          position={[253.681, 825.649, 832.662]}
                          rotation={[1.522, -0.048, 1.836]}
                          scale={[-25.951, 27.482, 339.6]}
                        >
                          <group name="Cylinder057_Leaves1_0_2073">
                            <mesh
                              name="Object_3178"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3178.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder058_2074"
                          position={[257.014, 830.746, 828.062]}
                          rotation={[1.572, 0.122, -2.762]}
                          scale={[-28.248, 29.915, 369.665]}
                        >
                          <group name="Cylinder058_Leaves1_0_2075">
                            <mesh
                              name="Object_3181"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3181.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder059_2076"
                          position={[277.823, 811.098, 828.245]}
                          rotation={[1.642, -0.041, -0.23]}
                          scale={[-22.42, 23.744, 293.403]}
                        >
                          <group name="Cylinder059_Leaves2_0_2077">
                            <mesh
                              name="Object_3184"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3184.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder060_2078"
                          position={[260.491, 827.341, 818.288]}
                          rotation={[1.6, 0.07, -1.469]}
                          scale={[-22.42, 23.744, 293.403]}
                        >
                          <group name="Cylinder060_Leaves2_0_2079">
                            <mesh
                              name="Object_3187"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3187.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder061_2080"
                          position={[264.358, 899.811, 828.448]}
                          rotation={[1.522, -0.048, 1.836]}
                          scale={[-16.956, 17.957, 221.897]}
                        >
                          <group name="Cylinder061_Leaves2_0_2081">
                            <mesh
                              name="Object_3190"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3190.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder062_2082"
                          position={[281.154, 893.393, 825.172]}
                          rotation={[1.572, 0.122, -2.762]}
                          scale={[-23.738, 25.139, 310.643]}
                        >
                          <group name="Cylinder062_Leaves2_0_2083">
                            <mesh
                              name="Object_3193"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3193.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder063_2084"
                          position={[274.432, 871.737, 808.119]}
                          rotation={[1.642, -0.041, -0.23]}
                          scale={[-22.42, 23.744, 293.403]}
                        >
                          <group name="Cylinder063_Leaves1_0_2085">
                            <mesh
                              name="Object_3196"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3196.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder064_2086"
                          position={[261.137, 884.124, 839.152]}
                          rotation={[1.503, -0.034, 0.963]}
                          scale={[-18.704, 19.807, 244.763]}
                        >
                          <group name="Cylinder064_Leaves2_0_2087">
                            <mesh
                              name="Object_3199"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3199.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder065_2088"
                          position={[271.142, 944.127, 836.968]}
                          rotation={[1.522, -0.048, 1.836]}
                          scale={[-9.852, 10.433, 128.924]}
                        >
                          <group name="Cylinder065_Leaves2_0_2089">
                            <mesh
                              name="Object_3202"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3202.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder066_2090"
                          position={[283.32, 961.497, 836.854]}
                          rotation={[1.449, 0.181, -2.738]}
                          scale={[-9.117, 9.655, 119.31]}
                        >
                          <group name="Cylinder066_Leaves2_0_2091">
                            <mesh
                              name="Object_3205"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3205.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder067_2092"
                          position={[276.561, 931.377, 839.934]}
                          rotation={[1.642, -0.041, -0.23]}
                          scale={[-12.526, 13.265, 163.919]}
                        >
                          <group name="Cylinder067_Leaves2_0_2093">
                            <mesh
                              name="Object_3208"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3208.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder068_2094"
                          position={[263.196, 956.717, 847.158]}
                          rotation={[1.503, -0.034, 1.005]}
                          scale={[-5.756, 6.095, 75.321]}
                        >
                          <group name="Cylinder068_Leaves2_0_2095">
                            <mesh
                              name="Object_3211"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3211.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder069_2096"
                          position={[275.078, 982.794, 847.818]}
                          rotation={[1.642, -0.041, -0.23]}
                          scale={[-4.911, 5.201, 64.271]}
                        >
                          <group name="Cylinder069_Leaves2_0_2097">
                            <mesh
                              name="Object_3214"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3214.geometry}
                              material={materials.Leaves2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder015_2098"
                          position={[-574.051, 23.792, 979.832]}
                          rotation={[-1.507, 0, 0]}
                          scale={[99.088, 99.088, 180.456]}
                        >
                          <group name="Cylinder015_Wood1_0_2099">
                            <mesh
                              name="Object_3217"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3217.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder016_2100"
                          position={[-574.051, 343.365, 1000.374]}
                          rotation={[-1.507, 0, -0.632]}
                          scale={221.592}
                        >
                          <group name="Cylinder016_Leaves1_0_2101">
                            <mesh
                              name="Object_3220"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3220.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder017_2102"
                          position={[-574.051, 506.2, 1010.84]}
                          rotation={[-1.529, 0.046, 0.449]}
                          scale={186.666}
                        >
                          <group name="Cylinder017_Leaves1_0_2103">
                            <mesh
                              name="Object_3223"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3223.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder018_2104"
                          position={[-590.029, 644.844, 1011.197]}
                          rotation={[-1.588, -0.072, -0.01]}
                          scale={175.018}
                        >
                          <group name="Cylinder018_Leaves1_0_2105">
                            <mesh
                              name="Object_3226"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3226.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder019_2106"
                          position={[-578.606, 820.778, 1011.259]}
                          rotation={[-1.584, 0.029, -0.544]}
                          scale={[157.017, 157.017, 185.16]}
                        >
                          <group name="Cylinder019_Leaves1_0_2107">
                            <mesh
                              name="Object_3229"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3229.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder020_2108"
                          position={[-567.824, 1026.294, 1024.469]}
                          rotation={[-1.587, 0.042, -0.001]}
                          scale={[142.058, 142.058, 207.828]}
                        >
                          <group name="Cylinder020_Leaves1_0_2109">
                            <mesh
                              name="Object_3232"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3232.geometry}
                              material={materials.Leaves1}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere_2110"
                          position={[876.285, -43.455, 627.516]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={55.553}
                        >
                          <group name="Icosphere_Rocks_0_2111">
                            <mesh
                              name="Object_3235"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3235.geometry}
                              material={materials.Rocks}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere001_2112"
                          position={[369.596, -77.779, 983.442]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={18.884}
                        >
                          <group name="Icosphere001_Rocks_0_2113">
                            <mesh
                              name="Object_3238"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3238.geometry}
                              material={materials.Rocks}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere002_2114"
                          position={[14.747, -92.265, 1030.313]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={53.31}
                        >
                          <group name="Icosphere002_Rocks_0_2115">
                            <mesh
                              name="Object_3241"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3241.geometry}
                              material={materials.Rocks}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere003_2116"
                          position={[-55.076, -98.785, 1076.557]}
                          rotation={[-Math.PI / 2, 0, -1.76]}
                          scale={44.822}
                        >
                          <group name="Icosphere003_Rocks_0_2117">
                            <mesh
                              name="Object_3244"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3244.geometry}
                              material={materials.Rocks}
                            />
                          </group>
                        </group>
                        <group
                          name="Rock4_2118"
                          position={[-451.597, 3.038, -747.836]}
                          rotation={[-Math.PI / 2, 0, -0.63]}
                          scale={10.302}
                        >
                          <group name="Rock4_Rocks_0_2119">
                            <mesh
                              name="Object_3247"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3247.geometry}
                              material={materials.Rocks}
                            />
                          </group>
                        </group>
                        <group
                          name="Rock1_2120"
                          position={[-610.959, 3.583, -759.314]}
                          rotation={[-1.64, -0.023, 1.579]}
                          scale={12.361}
                        >
                          <group name="Rock1_Rocks_0_2121">
                            <mesh
                              name="Object_3250"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3250.geometry}
                              material={materials.Rocks}
                            />
                          </group>
                        </group>
                        <group
                          name="Rock2_2122"
                          position={[-817.018, 4.137, -643.711]}
                          rotation={[-1.6, 0.067, 0.106]}
                          scale={14.048}
                        >
                          <group name="Rock2_Rocks_0_2123">
                            <mesh
                              name="Object_3253"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3253.geometry}
                              material={materials.Rocks}
                            />
                          </group>
                        </group>
                        <group
                          name="Rock3_2124"
                          position={[-836.234, 5.325, -622.592]}
                          rotation={[-1.539, -0.066, -2.997]}
                          scale={20.333}
                        >
                          <group name="Rock3_Rocks_0_2125">
                            <mesh
                              name="Object_3256"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3256.geometry}
                              material={materials.Rocks}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere007_2126"
                          position={[558.074, -137.585, -927.271]}
                          rotation={[-1.848, -0.039, -0.055]}
                          scale={[58.713, 58.713, 37.393]}
                        >
                          <group name="Icosphere007_Base_path_0_2127">
                            <mesh
                              name="Object_3259"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3259.geometry}
                              material={materials.Base_path}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere006_2128"
                          position={[1023.632, -120.031, 351.833]}
                          rotation={[-1.337, 0.178, 0.261]}
                          scale={[76.802, 66.732, 42.489]}
                        >
                          <group name="Icosphere006_Base_path_0_2129">
                            <mesh
                              name="Object_3262"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3262.geometry}
                              material={materials.Base_path}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere008_2130"
                          position={[1249.843, -149.051, -126.72]}
                          rotation={[-1.543, 0.128, 0.269]}
                          scale={[59.545, 51.738, 32.943]}
                        >
                          <group name="Icosphere008_Base_path_0_2131">
                            <mesh
                              name="Object_3265"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3265.geometry}
                              material={materials.Base_path}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere004_2132"
                          position={[151.316, -32.199, -1114.558]}
                          rotation={[-1.657, 0.004, -1.57]}
                          scale={[165.245, 165.245, 105.24]}
                        >
                          <group name="Icosphere004_Rocks001_0_2133">
                            <mesh
                              name="Object_3268"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3268.geometry}
                              material={materials["Rocks.001"]}
                            />
                          </group>
                          <group name="Icosphere004_Grass1_0_2134">
                            <mesh
                              name="Object_3270"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3270.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Icosphere004_Base_grass_0_2135">
                            <mesh
                              name="Object_3272"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3272.geometry}
                              material={materials.Base_grass}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere009_2136"
                          position={[432.697, 12.012, 482.928]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[18.884, 18.884, 7.056]}
                        >
                          <group name="Icosphere009_Base_path_0_2137">
                            <mesh
                              name="Object_3275"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3275.geometry}
                              material={materials.Base_path}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere010_2138"
                          position={[-650.222, 12.012, 27.438]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={[18.884, 18.884, 7.056]}
                        >
                          <group name="Icosphere010_Base_path_0_2139">
                            <mesh
                              name="Object_3278"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3278.geometry}
                              material={materials.Base_path}
                            />
                          </group>
                        </group>
                        <group
                          name="Icosphere011_2140"
                          position={[-666.137, 14.295, -9.652]}
                          rotation={[-Math.PI / 2, 0, -2.257]}
                          scale={[20.378, 20.378, 7.614]}
                        >
                          <group name="Icosphere011_Base_path_0_2141">
                            <mesh
                              name="Object_3281"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3281.geometry}
                              material={materials.Base_path}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube754_2142"
                          position={[627.626, -105.372, 1160.606]}
                          rotation={[-1.517, 0.004, 0.01]}
                          scale={[5.052, 5.052, 17.103]}
                        >
                          <group name="Cube754_Leaf2_0_2143">
                            <mesh
                              name="Object_3284"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3284.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane_2144"
                          position={[646.929, -108.566, 1216.387]}
                          rotation={[-1.517, 0.004, 0.329]}
                          scale={17.046}
                        >
                          <group name="Plane_Leaf1_0_2145">
                            <mesh
                              name="Object_3287"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3287.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane041_2146"
                          position={[567.595, -111.745, 1189.595]}
                          rotation={[-1.517, 0.004, -1.123]}
                          scale={21.631}
                        >
                          <group name="Plane041_Leaf1_0_2147">
                            <mesh
                              name="Object_3290"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3290.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane042_2148"
                          position={[678.382, -109.355, 1136.749]}
                          rotation={[-1.517, 0.004, 2.034]}
                          scale={15.579}
                        >
                          <group name="Plane042_Leaf1_0_2149">
                            <mesh
                              name="Object_3293"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3293.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane043_2150"
                          position={[588.759, -108.012, 1118.466]}
                          rotation={[-1.517, 0.004, -2.341]}
                          scale={21.631}
                        >
                          <group name="Plane043_Leaf2_0_2151">
                            <mesh
                              name="Object_3296"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3296.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane044_2152"
                          position={[590.789, -93.842, 1204.701]}
                          rotation={[-1.635, 0.154, -0.673]}
                          scale={18.329}
                        >
                          <group name="Plane044_Leaf2_0_2153">
                            <mesh
                              name="Object_3299"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3299.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane045_2154"
                          position={[576.149, -90.785, 1148.837]}
                          rotation={[-1.437, 0.247, -1.882]}
                          scale={17.303}
                        >
                          <group name="Plane045_Leaf1_0_2155">
                            <mesh
                              name="Object_3302"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3302.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane046_2156"
                          position={[645.443, -89.478, 1119.298]}
                          rotation={[-1.215, -0.052, 2.748]}
                          scale={15.539}
                        >
                          <group name="Plane046_Leaf1_0_2157">
                            <mesh
                              name="Object_3305"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3305.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane047_2158"
                          position={[673.375, -93.024, 1183.246]}
                          rotation={[-1.605, -0.193, 1.16]}
                          scale={15.539}
                        >
                          <group name="Plane047_Leaf2_0_2159">
                            <mesh
                              name="Object_3308"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3308.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane048_2160"
                          position={[632.917, -85.613, 1200.226]}
                          rotation={[-1.764, -0.016, 0.12]}
                          scale={11.645}
                        >
                          <group name="Plane048_Leaf1_0_2161">
                            <mesh
                              name="Object_3311"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3311.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane049_2162"
                          position={[595.588, -82.938, 1180.066]}
                          rotation={[-1.68, 0.274, -1.049]}
                          scale={10.619}
                        >
                          <group name="Plane049_Leaf1_0_2163">
                            <mesh
                              name="Object_3314"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3314.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane050_2164"
                          position={[615.283, -78.714, 1128.496]}
                          rotation={[-1.121, 0.236, -2.791]}
                          scale={11.605}
                        >
                          <group name="Plane050_Leaf2_0_2165">
                            <mesh
                              name="Object_3317"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3317.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane051_2166"
                          position={[660.897, -81.309, 1148.336]}
                          rotation={[-1.366, -0.322, 2.001]}
                          scale={11.333}
                        >
                          <group name="Plane051_Leaf1_0_2167">
                            <mesh
                              name="Object_3320"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3320.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane052_2168"
                          position={[650.794, -71.462, 1146.601]}
                          rotation={[-1.514, -0.757, 1.989]}
                          scale={10.377}
                        >
                          <group name="Plane052_Leaf1_0_2169">
                            <mesh
                              name="Object_3323"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3323.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane053_2170"
                          position={[612.227, -68.345, 1174.738]}
                          rotation={[-1.992, 0.754, -0.79]}
                          scale={10.619}
                        >
                          <group name="Plane053_Leaf1_0_2171">
                            <mesh
                              name="Object_3326"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3326.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube760_2172"
                          position={[-83.094, -7.779, -951.13]}
                          rotation={[-1.619, 0.034, 0]}
                          scale={[5.052, 5.052, 17.103]}
                        >
                          <group name="Cube760_Leaf2_0_2173">
                            <mesh
                              name="Object_3329"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3329.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane084_2174"
                          position={[-64.394, -5.838, -895.087]}
                          rotation={[-1.619, 0.034, 0.319]}
                          scale={17.046}
                        >
                          <group name="Plane084_Leaf1_0_2175">
                            <mesh
                              name="Object_3332"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3332.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane088_2176"
                          position={[-143.547, -9.395, -922.361]}
                          rotation={[-1.619, 0.034, -1.134]}
                          scale={21.631}
                        >
                          <group name="Plane088_Leaf1_0_2177">
                            <mesh
                              name="Object_3335"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3335.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane094_2178"
                          position={[-32.274, -15.663, -973.852]}
                          rotation={[-1.619, 0.034, 2.024]}
                          scale={15.579}
                        >
                          <group name="Plane094_Leaf1_0_2179">
                            <mesh
                              name="Object_3338"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3338.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane104_2180"
                          position={[-121.649, -13.554, -993.244]}
                          rotation={[-1.619, 0.034, -2.352]}
                          scale={21.631}
                        >
                          <group name="Plane104_Leaf2_0_2181">
                            <mesh
                              name="Object_3341"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3341.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane106_2182"
                          position={[-119.953, 9.264, -908.877]}
                          rotation={[-1.736, 0.185, -0.68]}
                          scale={18.329}
                        >
                          <group name="Plane106_Leaf2_0_2183">
                            <mesh
                              name="Object_3344"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3344.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane145_2184"
                          position={[-133.997, 7.042, -964.934]}
                          rotation={[-1.535, 0.276, -1.896]}
                          scale={17.303}
                        >
                          <group name="Plane145_Leaf1_0_2185">
                            <mesh
                              name="Object_3347"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3347.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane146_2186"
                          position={[-64.436, 3.292, -993.623]}
                          rotation={[-1.318, -0.027, 2.729]}
                          scale={15.539}
                        >
                          <group name="Plane146_Leaf1_0_2187">
                            <mesh
                              name="Object_3350"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3350.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane147_2188"
                          position={[-37.193, 5.462, -929.317]}
                          rotation={[-1.708, -0.162, 1.152]}
                          scale={15.539}
                        >
                          <group name="Plane147_Leaf2_0_2189">
                            <mesh
                              name="Object_3353"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3353.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane148_2190"
                          position={[-77.556, 15.751, -913.662]}
                          rotation={[-1.865, 0.016, 0.117]}
                          scale={11.645}
                        >
                          <group name="Plane148_Leaf1_0_2191">
                            <mesh
                              name="Object_3356"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3356.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane149_2192"
                          position={[-114.606, 17.455, -934.433]}
                          rotation={[-1.78, 0.306, -1.055]}
                          scale={10.619}
                        >
                          <group name="Plane149_Leaf1_0_2193">
                            <mesh
                              name="Object_3359"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3359.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane150_2194"
                          position={[-94.334, 15.82, -985.927]}
                          rotation={[-1.218, 0.259, -2.813]}
                          scale={11.605}
                        >
                          <group name="Plane150_Leaf2_0_2195">
                            <mesh
                              name="Object_3362"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3362.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane151_2196"
                          position={[-48.998, 13.92, -965.383]}
                          rotation={[-1.472, -0.294, 1.986]}
                          scale={11.333}
                        >
                          <group name="Plane151_Leaf1_0_2197">
                            <mesh
                              name="Object_3365"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3365.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane152_2198"
                          position={[-58.781, 23.832, -968.231]}
                          rotation={[-1.625, -0.727, 1.975]}
                          scale={10.377}
                        >
                          <group name="Plane152_Leaf1_0_2199">
                            <mesh
                              name="Object_3368"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3368.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane153_2200"
                          position={[-97.483, 30.934, -941.017]}
                          rotation={[-2.098, 0.785, -0.784]}
                          scale={10.619}
                        >
                          <group name="Plane153_Leaf1_0_2201">
                            <mesh
                              name="Object_3371"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3371.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube759_2202"
                          position={[-1362.124, -88.333, 365.906]}
                          rotation={[-1.515, -0.179, 1.871]}
                          scale={[7.857, 7.857, 26.6]}
                        >
                          <group name="Cube759_Leaf2_0_2203">
                            <mesh
                              name="Object_3374"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3374.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane068_2204"
                          position={[-1288.624, -72.247, 313.072]}
                          rotation={[-1.515, -0.179, 2.191]}
                          scale={26.511}
                        >
                          <group name="Plane068_Leaf1_0_2205">
                            <mesh
                              name="Object_3377"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3377.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane069_2206"
                          position={[-1291.476, -87.794, 442.436]}
                          rotation={[-1.515, -0.179, 0.738]}
                          scale={33.643}
                        >
                          <group name="Plane069_Leaf1_0_2207">
                            <mesh
                              name="Object_3380"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3380.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane070_2208"
                          position={[-1417.596, -102.697, 299.853]}
                          rotation={[-1.515, -0.179, -2.388]}
                          scale={24.229}
                        >
                          <group name="Plane070_Leaf1_0_2209">
                            <mesh
                              name="Object_3383"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3383.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane071_2210"
                          position={[-1405.193, -108.359, 441.474]}
                          rotation={[-1.515, -0.179, -0.48]}
                          scale={33.643}
                        >
                          <group name="Plane071_Leaf2_0_2211">
                            <mesh
                              name="Object_3386"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3386.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane072_2212"
                          position={[-1286.1, -54.914, 403.469]}
                          rotation={[-1.632, -0.333, 1.149]}
                          scale={28.507}
                        >
                          <group name="Plane072_Leaf2_0_2213">
                            <mesh
                              name="Object_3389"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3389.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane073_2214"
                          position={[-1361.722, -71.189, 449.367]}
                          rotation={[-1.774, -0.167, -0.056]}
                          scale={26.91}
                        >
                          <group name="Plane073_Leaf1_0_2215">
                            <mesh
                              name="Object_3392"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3392.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane074_2216"
                          position={[-1435.443, -79.489, 358.672]}
                          rotation={[-1.546, 0.127, -1.682]}
                          scale={24.168}
                        >
                          <group name="Plane074_Leaf1_0_2217">
                            <mesh
                              name="Object_3395"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3395.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane075_2218"
                          position={[-1353.773, -60.815, 289.457]}
                          rotation={[-1.297, -0.201, 3.071]}
                          scale={24.168}
                        >
                          <group name="Plane075_Leaf2_0_2219">
                            <mesh
                              name="Object_3398"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3398.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane076_2220"
                          position={[-1314.006, -43.724, 343.458]}
                          rotation={[-1.418, -0.408, 2.011]}
                          scale={18.111}
                        >
                          <group name="Plane076_Leaf1_0_2221">
                            <mesh
                              name="Object_3401"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3401.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane077_2222"
                          position={[-1327.771, -47.546, 408.01]}
                          rotation={[-1.747, -0.402, 0.722]}
                          scale={16.515}
                        >
                          <group name="Plane077_Leaf1_0_2223">
                            <mesh
                              name="Object_3404"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3404.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane078_2224"
                          position={[-1412.665, -60.12, 400.993]}
                          rotation={[-1.852, 0.129, -0.89]}
                          scale={18.049}
                        >
                          <group name="Plane078_Leaf2_0_2225">
                            <mesh
                              name="Object_3407"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3407.geometry}
                              material={materials.Leaf2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane079_2226"
                          position={[-1403.032, -56.212, 324.226]}
                          rotation={[-1.245, 0.059, -2.429]}
                          scale={17.626}
                        >
                          <group name="Plane079_Leaf1_0_2227">
                            <mesh
                              name="Object_3410"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3410.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane080_2228"
                          position={[-1404.59, -42.088, 341.161]}
                          rotation={[-0.792, 0.068, -2.392]}
                          scale={16.14}
                        >
                          <group name="Plane080_Leaf1_0_2229">
                            <mesh
                              name="Object_3413"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3413.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane081_2230"
                          position={[-1347.962, -27.317, 387.114]}
                          rotation={[-2.308, -0.671, 0.527]}
                          scale={16.515}
                        >
                          <group name="Plane081_Leaf1_0_2231">
                            <mesh
                              name="Object_3416"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3416.geometry}
                              material={materials.Leaf1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder070_2232"
                          position={[125.378, -8.045, -1269.129]}
                          rotation={[-2.713, 0.001, -3.085]}
                          scale={[100, 100, 13.086]}
                        >
                          <group name="Cylinder070_Metal_sword001_0_2233">
                            <mesh
                              name="Object_3419"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3419.geometry}
                              material={materials["Metal_sword.001"]}
                            />
                          </group>
                          <group name="Cylinder070_Wood1_0_2234">
                            <mesh
                              name="Object_3421"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3421.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="Cube002_2235"
                          position={[1150.144, 257.509, 719.546]}
                          rotation={[2.894, 1.372, -1.375]}
                          scale={90.775}
                        >
                          <group name="Cube002_Wood1_0_2236">
                            <mesh
                              name="Object_3424"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3424.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                        </group>
                        <group
                          name="mug_2237"
                          position={[1112.255, 219.034, 553.217]}
                          rotation={[0, -1.371, 0]}
                          scale={140.786}
                        >
                          <group name="mug_Wood1_0_2238">
                            <mesh
                              name="Object_3427"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3427.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="mug_Black_sign_0_2239">
                            <mesh
                              name="Object_3429"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3429.geometry}
                              material={materials.Black_sign}
                            />
                          </group>
                        </group>
                        <group
                          name="mug001_2240"
                          position={[1033.679, 211.532, 554.935]}
                          rotation={[0, -1.371, 0]}
                          scale={140.786}
                        >
                          <group name="mug001_Black_sign_0_2241">
                            <mesh
                              name="Object_3432"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3432.geometry}
                              material={materials.Black_sign}
                            />
                          </group>
                          <group name="mug001_Material_0_2242">
                            <mesh
                              name="Object_3434"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3434.geometry}
                              material={materials.Material}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane082_2243"
                          position={[328.544, 152.178, -1210.619]}
                          rotation={[-2.649, 1.554, 1.18]}
                          scale={[30.76, 120.815, 104.551]}
                        >
                          <group name="Plane082_Wood1_0_2244">
                            <mesh
                              name="Object_3437"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3437.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Plane082_Untitled_drawing_0_2245">
                            <mesh
                              name="Object_3439"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3439.geometry}
                              material={materials.Untitled_drawing}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane087_2246"
                          position={[1111.651, -77.902, -97.421]}
                          rotation={[0.012, 0.808, -0.066]}
                          scale={[8.715, 5.034, 8.715]}
                        >
                          <group name="Plane087_Grass2_0_2247">
                            <mesh
                              name="Object_3442"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3442.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane087_Grass1_0_2248">
                            <mesh
                              name="Object_3444"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3444.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane083_2249"
                          position={[159.95, -23.604, -1063.695]}
                          rotation={[0, Math.PI / 2, 0]}
                          scale={[1.88, 1.186, 1.88]}
                        >
                          <group name="Plane083_Grass2_0_2250">
                            <mesh
                              name="Object_3447"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3447.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane083_Grass1_0_2251">
                            <mesh
                              name="Object_3449"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3449.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane085_2252"
                          position={[125.079, -23.604, -1168.978]}
                          rotation={[0, 0.586, 0]}
                          scale={[1.694, 1.068, 1.694]}
                        >
                          <group name="Plane085_Grass2_0_2253">
                            <mesh
                              name="Object_3452"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3452.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane085_Grass1_0_2254">
                            <mesh
                              name="Object_3454"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3454.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane090_2255"
                          position={[117.863, -97.919, 1149.044]}
                          rotation={[-0.005, 0.346, 0.041]}
                          scale={[8.715, 7.766, 8.715]}
                        >
                          <group name="Plane090_Grass2_0_2256">
                            <mesh
                              name="Object_3457"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3457.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane090_Grass1_0_2257">
                            <mesh
                              name="Object_3459"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3459.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane091_2258"
                          position={[1066.831, -84.075, -483.388]}
                          rotation={[-0.043, 0.987, -0.185]}
                          scale={[8.715, 5.786, 8.715]}
                        >
                          <group name="Plane091_Grass1_0_2259">
                            <mesh
                              name="Object_3462"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3462.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane091_Grass2_0_2260">
                            <mesh
                              name="Object_3464"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3464.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane093_2261"
                          position={[-423.464, -37.833, -1120.303]}
                          rotation={[0.063, -0.514, 0.171]}
                          scale={[8.715, 8.358, 8.715]}
                        >
                          <group name="Plane093_Grass2_0_2262">
                            <mesh
                              name="Object_3467"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3467.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane093_Grass1_0_2263">
                            <mesh
                              name="Object_3469"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3469.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane096_2264"
                          position={[-266.79, -154.993, -1075.507]}
                          rotation={[Math.PI, 1.541, -Math.PI]}
                          scale={[8.715, 4.646, 8.715]}
                        >
                          <group name="Plane096_Grass2_0_2265">
                            <mesh
                              name="Object_3472"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3472.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane096_Grass1_0_2266">
                            <mesh
                              name="Object_3474"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3474.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane097_2267"
                          position={[-1261.101, -98.589, -483.012]}
                          rotation={[-0.18, -0.083, 0.147]}
                          scale={[8.715, 5.997, 8.715]}
                        >
                          <group name="Plane097_Grass1_0_2268">
                            <mesh
                              name="Object_3477"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3477.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane097_Grass2_0_2269">
                            <mesh
                              name="Object_3479"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3479.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane098_2270"
                          position={[-1350.692, -100.326, -10.284]}
                          rotation={[-2.776, 0.456, 2.638]}
                          scale={[8.715, 2.627, 8.715]}
                        >
                          <group name="Plane098_Grass1_0_2271">
                            <mesh
                              name="Object_3482"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3482.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane098_Grass2_0_2272">
                            <mesh
                              name="Object_3484"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3484.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane099_2273"
                          position={[344.083, -154.993, -848.352]}
                          rotation={[0, -1.134, 0]}
                          scale={[8.715, 5.659, 8.715]}
                        >
                          <group name="Plane099_Grass2_0_2274">
                            <mesh
                              name="Object_3487"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3487.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane099_Grass1_0_2275">
                            <mesh
                              name="Object_3489"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3489.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane100_2276"
                          position={[-706.38, -116.118, -1211.518]}
                          rotation={[-0.23, -1.383, 0.209]}
                          scale={[8.715, 5.027, 8.715]}
                        >
                          <group name="Plane100_Grass1_0_2277">
                            <mesh
                              name="Object_3492"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3492.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane100_Grass2_0_2278">
                            <mesh
                              name="Object_3494"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3494.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane101_2279"
                          position={[-194.214, -154.993, -1018.427]}
                          rotation={[Math.PI, -0.421, Math.PI]}
                          scale={[8.715, 2.634, 8.715]}
                        >
                          <group name="Plane101_Grass1_0_2280">
                            <mesh
                              name="Object_3497"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3497.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane101_Grass2_0_2281">
                            <mesh
                              name="Object_3499"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3499.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane102_2282"
                          position={[-121.839, -73.012, -1232.092]}
                          rotation={[0, -0.185, 0]}
                          scale={[8.715, 7.264, 8.715]}
                        >
                          <group name="Plane102_Grass2_0_2283">
                            <mesh
                              name="Object_3502"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3502.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane102_Grass1_0_2284">
                            <mesh
                              name="Object_3504"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3504.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane103_2285"
                          position={[603.318, -154.993, -771.117]}
                          rotation={[Math.PI, 0.748, -Math.PI]}
                          scale={[8.715, 4.301, 8.715]}
                        >
                          <group name="Plane103_Grass1_0_2286">
                            <mesh
                              name="Object_3507"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3507.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane103_Grass2_0_2287">
                            <mesh
                              name="Object_3509"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3509.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane105_2288"
                          position={[-1294.044, -80.387, -309.705]}
                          rotation={[-3.073, 0.793, -2.98]}
                          scale={[5.25, 5.004, 5.25]}
                        >
                          <group name="Plane105_Grass1_0_2289">
                            <mesh
                              name="Object_3512"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3512.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane105_Grass2_0_2290">
                            <mesh
                              name="Object_3514"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3514.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane107_2291"
                          position={[61.895, -154.993, -870.724]}
                          rotation={[0, -1.457, 0]}
                          scale={[8.715, 4.474, 8.715]}
                        >
                          <group name="Plane107_Grass1_0_2292">
                            <mesh
                              name="Object_3517"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3517.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane107_Grass2_0_2293">
                            <mesh
                              name="Object_3519"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3519.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane108_2294"
                          position={[886.735, -82.306, -696.584]}
                          rotation={[Math.PI, -1.145, Math.PI]}
                          scale={[8.715, 7.766, 8.715]}
                        >
                          <group name="Plane108_Grass2_0_2295">
                            <mesh
                              name="Object_3522"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3522.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane108_Grass1_0_2296">
                            <mesh
                              name="Object_3524"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3524.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane109_2297"
                          position={[-567.34, -154.993, -1013.48]}
                          rotation={[0, -0.505, 0]}
                          scale={[8.715, 3.792, 8.715]}
                        >
                          <group name="Plane109_Grass1_0_2298">
                            <mesh
                              name="Object_3527"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3527.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane109_Grass2_0_2299">
                            <mesh
                              name="Object_3529"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3529.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane110_2300"
                          position={[-320.631, -114.346, -1326.262]}
                          rotation={[Math.PI, -0.521, Math.PI]}
                          scale={[8.715, 8.193, 8.715]}
                        >
                          <group name="Plane110_Grass1_0_2301">
                            <mesh
                              name="Object_3532"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3532.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane110_Grass2_0_2302">
                            <mesh
                              name="Object_3534"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3534.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane111_2303"
                          position={[46.597, -111.521, -1356.89]}
                          rotation={[Math.PI, -0.73, Math.PI]}
                          scale={[8.715, 7.446, 8.715]}
                        >
                          <group name="Plane111_Grass1_0_2304">
                            <mesh
                              name="Object_3537"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3537.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane111_Grass2_0_2305">
                            <mesh
                              name="Object_3539"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3539.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane112_2306"
                          position={[-951.862, -109.382, -923.538]}
                          rotation={[0, -1.057, 0]}
                          scale={[8.715, 7.816, 8.715]}
                        >
                          <group name="Plane112_Grass1_0_2307">
                            <mesh
                              name="Object_3542"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3542.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane112_Grass2_0_2308">
                            <mesh
                              name="Object_3544"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3544.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane113_2309"
                          position={[-79.409, -154.993, -1213.52]}
                          rotation={[0, -1.493, 0]}
                          scale={[8.715, 3.072, 8.715]}
                        >
                          <group name="Plane113_Grass1_0_2310">
                            <mesh
                              name="Object_3547"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3547.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane113_Grass2_0_2311">
                            <mesh
                              name="Object_3549"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3549.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane114_2312"
                          position={[1118.728, -72.115, -310.204]}
                          rotation={[0, -0.845, 0]}
                          scale={[8.715, 3.961, 8.715]}
                        >
                          <group name="Plane114_Grass1_0_2313">
                            <mesh
                              name="Object_3552"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3552.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane114_Grass2_0_2314">
                            <mesh
                              name="Object_3554"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3554.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane120_2315"
                          position={[-47.881, -32.712, 795.157]}
                          rotation={[0, 0.335, 0]}
                          scale={[8.715, 7.766, 8.715]}
                        >
                          <group name="Plane120_Grass2_0_2316">
                            <mesh
                              name="Object_3557"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3557.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane120_Grass1_0_2317">
                            <mesh
                              name="Object_3559"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3559.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane125_2318"
                          position={[-925.289, -108.369, 903.551]}
                          rotation={[Math.PI, 0.06, -Math.PI]}
                          scale={[8.715, 5.607, 8.715]}
                        >
                          <group name="Plane125_Grass1_0_2319">
                            <mesh
                              name="Object_3562"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3562.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane125_Grass2_0_2320">
                            <mesh
                              name="Object_3564"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3564.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane126_2321"
                          position={[-1050.717, -95.8, 698.407]}
                          rotation={[1.512, 1.539, -1.393]}
                          scale={[8.715, 4.646, 8.715]}
                        >
                          <group name="Plane126_Grass2_0_2322">
                            <mesh
                              name="Object_3567"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3567.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane126_Grass1_0_2323">
                            <mesh
                              name="Object_3569"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3569.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane127_2324"
                          position={[-401.021, -107.825, 1264.026]}
                          rotation={[0, -0.128, 0]}
                          scale={[8.715, 5.997, 8.715]}
                        >
                          <group name="Plane127_Grass1_0_2325">
                            <mesh
                              name="Object_3572"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3572.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane127_Grass2_0_2326">
                            <mesh
                              name="Object_3574"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3574.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane128_2327"
                          position={[938.374, -108.294, 943.867]}
                          rotation={[Math.PI, 0.483, -Math.PI]}
                          scale={[8.715, 2.627, 8.715]}
                        >
                          <group name="Plane128_Grass1_0_2328">
                            <mesh
                              name="Object_3577"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3577.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane128_Grass2_0_2329">
                            <mesh
                              name="Object_3579"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3579.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane130_2330"
                          position={[-1306.022, -84.268, -103.894]}
                          rotation={[0, -1.422, 0]}
                          scale={[8.715, 5.027, 8.715]}
                        >
                          <group name="Plane130_Grass1_0_2331">
                            <mesh
                              name="Object_3582"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3582.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane130_Grass2_0_2332">
                            <mesh
                              name="Object_3584"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3584.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane133_2333"
                          position={[974.211, -84.615, 457.595]}
                          rotation={[-3.071, 0.654, -2.971]}
                          scale={[8.715, 4.301, 8.715]}
                        >
                          <group name="Plane133_Grass1_0_2334">
                            <mesh
                              name="Object_3587"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3587.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane133_Grass2_0_2335">
                            <mesh
                              name="Object_3589"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3589.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane138_2336"
                          position={[-772.826, -65.378, 758.056]}
                          rotation={[-2.984, -1.114, -3.101]}
                          scale={[8.715, 7.766, 8.715]}
                        >
                          <group name="Plane138_Grass2_0_2337">
                            <mesh
                              name="Object_3592"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3592.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                          <group name="Plane138_Grass1_0_2338">
                            <mesh
                              name="Object_3594"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3594.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane140_2339"
                          position={[-1359.894, -98.582, 162.147]}
                          rotation={[3.048, -0.642, 2.826]}
                          scale={[8.715, 8.193, 8.715]}
                        >
                          <group name="Plane140_Grass1_0_2340">
                            <mesh
                              name="Object_3597"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3597.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane140_Grass2_0_2341">
                            <mesh
                              name="Object_3599"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3599.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane143_2342"
                          position={[-1235.297, -102.622, 552.644]}
                          rotation={[0, -1.493, 0]}
                          scale={[8.715, 3.072, 8.715]}
                        >
                          <group name="Plane143_Grass1_0_2343">
                            <mesh
                              name="Object_3602"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3602.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane143_Grass2_0_2344">
                            <mesh
                              name="Object_3604"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3604.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane144_2345"
                          position={[109.743, -116.733, 1340.211]}
                          rotation={[0, -0.845, 0]}
                          scale={[8.715, 3.961, 8.715]}
                        >
                          <group name="Plane144_Grass1_0_2346">
                            <mesh
                              name="Object_3607"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3607.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane144_Grass2_0_2347">
                            <mesh
                              name="Object_3609"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3609.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane154_2348"
                          position={[157.148, 46.957, -1044.557]}
                          rotation={[-3.082, -0.805, 3.025]}
                          scale={[3.651, 3.119, 3.651]}
                        >
                          <group name="Plane154_Grass1_0_2349">
                            <mesh
                              name="Object_3612"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3612.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane154_Grass2_0_2350">
                            <mesh
                              name="Object_3614"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3614.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane155_2351"
                          position={[-1018.397, 4.636, -369.757]}
                          rotation={[-0.05, 0.248, 0.223]}
                          scale={[5.25, 5.004, 5.25]}
                        >
                          <group name="Plane155_Grass1_0_2352">
                            <mesh
                              name="Object_3617"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3617.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane155_Grass2_0_2353">
                            <mesh
                              name="Object_3619"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3619.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane156_2354"
                          position={[280.658, -112.499, 1270.548]}
                          rotation={[Math.PI, 0.483, -Math.PI]}
                          scale={[8.715, 2.627, 8.715]}
                        >
                          <group name="Plane156_Grass1_0_2355">
                            <mesh
                              name="Object_3622"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3622.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane156_Grass2_0_2356">
                            <mesh
                              name="Object_3624"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3624.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane157_2357"
                          position={[-318.256, -108.294, 811.017]}
                          rotation={[Math.PI, 0.483, -Math.PI]}
                          scale={[8.715, 2.627, 8.715]}
                        >
                          <group name="Plane157_Grass1_0_2358">
                            <mesh
                              name="Object_3627"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3627.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane157_Grass2_0_2359">
                            <mesh
                              name="Object_3629"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3629.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Plane158_2360"
                          position={[-830.055, -108.961, 1155.121]}
                          rotation={[Math.PI, 0.483, -Math.PI]}
                          scale={[8.715, 2.627, 8.715]}
                        >
                          <group name="Plane158_Grass1_0_2361">
                            <mesh
                              name="Object_3632"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3632.geometry}
                              material={materials.Grass1}
                            />
                          </group>
                          <group name="Plane158_Grass2_0_2362">
                            <mesh
                              name="Object_3634"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3634.geometry}
                              material={materials.Grass2}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder078_2363"
                          position={[-433.836, 57.118, 264.52]}
                          rotation={[-1.178, Math.PI / 2, 0]}
                          scale={[38.297, 38.297, 70.45]}
                        >
                          <group name="Cylinder078_Wood1_0_2364">
                            <mesh
                              name="Object_3637"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3637.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Cylinder078_Wood_inside_tree_0_2365">
                            <mesh
                              name="Object_3639"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3639.geometry}
                              material={materials.Wood_inside_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder079_2366"
                          position={[-467.68, 57.118, 192.29]}
                          rotation={[-1.178, Math.PI / 2, 0]}
                          scale={[38.297, 38.297, 70.45]}
                        >
                          <group name="Cylinder079_Wood1_0_2367">
                            <mesh
                              name="Object_3642"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3642.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Cylinder079_Wood_inside_tree_0_2368">
                            <mesh
                              name="Object_3644"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3644.geometry}
                              material={materials.Wood_inside_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder080_2369"
                          position={[-444.981, 122.428, 228.341]}
                          rotation={[-Math.PI / 4, Math.PI / 2, 0]}
                          scale={[38.297, 38.297, 49.301]}
                        >
                          <group name="Cylinder080_Wood1_0_2370">
                            <mesh
                              name="Object_3647"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3647.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Cylinder080_Wood_inside_tree_0_2371">
                            <mesh
                              name="Object_3649"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3649.geometry}
                              material={materials.Wood_inside_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder081_2372"
                          position={[-744.807, 70.795, 378.294]}
                          rotation={[Math.PI / 2, 0, -2.749]}
                          scale={[52.413, 52.413, 96.418]}
                        >
                          <group name="Cylinder081_Wood1_0_2373">
                            <mesh
                              name="Object_3652"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3652.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Cylinder081_Wood_inside_tree_0_2374">
                            <mesh
                              name="Object_3654"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3654.geometry}
                              material={materials.Wood_inside_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="Cylinder071_2375"
                          position={[-444.981, 50.987, 65.217]}
                          rotation={[0, 1.479, -1.178]}
                          scale={[38.297, 38.297, 70.45]}
                        >
                          <group name="Cylinder071_Wood1_0_2376">
                            <mesh
                              name="Object_3657"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3657.geometry}
                              material={materials.Wood1}
                            />
                          </group>
                          <group name="Cylinder071_Wood_inside_tree_0_2377">
                            <mesh
                              name="Object_3659"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3659.geometry}
                              material={materials.Wood_inside_tree}
                            />
                          </group>
                        </group>
                        <group
                          name="flower_small_2378"
                          position={[1175.777, 16.795, -110.062]}
                          rotation={[-1.38, 1.335, 1.233]}
                          scale={34.368}
                        >
                          <group name="flower_small_flower_small_0_2379">
                            <mesh
                              name="Object_3662"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3662.geometry}
                              material={materials.flower_small}
                            />
                          </group>
                        </group>
                        <group
                          name="flower_small001_2380"
                          position={[170.24, 53.766, 1166.47]}
                          rotation={[1.35, -1.421, -1.936]}
                          scale={54.298}
                        >
                          <group name="flower_small001_flower_small_0_2381">
                            <mesh
                              name="Object_3665"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3665.geometry}
                              material={materials.flower_small}
                            />
                          </group>
                        </group>
                        <group
                          name="flower_small002_2382"
                          position={[-991.503, 7.349, -919.932]}
                          rotation={[-Math.PI, -Math.PI / 2, 0]}
                          scale={50.623}
                        >
                          <group name="flower_small002_flower_small_0_2383">
                            <mesh
                              name="Object_3668"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3668.geometry}
                              material={materials.flower_small}
                            />
                          </group>
                        </group>
                        <group
                          name="flower_small003_2384"
                          position={[190.39, -12.026, 1113.554]}
                          rotation={[1.367, -1.387, -2.604]}
                          scale={34.963}
                        >
                          <group name="flower_small003_flower_small_0_2385">
                            <mesh
                              name="Object_3671"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3671.geometry}
                              material={materials.flower_small}
                            />
                          </group>
                        </group>
                        <group
                          name="nails_2386"
                          position={[843.972, 191.12, -574.356]}
                          rotation={[Math.PI / 2, 0, Math.PI]}
                          scale={[5.127, 5.127, 1.209]}
                        >
                          <group name="nails_Metal_sword_0_2387">
                            <mesh
                              name="Object_3674"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3674.geometry}
                              material={materials.Metal_sword}
                            />
                          </group>
                        </group>
                        <group
                          name="nails003_2388"
                          position={[882.08, 216.293, 496.095]}
                          rotation={[0, -0.229, Math.PI / 2]}
                          scale={[5.591, 5.591, 1.318]}
                        >
                          <group name="nails003_Metal_sword_0_2389">
                            <mesh
                              name="Object_3677"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3677.geometry}
                              material={materials.Metal_sword}
                            />
                          </group>
                        </group>
                        <group
                          name="nails002_2390"
                          position={[532.133, 982.41, -23.472]}
                          rotation={[0, -Math.PI / 2, 0]}
                          scale={[6.137, 6.137, 1.447]}
                        >
                          <group name="nails002_Metal_sword_0_2391">
                            <mesh
                              name="Object_3680"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3680.geometry}
                              material={materials.Metal_sword}
                            />
                          </group>
                        </group>
                        <group
                          name="nails001_2392"
                          position={[527.412, 1011.494, 9.269]}
                          rotation={[2.253, -1.289, 2.082]}
                          scale={[5.127, 5.127, 1.209]}
                        >
                          <group name="nails001_Metal_sword_0_2393">
                            <mesh
                              name="Object_3683"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3683.geometry}
                              material={materials.Metal_sword}
                            />
                          </group>
                        </group>
                        <group
                          name="Fireflies_2394"
                          position={[-213.266, 283.376, 961.155]}
                          rotation={[-Math.PI / 2, 0, 0]}
                          scale={2.804}
                        >
                          <group name="0_2395">
                            <mesh
                              name="mesh_1290"
                              castShadow
                              receiveShadow
                              geometry={nodes.mesh_1290.geometry}
                              material={materials.Firefly_red}
                              morphTargetDictionary={
                                nodes.mesh_1290.morphTargetDictionary
                              }
                              morphTargetInfluences={
                                nodes.mesh_1290.morphTargetInfluences
                              }
                            />
                          </group>
                          <group name="1_2396">
                            <mesh
                              name="mesh_1291"
                              castShadow
                              receiveShadow
                              geometry={nodes.mesh_1291.geometry}
                              material={materials.Firefly_yellow}
                              morphTargetDictionary={
                                nodes.mesh_1291.morphTargetDictionary
                              }
                              morphTargetInfluences={
                                nodes.mesh_1291.morphTargetInfluences
                              }
                            />
                          </group>
                        </group>
                        <group
                          name="Base_2397"
                          position={[0, 31.57, 0]}
                          rotation={[-1.577, 0.005, -0.004]}
                          scale={[1464.545, 1464.545, 642.986]}
                        >
                          <group name="Base_Base_grass_0_2398">
                            <mesh
                              name="Object_3691"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3691.geometry}
                              material={materials.Base_grass}
                            />
                          </group>
                          <group name="Base_Base_dirt_0_2399">
                            <mesh
                              name="Object_3693"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3693.geometry}
                              material={materials.Base_dirt}
                            />
                          </group>
                          <group name="Base_Base_path_0_2400">
                            <mesh
                              name="Object_3695"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3695.geometry}
                              material={materials.Base_path}
                            />
                          </group>
                          <group name="Base_Creature_black_0_2401">
                            <mesh
                              name="Object_3697"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3697.geometry}
                              material={materials.Creature_black}
                            />
                          </group>
                        </group>
                        <group
                          name="Roof_tile_fallen_2402"
                          position={[-538.568, 22.706, -121.976]}
                          rotation={[3.041, 0.212, 2.754]}
                          scale={[49.282, 33.348, 33.348]}
                        >
                          <group name="Roof_tile_fallen_Roof_tiles3_0_2403">
                            <mesh
                              name="Object_3700"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3700.geometry}
                              material={materials.Roof_tiles3}
                            />
                          </group>
                        </group>
                        <group
                          name="Flags001_2404"
                          position={[687.951, 580.111, -302.268]}
                          rotation={[-0.204, 1.152, -0.714]}
                          scale={[513.441, 3.347, 92.668]}
                        >
                          <group name="Flags001_Black_sign_0_2405">
                            <mesh
                              name="Object_3703"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3703.geometry}
                              material={materials.Black_sign}
                            />
                          </group>
                          <group name="Flags001_Flag_red_0_2406">
                            <mesh
                              name="Object_3705"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3705.geometry}
                              material={materials.Flag_red}
                            />
                          </group>
                          <group name="Flags001_Flag_blue_0_2407">
                            <mesh
                              name="Object_3707"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3707.geometry}
                              material={materials.Flag_blue}
                            />
                          </group>
                        </group>
                        <group
                          name="Flags002_2408"
                          position={[703.559, 614.299, 258.875]}
                          rotation={[-0.115, -0.84, -0.998]}
                          scale={[513.441, 3.347, 92.668]}
                        >
                          <group name="Flags002_Black_sign_0_2409">
                            <mesh
                              name="Object_3710"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3710.geometry}
                              material={materials.Black_sign}
                            />
                          </group>
                          <group name="Flags002_Flag_red_0_2410">
                            <mesh
                              name="Object_3712"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3712.geometry}
                              material={materials.Flag_red}
                            />
                          </group>
                          <group name="Flags002_Flag_blue_0_2411">
                            <mesh
                              name="Object_3714"
                              castShadow
                              receiveShadow
                              geometry={nodes.Object_3714.geometry}
                              material={materials.Flag_blue}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default SnowHouse



