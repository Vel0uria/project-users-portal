import React, { useEffect, useContext, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TextField,
  Toolbar,
  Box,
  InputAdornment
} from "@mui/material"
import ForwardIcon from "@mui/icons-material/Forward"
import FolderSharedIcon from "@mui/icons-material/FolderShared"
import SearchTwoTone from "@mui/icons-material/SearchTwoTone"
import { makeStyles } from "@material-ui/core/styles"
import bgImage from "../assets/dashboard.jpg"
import { MyContext } from "../services/Context"
import { Divider } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(3),
    flexFlow: "column nowrap",
    width: "windowWidth",
    height: theme.spacing(65),
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.between("sm", "md")]: {
      height: theme.spacing(75)
    },
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(140)
    }
  },
  title: {
    color: "#2383d3",

    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "1.5rem",
      width: 700
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: [22, "!important"],
      marginLeft: 0,
      marginTop: 0,
      width: 250
    }
  },
  table: {
    minWidth: 360,
    marginTop: theme.spacing(2)
  },
  tableContainer: {
    marginTop: theme.spacing(5)
  }
}))

function Diagnosticos() {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem("USER"))
  const token = user.token
  const { changePlace } = useContext(MyContext)
  const [dataRows, setRows] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  useEffect(
    () => {
      changePlace("Diagnósticos")
      axios
        .get(
          "https://impulsorintelectualhumanista.com/capacitacion/portafolio/consultarPortafolio",
          {
            headers: { Authorization: token }
          }
        )
        .then(({ data }) => {
          const category = data.result.portafolio

          setRows(category)
        })
        .catch(err => {
          console.log(err)
        })
    },
    [token, changePlace, setRows]
  )
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        Diagnósticos
      </Typography>
      <Divider />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Toolbar
          sx={{
            background:
              "linear-gradient(to bottom, rgba(181,198,218) 0%, " +
              "rgba(191,208,228) 70%, rgba(0,0,0,0) 100%)",
            // mt: 1.5,
            pl: { sm: 2, md: 3, lg: 4, xl: 4 },
            pr: { xs: 1, sm: 1 },
            "& .MuiTextField-root": {
              mt: 1,
              ml: { xl: 170, lg: 115, md: 65, sm: 45, xs: 0 },
              width: {
                xs: "15ch",
                sm: "18ch",
                md: "20ch",
                lg: "25ch",
                xl: "25ch"
              }
            }
          }}
        >
          <Box
            type="div"
            mt={0.5}
            p={1}
            sx={{
              display: "flex",
              "& h4": {
                ml: 1,
                mt: { xs: 1.5, s: 1, md: 0.5, lg: 0.5, xl: 0.5 },
                fontSize: { xs: 16, s: 18, md: 20, lg: 24, xl: 26 }
              }
            }}
          >
            <FolderSharedIcon fontSize="large" color="secondary" />
            <Typography variant="h4" color="black">
              Mi portafolio{" "}
            </Typography>
          </Box>
          {/* <TextField
            label="Buscar registros"
            variant="outlined"
            size="small"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoTone />
                </InputAdornment>
              )
            }}
          /> */}
        </Toolbar>
        <Table className={classes.table} aria-label="simple table">
          <TableHead
            sx={{
              "& h6": {
                fontSize: { xs: 12, sm: 14, md: 16 },
                fontWeight: "bold",
                textAlign: "justify"
              }
            }}
          >
            <TableRow>
              <TableCell>
                <Typography variant="h6"> Formulario</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Veces a aplicar</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Vigencia</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" align="center">
                  Acciones
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row =>
                <TableRow key={row.idEnvioUnique} hover tabIndex={-1}>
                  <TableCell component="th" scope="row">
                    {row.nombre}
                  </TableCell>
                  <TableCell align="left">
                    {row.vecesAplicar}
                  </TableCell>
                  <TableCell align="left">
                    {row.vigencia}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`formulario/${row.idEnvioUnique}`}>
                      <IconButton>
                        <ForwardIcon color="warning" fontSize="large" />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Filas por página"}
        />
      </TableContainer>
    </div>
  )
}

export default Diagnosticos
