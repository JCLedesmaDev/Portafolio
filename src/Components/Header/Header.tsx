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

  /// Hooks
  const [openMenuResponsive, setOpenMenuResponsive] = useState(false);
  const [classNav, setClassNav] = useState("");

  /// Metodos
  const changeModelNav = () => {
    if (desplazamiento_actual >= 150) {
      setClassNav(HeaderCSS.navModelo2);
    } else {
      setClassNav(HeaderCSS.navModelo1);
    }
  };

  const redirectSection = () => {
    setOpenMenuResponsive(false);
  };

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
  }, [desplazamiento_actual]);

  return (
    <header className={HeaderCSS.header}>
      <nav id="nav" className={classNav}>
        <div className={`${HeaderCSS.container} centerContainer`}>
          {/* Logo */}
          <div>
            <a href="#home">{parse(`${header.myPortfolio}`)}</a>
          </div>

          {/* Boton Menu */}
          <button onClick={() => setOpenMenuResponsive(!openMenuResponsive)}>
            <i className={`fas fa-bars ${noneElement(openMenuResponsive)}`}></i>
            <i
              className={`fas fa-times ${noneElement(!openMenuResponsive)}`}
            ></i>
          </button>

          {/* Menu Enlaces  */}
          <div className={openMenuResponsive ? HeaderCSS.is_active : ""}>
            <a href="#home" data-scroll-spy onClick={redirectSection}>
              {header.home}
            </a>
            <a href="#aboutMe" data-scroll-spy onClick={redirectSection}>
              {header.aboutMe}
            </a>
            <a href="#portfolio" data-scroll-spy onClick={redirectSection}>
              {header.portfolio}
            </a>
            <a href="#contact" data-scroll-spy onClick={redirectSection}>
              {header.contact}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
