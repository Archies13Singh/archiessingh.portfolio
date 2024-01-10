import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loaders from "../components/Loaders";
import HomeInfo from "../components/HomeInfo";
import harryPotter from "../assets/harry_Potter.mp3";
import { soundoff, soundon } from "../assets/icons";
import SnowHouse from "../components/models/SnowHouse";
import BirdFly from "../components/models/BirdFly";
import Stars from "../components/models/Stars";
import Moon from "../components/models/Moon";
import Bear from "../components/models/Bear";
import Snow from "../components/models/Snow";

const Home = () => {
  const audioRef = useRef(new Audio(harryPotter));
  audioRef.current.volume = 0.5;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlaying]);

  const adjustSnowHouseForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -8.5, -46];
    let rotation = [0.01, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.013, 0.013, 0.013];
    } else {
      screenScale = [0.02, 0.02, 0.02];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustBearForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.32, 0.32, 0.32]; // for model size we use scale
      screenPosition = [1, 1, 0]; //for position of the model
    } else {
      screenScale = [1.2, 1.2, 1.2];
      screenPosition = [8, 1, -6];
    }

    return [screenScale, screenPosition];
  };

  const [snowHousescale, snowHousePosition, rotation] =
    adjustSnowHouseForScreenSize();
  const [bearScale, bearPosition] = adjustBearForScreenSize();

  return (
    <section
      className={`w-full h-screen relative ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className="w-full h-screen bg-black"
        camera={{ near: 0.1, far: 2000 }}
      >
        <Suspense fallback={<Loaders />}>
          <directionalLight position={[1, 1, 1]} intensity={4} />
          <ambientLight intensity={1.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000" />

          <SnowHouse
            scale={snowHousescale}
            position={snowHousePosition}
            rotation={rotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <BirdFly />
          <Snow />
          <Moon />
          <Stars isRotating={isRotating} />
          <Bear
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            scale={bearScale}
            position={bearPosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlaying ? soundoff : soundon}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsPlaying(!isPlaying)}
        />
      </div>
    </section>
  );
};

export default Home;
