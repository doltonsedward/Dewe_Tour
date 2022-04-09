import "./DetailTrip.scss";
import { useHistory, useParams } from "react-router";
import { Gap, Text } from "../../components";
import { muiButton, setData } from "../../utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListTourContainer from "./ListTourContainer";
import BookingCountSection from "./BookingCountSection";

import { API } from "../../config";

// mui component
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const DetailTrip = () => {
  console.clear();
  document.title = `DeweTour | Detail Trip`;

  const history = useHistory();
  const { id } = useParams();

  const [detailTrip, setDetailTrip] = useState({});
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    counterQty: "",
    total: "",
    status: "Waiting payment",
    attachment: "",
    tripId: "",
    userId: "",
  });

  const getDetailTrip = async (id) => {
    try {
      const response = await API.get("/trip/" + id);
      setDetailTrip(response.data.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Unknow error");
    }
  };

  useEffect(() => {
    getDetailTrip(id);
  }, []);

  const {
    accomodation,
    dateTrip,
    day,
    description,
    eat,
    image,
    night,
    filled,
    price,
    title,
    transportation,
    type,
    country,
  } = detailTrip;

  const allCoverImage = image?.slice(1);

  if (!Number(id)) {
    history.push("/");
  }

  const totalPrice = price * count;

  // convert totalprice from integer to string
  const totalPriceInString = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // for handling booking button
  const users = useSelector((state) => state);
  const userId = users.user.id;

  // for set data
  useEffect(() => {
    setForm({
      ...form,
      counterQty: count,
      total: isNaN(totalPrice) ? price : totalPrice,
      status: "Waiting payment",
      attachment: "",
      tripId: id,
      userId,
    });
  }, [count]);

  const handlerBooking = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const formData = new FormData();
      formData.set("counterQty", form.counterQty);
      formData.set("total", form.total);
      formData.set("status", form.status);
      formData.set("attachment", form.attachment);
      formData.set("tripId", form.tripId);
      formData.set("userId", form.userId);

      await API.post("/transaction", formData, config);
      setData("payment", form);

      toast.success("Booking success");
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Unknow error");
    }
  };

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <div className="detail-trip">
      <div className="hero"></div>
      <Gap height={66} />
      <div className="main">
        <div className="listTour">
          <Text variant="h1" fontSize={48}>
            {title}
          </Text>
          <Text variant="p" className="color-second">
            {country?.name}
          </Text>
          <Gap height={27} />
          <div className="content__listTour">
            {loading ? (
              ""
            ) : (
              <img
                className="heading-img__listTour"
                src={detailTrip?.image[0]}
                alt="new york"
              />
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
              day={day}
              night={night}
              dateTrip={dateTrip}
            />
            <Gap height={48} />
            <Text variant="bold">Description</Text>
            <Text variant="p" fontSize={14} className="color-second">
              {description}
            </Text>
            <Gap height={26} />
            <BookingCountSection
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
                <Button
                  variant="contained"
                  sx={muiButton}
                  onClick={handlerBooking}
                >
                  Book now
                </Button>
              ) : null}
            </p>
            <Gap height={44} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTrip;
