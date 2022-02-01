import React from "react";
import { useMyData } from "../../Hooks/useMyData";

import HomeCSS from "./Home.module.css";
import parse from "html-react-parser";

export const Home: React.FC = () => {
  const { home } = useMyData();

  return (
    <section id="home" className={HomeCSS.home} data-scroll-spy>
      {/* <!-- Este article, contendra la imagen de fondo --> */}
      <article>
        {/* <!-- Este aside, le dara la opacidad a la imagen de fondo --> */}
        <aside>
          <div className={HomeCSS.home_image_content}>
            <h3>{parse(`${home.presentation}`)}</h3>

            <a href="#acerca-de" className="button">
              {home.knowMe}
            </a>
          </div>
        </aside>
      </article>
    </section>
  );
};
