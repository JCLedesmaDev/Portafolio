import React, { useEffect, useState } from "react";
import { useMyData } from "../../Hooks/useMyData";

import parse from "html-react-parser";

import AboutMeCSS from "./AboutMe.module.css";

// import myPhoto from "../../Static/fotoCV.jpg";
import myPhoto from "../../Static/img.jpg";
import loaderSVG from "../../Static/Spin-1s-200px.svg";

import { Technology } from "./Technology/Technology";

export const AboutMe: React.FC = () => {
  const { aboutMe } = useMyData();

  /// HOOKS
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);
  const [filterActive, setFilterActive] = useState(0);

  /// METODOS

  const getTechnologiesByArea = (skillsArea: string, index: number) => {
    setLoader(false);

    let Technologies: any[] = [];

    if (skillsArea.includes("Front")) {
      aboutMe?.front_Technologies.map((techno) => Technologies.push(techno));
    }
    if (skillsArea.includes("Back")) {
      aboutMe?.back_Technologies.map((techno) => Technologies.push(techno));
    }
    if (skillsArea.includes("Otros") || skillsArea.includes("Other")) {
      aboutMe?.other_technology.map((techno) => Technologies.push(techno));
    }
    if (skillsArea.includes("Proximamente") || skillsArea.includes("coming")) {
      aboutMe?.coming_soon.map((techno) => Technologies.push(techno));
    }

    setFilterActive(index);
    setTechnologies(Technologies);

    setTimeout(() => {
      setLoader(true);
    }, 500);
  };

  useEffect(() => {
    getTechnologiesByArea("Front", 0);
  }, []);

  return (
    <section
      id="aboutMe"
      className={`${AboutMeCSS.aboutMe} centerContainer section-space full-lg-screen`}
      data-scroll-spy
    >
      <h2 className="titulo"> {aboutMe?.aboutme}</h2>

      <article className="article-space text-center">
        <aside>
          <h1>{aboutMe?.nameCompleted}</h1>
          <h4 className="text-color-principal">{aboutMe?.rol}</h4>
        </aside>

        {aboutMe?.presentations.map((present, indexPresent) => (
          <p key={indexPresent}>{parse(`${present}`)}</p>
        ))}

        <div>
          {/* Subir a Drive y compartir enlace */}
          <a
            href={aboutMe?.CVLink}
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {aboutMe?.downloadCV}
          </a>
        </div>
      </article>

      <article className="article-space text-center">
        <img
          src={myPhoto}
          className="scale-img avatar"
          alt="Juan Cruz Ledesma"
        />
      </article>

      <article className="text-center">
        <h2 className="sub-section-title">{aboutMe?.mySkills}</h2>

        {aboutMe?.mySkillsPresentations.map((skillsPresent, indexSkill) => (
          <p key={indexSkill}>{parse(`${skillsPresent}`)}</p>
        ))}

        <h3 className="sub-section-title">{aboutMe?.technology}</h3>

        <div className={AboutMeCSS.container_skills}>
          <div className="categorias">
            {aboutMe?.skills_area.map((area, indexArea) => (
              <a
                key={indexArea}
                href={"#/"}
                className={
                  filterActive === indexArea
                    ? AboutMeCSS.buttonFilterActive
                    : ""
                }
                onClick={(e: any) => getTechnologiesByArea(area, indexArea)}
              >
                {area}
              </a>
            ))}
          </div>

          <div>
            {loader === true ? (
              technologies.map((technology, indexTechno) => (
                <Technology key={indexTechno} technology={technology} />
              ))
            ) : (
              <img src={loaderSVG} alt="loader" />
            )}
          </div>
        </div>
      </article>
    </section>
  );
};
