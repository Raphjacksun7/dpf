export const  selectColorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        ":active": {
          ...styles[":active"],
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
      ":hover": {
        backgroundColor: "#E1F5FE",
        color: "#1976D2",
      },
    }),
  };
