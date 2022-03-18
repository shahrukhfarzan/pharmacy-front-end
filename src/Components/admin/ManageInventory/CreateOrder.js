import { useEffect, useState } from "react";
import { getMedicineApi } from "../../Api/medicine";
import { newOrderApi } from "../../Api/orders";
import SideMenu from "../../Menu/SideMenu";
import Navbar from "../../navbar";
import "./Createorder.css";
const CreateOrder = () => {
  let [medicines, setMedicine] = useState([]);
  let [filtered, setFiltered] = useState([]);
  let [selected, setSelected] = useState([]);
  let [current, setCurrent] = useState(null);
  let [qty, setQty] = useState(0);
  let [name, setName] = useState(null);
  let [mobile, setMobile] = useState(null);

  useEffect(() => {
    fetch();
  }, []);
  let fetch = () => {
    getMedicineApi()
      .then((data) => {
        setMedicine(data?.records || []);
      })
      .catch((e) => {});
  };
  let filter = (e) => {
    // console.log(medicines);
    setCurrent({ ...current, name: e.target.value });
    if (!e.target.value) return setFiltered([]);
    let x = medicines.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value);
    });
    // console.log(x);
    setFiltered(x);
  };
  let selectMedicine = (item) => {
    if (!item) return window.alert("Error");
    // console.log(item);
    let array = [...selected];
    /**
     * check is exist or not
     */

    let x = array.filter((y, index) => {
      console.log(index);
      return String(y._id) === String(item._id);
    });

    if (x.length === 0) array.push({ ...item, qty });
    setSelected([...array]);
  };
  let createOrderFn = () => {
    let user = window.localStorage.getItem("user");
    user = JSON.parse(user);
    let body = {
      customerName: name,
      customerMobile: mobile,
      medicines: selected,
      createdBy: user?._id || null,
    };
    // console.log(body);
    /**
     * Add post api here to create order and clear form
     */

    newOrderApi(body)
      .then((data) => {
        if (data.error !== false)
          return window.alert(data?.message || "Server side error");
        setSelected([]);
        setName(null);
        setMobile(null);
        window.alert(data?.message || "Order Added success");
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
        <Navbar/>
          <h5 style={{ textAlign: "center" }}>Create Order</h5>
          <div className="order-body">
            <div className="order-body-left">
              <div className="input-wrapper">
                <label for="Medicine">Medicine</label>
                <input
                  value={current?.name || ""}
                  onChange={filter}
                  type="text"
                  // list="medicine"
                  // id="medicine"
                  name="medicine"
                ></input>
                {filtered.length > 0 &&
                  filtered.map((item) => {
                    return (
                      <p
                        style={{ padding: "4px", color: "blue" }}
                        onClick={(_) => {
                          setCurrent(item);
                          setFiltered([]);
                        }}
                      >
                        {item.name}
                      </p>
                    );
                  })}
              </div>
              <div className="input-wrapper">
                <label for="quantity"></label>
                <input
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="0"
                ></input>
                <button
                  className="btn"
                  onClick={(_) => selectMedicine(current)}
                >
                  ADD
                </button>
              </div>
            </div>
            <div className="order-body-right">
              <div className="order-form">
                <div className="contact-row">
                  <label for="customer-name">Customer Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="customer-name"
                    name="customer-name"
                    placeholder="Customer Name"
                  ></input>
                  <label for="customer-contact-number">
                    Customer Contact Number
                  </label>
                  <input
                    onChange={(e) => setMobile(e.target.value)}
                    type="text"
                    id="customer-contact-number"
                    name="customer-contact-number"
                    placeholder="Customer Contact Number"
                  ></input>
                </div>
                <div className="contact-detail">
                  <table className="order-table">
                    <thead>
                      <tr>
                        <td>Medicine Name</td>
                        <td>QTY</td>
                        <td>Price(per unit)</td>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.map((item) => {
                        return (
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.discount}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td colSpan={2}>Total</td>
                        <td>
                          {selected.reduce((a, item) => {
                            // console.log(item, a);
                            return (
                              parseInt(item.price) * parseInt(item.qty) +
                              parseFloat(a)
                            );
                          }, 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="medicine-wrapper">
                    <button className="btn" onClick={createOrderFn}>
                      Create Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateOrder;
