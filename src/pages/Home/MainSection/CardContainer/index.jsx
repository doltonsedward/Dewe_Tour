import { LogoGuarante, LogoHeart, LogoAgent, LogoSupport, IconHibicus } from "../../../../assets";
import { Gap, CardBox } from "../../../../components";

const CardContainer = () => (
    <div className="wrapper-card d-flex-center-x">
          <CardBox
            logo={LogoGuarante}
            heading="Best Price Guarantee"
            text="A small river named Duren flows by their place and supplies"
          />
          <Gap width={70} />
          <CardBox
            logo={LogoHeart}
            heading="Best Price Guarantee"
            text="A small river named Duren flows by their place and supplies"
          />
          <Gap width={70} />
          <CardBox
            variant="card"
            logo={LogoAgent}
            heading="Best Price Guarantee"
            text="A small river named Duren flows by their place and supplies"
          />
          <Gap width={70} />
          <CardBox
            logo={LogoSupport}
            heading="Best Price Guarantee"
            text="A small river named Duren flows by their place and supplies"
          />
          <img className="p-absolute hibicus-icon" src={IconHibicus} alt="Covering tour" />
    </div>
  ); 

export default CardContainer;
