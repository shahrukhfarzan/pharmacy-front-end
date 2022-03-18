import SideMenu from "../../Menu/SideMenu";
import { Modal } from "rsuite";

import { useState, useEffect } from "react";
import { getExecutives, createExecutives } from "../../Api/executive";
import Navbar from "../../navbar";

const SalesExcutive = () => {
  let [open, setOpen] = useState(false);
  let [records, setRecords] = useState([]);
  let [body, setBody] = useState({});
  useEffect(() => {
    fetch();
  }, []);
  let fetch = () => {
    getExecutives()
      .then((data) => {
        setRecords(data["records"] || []);
      })
      .catch((e) => {});
  };

  let saveSales = () => {
    if (!body?.firstName || !body.lastName)
      return window.alert("Please fill form");
    createExecutives(body)
      .then((data) => {
        // console.log(data);
        setOpen(false);
        setBody({});
        fetch();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="body-wrapper">
        <div className="left">
          <SideMenu />
        </div>
        <div className="right">
          <Navbar/>
          <h5 style={{ textAlign: "center" }}>Sale Executives</h5>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            Add New Sales Executives
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Experience(in Years)</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => {
                return (
                  <tr
                    style={{ textAlign: "center", height: "40px" }}
                    key={index}
                  >
                    <td>{item["firstName"]}</td>
                    <td>{item["lastName"]}</td>

                    <td>{item["gender"]}</td>
                    <td>{item["dob"]}</td>
                    <td>{item["experience"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Add Excutive Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-wrapper">
            <label for="firstName">First Name</label>
            <input
              value={body?.["firstName"] || ""}
              onChange={(e) => setBody({ ...body, firstName: e.target.value })}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
            ></input>
          </div>
          <div className="input-wrapper">
            <label for="lastName">Last Name</label>
            <input
              value={body?.["lastName"] || ""}
              onChange={(e) => setBody({ ...body, lastName: e.target.value })}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
            ></input>
          </div>
          <div className="input-wrapper">
            <label for="DOB">DOB</label>
            <input
              value={body?.["dob"] || ""}
              onChange={(e) => setBody({ ...body, dob: e.target.value })}
              type="date"
              id="DOB"
              name="DOB"
              placeholder="dd-mm-yyyy"
            ></input>
          </div>
          <div className="input-wrapper">
            <label for="Gender">Gender</label>
            <input
              type="text"
              id="Gender"
              name="Gender"
              placeholder=""
              value={body?.["gender"] || ""}
              onChange={(e) => setBody({ ...body, gender: e.target.value })}
            ></input>
          </div>
          <div className="input-wrapper">
            <label for="exp">Experience</label>
            <input
              value={body?.["experience"] || ""}
              onChange={(e) => setBody({ ...body, experience: e.target.value })}
              type="number"
              id="Experience"
              name="Experience"
              min="0"
            ></input>
          </div>

          <div className="medicine-wrapper">
            <button className="btn" onClick={saveSales}>
              Add to the Team
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SalesExcutive;
