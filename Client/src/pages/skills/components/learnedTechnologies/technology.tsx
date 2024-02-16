/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import css from "./index.module.css";
import parse from "html-react-parser";

interface Props {
  technology: any;
}

export const ImageTechnology: React.FC<Props> = ({ technology }) => {

  return (
    <div
      className={css.technology}
    //style={{ backgroundColor: skills[technology.name]?.css}}
    >
      {technology.name !== "ExpressJS"
        ? (<img src={technology.image}
          alt={technology.alt}
          style={{ scale: technology.name === "Sql Server" ? '0.9' : '1' }} // no funciona en chrome
        />
        ) : (<p>{parse(`${technology.content}`)}</p>
        )}

      <div>
        <p style={{
          marginTop: technology.name === "ExpressJS" ? '-.45rem' : 'auto'
        }}>{technology.name}</p>
      </div>

    </div>
  );
};
