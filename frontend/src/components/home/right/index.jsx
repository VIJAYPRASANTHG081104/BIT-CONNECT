// import { Dots, NewRoom, Search } from "../../../svg";
import Dots from '../../../svg/dots'
import NewRoom from '../../../svg/newRoom'
import Search from '../../../svg/search'
import Contact from "./Contact";
import "./style.css";
export default function RightHome({ user }) {
  const color = "#65676b";
  return (
    <div className="right_home">
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Contacts</div>
        </div>
        <div className='splitter'></div>
        <div className="contacts_list">
          <Contact user={user} />
        </div>
      </div>
    </div>
  );
}
