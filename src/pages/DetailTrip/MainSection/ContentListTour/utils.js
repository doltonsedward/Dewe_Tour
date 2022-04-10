import { useRef } from "react";
import { toast } from "react-toastify";
import { setData } from "../../../../utils";
import { API } from "../../../../config";

const useBookingHandler = ({ count, price, idParams, userId }) => {
  const totalPrice = price * count;

  // convert totalprice from integer to string
  const totalPriceInString =
    totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0;

  const form = useRef({
    counterQty: count,
    total: isNaN(totalPrice) ? price : totalPrice,
    status: "Waiting payment",
    attachment: "",
    tripId: idParams,
    userId,
  }).current;

  const handleBooking = async () => {
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

  return { handleBooking, totalPriceInString };
};

export default useBookingHandler;
