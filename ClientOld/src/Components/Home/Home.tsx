import React, { useEffect } from "react";
import { useMyData } from "../../Hooks/useMyData";

import HomeCSS from "./Home.module.css";
import parse from "html-react-parser";

export const Home: React.FC = () => {
  const { home } = useMyData();


  return (
    <section id="home" className={HomeCSS.homeContainer} data-scroll-spy>
      {/* <!-- Este article, contendra la imagen de fondo --> */}
      <article className={HomeCSS.homeContainer__backgroundImage}>
        {/* <!-- Este aside, le dara la opacidad a la imagen de fondo --> */}
        <aside className={HomeCSS.homeContainer__backgroundColor}>
          {home && (
            <div className={HomeCSS.homeContainer__content}>
              <h3>{parse(`${home.presentation}`)}</h3>
              <a href="#aboutMe" className="button">{home.knowMe}</a>
            </div>
          )}
        </aside>
      </article>
    </section>
  );
};
