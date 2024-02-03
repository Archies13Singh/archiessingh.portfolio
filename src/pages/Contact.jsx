import React, { Suspense, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Fox from "../components/models/Fox";
import { Canvas } from "@react-three/fiber";
import Loaders from "../components/Loaders";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import PostMan from "../components/models/PostMan";
import cycle from "../assets/cyclesound.mp3";
import nature from "../assets/nature.mp3";
import SocialHandles from "../components/socialHandles";
import { socialLinks } from "../constants";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnimatiion, setcurrentAnimation] = useState("idle");
  const { alert, showAlert, hideAlert } = useAlert();
  const cycling = useRef(new Audio(cycle));
  const natureSound = useRef(new Audio(nature));
  cycling.current.volume = 0.1;
  cycling.current.loop = true;
  natureSound.current.volume = 0.3;
  natureSound.current.loop = true;

  useEffect(() => {
    if (isPlaying) {
      cycling.current.play();
      natureSound.current.play();
    } else {
      cycling.current.pause();
      natureSound.current.pause();
    }
  }, [isPlaying, natureSound]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleFocus = (e) => {
    setIsPlaying(true);
    setcurrentAnimation("M_rig_Action_S");
  };

  const handleBlur = () => {
    setcurrentAnimation("idle");
    setIsPlaying(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setcurrentAnimation("M_rig_Action_S");
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Archies",
          from_email: form.email,
          to_email: "archiessingh04@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        showAlert({
          show: true,
          text: "Message sent successfully!",
          type: "success",
        });
        setTimeout(() => {
          hideAlert();
          setcurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, [3000]);
      })
      .catch((err) => {
        showAlert({
          show: true,
          text: "I didn't receive you message",
          type: "danger",
        });
        setIsLoading(false);
        setcurrentAnimation("idle");
        console.log(err, "Error from form");
      });
  };
  return (
    <section className="max-container flex flex-col gap-6">
      {alert.show && <Alert {...alert} />}
      <div className="relative flex lg:flex-row flex-col">
        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1 className="head-text">Get In Touch</h1>
          <form
            className="w-full flex flex-col gap-7 mt-14"
            onSubmit={handleSubmit}
          >
            <label className="text-black-500 font-semibold">
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Archies"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="archiesksingh@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Your Message
              <textarea
                name="message"
                rows={4}
                className="input"
                placeholder="Let me know how can I help you ?"
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <button
              type="submit"
              className="btn"
              disabled={isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {isLoading ? "Sending...." : "Send Message"}
            </button>
          </form>
        </div>
        <div className=" w-full md:h-[550px] h-[450px]">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
          >
            <directionalLight intensity={5.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.4} />
            <Suspense fallback={<Loaders />}>
              <PostMan
                position={[-0.5, -2, 0]}
                rotation={[12.6, -1.6, 0]}
                scale={[2.5, 2.5, 2.5]}
                currentAnimatiion={currentAnimatiion}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div>
        <h4 className="head-text">Social Handles</h4>
        <div className="flex flex-wrap gap-12 mt-16 justify-evenly items-center">
          {socialLinks.map((social) => (
            <div className="block-container  rounded-lg  w-20 h-20 pt-6 shadow-xl">
              <div className="btn-front  rounded-lg flex justify-center items-center shadow-xl cursor-pointer">
                <SocialHandles
                  url={social.iconUrl}
                  key={social.name}
                  link={social.link}
                />
              </div>
              <div className={`btn-back rounded-lg ${social.bg_color} animate-pulse`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
