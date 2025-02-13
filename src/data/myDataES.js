// Front-End
import css from "./images/technologies/front/css.svg";
import html from "./images/technologies/front/html.svg";
import ionic from "./images/technologies/front/ionic.svg";
import js from "./images/technologies/front/js.svg";
import react from "./images/technologies/front/react.svg";
import zustand from "./images/technologies/front/zustand.png";
import vue from "./images/technologies/front/vue.svg";
import quasar from "./images/technologies/front/quasar.png";

// Back-End
import mongodb from "./images/technologies/back/mongodb.svg";
import nodejs from "./images/technologies/back/nodejs.png";
import entityFramework from "./images/technologies/back/entity.png";
import net from "./images/technologies/back/net.png";
import sqlServer from "./images/technologies/back/sqlserver.png";

// Otros
import typescript from "./images/technologies/other/typescript.svg";
import git from "./images/technologies/other/git.png";
import nvm from "./images/technologies/other/nvm.png";

// Proximamente
import nextjs from "./images/technologies/comingSon/nextjs.svg";
import mysql from "./images/technologies/comingSon/mysql.svg";
import reactnative from "./images/technologies/comingSon/react-native.png";

/* Proyecto Figuras */
import figuritas1 from "./images/projects/albumes/figuritas1.png"
import figuritas2 from "./images/projects/albumes/figuritas2.png"
import figuritas3 from "./images/projects/albumes/figuritas3.png"
import figuritas4 from "./images/projects/albumes/figuritas4.png"
import figuritas5 from "./images/projects/albumes/figuritas5.png"

/* CRUD DE LIBROS */
import crud_libros1 from "./images/projects/crud-libros/crud-libros-1.png";
import crud_libros2 from "./images/projects/crud-libros/crud-libros-2.png";
import crud_libros3 from "./images/projects/crud-libros/crud-libros-3.png";
import crud_libros4 from "./images/projects/crud-libros/crud-libros-4.png";
import crud_libros5 from "./images/projects/crud-libros/crud-libros-5.png";

/* Mi portafolio */
import portfolio1 from "./images/projects/mi-portafolio/mi-portafolio-1.png";
import portfolio2 from "./images/projects/mi-portafolio/mi-portafolio-2.png";
import portfolio3 from "./images/projects/mi-portafolio/mi-portafolio-3.png";
import portfolio4 from "./images/projects/mi-portafolio/mi-portafolio-4.png";
import portfolio5 from "./images/projects/mi-portafolio/mi-portafolio-5.png";

/* CRUD Stack MERN*/
import crud_MERN1 from "./images/projects/crud-proyectos-stack-MERN/crud-proyectos-stack-MERN-1.png";

/* Mis actividades*/
import activities1 from "./images/projects/mis-actividades/activities1.png";
import activities2 from "./images/projects/mis-actividades/activities2.png";
import activities3 from "./images/projects/mis-actividades/activities3.png";
import activities4 from "./images/projects/mis-actividades/activities4.png";
import activities5 from "./images/projects/mis-actividades/activities5.png";

/* Turnero */
import turnero1 from "./images/projects/turnero-peluqueria/turnero1.png"
import turnero2 from "./images/projects/turnero-peluqueria/turnero2.png"
import turnero3 from "./images/projects/turnero-peluqueria/turnero3.png"
import turnero4 from "./images/projects/turnero-peluqueria/turnero4.png"
import turnero5 from "./images/projects/turnero-peluqueria/turnero5.png"

/* Productos */
import productos1 from "./images/projects/control-productos/productos1.png"
import productos2 from "./images/projects/control-productos/productos2.png"
import productos3 from "./images/projects/control-productos/productos3.png"
import productos4 from "./images/projects/control-productos/productos4.png"
import productos5 from "./images/projects/control-productos/productos5.png"


const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date("04/06/2000");
    let age = today.getFullYear() - birthDate.getFullYear();

    // Verificamos si el cumpleaños ya pasó este año
    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() || // Mes ya pasó
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate()); // Mismo mes y día ya pasó o es hoy

    if (!hasHadBirthdayThisYear) {
        age -= 1;
    }

    return age;
};
const age = calculateAge();

export const myDataES = {
    lenguage: "ES",
    header: {
        myPortfolio: "<span>Mi </span>Portafolio",
        home: "Inicio",
        aboutMe: "Sobre mi",
        portfolio: "Proyectos realizados",
    },
    home: {
        "presentation": "Hola! Mi nombre es <br/> <span> Juan Cruz Ledesma </span> <br/> Y soy <span>Desarrollador Full-Stack.</span>",
        "knowMe": "Conoceme!"
    },
    aboutMe: {
        nameCompleted: "Juan Cruz Ledesma",
        rol: "Desarrollador Full-Stack.",
        aboutme: "Sobre mi:",
        presentations: [
            `🙋🏻 ¡Hola! Te cuento un poco sobre mí: <br/> Tengo ${age} años, soy <b>Técnico Superior en Desarrollo de Software</b>, egresado del Instituto Técnico Superior de Córdoba, con experiencia en el desarrollo de aplicaciones completas, abarcando tanto el lado del cliente como el servidor. Me destaco por mi capacidad de escuchar y entender rápidamente las necesidades de los clientes, lo que me permite crear soluciones eficientes y personalizadas.`,

            "Actualmente, me desempeño como <b>Desarrollador Full-Stack </b> en <b>Telecom Argentina S.A.</b>, donde desarrollo soluciones enfocadas en mejorar las operaciones del personal técnico en campo y la atención al cliente. Mi experiencia previa en diseño arquitectónico me enseñó la importancia de la buena arquitectura y organización en cualquier proyecto, lo que aplico en el desarrollo de software.",

            "Me apasiona el desarrollo web y estoy en constante formación para aprender nuevas tecnologías y enfrentar nuevos desafíos. Disfruto del trabajo en equipo y me motiva crecer profesionalmente cada día. Siempre busco nuevas oportunidades para mejorar mis habilidades y contribuir al desarrollo de soluciones innovadoras."
        ],
        downloadCV: "DESCARGA MI CV",
        CVLink: "https://drive.google.com/file/d/1q4NHm8Nyiwkc69mUGQxvNc951-eWYUYA/view?usp=drive_link",
        mySkills: "Mis Habilidades:",
        mySkillsPresentations: [
            "Considero que soy <b>detallista</b> (hablando del diseño), me importan mucho los detalles aunque estos sean mínimos y trato de que todo esté en armonía en cuanto a los colores y formas de los objetos.",
            "A su vez, también me considero <b>autocrítico</b> ya que siempre pienso que podría mejorar cierto detalle o aspecto. <br /> Por último, siempre <b>acepto</b> y tomo muy en cuenta cualquier crítica, sugerencia y/o tip sobre cómo hacer de cierta manera algún trabajo."
        ],
        skills_area: [
            "Front-End:",
            "Back-End:",
            "Otros:",
            "Proximamente:"
        ],
        technologies: "Tecnologias:",
        front_Technologies: [
            {
                title: "HTML5",
                alt: "icon html5",
                image: html,
                css: ""
            },
            {
                title: "CSS3",
                alt: "icon css3",
                image: css,
                css: ""
            },
            {
                title: "JavaScript",
                alt: "icon JS EcmaScript6",
                image: js,
                css: ""
            },
            {
                title: "ReactJS",
                alt: "icon react",
                image: react,
                css: ""
            },
            {
                title: "Vue 3",
                alt: "icon vue js",
                image: vue,
                css: ""
            },
            {
                title: "Ionic Framework",
                alt: "icon ionic",
                image: ionic,
                css: "#bbb"
            },
            {
                title: "Quasar Framework",
                alt: "icon quasar",
                image: quasar,
                css: ""
            },
            {
                title: "Zustand",
                alt: "icon Zustand",
                image: zustand,
                css: ""
            }
        ],
        back_Technologies: [
            {
                title: "NodeJS",
                alt: "icon nodejs",
                image: nodejs,
                css: "rgba(0, 0, 0, 0.9)"
            },
            {
                title: "ExpressJS",
                content: "Express <span> JS</span>",
                css: "#ddd"
            },
            {
                title: "MongoDB",
                alt: "icon mongodb",
                image: mongodb,
                css: "#a5a284",
            },
            {
                title: ".Net",
                alt: "icon .net",
                image: net,
                css: ""
            },
            {
                title: "EF Core",
                alt: "icon entity framework core",
                image: entityFramework,
                css: ""
            },
            {
                title: "Sql Server",
                alt: "icon sql server",
                image: sqlServer,
                css: "#1C5FF8"
            },
            {
                title: "MySQL",
                alt: "icon mysql",
                image: mysql,
                css: "#eee"
            }
        ],
        other_technology: [
            {
                title: "TypeScript",
                alt: "icon typescript",
                image: typescript,
                css: ""
            },
            {
                title: "Git",
                alt: "icon git",
                image: git,
                css: ""
            },
            {
                title: "NVM",
                alt: "icon nvm",
                image: nvm,
                css: ""
            }
        ],
        coming_soon: [
            {
                title: "NextJS",
                alt: "icon nextjs",
                image: nextjs,
                css: ""
            },
            {
                title: "React Native",
                alt: "icon react native",
                image: reactnative,
                css: "#fff"
            }
        ]
    },
    doneProjects: {
        myWorks: "Proyectos realizados",
        projects: [
            {
                title: "Album Virtual",
                "description": "Este proyecto fue desarrollado previamente dentro del cursado de la Tecnicatura de Software. Nos permite coleccionar albumes y comprar las figuras de los albumes coleccionados.",
                "createdWith": "Esta aplicacion esta siendo creada utilizando: <br/> <b>- En el <i>Back-End</i> :</b> NodeJS, ExpressJS, TypeScript y MongoDB, implementando una <b>Arquitectura orientada a Microservicios.</b> <br/> <b>- En el <i>Front-End</i> :</b> ReactJS con sus respectivos Hooks y Custom Hooks, TypeScript, Zustand y Vite <b> implementando una arquitectura orientada al Clean Architecture.</b> <br/>",
                datesModal: [
                    {
                        title: "<b>PERIODO:</b>",
                        content: "05/12/2022 - 02/04/2023"
                    },
                    {
                        title: "<b>TIPO:</b>",
                        content: "Sitio <i>Web</i>"
                    },
                    {
                        title: "<b>ENLACE:</b>",
                        content: "<a href='https://album-virtual.netlify.app/' target='_blank' rel='noopener'>Haz click aqui</a>"
                    },
                    {
                        title: "<b>REPOSITORIO:</b>",
                        content: "<a href='https://github.com/JCLedesmaDev/Album-Virtual' target='_blank' rel='noopener'>Haz click aqui</a>"
                    }
                ],
                images: {
                    mainImage: figuritas1,
                    imagesModal: [figuritas1, figuritas2, figuritas3, figuritas4, figuritas5],
                }
            },
            {
                title: "Sistema de Gestion de Productos",
                "description": "Este proyecto fue desarrollado dentro del cursado de la Tecnicatura de Software en colaboracion con Vanesa Herrera. Nos permite gestionar Productos.",
                "createdWith": "Esta aplicacion esta siendo creada utilizando: <br/> <b>- En el <i>Back-End</i> :</b> .NET 4.7.2 y SqlClient aplicando conocimientos sobre Store Procedure. <br/> <b>- En el <i>Front-End</i> :</b> Windows Form. <br/>",
                datesModal: [
                    {
                        title: "<b>COLABORADORA:</b>",
                        content: "<a href='https://github.com/Vanemariel' target='_blank' rel='noopener'> Github de Vanesa Herrera </a>"
                    },
                    {
                        title: "<b>PERIODO:</b>",
                        content: "14/09/2022 - 21/10/2022"
                    },
                    {
                        title: "<b>TIPO:</b>",
                        content: "<i>Escritorio</i>"
                    },
                    {
                        title: "<b>REPOSITORIO:</b>",
                        content: "<a href='https://github.com/JCLedesmaDev/Productos-con-SQL-y-Capas' target='_blank' rel='noopener'>Haz click aqui</a>"
                    }
                ],
                images: {
                    mainImage: productos1,
                    imagesModal: [productos1, productos2, productos3, productos4, productos5],
                },
            },
            {
                title: "Turnero de Peluqueria",
                "description": "Este proyecto fue desarrollado dentro del cursado de la Tecnicatura de Software. Nos permite saber si hay un turno reservado.",
                "createdWith": "Esta aplicacion esta siendo creada utilizando: <br/> <b>- En el <i>Back-End</i> :</b> .NET 6, Entity Framework, SQL Server. <br/> <b>- En el <i>Front-End</i> :</b> Blazor Web Assembly acompañada de la libreria 'Radzen Blazor Components', aplicando conocimientos tales como el manejo de estados por Actions <br/>",
                datesModal: [
                    {
                        title: "<b>PERIODO:</b>",
                        content: "02/07/2022 - 13/09/2022"
                    },
                    {
                        title: "<b>TIPO:</b>",
                        content: "Diseño <i>Web Responsive</i>"
                    },
                    {
                        title: "<b>REPOSITORIO:</b>",
                        content: "<a href='https://github.com/JCLedesmaDev/Turnero-Peluqueria' target='_blank' rel='noopener'>Haz click aqui</a>"
                    }
                ],
                images: {
                    mainImage: turnero1,
                    imagesModal: [turnero1, turnero2, turnero3, turnero4, turnero5],
                },
            },
            {
                title: "Sistema de Gestion Mis actividades",
                "description": "Proyecto que nos permite registrar nuestras actividades dependiendo de su categoria",
                "createdWith": "Esta aplicacion fue creada utilizando: <br> <b>- En el <i>Front-End</i> :</b> Ionic con React y TypeScript con sus respectivos Hooks tales como:  useEffect, useContext, useReducer y Hooks personalizados. <br/>",
                datesModal: [
                    {
                        title: "<b>PERIODO:</b>",
                        content: "16/01/2022 - 01/03/2022"
                    },
                    {
                        title: "<b>TIPO:</b>",
                        content: "Aplicacion movil"
                    },
                    {
                        title: "<b>REPOSITORIO:</b>",
                        content: "<a href='https://github.com/JCLedesmaDev/Sistema-de-Gestion-de-Mis-actividades' target='_blank' rel='noopener'>Haz click aqui</a>"
                    },
                    {
                        title: "<b>DESCARGAR APK:</b>",
                        content: "<a href='https://drive.google.com/file/d/1V7vvkIhBCB36NC-2U6Dmt2yS5IScJEzH/view?usp=sharing' target='_blank' rel='noopener'>Haz click aqui</a>"
                    }
                ],
                images: {
                    mainImage: activities1,
                    imagesModal: [activities1, activities2, activities3, activities4, activities5],
                },
            },
            {
                title: "Pagina Web - Mi portafolio",
                "description": "Proyecto para la presentacion de mis conocimientos en el desarrollo web.",
                "createdWith": "Esta aplicacion fue creada utilizando: <br> <b>- En el <i>Front-End</i> :</b> React con TypeScript, Axios, Html-react-parser",
                datesModal: [
                    {
                        title: "<b>PERIODO:</b>",
                        content: "12/12/2021 - 02/02/2022"
                    },
                    {
                        title: "<b>TIPO:</b>",
                        content: "PWA ( <i>Progressive Web App</i> )"
                    },
                    {
                        title: "<b>REPOSITORIO:</b>",
                        content: "<a href='https://github.com/JCLedesmaDev/Portafolio' target='_blank' rel='noopener'>Haz click aqui</a>"
                    }
                ],
                images: {
                    mainImage: portfolio1,
                    imagesModal: [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5],
                },
            },
            {
                title: "Sistema de Gestion de Proyectos con Stack M.E.R.N",
                "description": "Proyecto que nos permite anotar las tareas pendientes a desarrollar, de cada proyecto en particular en el que estemos trabajando.",
                "createdWith": "Esta aplicacion esta siendo creada utilizando: <br/> <b>- En el <i>Back-End</i> :</b> NodeJS, Express, MongoDB. <br/> <b>- En el <i>Front-End</i> :</b> ReactJS con sus respectivos Hooks tales como: useState, useEffect, useContext y useReducer; <br/>",
                datesModal: [
                    {
                        title: "<b>PERIODO:</b>",
                        content: "19/03/2021 - 24/04/2021"
                    },
                    {
                        title: "<b>TIPO:</b>",
                        content: "Diseño <i>Web Responsive</i>"
                    },
                    {
                        title: "<b>REPOSITORIO:</b>",
                        content: "<a href='https://github.com/JCLedesmaDev/Sistema-de-Gestion-de-Proyectos' target='_blank' rel='noopener'>Haz click aqui</a>"
                    }
                ],
                images: {
                    mainImage: crud_MERN1,
                    imagesModal: [crud_MERN1],
                },
            },
            {
                title: "Sistema de Gestion de Libros",
                "description": "Proyecto que lleva el registro de una bibloteca personal para organizar tu propia bibloteca.",
                "createdWith": "Esta aplicacion fue creada utilizando: <br/> <b>- En el <i> Back-End</i> :</b> NodeJS, ExpressJS, MongoDB. <br/> <b>- En el <i>Front-End</i> :</b> HTML5, CSS3 / Bootstrap 4 y Vanilla JavaScript.",
                datesModal: [
                    {
                        title: "<b>PERIODO:</b>",
                        content: "16/10/2020 - 10/11/2020"
                    },
                    {
                        title: "<b>TIPO:</b>",
                        content: "Sitio <i>Web Responsive</i>"
                    },
                    {
                        title: "<b>REPOSITORIO:</b>",
                        content: "<a href='https://github.com/JCLedesmaDev/Sistema-de-Gestion-de-Libros' target='_blank' rel='noopener'>Haz click aqui</a>"
                    }
                ],
                images: {
                    mainImage: crud_libros1,
                    imagesModal: [crud_libros1, crud_libros2, crud_libros3, crud_libros4, crud_libros5],
                },
            }
        ],
        clickMe: "Haz click para saber mas..."
    },
    footer: {
        sitie: "Sitio diseñado por ",
        linkedIn: "<a href='https://www.linkedin.com/in/juan-cruz-ledesma/' target='_blank' rel='noopene'> Juan Cruz Ledesma </a>",
        gitHub: "<a href='https://github.com/JCLedesmaDev' target='_blank' rel='noopene'> @JCLedesmaDev </a>"
    }
}