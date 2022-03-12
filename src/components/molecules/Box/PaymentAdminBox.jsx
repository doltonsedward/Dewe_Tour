import { useState } from "react";
import { LogoSecond } from "../../../assets";
import { Gap, Group, Text } from "../../atoms";
import {
  warningButton,
  pendingButton,
  successButton,
  greenButton,
  redButton,
} from "../../../utils";

// mui component
import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const PaymentAdminBox = ({ item, setter, fetching, func }) => {
  let boxStatus, textBoxStatus;
  const { setOpen } = setter;
  const { getTransactions } = fetching;
  const { toast, API } = func;

  const [loading, setLoading] = useState(true);

  switch (item.status) {
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

  const handleSubmit = async (status) => {
    try {
      const paymentStatus = status === "cancel" ? "Cancel" : "Approve";

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ status: paymentStatus });

      await API.patch("/transaction/" + item.id + "/admin", body, config);

      getTransactions();
      setOpen(false);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      toast.error(message || "Unknow error");
    }

    if (status === "cancel") {
      try {
        const totalFilled =
          status === "cancel" ? item.filled + item.qty : item.filled;

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify({
          filled: totalFilled,
        });

        await API.patch("/trip/" + item.idTrip, body, config);
      } catch (error) {
        const message = error?.response?.data?.message || error?.message;
        toast.error(message || "Unknow error");
      }
    }
  };

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  const filterDateTrip = item?.dateTrip
    .split(":")[0]
    .split("T")[0]
    .split("-")
    .reverse();
  switch (filterDateTrip[1]) {
    case "01":
      filterDateTrip[1] = "January";
      break;
    case "02":
      filterDateTrip[1] = "February";
      break;
    case "03":
      filterDateTrip[1] = "Maret";
      break;
    case "04":
      filterDateTrip[1] = "April";
      break;
    case "05":
      filterDateTrip[1] = "Mei";
      break;
    case "06":
      filterDateTrip[1] = "June";
      break;
    case "07":
      filterDateTrip[1] = "July";
      break;
    case "08":
      filterDateTrip[1] = "Augusts";
      break;
    case "09":
      filterDateTrip[1] = "September";
      break;
    case "10":
      filterDateTrip[1] = "October";
      break;
    case "11":
      filterDateTrip[1] = "November";
      break;
    case "12":
      filterDateTrip[1] = "December";
      break;

    default:
      return;
  }

  const newGreenButton = {
    ...greenButton,
    marginLeft: "15px",
  };

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
          <div className="content__payment">
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
                      {item.name}
                    </Text>
                    <Text variant="p" fontSize={14} className="color-second">
                      Australia
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
                      {filterDateTrip.join(" ")}
                    </Text>
                    <Gap height={27} />
                    <Text variant="bold" fontSize={18}>
                      Accomodation
                    </Text>
                    <Text variant="bold" fontSize={14} className="color-second">
                      {item?.accomodation}
                    </Text>
                  </div>
                  <div>
                    <Text variant="bold" fontSize={18}>
                      Duration
                    </Text>
                    <Text variant="bold" fontSize={14} className="color-second">
                      {item?.duration}
                    </Text>
                    <Gap height={27} />
                    <Text variant="bold" fontSize={18}>
                      Transportation
                    </Text>
                    <Text variant="bold" fontSize={14} className="color-second">
                      {item?.transportation}
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
                    <img src={item.attachment} alt="transfer proof" />
                    <input type="file" name="attachment" />
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
                    <td className="table-bold">{item.qty}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="table-bold">Total</td>
                    <td className="table-bold">:</td>
                    <td className="table-bold color-warning">
                      {item.type}.
                      {item?.totalPayment
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p
              style={{
                padding: "25px 36px",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <Button
                variant="contained"
                sx={redButton}
                onClick={() => handleSubmit("cancel")}
              >
                cancel
              </Button>

              <Button
                variant="contained"
                sx={newGreenButton}
                onClick={() => handleSubmit("approve")}
              >
                approve
              </Button>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentAdminBox;
