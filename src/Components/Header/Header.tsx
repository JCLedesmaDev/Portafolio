import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import { noneElement } from "../../Utils/noneElement";
import HeaderCSS from "./Header.module.css";
import parse from "html-react-parser";
import { useMyData } from "../../Hooks/useMyData";
import { menuScrollSpy } from "../../Utils/menuScrollSpy";

export const Header: React.FC = () => {
  /// Variables
  const { y: desplazamiento_actual } = useWindowScroll();
  const { header } = useMyData();
  // const { header,changeLenguage } = useMyData();

  /// Hooks
  const [openMenuResponsive, setOpenMenuResponsive] = useState(false);
  const [classNav, setClassNav] = useState("");

  /// Metodos
  const changeModelNav = () => {
    if (desplazamiento_actual >= 150) {
      // setClassNav(HeaderCSS.navModelo2);
      setClassNav(HeaderCSS.headerContainer__navMenu___BackgroundColor);
    } else {
      // setClassNav(HeaderCSS.navModelo1);
      setClassNav(HeaderCSS.headerContainer__navMenu___Transparent);
    }
  };

  const redirectSection = () => setOpenMenuResponsive(false);

  const closeMenuOnClick = () => {
    document.addEventListener("click", (e: any) => {
      if (e.target.matches("section") || e.target.matches(`${"section"} *`)) {
        setOpenMenuResponsive(false);
      }
    });
  };

  useEffect(() => {
    changeModelNav();
    closeMenuOnClick();
    menuScrollSpy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desplazamiento_actual]);

  return (
    <header className={HeaderCSS.headerContainer}>

      <nav id="nav" className={`${HeaderCSS.headerContainer__navMenu} ${classNav}`}>

        <div className={`${HeaderCSS.navMenuContainer} centerContainer`}>

          {/* Logo */}
          <div className={HeaderCSS.navMenuContainer__logo}>
            <a href="#home">{parse(`${header?.myPortfolio}`)}</a>
          </div>

          {/* Boton Menu */}
          <button className={HeaderCSS.navMenuContainer__btnMenu}
            onClick={() => setOpenMenuResponsive(!openMenuResponsive)}
          >
            <i className={`fas fa-bars ${noneElement(openMenuResponsive)}`}></i>
            <i className={`fas fa-times ${noneElement(!openMenuResponsive)}`}></i>
          </button>

          {/* Menu Enlaces  */}
          <div className={`${HeaderCSS.navMenuContainer__linksMenu}  
            ${openMenuResponsive ? HeaderCSS.navMenuContainer__linksMenu___IsActive : ""}`}
          >
            <a href="#home" data-scroll-spy onClick={redirectSection}>
              {header?.home}
            </a>
            <a href="#aboutMe" data-scroll-spy onClick={redirectSection}>
              {header?.aboutMe}
            </a>
            <a href="#portfolio" data-scroll-spy onClick={redirectSection}>
              {header?.portfolio}
            </a>

            {/* <a onClick={changeLenguage}> Cambiar </a> */}
          </div>
        </div>
      </nav>
    </header>
  );
};
