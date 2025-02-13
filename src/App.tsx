import { Fragment } from "react";

import "./App.css";
import { Header } from "./Components/Header/Header";
import { Home } from "./Components/Home/Home";
import { AboutMe } from "./Components/AboutMe/AboutMe";
import { DoneProjects } from "./Components/DoneProjects/DoneProjects";
import { Footer } from "./Components/Footer/Footer";

// localStorage.setItem("leng", "ES")

function App () {

  return (
    <Fragment>
      <Header />

      <main>
        <Home />

        <AboutMe />

        <DoneProjects />

        <Footer />
      </main>
    </Fragment>
  );
}

export default App;
