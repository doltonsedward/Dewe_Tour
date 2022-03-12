import { Gap } from "../../atoms";

// mui component
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { useState } from "react";

const ContentBox = ({
  img,
  heading,
  type,
  price,
  capacity,
  subtext,
  item,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const priceInString = item.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div {...rest}>
      <div className="content-box c-pointer">
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" height={241} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Stack>
        ) : (
          <>
            <span className="capacity__tour">
              {item.filled} / {item.quota}
            </span>
            <img
              src={item.image[0]}
              className="content-cover-image"
              alt={item.title}
            />
            <Gap height={11} />
            <p className="heading__content-box text-elipsis">{item.title}</p>
            <Gap height={10} />
            <div className="d-flex-between">
              <p className="subheading__content-box color-theme">
                {item.type}. {priceInString}
              </p>
              <p className="country__content-box">{item.country.name}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentBox;
