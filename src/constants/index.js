import { valtech, terralive, geeks } from "../assets/images";
import {
  instagram,
  css,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  mui,
  nextjs,
  nodejs,
  pricewise,
  react,
  redux,
  tailwindcss,
  threads,
  typescript,
} from "../assets/icons";

export const skills = [
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
  {
    imageUrl: express,
    name: "Express",
    type: "Backend",
  },
  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Version Control",
  },
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Frontend",
  },
  {
    imageUrl: mongodb,
    name: "MongoDB",
    type: "Database",
  },
  {
    imageUrl: mui,
    name: "Material-UI",
    type: "Frontend",
  },
  {
    imageUrl: nextjs,
    name: "Next.js",
    type: "Frontend",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: redux,
    name: "Redux",
    type: "State Management",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
  {
    imageUrl: typescript,
    name: "TypeScript",
    type: "Frontend",
  },
];

export const experiences = [
  {
    title: "Front End Developer InternShip",
    company_name: "Terralive Envirotech Private Limited",
    icon: terralive,
    iconBg: "#F4EBBE",
    date: "July 2021 - September 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designs to create high-quality products.",
      "Contributing on Youdle Delivery App based on ReactJs Front End Framework and Flask",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews",
    ],
  },
  {
    title: "Technical Content Writer",
    company_name: "Geeks for Geeks",
    icon: geeks,
    iconBg: "#b7e4c7",
    date: "March 2021 - December 2021",
    points: [
      "Contributed on different programming languages content like web dev, Python , C++, HTML , R",
      "Worked on React Articles which are posted by GeeksforGeeks on Doubt Dashboards.",
      "Articles written on Python, R, and System Environment Related Issues.",
    ],
  },
  {
    title: "Associate Software Developer",
    company_name: "Valtech",
    icon: valtech,
    iconBg: "#000",
    date: "Aug 2022 - Present",
    points: [
      "Worked for Linde Client, focusing on developing applications with React Native.",
      "Designed various aspects of the user interface, including pages and navigation.Implemented UI elements such as color themes(24 themes) to enhance the visual appeal.Collaborated closely with Redux for state management.",
      "Integrated APIs into the application. Also Implemented Payment Integration for enhanced functionality.",
      "Executed API integrations for Data Translation, utilizing the existing dashboard for easy language updates across each store",
    ],
  },
];

export const socialLinks = [
  {
    name: "Contact",
    iconUrl: instagram,
    link: "https://www.instagram.com/singh.archies13/",
    bg_color: "bg-red-300",
  },
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/Archies13Singh",
    bg_color: "bg-neutral-600",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://www.linkedin.com/in/archies-singh-248721165/",
    bg_color: "bg-sky-600",
  },
];

export const projects = [
  {
    iconUrl: pricewise,
    theme: "btn-back-red",
    name: "Social Nest",
    description:
      "Explore a lively social nest for animal lovers with our Vite + React + TypeScript app. Embrace the joy of connecting over the adorable world of animals.",
    live_link: "https://social-nest.vercel.app/",
    github_link: "https://github.com/Archies13Singh/SocialNest",
    tech_stack: [
      "https://threedportfolio.000webhostapp.com/typescript.svg",
      "https://threedportfolio.000webhostapp.com/react.png",
      "https://threedportfolio.000webhostapp.com/vite.svg",
      "https://threedportfolio.000webhostapp.com/appwite.png",
    ],
    text_theme: "text-orange-500",
  },
  {
    iconUrl: threads,
    theme: "btn-back-green",
    name: "3D Portfolio",
    description:
      "Elevate your online presence with my portfolio website, seamlessly blending React, THREEJS and VITE for a dynamic user experience.",
    live_link: "/",
    github_link: "https://github.com/Archies13Singh/Porfolio",
    tech_stack: [
      "https://threedportfolio.000webhostapp.com/react.png",
      "https://threedportfolio.000webhostapp.com/javascript.svg",
      "https://threedportfolio.000webhostapp.com/threeJs.png",
      "https://threedportfolio.000webhostapp.com/emailJs.png",
    ],
    text_theme: "text-teal-500",
  },
  {
    iconUrl: threads,
    theme: "btn-back-blue",
    name: "Human Identifier",
    description:
      "This project leverages Tensorflow for object detection using machine learning and integrates it seamlessly into a Next.js-based web application, providing a user-friendly interface for interacting with the object detection capabilities.",
    github_link: "https://github.com/Archies13Singh/HumanIdentifier-",
    tech_stack: [
      "https://threedportfolio.000webhostapp.com/nextjs.svg",
      "https://threedportfolio.000webhostapp.com/tensorflow.svg",
    ],
    text_theme: "text-sky-600",
  },
  {
    iconUrl: threads,
    theme: "btn-back-black",
    name: "Image Generator Using OpenAI",
    description:
      "Embark on a visual journey with my DALL-E Image Generation project, merging AI and artistry to transform textual prompts into mesmerizing images. Experience seamless interaction through the user-friendly interface, powered by MERN .",
    github_link: "https://github.com/Archies13Singh/AI_IMAGE_GENERATOR",
    tech_stack: [
      "https://threedportfolio.000webhostapp.com/mongodb.svg",
      "https://threedportfolio.000webhostapp.com/express.png",
      "https://threedportfolio.000webhostapp.com/react.png",
      "https://threedportfolio.000webhostapp.com/nodejs.png",
    ],
    text_theme: "text-neutral-600",
  },
];
