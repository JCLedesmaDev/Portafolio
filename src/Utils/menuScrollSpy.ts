import HeaderCSS from "../Components/Header/Header.module.css";

export const menuScrollSpy = () =>  {
  /*Almacenamos en una const, todos los elementos de tipo "section"
     que tienen el data-attribute "data-scroll-spy"*/
  const $sections = document.querySelectorAll(
    "main section[data-scroll-spy]"
  ) as NodeListOf<Element>;

  const cb = (entries: any) => {
    entries.forEach((entry: any) => {
      //Traemos el "id" de cada elemento seccion
      const id = entry.target.getAttribute("id");

      const enlace = document.querySelector(
        `a[data-scroll-spy][href="#${id}"]`
      ) as HTMLElement;

      if (entry.isIntersecting) {
        enlace.classList.add(`${HeaderCSS.active}`);
      } else {
        enlace.classList.remove(`${HeaderCSS.active}`);
      }
    });
  };

  const observer = new IntersectionObserver(cb, {
    //Limites => Va de 0 a 1 (en porcentajes 1 = 100%). El 0 significa que en cuanto apenas se vea un 0% del contenido de la siguiente seccion, se va a marcar
    threshold: 0.4,
  });

  $sections.forEach((section) => observer.observe(section));
};
 