import React,{useEffect} from "react";
import { ToggleButton } from "@material-ui/lab";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
function Switch({ anually_flag }) {
  const [alignment, setAlignment] = React.useState("Monthly");
  const handleAlignment = (event, newAlignment) => {
    console.log(newAlignment);
    setAlignment(newAlignment);
  };
  return (
    <div className="switch_button">
      {anually_flag ? (
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            value="Monthly"
            aria-label="centered"
            className="switch_first_button"
          >
            <div>Monthly</div>
          </ToggleButton>
          <ToggleButton
            value="Annually"
            aria-label="left aligned"
            className="switch_second_button"
          >
            <div>Annually</div>
          </ToggleButton>
        </ToggleButtonGroup>
      ) : (
        ""
      )}
    </div>
  );
}

export default Switch;
