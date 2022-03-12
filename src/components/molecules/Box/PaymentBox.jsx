import { LogoSecond, ImgCamera } from "../../../assets";
import { Gap, Group, Text } from "../../atoms";
import {
  paymentButton,
  warningButton,
  pendingButton,
  successButton,
} from "../../../utils";
import { toast } from "react-toastify";

// import API
import { API } from "../../../config";

// mui component
import { LoadingButton } from "@mui/lab";
import { Button, Skeleton, Stack } from "@mui/material";

import { useState } from "react";

const PaymentBox = ({
  name,
  country,
  type,
  count,
  status,
  item,
  value,
  fetching,
  ...rest
}) => {
  // console.clear()
  let boxStatus, textBoxStatus;

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState([
    {
      status: "",
      attachment: item.attachment,
    },
  ]);

  switch (status) {
    case "Waiting payment":
      boxStatus = warningButton;
      textBoxStatus = "Waiting Payment";
      break;

    case "Waiting approval":
      boxStatus = pendingButton;
      textBoxStatus = "Waiting Approve";
      break;

    case "Approve":
      boxStatus = successButton;
      textBoxStatus = "Approve";
      break;

    case "Cancel":
      boxStatus = warningButton;
      textBoxStatus = "Canceled";
      break;

    default:
      break;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      status: "Waiting approval",
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async () => {
    setButtonLoading(true);

    try {
      const formData = new FormData();
      formData.set("status", form.status);
      formData.set(
        "attachment",
        form.attachment[0],
        form.attachment[0].filename
      );

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const body = formData;

      const response = await API.patch("/transaction/" + item.id, body, config);
      fetching();
      setButtonLoading(false);
      toast.success(response?.data.message);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Unknow error");
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const filled = item.trip.filled - item.counterQty;

      const body = JSON.stringify({ filled });

      await API.patch("/trip/" + item.tripId, body, config);
    } catch (error) {
      const message = error?.response?.data?.message || error.message;
      toast.error(message || "Unknow error");
    }
  };

  setTimeout(() => {
    setLoading(false);
  }, 500);

  return (
    <>
      <div className="main">
        {loading ? (
          <Stack
            sx={{
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={159}
              height={68}
              sx={{ marginBottom: "10px" }}
            />
            <Skeleton variant="rectangular" height={100} />
            <Gap height={76} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </div>
          </Stack>
        ) : (
          <div className="content__payment" key={Date.now()}>
            <Group
              variant="space-between-only"
              className="detail-heading__payment"
            >
              <div className="left-side__heading_payment">
                <img src={LogoSecond} alt="" />
                <Gap height={28} />
                <Group variant="space-between-only">
                  <div>
                    <Text variant="bold" fontSize={24}>
                      {name}
                    </Text>
                    <Text variant="p" fontSize={14} className="color-second">
                      {country}
                    </Text>
                    <Gap height={31} />
                    <Button variant="text" sx={boxStatus}>
                      {textBoxStatus}
                    </Button>
                  </div>
                  <div>
                    <Text variant="bold" fontSize={18}>
                      Date Trip
                    </Text>
                    <Text variant="bold" fontSize={14} className="color-second">
                      26 August 2021
                    </Text>
                    <Gap height={27} />
                    <Text variant="bold" fontSize={18}>
                      Accomodation
                    </Text>
                    <Text variant="bold" fontSize={14} className="color-second">
                      {item?.trip?.accomodation}
                    </Text>
                  </div>
                  <div>
                    <Text variant="bold" fontSize={18}>
                      Duration
                    </Text>
                    <Text variant="bold" fontSize={14} className="color-second">
                      6 Day 4 Night
                    </Text>
                    <Gap height={27} />
                    <Text variant="bold" fontSize={18}>
                      Transportation
                    </Text>
                    <Text variant="bold" fontSize={14} className="color-second">
                      {item?.trip?.transportation}
                    </Text>
                  </div>
                </Group>
              </div>
              <div className="right-side__heading_payment">
                <Text variant="bold" fontSize={36} lineHeight="49px">
                  Booking
                </Text>
                <Text
                  variant="p"
                  fontSize={18}
                  lineHeight="25px"
                  className="color-second"
                >
                  <strong>Friday</strong> 5 Nov 2021
                </Text>
                <Gap height={20} />
                <Group className="text-center">
                  <div className="transfer-image__payment">
                    {preview ? (
                      <img src={preview} alt="transfer proof" />
                    ) : item?.attachment ? (
                      <img src={item?.attachment} alt="transfer proof" />
                    ) : (
                      <img src={ImgCamera} alt="transfer proof" />
                    )}
                    <input
                      type="file"
                      name="attachment"
                      onChange={handleChange}
                    />
                  </div>
                  <Gap height={12.63} />
                  <Text
                    variant="p"
                    fontSize={13}
                    lineHeight="15px"
                    className="color-second"
                  >
                    Upload payment proof
                  </Text>
                </Group>
              </div>
            </Group>
            <Gap height={9.18} />
            <div className="detail-body__payment">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Full Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{item?.user?.fullName}</td>
                    <td>{item?.user?.address}</td>
                    <td>{item?.user?.phone}</td>
                    <td className="table-bold">Qty</td>
                    <td className="table-bold">:</td>
                    <td className="table-bold">{count}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="table-bold">Total</td>
                    <td className="table-bold">:</td>
                    <td className="table-bold color-warning">
                      {type}.{" "}
                      {item?.total
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <Gap height={28} />
        <p className="text-right">
          {status === "Waiting payment" ? (
            <LoadingButton
              variant="contained"
              loading={buttonLoading}
              sx={paymentButton}
              onClick={handleSubmit}
              {...rest}
            >
              pay
            </LoadingButton>
          ) : null}
        </p>
      </div>
      <Gap height={86} />
    </>
  );
};

export default PaymentBox;
