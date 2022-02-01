import React from "react";
import parse from "html-react-parser";
import { useMyData } from "../../Hooks/useMyData";
import FooterCSS from "./Footer.module.css";

export const Footer: React.FC = () => {
  const { footer } = useMyData();

  return (
    <footer className={FooterCSS.footer}>
      <small>
        {footer.sitie}
        {parse(footer.linkedIn)} | {parse(footer.gitHub)}
      </small>
    </footer>
  );
};
