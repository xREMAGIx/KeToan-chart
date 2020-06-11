import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "Name" },
  { id: "cpkh", label: "Chi Phi Ke Hoach", align: "right" },
  {
    id: "cvkh",
    label: "Cong Viec Ke Hoach",

    align: "right",
  },
  {
    id: "cptt",
    label: "Chi Phi Thuc Te",

    align: "right",
  },
  {
    id: "cvtt",
    label: "Cong Viec Thuc Te",

    align: "right",
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    minWidth: "300px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    marginTop: theme.spacing(3),
    width: "90%",
  },
  container: {
    maxHeight: 400,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

function CustomizedLabel(props) {
  const { x, y, stroke, value } = props;
  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
}

function App() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [count, setCount] = React.useState(1);

  const [formData, setFormData] = React.useState({
    cpkh: 0,
    cvkh: 0,
    cptt: 0,
    cvtt: 0,
  });

  const [dataTable, setDataTable] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") handleTableDataChange();
  };

  const handleTableDataChange = () => {
    let data = { ...formData, name: count };
    if (data.cptt === "") data.cptt = null;
    if (data.cvtt === "") data.cvtt = null;
    setDataTable([...dataTable, data]);
    setFormData({ cpkh: 0, cvkh: 0, cptt: 0, cvtt: 0 });
    setCount((count) => count + 1);
  };

  return (
    <React.Fragment>
      <div className={classes.center}>
        <LineChart
          width={500}
          height={300}
          data={dataTable}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" domain={[0, 100]} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 200]} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="cpkh"
            stroke="#CF2D05"
            label={<CustomizedLabel />}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="cptt"
            stroke="#42CF05"
            label={<CustomizedLabel />}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cvkh"
            stroke="#05A7CF"
            label={<CustomizedLabel />}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cvtt"
            stroke="#9205CF"
            label={<CustomizedLabel />}
          />
        </LineChart>
      </div>

      <div className={classes.center}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add new Data
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Add data modal</h2>
              <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <TextField
                    id="name-input"
                    label="Ngay"
                    variant="outlined"
                    value={count}
                    disabled
                    name="name"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="cpkh-input"
                    label="Chi Phi Ke Hoach"
                    variant="outlined"
                    value={formData.cpkh}
                    type="number"
                    name="cpkh"
                    onChange={(e) => handleTextFieldChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="cvkh-input"
                    label="Cong Viec Ke Hoach"
                    variant="outlined"
                    value={formData.cvkh}
                    type="number"
                    name="cvkh"
                    onChange={(e) => handleTextFieldChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="cptt-input"
                    label="Chi Phi Thuc Te"
                    variant="outlined"
                    value={formData.cptt}
                    type="number"
                    name="cptt"
                    onChange={(e) => handleTextFieldChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="cvtt-input"
                    label="Cong Viec Thuc Te"
                    variant="outlined"
                    value={formData.cvtt}
                    type="number"
                    name="cvtt"
                    onChange={(e) => handleTextFieldChange(e)}
                    onKeyPress={(e) => keyPressed(e)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleTableDataChange()}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>

      <div className={classes.center}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      className={classes.tableHead}
                      key={column.id}
                      align={column.align}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTable.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">{row.cpkh}</TableCell>
                    <TableCell align="right">{row.cvkh}</TableCell>
                    <TableCell align="right">{row.cptt}</TableCell>
                    <TableCell align="right">{row.cvtt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </React.Fragment>
  );
}

export default App;
