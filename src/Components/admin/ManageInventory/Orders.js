import { useEffect, useState } from "react";
import { getMedicineApi } from "../../Api/medicine";
import { getOrdersApi } from "../../Api/orders";
import SideMenu from "../../Menu/SideMenu";
import Navbar from "../../navbar";

const Orders = () => {
  let [records, setRecords] = useState([]);
  useEffect(() => {
    getOrdersApi()
      .then((data) => {
        setRecords(data["order"] || []);
      })
      .catch((e) => {});
  }, []);
  return (
    <>
      <div className="body-wrapper">
        <div className="left">
          <SideMenu />
        </div>
        <div className="right">
          <Navbar/>
          <div style={{ padding: "1rem" }}>
            {records.map((item, index) => {
              return (
                <div className="order-card" key={index}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Name: {item?.customerName || ""}</p>
                    <p>Mobile:{item?.customerMobile || ""}</p>
                  </div>
                  <div>
                    <table style={{ width: "100%", textAlign: "center" }}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Manufacture</th>
                          <th>Price</th>
                          <th>Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.medicines.map((m, p) => {
                          return (
                            <tr>
                              <td>{m?.name}</td>
                              <td>{m?.manufacture}</td>

                              <td>{m?.price}</td>

                              <td>{m?.qty}</td>
                            </tr>
                          );
                        })}
                        <tr style={{ marginTop: "12px" }}>
                          <td colSpan={3}>Total</td>
                          <td>
                            {item.medicines.reduce((a, item) => {
                              return (
                                parseInt(item.price) * parseInt(item.qty) +
                                parseFloat(a)
                              );
                            }, 0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
