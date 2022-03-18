import { useState, useEffect } from "react";
import { Modal } from "rsuite";
import "./Inventory.css";
import SideMenu from "../../Menu/SideMenu";
import { createMedicine, getMedicineApi } from "../../Api/medicine";
import Navbar from "../../navbar";

const Inventory = () => {
  let [open, setOpen] = useState(false);
  let [medicines, setMedicine] = useState([]);
  let [body, setBody] = useState({});
  useEffect(() => {
    fetch();
  }, []);
  let saveInventory = () => {
    // console.log({body});
    if (!body.name || !body.manufacture) return window.alert("Fill form");
    createMedicine(body)
      .then((data) => {
        // console.log(data);
        fetch();
        setOpen(false);
        setBody({});
      })
      .catch((e) => {
        window.alert(e["message"] || "Network issue");
      });
  };
  let fetch = () => {
    getMedicineApi()
      .then((data) => {
        setMedicine(data?.records || []);
      })
      .catch((e) => {});
  };
  return (
    <>
      <div className="body-wrapper">
        <div className="left">
          <SideMenu />
        </div>
        <div className="right">
          <Navbar />
          <h5 style={{ textAlign: "center" }}>Inventory</h5>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            Add New Medicine
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Discount(%)</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length < 1 && (
                <tr>
                  <td colSpan={"5"}>loading....</td>
                </tr>
              )}
              {medicines.map((item, index) => {
                return (
                  <tr
                    style={{ textAlign: "center", height: "40px" }}
                    key={index}
                  >
                    <td>{item["name"]}</td>
                    <td>{item["manufacture"]}</td>
                    <td>{item["price"]}</td>
                    <td>{item["stock"]}</td>
                    <td>{item["discount"]}</td>
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
          <Modal.Title>Add Medicine Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="medicine-wrapper">
            <div className="input-wrapper">
              <label for="medicine-name">Medicine Name</label>
              <input
                value={body?.name || ""}
                onChange={(e) => {
                  setBody({ ...body, name: e.target.value });
                }}
                type="text"
                id="medicine-name"
                name="medcine-name"
                placeholder="Medicine Name"
              ></input>
            </div>
            <div className="input-wrapper">
              <label for="Manufacturer">Manufacturer</label>
              <input
                value={body?.manufacture || ""}
                onChange={(e) => {
                  setBody({ ...body, manufacture: e.target.value });
                }}
                type="text"
                id="Manufacturer"
                name="Manufacturer"
                placeholder="Manufacturer"
              ></input>
            </div>
            <div className="input-wrapper">
              <label for="quantity">Price</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={body?.price || ""}
                onChange={(e) => {
                  setBody({ ...body, price: parseInt(e.target.value) });
                }}
              />
            </div>

            <div className="input-wrapper">
              <label for="quantity">Stock</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={body?.stock || ""}
                onChange={(e) => {
                  setBody({ ...body, stock: parseInt(e.target.value) });
                }}
              />
            </div>
            <div className="input-wrapper">
              <label for="discount">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={body?.discount || ""}
                onChange={(e) => {
                  setBody({ ...body, discount: parseInt(e.target.value) });
                }}
              />
            </div>

            <button className="btn" onClick={saveInventory}>
              Add to Inventory
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Inventory;
