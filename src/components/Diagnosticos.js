import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography
} from "@material-ui/core";
import ForwardIcon from "@mui/icons-material/Forward";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/dashboard.jpg";
import { MyContext } from "../services/Context";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(3),
    flexFlow: "column nowrap",
    width: "fullWidth",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(140)
    }
  },
  title: {
    textAlign: "center",
    backgroundColor: "#FF6347DA",
    alignSelf: "center",
    width: 900,
    color: "white",
    borderRadius: 4
  },
  table: {
    minWidth: 360
  },
  tableContainer: {
    marginTop: theme.spacing(4)
  }
}));

function Diagnosticos() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("USER"));
  const token = user.token;
  const { changePlace } = useContext(MyContext);
  const [dataRows, setRows] = useState([]);
  useEffect(
    () => {
      changePlace("auth");
      axios
        .get(
          "https://impulsorintelectualhumanista.com/capacitacion/portafolio/consultarPortafolio",
          {
            headers: { Authorization: token }
          }
        )
        .then(({ data }) => {
          const category = data.result.portafolio;
          setRows(category);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [token, changePlace, setRows]
  );

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Mis diagnósticos
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Formulario</TableCell>
              <TableCell align="right">Veces a aplicar</TableCell>
              <TableCell align="right">Vigencia</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows.map(row =>
              <TableRow key={row.idFormulario}>
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell align="right">
                  {row.vecesAplicar}
                </TableCell>
                <TableCell align="right">
                  {row.vigencia}
                </TableCell>
                <TableCell align="right">
                  <Link to={`formulario/${row.idEnvioUnique}`}>
                    <IconButton>
                      <ForwardIcon color="warning" />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Diagnosticos;
