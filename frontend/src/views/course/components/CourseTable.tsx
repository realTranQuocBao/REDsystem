import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { ICourse } from "models/course.model";
import { Table } from "react-bootstrap";
import CouseTableRow from "./CouseTableRow";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import TablePaginationActions from "./TablePaginationAction";
import { useEffect, useState } from "react";

const CourseTable = (props: { courses: ICourse[] }) => {
  const { courses } = props;
  const [coursesPagination, setCoursesPagination] = useState(courses);
  const [paginationInfor, setPaginationInfor] = useState({
    PageIndex: 0,
    PageSize: 10
  });

  useEffect(() => {
    const tempList = courses.slice(
      paginationInfor.PageSize * paginationInfor.PageIndex,
      paginationInfor.PageSize * (paginationInfor.PageIndex + 1)
    );
    setCoursesPagination(tempList);
  }, [paginationInfor, courses]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPaginationInfor((infor) => ({ ...infor, PageIndex: newPage }));
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPaginationInfor({
      PageIndex: 0,
      PageSize: parseInt(event.target.value, 10)
    });
  };

  jQuery("p").css({
    display: "block",
    "margin-block-start": "1em",
    "margin-block-end": "1em",
    "margin-inline-start": "0px",
    "margin-inline-end": "0px"
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 500 }} aria-label="custom pagination collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Language</TableCell>
              <TableCell align="right">Price&nbsp;($)</TableCell>
              <TableCell align="right">Duration&nbsp;(H)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coursesPagination.length > 0 ? (
              coursesPagination.map((course) => <CouseTableRow key={course._id} row={course} />)
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  style={{ paddingBottom: 0, paddingTop: 10, borderBottom: 0, color: "c3c3c3c3" }}
                  colSpan={12}
                >
                  <h3>Do not have any courses to display.</h3>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {courses.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, { label: "All", value: -1 }]}
          colSpan={12}
          count={courses.length}
          rowsPerPage={paginationInfor.PageSize}
          page={paginationInfor.PageIndex}
          component={"div"}
          style={{ justifyItems: "end" }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )}
    </>
  );
};

export default CourseTable;
