import { PaymentBox } from "..";
import { ImageEmpty3D } from "../../../assets";

const TabPanelProfile = ({
  UIComponent: { TabPanel },
  dataFiltering,
  getter: { value, preview, index },
}) => {
  return (
    <TabPanel value={value} index={index}>
      {!dataFiltering.length ? (
        <p className="text-center">
          <img
            style={{ width: "450px", maxWidth: "90%" }}
            src={ImageEmpty3D}
            alt=""
          />
        </p>
      ) : (
        dataFiltering.map((item) => {
          return (
            <PaymentBox
              name={item?.trip?.title}
              country="Australia"
              type={item?.trip?.type}
              count={item?.counterQty}
              totalPayment={item.total}
              status={item.status}
              item={item}
              preview={preview}
            />
          );
        })
      )}
    </TabPanel>
  );
};

export default TabPanelProfile;
