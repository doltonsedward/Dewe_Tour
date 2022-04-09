import { Gap, Text } from "../../../components";
import {
  IconHotel,
  IconPlane,
  IconMeal,
  IconTime,
  IconCalendar,
} from "../../../assets";
import ListTourItem from "./components/ListTourItem";

const ListTourContainer = ({
  accomodation,
  transportation,
  eat,
  day,
  night,
  dateTrip,
}) => {
  const listTourDatetimeFormat = `${day} Day ${night} Night`
    
  // filter date
  const filterDateTrip = dateTrip
    ?.split(":")[0]
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-");

  return (
    <div className="information__listTour">
      <Text variant="bold" title="Information trip" />
      <Gap height={20} />
      <ul className="d-flex-between flex-responsive">
        <ListTourItem icon={IconHotel} title="Accomodation" contentText={accomodation} />
        <ListTourItem icon={IconPlane} title="Transportation" contentText={transportation} />
        <ListTourItem icon={IconMeal} title="Eat" contentText={eat} />
        <ListTourItem icon={IconTime} title="Duration" contentText={listTourDatetimeFormat} />
        <ListTourItem icon={IconCalendar} title="Date Trip" contentText={filterDateTrip} />
      </ul>
    </div>
  );
};

export default ListTourContainer;
