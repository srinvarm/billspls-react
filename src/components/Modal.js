import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Loader from '../components/Loader'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  function createData(name: string, calories: number) {
    return { name, calories };
  }
  
  const rows = [
    createData('16/07/1999', "Download"),
    createData('16/08/1998', "Download"),
  ];
const ModalPopUp=({msg,ModalShow,hide,response,loader,button})=> {
    const classes = useStyles();
    const style={
        marginTop:"10%"
      }
    return (
        <div className="Modalpopup">
        <Modal size="lg"  centered className="uploadMod" show={ModalShow} onHide={hide} animation={false}>
        <div className="row justify-content-center upload">
            <h5>{msg}</h5>
            <p>{response}</p>
            {loader?<Loader style={style}/>:""}
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Paid Date</TableCell>
            <TableCell align="right">Download</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            <button className="register-button" onClick={hide}>{button}</button>
        </div>
        </Modal>
    </div>
    )
}

export default ModalPopUp