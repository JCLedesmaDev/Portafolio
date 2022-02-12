import React, { Fragment } from "react";
import parse from "html-react-parser";
import { useMyData } from "../../Hooks/useMyData";
import { projects } from "../../Utils/myProjects";

import PortfolioCSS from "./Portfolio.module.css";
import { useLocation } from "react-use";
import { ModalContainer } from "../ModalContainer/ModalContainer";

enum Images {
  CANTIDAD_MININA = 5,
}

export const Portfolio: React.FC = () => {
  /// VARIABLES
  const { portfolio } = useMyData();
  const location = useLocation().hash;
  const CssCarrouselSlide = `${PortfolioCSS.slidesContainer__slides} ${PortfolioCSS.slidesContainer__slides__carrousel} `;
  const CssOpenModal = `${PortfolioCSS.portfolioModal} ${PortfolioCSS.openPortafolioModal}`;
  let indeximage = 0,
    translateX = 0;

  /// METODOS
  const returnImagesModal = (index: number): JSX.Element[] => {
    return projects[index]?.imagesModal.map((image, indexImg) => (
      <img
        key={indexImg}
        src={image}
        alt={`Trabajo ${index} - Foto ${indexImg + 1}`}
      />
    ));
  };

  const returnDatesModal = (project: any): JSX.Element[] => {
    return project.datesModal.map((details: any, indexSmall: any) => (
      <Fragment key={indexSmall}>
        <small>{parse(details.title)}</small>
        <small>{parse(details.content)}</small>
      </Fragment>
    ));
  };

  const buttonSlide = (typeBtn: string, idCarousel: string) => {
    const $slides = document.querySelector(idCarousel)
      ?.firstChild as HTMLDivElement;

    if (typeBtn === "next") {
      if (indeximage !== Images.CANTIDAD_MININA) {
        indeximage++;
        translateX -= 20;
        $slides.style.transform = `translateX(${translateX}%)`;
      }

      if (indeximage === Images.CANTIDAD_MININA) {
        $slides.style.transform = `translateX(0)`;
        indeximage = 0;
        translateX = 0;
      }
    }

    if (typeBtn === "prev") {
      if (indeximage > 0 && indeximage <= Images.CANTIDAD_MININA) {
        indeximage--;
        translateX += 20;
        $slides.style.transform = `translateX(${translateX}%)`;
      }

      if (indeximage <= 0) {
        // Comienza del 0, le agregamos -20 por cada imagen del slide
        translateX = -80;

        //Indicamos la cantidad de fotos
        indeximage = 5;
        $slides.style.transform = `translateX(${translateX}%)`;
      }
    }
  };

  (function () {
    const $body = document.querySelector("body") as HTMLBodyElement;
    if (location?.includes(`#trabajo_`)) {
      // slideCarrusel();
      $body.style.overflowY = "hidden";
    } else {
      $body.style.overflowY = "scroll";
    }
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        window.location.hash = "#close";
      }
    });
  })();

  return (
    <section
      id="portfolio"
      className={`${PortfolioCSS.portfolio} section-space`}
      data-scroll-spy
    >
      <div className="centerContainer">
        <h2 className="section-title">{portfolio?.myWorks}</h2>

        {portfolio?.proyects.map((project, index) => (
          <Fragment key={index}>
            <a
              href={`#trabajo_${index}`}
              className={PortfolioCSS.portfolioCard}
            >
              <img
                className={PortfolioCSS.portfolioCard__img}
                src={projects[index]?.mainImage}
                alt={`trabajo practica ${index}`}
              />

              <aside className={PortfolioCSS.portfolioCard__info}>
                <div className={PortfolioCSS.portfolioCard__infoContainer}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className={PortfolioCSS.portfolioCard__infoEnlace}>
                    <button className="button">{portfolio?.clickMe}</button>
                  </div>
                </div>
              </aside>
            </a>

            {/* <!-- Ventanas modal del portafolio (en el css, ta todo) --> */}
            <ModalContainer
              validation={location?.includes(`#trabajo_${index}`)}
            >
              <div className={PortfolioCSS.modalContent}>
                <a href="#close" className={PortfolioCSS.modalContent_closeBtn}>
                  <i className="fas fa-times"></i>
                </a>

                <article className={PortfolioCSS.modalContent__openModal}>
                  <div
                    className={PortfolioCSS.slidesContainer}
                    id={`carrousel_${index}`}
                  >
                    <div
                      className={
                        location?.includes(`#trabajo_${index}`) &&
                        projects[index]?.imagesModal.length >=
                          Images.CANTIDAD_MININA //Para que los proyectos con menos de 5 imagens no se muevan.
                          ? CssCarrouselSlide
                          : `${PortfolioCSS.slidesContainer__slides}`
                      }
                    >
                      {returnImagesModal(index)}
                    </div>

                    {projects[index]?.imagesModal.length >=
                      Images.CANTIDAD_MININA && (
                      <div className={PortfolioCSS.slidesContainer__buttons}>
                        <button
                          className="prev"
                          onClick={() =>
                            buttonSlide("prev", `#carrousel_${index}`)
                          }
                        >
                          &laquo;
                        </button>

                        <button
                          className="next"
                          onClick={() =>
                            buttonSlide("next", `#carrousel_${index}`)
                          }
                        >
                          &raquo;
                        </button>
                      </div>
                    )}
                  </div>

                  <div className={PortfolioCSS.slidesContainer__info}>
                    <h3>{project.title}</h3>
                    <p>{parse(project.createdWith)}</p>

                    <aside
                      className={PortfolioCSS.slidesContainer__info__details}
                    >
                      {returnDatesModal(project)}
                    </aside>
                  </div>
                </article>
              </div>
            </ModalContainer>

          </Fragment>
        ))}
      </div>
    </section>
  );
};
