import { Fragment } from 'react';
import { useLocation } from 'react-use';
import parse from "html-react-parser";
import ModalProjectCSS from './ModalProject.module.css'
import { myProjects } from "../../../../Utils/myProjects";

interface Props {
  Project: any;
  IndexProject: number;
}
enum Images { CANTIDAD_MININA = 5 }


export const ModalProject : React.FC <Props> = ({Project, IndexProject}) => {
  
  /// VARIABLES

  let indeximage = 0, translateX = 0;
  const location = useLocation().hash;
  const CssCarrouselSlide = `
    ${ModalProjectCSS.slidesContainer__imagenes} 
    ${ModalProjectCSS.slidesContainer__imagenes___Carrousel} 
  `;

  const validacionSlide = location?.includes(`#trabajo_${IndexProject}`) &&
    myProjects[IndexProject]?.imagesModal.length >= Images.CANTIDAD_MININA //Para que los proyectos con menos de 5 imagens no se muevan.


  /// MEOTODS

  const returnImagesModal = (): JSX.Element[] => {
    return myProjects[IndexProject]?.imagesModal.map((image, indexImg) => (
      <img key={indexImg} src={image}
        alt={`Trabajo ${IndexProject} - Foto ${indexImg + 1}`}
      />
    ));
  };
  
  const returnDatesModal = (datesModal: any): JSX.Element[] => {
    return datesModal.map((details: any, indexSmall: any) => (
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
      <div className={ModalProjectCSS.modalContainer}>

        <a href="#close" className={ModalProjectCSS.modalContainer__closeBtn}>
          <i className="fas fa-times"></i>
        </a>

        <article className={ModalProjectCSS.modalContainer__info}>

          <div className={ModalProjectCSS.slidesContainer} id={`carrousel_${IndexProject}`}>
           
            <div className={validacionSlide 
               ? CssCarrouselSlide 
               : `${ModalProjectCSS.slidesContainer__imagenes}`
            }>{returnImagesModal()}</div>


            {myProjects[IndexProject]?.imagesModal.length >=
              Images.CANTIDAD_MININA && (
                <div className={ModalProjectCSS.slidesContainer__buttons}>
                  <button className="prev"
                    onClick={() => buttonSlide("prev", `#carrousel_${IndexProject}`)}
                  > &laquo; </button>
                  <button className="next"
                    onClick={() => buttonSlide("next", `#carrousel_${IndexProject}`)}
                  > &raquo; </button>
                </div>
            )}

          </div>

          <div className={ModalProjectCSS.slidesContainer__info}>

            <h3>{Project.title}</h3>

            <p>{parse(Project.createdWith)}</p>

            <aside className={ModalProjectCSS.slidesContainer__infoDetails}>
              {returnDatesModal(Project.datesModal)}
            </aside>

          </div>

        </article>

      </div>
    )
}