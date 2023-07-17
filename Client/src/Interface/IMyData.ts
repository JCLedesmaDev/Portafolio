interface ITechnologies {
  title: string;
  alt?: string;
  content?: string;
}
interface IProyects {
  title: string;
  description: string;
  createdWith: string;
  datesModal: {
    title: string;
    content: string;
  }[];
}

interface IModeContact {
  icon: string;
  title: string;
  links: string[];
}

interface IFormInputs {
  type: string;
  name: string;
  placeholder: string;
  messageError: string;
  autoComplete: string;
  cols?: number;
  rows?: number;
}

export interface IMyData {
  lenguage: string;

  header: {
    myPortfolio: string;
    home: string;
    aboutMe: string;
    portfolio: string;
    contact: string;
  };

  home: {
    presentation: string;
    knowMe: string;
  };

  aboutMe: {
    nameCompleted: string;
    rol: string;
    aboutme: string;
    presentations: string[];
    downloadCV: string;
    CVLink: string;

    mySkills: string;
    mySkillsPresentations: string[];

    skills_area: string[];
    technology: string;
    front_Technologies: ITechnologies[];

    back_Technologies: ITechnologies[];

    other_technology: ITechnologies[];

    coming_soon: ITechnologies[];
  };

  portfolio: {
    myWorks: string;
    proyects: IProyects[];
    clickMe: string;
  };

  contact: {
    interested: string;
    modeContact: IModeContact[];

    formContactInputs: IFormInputs[];
    button: string;
    modalContact: string;
    modalContactError: string;
  };

  footer: {
    sitie: string;
    linkedIn: string;
    gitHub: string;
  };
}
