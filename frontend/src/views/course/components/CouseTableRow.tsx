import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import { red, green, blue, yellow, orange, lime } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import { ICourse } from "models/course.model";
import React, { useEffect, useState } from "react";
import { getTimeHMDMY } from "utils";
import courseService from "services/course.service";
import useLoading from "hooks/useLoading.hook";
import { useNavigate } from "react-router-dom";

const CouseTableRow = (props: { row: ICourse }) => {
  const navigate = useNavigate();
  const { row } = props;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customInfoList, setCustomInfoList] = useState<
    {
      action?: string;
      at?: Date;
      byName?: string;
      byEmail?: string;
      byId: string;
    }[]
  >([]);

  const swal = (window as any).swal;
  const alertify = (window as any).alertify;

  useLoading(loading);

  useEffect(() => {
    setCustomInfoList(
      [
        {
          action: "Created",
          at: row.createdAt,
          byName: (row.createdBy as any)?.name || "null",
          byEmail: (row.createdBy as any)?.email || "null",
          byId: (row.createdBy as any)?._id || row.createdBy || "null"
        },
        {
          action: "Updated",
          at: row.updatedAt,
          byName: (row.updatedBy as any)?.name || "null",
          byEmail: (row.updatedBy as any)?.email || "null",
          byId: (row.updatedBy as any)?._id || row.updatedBy || "null"
        },
        {
          action: "Deleted",
          at: row.deletedAt,
          byName: (row.updatedBy as any)?.name || "null",
          byEmail: (row.updatedBy as any)?.email || "null",
          byId: (row.updatedBy as any)?._id || row.updatedBy || "null"
        }
      ].filter((customInfo) => customInfo.action !== "Deleted" && customInfo.at !== null)
    );
  }, [row]);

  const handleDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text:
        row.deletedAt === null
          ? "The course will no longer be available!"
          : "Be careful, it will be permanently deleted!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
      confirmButtonClass: "btn btn-danger mr-3",
      cancelButtonClass: "btn btn-success ml-3",
      buttonsStyling: false
    }).then(function (event: { dismiss?: string; value?: boolean }) {
      if (event.dismiss) {
        alertify.success("Canceled action!");
      }
      if (event.value === true) {
        setLoading(false);
        if (row?._id) {
          courseService
            .deleteById(row._id)
            .then((res) => {
              alertify.success("Course deleted successfully!");
              return navigate(0);
            })
            .catch((err) => {
              setLoading(false);
              if (err?.message) {
                alertify.error(err.message);
              }
            });
        } else {
          alertify.error("Error, please reload the page!");
          return navigate(0);
        }
      }
    });
  };
  const handleEditClick = () => {
    setLoading(true);
    if (row?._id) {
      return navigate(`/course/edit/${row._id}`);
    }
  };
  const handleRestoreClick = () => {
    swal({
      title: "Are you sure?",
      text: "This course will be added back to the system!",
      type: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, restore it!",
      cancelButtonText: "No, cancel",
      confirmButtonClass: "btn btn-info mr-3",
      cancelButtonClass: "btn btn-success ml-3",
      buttonsStyling: false
    }).then(function (event: { dismiss?: string; value?: boolean }) {
      if (event.dismiss) {
        alertify.success("Canceled action!");
      }
      if (event.value === true) {
        setLoading(false);
        if (row?._id) {
          courseService
            .restore(row._id)
            .then((res) => {
              alertify.success("Course restored successfully!");
              return navigate(0);
            })
            .catch((err) => {
              setLoading(false);
              if (err?.message) {
                alertify.error(err.message);
              }
            });
        } else {
          alertify.error("Error, please reload the page!");
          return navigate(0);
        }
      }
    });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.category}</TableCell>
        <TableCell>{row.level}</TableCell>
        <TableCell>{row.instructor}</TableCell>
        <TableCell>{row.language}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="center">{row.duration}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customInfoList.map((customInfo) => (
                    <TableRow key={customInfo.action}>
                      <TableCell component="th" scope="row">
                        {customInfo.action}
                      </TableCell>
                      <TableCell>{getTimeHMDMY(customInfo.at)}</TableCell>
                      <TableCell>{customInfo.byId}</TableCell>
                      <TableCell>{customInfo.byEmail}</TableCell>
                      <TableCell>{customInfo.byName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ margin: 1, display: "flex", justifyContent: "space-around" }}>
              <Button
                variant={row.deletedAt === null ? "outlined" : "contained"}
                sx={
                  row.deletedAt === null
                    ? {
                        ":hover": {
                          bgcolor: "red",
                          color: "white"
                        }
                      }
                    : {
                        ":hover": {
                          bgcolor: "white",
                          color: "red"
                        }
                      }
                }
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
              >
                {row.deletedAt === null ? "Delete" : "Delete Forever"}
              </Button>

              {row.deletedAt === null ? (
                <Button
                  variant="outlined"
                  sx={{
                    ":hover": {
                      bgcolor: "#9c27b0",
                      color: "white"
                    }
                  }}
                  color={"secondary"}
                  startIcon={<EditIcon />}
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: "white",
                      color: "#2e7d32"
                    }
                  }}
                  color="success"
                  startIcon={<RestoreIcon />}
                  onClick={handleRestoreClick}
                >
                  Restore
                </Button>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CouseTableRow;
