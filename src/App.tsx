import { Fragment } from "react";

import "./App.css";
import { Header } from "./Components/Header/Header";
import { Home } from "./Components/Inicio/Home";
import { AboutMe } from "./Components/AboutMe/AboutMe";
import { Portfolio } from "./Components/Portfolio/Portfolio";
import { Footer } from "./Components/Footer/Footer";
import { Contact } from "./Components/Contact/Contact";
import "./Utils/menuScrollSpy"

function App() {
  return (
    <Fragment>
      <Header />

      <main>
        <Home />

        <AboutMe />

        <Portfolio />

        <Contact/>

        <Footer />
      </main>
    </Fragment>
  );
}

export default App;
