import { Fragment } from 'react';
import { useLocation } from 'react-use';
import parse from "html-react-parser";
import ModalProjectCSS from './ModalProjectCSS.module.css'
import { myProjects } from "../../../../Utils/myProjects";

interface Props {
  project: any;
  indexProject: number
}
enum Images { CANTIDAD_MININA = 5 }


export const ModalProject : React.FC <Props> = ({project, indexProject}) => {

    /// VARIABLES
    let indeximage = 0, translateX = 0;
    const location = useLocation().hash;
    const CssCarrouselSlide = `${ModalProjectCSS.slidesContainer__slides} ${ModalProjectCSS.slidesContainer__slides__carrousel} `;



    /// MEOTODS
    const returnImagesModal = (index: number): JSX.Element[] => {
      return myProjects[index]?.imagesModal.map((image, indexImg) => (
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


    return (
      <div className={ModalProjectCSS.modalContent}>
        <a href="#close" className={ModalProjectCSS.modalContent_closeBtn}>
          <i className="fas fa-times"></i>
        </a>
        <article className={ModalProjectCSS.modalContent__openModal}>
          <div className={ModalProjectCSS.slidesContainer} id={`carrousel_${indexProject}`}>
            <div className={
              location?.includes(`#trabajo_${indexProject}`) &&
                myProjects[indexProject]?.imagesModal.length >=
                Images.CANTIDAD_MININA //Para que los proyectos con menos de 5 imagens no se muevan.
                ? CssCarrouselSlide
                : `${ModalProjectCSS.slidesContainer__slides}`
            }
            >
              {returnImagesModal(indexProject)}
            </div>
            {myProjects[indexProject]?.imagesModal.length >=
              Images.CANTIDAD_MININA && (
                <div className={ModalProjectCSS.slidesContainer__buttons}>
                  <button className="prev"
                    onClick={() =>
                      buttonSlide("prev", `#carrousel_${indexProject}`)
                    }
                  > &laquo; </button>
                  <button className="next"
                    onClick={() => buttonSlide("next", `#carrousel_${indexProject}`)}
                  > &raquo; </button>
                </div>
              )}
          </div>
          <div className={ModalProjectCSS.slidesContainer__info}>
            <h3>{project.title}</h3>
            <p>{parse(project.createdWith)}</p>
            <aside className={ModalProjectCSS.slidesContainer__info__details}>
              {returnDatesModal(project)}
            </aside>
          </div>
        </article>
      </div>
    )
}