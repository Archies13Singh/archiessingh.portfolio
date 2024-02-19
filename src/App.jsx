import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Outlet
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { About, Contact, Education, Home, Projects, Test } from "./pages";
import LoaderSplash from "./components/LoaderSplash";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const seconds = 3000;

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, seconds));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className="bg-slate-300/25 h-full">
      <Router>
        {isLoading ? (
          <LoaderSplash setIsLoading={setIsLoading} />
        ) : (
          <>
            <Content />
          </>
        )}
      </Router>
    </main>
  );
};

const Content = () => {
  const location = useLocation();
  const [path, setPath] = useState();
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <Navbar path={path} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
};

export default App;
