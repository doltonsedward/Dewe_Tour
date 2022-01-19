import "./Contact.scss";

// MUI component
import Avatar from "@mui/material/Avatar";
import { StyledBadge } from "../../../utils";

const Contact = ({ datacontact, clickcontact, contact, useronline }) => {
  return (
    <div className="wrapper-contact">
      {datacontact.map((item) => {
        const status = useronline.hasOwnProperty(item.id) ? "dot" : "";

        return (
          <div
            key={item.id}
            className={`contact ${
              contact?.id === item?.id && "contact active" && "clicked"
            }`}
            onClick={() => clickcontact(item)}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant={status}
            >
              <Avatar alt={item?.fullName} src={item?.avatar} />
            </StyledBadge>
            <div className="ml-m">
              <p className="contact-name">{item.fullName}</p>
              <p className="text-contact-chat">{item.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Contact;
