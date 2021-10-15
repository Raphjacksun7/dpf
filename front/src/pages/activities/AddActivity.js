import React, { useState } from "react";
import Select from "react-select";
import { Typography, Space, Input } from "antd";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import { selectColorStyles } from "../../config/colors";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

registerLocale("fr", fr);
const { Title } = Typography;
const { TextArea } = Input;

const AddActivity = () => {
  const clientsOptions = [
    { value: "chocolate", label: "Kristen Muller" },
    { value: "strawberry", label: "Marc Santos" },
    { value: "vanilla", label: "Hardy Perslyn" },
  ];

  const duration = [
    { value: "15m", label: "15m" },
    { value: "30m", label: "30m" },
    { value: "45m", label: "45m" },
    { value: "1h", label: "1h" },
  ];

  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Title level={3}>Ajouter un compte rendu d’activité</Title>
      <div className="form">
        <div className="form-group">
          <label>Dossier</label>
          <Select
            placeholder="Le dossier sur lequel vous avez travaillé"
            className="basic-single"
            classNamePrefix="select"
            isClearable="true"
            isSearchable="ture"
            name="folder"
            options={clientsOptions}
            styles={selectColorStyles}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <DatePicker
            locale="fr"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <Space></Space>
        </div>
        <div className="form-group">
          <label>Durér </label>
          <Select
            placeholder="0h 00m"
            className="basic-single"
            classNamePrefix="select"
            isClearable="true"
            isSearchable="ture"
            name="hours"
            options={duration}
            styles={selectColorStyles}
          />
        </div>
        <div className="form-group">
          <label>Description (optionel) </label>
          <TextArea rows={4}></TextArea>
        </div>
      </div>
    </>
  );
};

export default AddActivity;
