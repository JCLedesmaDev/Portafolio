import React from "react";
import { skills } from "../../../Utils/mySkills";
import AboutMeCSS from "../AboutMe.module.css";
import parse from "html-react-parser";

interface Props {
  technology: any;
}

export const Technology: React.FC<Props> = ({ technology }) => {
  return (
    <div
      className={AboutMeCSS.technology}
      style={{ backgroundColor: skills[technology.title]?.css }}
    >
      {technology.title !== "ExpressJS" ? (
        <img src={skills[technology.title]?.icon} alt={technology.alt} />
      ) : (
        <p>{parse(`${technology.content}`)}</p>
      )}
      
      <div>
        <p>{technology.title}</p>
      </div>

    </div>
  );
};
