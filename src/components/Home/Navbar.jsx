import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import BASE_URL from "../../hooks/baseURL";
import axios from "axios";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth(localStorage.getItem("authToken"));
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();
  const [smallLoad, setSmallLoad] = useState(false);
  const [wallets, setWallets] = useState();
  const [user, setUser] = useState();

  // console.log(wallets);

  const logout = () => {
    // Your logout logic here
    localStorage.removeItem("authToken");
    setAuth(null); // Update auth state to reflect logout
  };

  const getWallet = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/wallet/currentWallet", { headers })
      .then((response) => setWallets(response.data.data));
  };

  const getAuthUser = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    axios
      .get(BASE_URL + "/user", { headers })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getWallet();
    getAuthUser();
  }, []);

  const modals = [
    { id: 1, title: "ASIAGAMING", value: wallets?.ag_wallet },
    { id: 2, title: "GAMEPLAY", value: wallets?.g8_wallet },
    { id: 3, title: "BBIN", value: wallets?.gb_wallet },
    { id: 4, title: "JDB", value: wallets?.jd_wallet },
    { id: 5, title: "JOKER", value: wallets?.jk_wallet },
    { id: 6, title: "KING855", value: wallets?.k9_wallet },
    { id: 7, title: "NEW LIVE22", value: wallets?.l4_wallet },
    { id: 8, title: "PGSOFT", value: wallets?.pg_wallet },
    { id: 9, title: "PRAGMATIC", value: wallets?.pr_wallet },
    { id: 10, title: "KING MAKER", value: wallets?.re_wallet },
    { id: 11, title: "SBO", value: wallets?.s3_wallet },
  ];
  return (
    <div className="border-bottom py-sm-1 py-3 px-2 px-sm-5 d-flex flex-wrap align-items-center justify-content-between">
      <NavLink className="text-decoration-none" to={"/"}>
        <h2 className="logo mt-1" style={{ color: "gold" }}>
          Max Win
        </h2>
      </NavLink>
      <div className="d-flex gap-2 gap-sm-4 align-items-center">
        <button
          className="border border-none bg-transparent"
          style={{ outline: "none" }}
          onClick={handleShow}
        >
          <i className="fa-solid fa-wallet text-light"></i>
        </button>
        <div className="text-light d-flex align-items-center flex-nowrap">
          <i className="fa-solid fa-life-ring text-light"></i>
          <span className="mx-2 fw-bolder">: 0</span>
        </div>
        <NavLink to={"/profile"}>
          <i className="fa-solid fa-user text-light"></i>
        </NavLink>
        {auth ? (
          <button className="btn" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket text-light"></i>
          </button>
        ) : (
          <NavLink to={"/login"}>
            <button
              style={{
                border: "2px solid #FFD700",
                background: "none",
                fontSize: "13px",
                color: "#FFD700",
                padding: "6px 30px",
              }}
              className="bg-none rounded-2"
            >
              LOGIN
            </button>
          </NavLink>
        )}
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered className="table-dark">
            <thead>
              <tr>
                <th>Wallet</th>
                <th>K {parseFloat(user?.balance).toLocaleString()}</th>
              </tr>
            </thead>
            <tbody>
              {modals &&
                modals.map((modal) => (
                  <tr>
                    <td>{modal.title}</td>
                    <td>{modal.value}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Navbar;