import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Gap, Text } from "../../../../components";
import { muiButton } from "../../../../utils";
import useBookingHandler from "./utils";
import ListTourContainer from "./ListTourContainer";
import BookingCountingSection from "./BookingCountingSection";

const ContentListTour = ({
  image,
  accomodation,
  transportation,
  eat,
  tourDateTime,
  dateTrip,
  description,
  price,
  type,
  filled,
  idParams,
}) => {
  const users = useSelector((state) => state);
  const userId = users.user.id;

  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const { totalPriceInString, handleBooking } = useBookingHandler({ count, price, idParams, userId });

  const allCoverImage = image?.slice(1);

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <div className="content__listTour">
      {loading ? (
        ""
      ) : (
        <img className="heading-img__listTour" src={image[0]} alt="new york" />
      )}
      <ul className="wrapper-child__listTour">
        {allCoverImage?.map((img, i) => {
          return (
            // need watched
            <li key={i} className="child-cover-image__listTour">
              <img src={img} alt={img} />
            </li>
          );
        })}
      </ul>
      <Gap height={46.88} />
      <ListTourContainer
        accomodation={accomodation}
        transportation={transportation}
        eat={eat}
        tourDateTime={tourDateTime}
        dateTrip={dateTrip}
      />
      <Gap height={48} />
      <Text variant="bold">Description</Text>
      <Text variant="p" fontSize={14} className="color-second">
        {description}
      </Text>
      <Gap height={26} />
      <BookingCountingSection
        type={type}
        filled={filled}
        price={price}
        count={count}
        onSetCount={setCount}
      />
      <div className="group-total d-flex-between">
        <Text variant="bold" fontSize={24} className="total-count">
          Total :
        </Text>
        <Text
          variant="bold"
          fontSize={24}
          className="total-count color-theme"
        >{`${type} ${totalPriceInString}`}</Text>
      </div>
      <p className="text-right">
        {users.isLogin ? (
          <Button variant="contained" sx={muiButton} onClick={handleBooking}>
            Book now
          </Button>
        ) : null}
      </p>
      <Gap height={44} />
    </div>
  );
};

export default ContentListTour;
