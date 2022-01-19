import "./Box.scss";

// box component
import ContentBox from "./ContentBox";
import PaymentBox from "./PaymentBox";
import CardBox from "./CardBox";
import PaymentAdminBox from "./PaymentAdminBox";

const DashboardBox = ({ heading, text, theme }) => {
  const dashboardClass = `dashboard-box ${theme}`;
  return (
    <div className={dashboardClass}>
      <p>{heading}</p>
      <p>{text}</p>
    </div>
  );
};

export { CardBox, ContentBox, PaymentBox, PaymentAdminBox, DashboardBox };
