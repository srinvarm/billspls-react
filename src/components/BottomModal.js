import React from 'react';
import Sheet from 'react-modal-sheet';
import Button from "@material-ui/core/Button";

function Example() {
  const [isOpen, setOpen] = React.useState(false);
  console.log(isOpen)
  const Close=()=> {
      setOpen(false)
  }
  const open=()=> {
      setOpen(true)
  }
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open sheet</button>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[240]}  initialSnap={0}>
        <Sheet.Container>
          <Sheet.Content>
          <div className="bottom_modal_data">
            <h4>Cancel Subscription</h4>
            <p>Are you sure want to cancel this subscription?</p>
            <p>We miss you going ☹️</p>
            <p>Your app data will be safe with us for the next 15 days. Backup to avoid data loss.</p>
            </div>
            <div className="bottom_modal_buttons">
                <Button onClick={Close} className="cancel_button">CANCEL</Button>
                <Button onClick={open} className="dontcancel_button">DON'T CANCEL</Button>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}
export default Example