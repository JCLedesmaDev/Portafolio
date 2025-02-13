import React from "react";
import TechnologyCSS from "./ImageTechnology.module.css";
import parse from "html-react-parser";
import { ITechnology } from '../../../../Interface/IMyData';

interface Props { technology: ITechnology; }

export const ImageTechnology: React.FC<Props> = ({ technology }) => {
  return (
    <div
      className={TechnologyCSS.technology}
      style={{ backgroundColor: technology?.css }}
    >
      {technology.title !== "ExpressJS"
        ? (<img src={technology?.image}
          alt={technology.alt}
          style={{ scale: technology.title === "Sql Server" ? '0.9' : '1' }} // no funciona en chrome
        />
        ) : (<p>{parse(`${technology.content}`)}</p>
        )}

      <div>
        <p style={{
          marginTop: technology.title === "ExpressJS" ? '-.45rem' : 'auto'
        }}>{technology.title}</p>
      </div>

    </div>
  );
};
