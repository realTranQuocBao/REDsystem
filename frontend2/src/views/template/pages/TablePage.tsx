const DataTablePage = () => {
  return (
    <>
      <h4 className="py-3 mb-4">
        <span className="text-muted fw-light">Tables /</span> Basic Tables
      </h4>

      {/* DataTable with Buttons */}
      <div className="card">
        <div className="card-datatable table-responsive">
          <table className="datatables-basic table border-top">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {/* Modal to add new record */}
      <div className="offcanvas offcanvas-end" id="add-new-record">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="exampleModalLabel">
            New Record
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body flex-grow-1">
          <form
            className="add-new-record pt-0 row g-2"
            id="form-add-new-record"
            onSubmit={() => {
              console.log("ok");
            }}
          >
            <div className="col-sm-12">
              <label className="form-label" htmlFor="basicFullname">
                Full Name
              </label>
              <div className="input-group input-group-merge">
                <span id="basicFullname2" className="input-group-text">
                  <i className="bx bx-user"></i>
                </span>
                <input
                  type="text"
                  id="basicFullname"
                  className="form-control dt-full-name"
                  name="basicFullname"
                  placeholder="John Doe"
                  aria-label="John Doe"
                  aria-describedby="basicFullname2"
                />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="form-label" htmlFor="basicPost">
                Post
              </label>
              <div className="input-group input-group-merge">
                <span id="basicPost2" className="input-group-text">
                  <i className="bx bxs-briefcase"></i>
                </span>
                <input
                  type="text"
                  id="basicPost"
                  name="basicPost"
                  className="form-control dt-post"
                  placeholder="Web Developer"
                  aria-label="Web Developer"
                  aria-describedby="basicPost2"
                />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="form-label" htmlFor="basicEmail">
                Email
              </label>
              <div className="input-group input-group-merge">
                <span className="input-group-text">
                  <i className="bx bx-envelope"></i>
                </span>
                <input
                  type="text"
                  id="basicEmail"
                  name="basicEmail"
                  className="form-control dt-email"
                  placeholder="john.doe@example.com"
                  aria-label="john.doe@example.com"
                />
              </div>
              <div className="form-text">You can use letters, numbers & periods</div>
            </div>
            <div className="col-sm-12">
              <label className="form-label" htmlFor="basicDate">
                Joining Date
              </label>
              <div className="input-group input-group-merge">
                <span id="basicDate2" className="input-group-text">
                  <i className="bx bx-calendar"></i>
                </span>
                <input
                  type="text"
                  className="form-control dt-date"
                  id="basicDate"
                  name="basicDate"
                  aria-describedby="basicDate2"
                  placeholder="MM/DD/YYYY"
                  aria-label="MM/DD/YYYY"
                />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="form-label" htmlFor="basicSalary">
                Salary
              </label>
              <div className="input-group input-group-merge">
                <span id="basicSalary2" className="input-group-text">
                  <i className="bx bx-dollar"></i>
                </span>
                <input
                  type="number"
                  id="basicSalary"
                  name="basicSalary"
                  className="form-control dt-salary"
                  placeholder="12000"
                  aria-label="12000"
                  aria-describedby="basicSalary2"
                />
              </div>
            </div>
            <div className="col-sm-12">
              <button type="submit" className="btn btn-primary data-submit me-sm-3 me-1">
                Submit
              </button>
              <button type="reset" className="btn btn-outline-secondary" data-bs-dismiss="offcanvas">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {/*/ DataTable with Buttons */}

      <hr className="my-5" />

      {/* Complex Headers */}
      <div className="card">
        <h5 className="card-header">Complex Headers</h5>
        <div className="card-datatable text-nowrap">
          <table className="dt-complex-header table table-bordered">
            <thead>
              <tr>
                <th rowSpan={2}>Name</th>
                <th colSpan={2}>Contact</th>
                <th colSpan={3}>HR Information</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>E-mail</th>
                <th>City</th>
                <th>Position</th>
                <th>Salary</th>
                <th className="border-1">Status</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {/*/ Complex Headers */}

      <hr className="my-5" />

      {/* Row grouping */}
      <div className="card">
        <h5 className="card-header">Row Grouping</h5>
        <div className="card-datatable table-responsive">
          <table className="dt-row-grouping table border-top">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>City</th>
                <th>Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>City</th>
                <th>Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {/*/ Row grouping */}

      <hr className="my-5" />

      {/* Multilingual */}
      <div className="card">
        <h5 className="card-header">Multilingual</h5>
        <div className="card-datatable table-responsive">
          <table className="dt-multilingual table border-top">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      {/*/ Multilingual */}
    </>
  );
};

export default DataTablePage;
