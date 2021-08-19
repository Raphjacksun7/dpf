import React,{ useState } from 'react';
import Select from 'react-select';
import {Typography,Space,Input } from 'antd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss"


const { Title } = Typography;
const { TextArea  } = Input;


const AddActivity = () => {

  const clientsOptions = [
    { value: 'chocolate', label: 'Kristen Muller' },
    { value: 'strawberry', label: 'Marc Santos' },
    { value: 'vanilla', label: 'Hardy Perslyn' }
  ]

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,  
        ':active': {
          ...styles[':active'],
          backgroundColor: "#1976D2",
        },
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#1976D2",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#FFF",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#FFF",
      ':hover': {
        backgroundColor: "#E1F5FE",
        color: '#1976D2',
      },
    }),
  };

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
              styles={colourStyles}
            />
        </div>
        <div className="form-group">
          <label>Activités realisées</label>
          <Select
              placeholder="Sélectionner les activités realisées"
              className="basic-single"
              classNamePrefix="select"
              isMulti
              isClearable
              isSearchable
              name="activity"
              options={clientsOptions}
              styles={colourStyles}
            />
        </div>
        <div className="form-group">
          <label>Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <Space>
            
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="Time"
              dateFormat="h:mm aa"
            /> */}
          </Space>
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
              options={clientsOptions}
              styles={colourStyles}
            />
        </div>
        <div className="form-group">
          <label>Description (optionel) </label>
          <TextArea  rows={4}></TextArea >
        </div>
      </div>
    </>
  )
}

export default AddActivity








