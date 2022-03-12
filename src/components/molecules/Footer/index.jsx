import "./Footer.scss";
import { IconLeaf } from "../../../assets";

const Footer = () => {
  return (
    <>
      <footer className="d-flex-center-y">
        Copyright @ 2021 Dewe Tour - Doltons Edward - NIS. All Rights reserved
        <img className="icon-footer" src={IconLeaf} alt="" />
      </footer>
    </>
  );
};

export default Footer;
