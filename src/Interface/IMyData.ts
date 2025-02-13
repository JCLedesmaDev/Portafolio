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
    technologies: string;
    front_Technologies: ITechnology[];

    back_Technologies: ITechnology[];

    other_technology: ITechnology[];

    coming_soon: ITechnology[];
  };

  doneProjects: {
    myWorks: string;
    proyects: IProyect[];
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
  footer: { sitie: string; linkedIn: string; gitHub: string; };
}
export interface ITechnology {
  title: string;
  alt?: string;
  content?: string;
  css: string;
  image: string;
}
export interface IProyect {
  title: string;
  description: string;
  createdWith: string;
  datesModal: Array<{ title: string; content: string; }>;
  images: {
    mainImage: string
    imagesModal: string[]
  }
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
