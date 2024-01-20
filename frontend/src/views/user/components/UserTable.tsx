import { Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Table } from "react-bootstrap";
import UserTableRow from "./UserTableRow";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
// import TablePaginationActions from "./TablePaginationAction";
import { useEffect, useState } from "react";
import { IUser } from "models/user.model";

const UserTable = (props: { users: IUser[] }) => {
  const { users } = props;
  const [usersPagination, setUsersPagination] = useState(users);
  const [paginationInfor, setPaginationInfor] = useState({
    PageIndex: 0,
    PageSize: 10
  });

  useEffect(() => {
    const tempList = users.slice(
      paginationInfor.PageSize * paginationInfor.PageIndex,
      paginationInfor.PageSize * (paginationInfor.PageIndex + 1)
    );
    setUsersPagination(tempList);
  }, [paginationInfor, users]);

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
              <TableCell align="right">Email</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">Disabled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersPagination.length > 0 ? (
              usersPagination.map((user) => <UserTableRow key={user._id} row={user} />)
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  style={{ paddingBottom: 0, paddingTop: 10, borderBottom: 0, color: "c3c3c3c3" }}
                  colSpan={12}
                >
                  <h3>Do not have any users to display.</h3>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {users.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, { label: "All", value: -1 }]}
          colSpan={12}
          count={users.length}
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

export default UserTable;
