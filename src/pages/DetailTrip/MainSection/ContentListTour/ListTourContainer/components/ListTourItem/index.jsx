import { Text } from "../../../../../../../components";

const ListTourItem = ({ icon, title, contentText }) => (
  <li>
    <Text variant="p" className="color-second">
      {title}
    </Text>
    <div className="wrapper-iconic">
      <img src={icon} alt={contentText} />
      <Text variant="bold">{contentText}</Text>
    </div>
  </li>
);

export default ListTourItem;