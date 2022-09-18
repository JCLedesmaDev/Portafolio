import { useLocation } from 'react-use';
import { useMyData } from '../../../../Hooks/useMyData';
import ModalMessageCSS from './ModalMessage.module.css'


interface Props{}

export const ModalMessage : React.FC<Props> = () => {
  
  /// HOOKS
  const location = useLocation().hash;
  const { contact } = useMyData();
  
   return (
    <div>
      <article className={ModalMessageCSS.modalContainer}>
        <h3>
          {location?.includes("#gracias") && contact?.modalContact}
          {location?.includes("#ups") && contact?.modalContactError}
        </h3>

        <i className="far fa-smile-wink"></i>
      </article>
    </div>

   )
}