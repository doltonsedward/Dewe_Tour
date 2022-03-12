import "./AddTrip.scss";

import { Gap, Group, Text, Input, Option } from "../../../components";
import { muiButton } from "../../../utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { API } from "../../../config";

// MUI component
import { Button } from "@mui/material";

const AddTrip = () => {
  console.clear();

  const [countries, setCountries] = useState([]);
  const [preview, setPreview] = useState([]);
  const [form, setForm] = useState({
    title: "",
    countryId: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    dateTrip: "",
    price: 0,
    quota: 0,
    type: "",
    description: "",
    image: "",
  });

  const inputStyle = {
    padding: "0 calc(136px - 87px)",
  };

  const getCountry = async () => {
    try {
      const response = await API.get("/countrys");
      setCountries(response.data.data);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      toast.error(message || "Unknow");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    const allUrlImage = [];
    if (e.target.type === "file") {
      for (let i = 0; i < e.target.files.length; i++) {
        allUrlImage.push(URL.createObjectURL(e.target.files[i]));
      }

      setPreview(allUrlImage);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("countryId", form.countryId);
      formData.append("accomodation", form.accomodation);
      formData.append("transportation", form.transportation);
      formData.append("eat", form.eat);
      formData.append("day", form.day + " Day");
      formData.append("night", form.night + " Night");
      formData.append("dateTrip", form.dateTrip);
      formData.append("price", form.price);
      formData.append("quota", form.quota);
      formData.append("filled", form.quota);
      formData.append("type", form.type);
      formData.append("description", form.description);
      for (let i = 0; i < form.image.length; i++) {
        formData.append("image", form.image[i]);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const body = formData;

      const response = await API.post("/trip", body, config);

      const message = response?.data?.message;
      toast.success(message || "Add trip success");
    } catch (error) {
      const message = error?.response?.data?.message || error?.message;
      toast.error(message || "Unknow");
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className="header-default">
      <div className="hero"></div>
      <Gap height={105} />
      <Group style={{ padding: "0 87px" }}>
        <Text variant="h1" fontSize={36}>
          Add trip
        </Text>
        <Gap height={62} />
        <Group style={inputStyle}>
          <Input
            label="Title"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Text variant="p" fontWeight="bold">
            Country
          </Text>
          <Gap height={10} />
          <select
            className="select-country"
            name="countryId"
            onChange={handleChange}
          >
            {countries.map((item) => {
              return <Option item={item} />;
            })}
          </select>
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            label="Accomodation"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="accomodation"
            value={form.accomodation}
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            label="Transportation"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="transportation"
            value={form.transportation}
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            label="Eat"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="eat"
            value={form.eat}
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Text variant="p" fontSize={18} fontWeight="bold">
            Duration
          </Text>
          <Group className="d-flex">
            <Group className="d-flex-center-x">
              <Input
                inputbgcolor="#C4C4C480"
                inputwidth={100}
                inputheight="49px"
                inputborder="2px solid #B1B1B1"
                type="number"
                min="1"
                name="day"
                value={form.day}
                onChange={handleChange}
              />
              <Gap width={15} />
              <Text variant="p" fontWeight="bold">
                Day
              </Text>
            </Group>
            <Gap width={50} />
            <Group className="d-flex-center-x">
              <Input
                inputbgcolor="#C4C4C480"
                inputwidth={100}
                inputheight="49px"
                inputborder="2px solid #B1B1B1"
                type="number"
                min="1"
                name="night"
                value={form.night}
                onChange={handleChange}
              />
              <Gap width={15} />
              <Text variant="p" fontWeight="bold">
                Night
              </Text>
            </Group>
          </Group>
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            label="Date Trip"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="dateTrip"
            value={form.dateTrip}
            type="date"
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            label="Price"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            label="Type"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="type"
            value={form.type}
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            label="Quota"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="quota"
            value={form.quota}
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            label="Description"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          <Input
            variant="file"
            label="Image"
            inputbgcolor="#C4C4C480"
            inputheight="49px"
            inputborder="2px solid #B1B1B1"
            name="image"
            onChange={handleChange}
            multiple
          />
        </Group>
        <Gap height={40} />
        <Group style={inputStyle}>
          {preview.map((item) => {
            return (
              <img
                width="150px"
                src={item}
                className="mr-s"
                alt="for preview"
              />
            );
          })}
        </Group>
      </Group>
      <Gap height={115} />
      <p className="text-center">
        <Button variant="contained" sx={muiButton} onClick={handleSubmit}>
          add trip
        </Button>
      </p>
      <Gap height={100} />
    </div>
  );
};

export default AddTrip;
