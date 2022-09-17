import parse from "html-react-parser";
import SocialsCSS from "../../Components/Socials.module.css";

interface Props {
    Contact: any;
    IndexContact: number
}

export const Tarjet: React.FC<Props> = ({Contact,IndexContact }) => {


  return (
    <aside
      key={IndexContact}
      className={`${SocialsCSS.contact__cardTarget} box-shadow`}
    >
      <i className={Contact?.icon} />
      <h5>{Contact?.title}</h5>
      {
        IndexContact !== 3 ? (
          <small>{parse(Contact.links[0])}</small>
        ) : (
          <div>
            {Contact?.links.map((link : any, indexLink: any) => (
              <small key={indexLink}>{parse(link)}</small>
            ))}
          </div>
        )
      }
    </aside>
  )
}