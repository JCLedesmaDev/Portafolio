import React from "react";
import { skills } from "../../../Utils/mySkills";
import TechnologyCSS from "./Technology.module.css";
import parse from "html-react-parser";

interface Props {
  technology: any;
}

export const Technology: React.FC<Props> = ({ technology }) => {
  return (
    <div
      className={TechnologyCSS.technology}
      style={{ backgroundColor: skills[technology.title]?.css}}
    >
      {technology.title !== "ExpressJS" ? (
        <img src={skills[technology.title]?.icon} 
          alt={technology.alt} 
          style={{scale: technology.title === "Sql Server" ? '0.9' : '1'}}
        />
      ) : (
        <p>{parse(`${technology.content}`)}</p>
      )}
      
      <div>
        <p>{technology.title}</p>
      </div>

    </div>
  );
};
