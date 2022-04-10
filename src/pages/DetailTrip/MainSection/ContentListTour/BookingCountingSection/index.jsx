import { Text } from "../../../../../components";
import { muiButton } from "../../../../../utils";

// mui component
import Button from "@mui/material/Button";

const BookingCountingSection = ({ type, filled, price, count, onSetCount }) => {
  const handleMaxCountPressed = () => count === 1 ? "" : onSetCount(count - 1);
  const handleCountWhenFilled = () => count === filled ? "" : onSetCount(count + 1);
  const priceInString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="group d-flex-between">
      <div className="d-flex">
        <Text
          variant="bold"
          fontSize={24}
          className="color-theme"
        >{`${type} ${priceInString}`}</Text>
        <Text variant="bold" fontSize={24} className="ml-s">
          / Person
        </Text>
      </div>
      <div className="d-flex">
        <Button
          variant="contained"
          sx={muiButton}
          onClick={handleMaxCountPressed}
        >
          -
        </Button>
        <Text variant="bold" fontSize={24} className="total-count">
          {count}
        </Text>
        <Button
          variant="contained"
          sx={muiButton}
          onClick={handleCountWhenFilled}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default BookingCountingSection;
