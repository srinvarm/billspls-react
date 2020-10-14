import React from "react";
import { ToggleButton } from "@material-ui/lab";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
function Switch() {
    const [alignment, setAlignment] = React.useState("monthly");
    const handleAlignment = (event, newAlignment) => {
      console.log(newAlignment)
      setAlignment(newAlignment);
    };
  return (
    <div className="switch_button">
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="monthly" aria-label="left aligned" className="switch_first_button">
          <div>Monthly</div>
        </ToggleButton>
        <ToggleButton value="Annually" aria-label="centered" className="switch_second_button">
          <div>Anually</div>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default Switch;
