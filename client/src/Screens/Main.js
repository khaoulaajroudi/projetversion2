import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Zones from "../Components/Zones";
import { Container, Nav, Navbar } from "react-bootstrap";
import TableStats from "../Components/TableStats";
import useTranslation from "./../i18";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./../Shared/logo.png";
import bg from "./../Shared/bg.jpeg";
import io, { Socket } from "socket.io-client";
import Swal from "sweetalert2";

import "./Styles.css";

import {
  faCalendarAlt,
  faCashRegister,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import NaviBottom from "../Components/NaviBottom";
import { useDispatch,useSelector } from "react-redux";
import {
  addNewcheckoutDataFromDB,
  clearData,
  clearOrders,
  deleteClientandTable,
} from "../Slices/order";
import {
  storeCategories,
  storeNSteps,
  storeOrderHistory,
  storeProducts,
  storeTvaMode,
} from "../Slices/data";
import serveur from "./../Shared/serveur.png";
import $ from "jquery";
import swal from 'sweetalert';


const socket =io.connect("http://localhost:5002")
const Main = () => {
  const { t } = useTranslation();
  const currentToken = localStorage.getItem("user");
  const user = localStorage.getItem("username") || "";
  const user_id = localStorage.getItem("user_id") || "";
  const username = localStorage.getItem("username") || "";
  const caisse_id = localStorage.getItem("caisse_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activation, setactivation] = useState(false)
  const initialValue = useSelector((state) => state.caisse.initialValue);
  const [finalValue, setFinalValue] = useState(initialValue);
  const [recap, setrecap] = useState({});
  console.log("recapmain",recap)
  var curr = new Date();
  var date = curr.toISOString().substr(0, 10);
  var time = curr.getHours() + ":" + curr.getMinutes();


  var time1 = time.split(':');
var hours= 
  const options = [date, "two", "three"];
  const defaultOption = options[0];
  const [selectedDate, setSelectedDate] = useState(date);

  // useEffect(async () => {
 
    
  //   await axios
  //     .post(
  //     "http://192.168.1.166:5000/api/clotureData",
  //       { user_id, caisse_id, TODAY: selectedDate }
  //     )
  //     .then((res) => {
     
  //       setrecap(res.data);
  //     })})

useEffect(() => {
  socket.on("a",(data)=>{
    console.log(data)
  })
}, [socket])

  useEffect(() => {
    axios
      .post(
       
          "http://192.168.1.166:5000/api/categories",
        {
          user_id,
        }
      )
      .then((res) =>
        dispatch(
          storeCategories({
            categories: res.data.sort((a, b) => a.cat_order - b.cat_order),
          })
        )
      );
    axios
      .post(
      "http://192.168.1.166:5000/api/products",
        {
          user_id,
          category: 0,
        }
      )
      .then((res) => {
        dispatch(storeProducts({ products: res.data.products }));
        dispatch(storeNSteps({ nSteps: res.data.menuSteps }));
      });
  }, []);

  useEffect(() => {
    const caisse_id = localStorage.getItem("caisse_id");
    axios
      .post(
       "http://192.168.1.166:5000/api/getorders",
        {
          user_id,
          caisse_id,
        }
      )
      .then((res) => {
        dispatch(storeOrderHistory({ orderHistory: res.data }));
        console.log(res.data);
        let newData = res.data.map((order) => ({
          ...order,
          table_number: order.table_number || order.order_id,
          order_id: order.id,
        }));
        /*  .filter((order) => order.order_type == "surplace"); */
        console.log("got data", newData);
        newData.map((data) => {
          dispatch(addNewcheckoutDataFromDB({ order: data }));
        });
      });

    axios
      .post(
      "http://192.168.1.166:5000/api/gettva"
      )
      .then((res) => {
        dispatch(storeTvaMode({ tva_mode: res.data }));
      });
  }, []);


  useEffect(() => {
    if(time==5){
      handlecloture();
      setactivation(true)
    }
  })

  const handleDisconnect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    navigate("/");
  };

  // const handleclosealrt =()=>{
  //   let pay_method = [];
  //   let orderTypes={
  //     surPlace:0,
  //     livraison:0,
  //     emporter:0,
  //     borne:0
  // }

//   const handleFinish = () => {
//       axios
//       .post(
//      "http://192.168.1.166:5000/api/CloseCaisse",
//         {
//           user_id: user_id,
//           user: user,
//           montant: finalValue,
//         }
//       )
//       .then((res) => { 
//         localStorage.clear();
//         dispatch(clearData())
//         navigate("/init");
//   }
// )
// };
  const handlecloture = () => {
    swal({
      title: "tu dois cloturer la caisse?",
      text: "pour bien gestionner votre caisse tu dois chaque jour la cloturer !!",
      icon: "STOOP",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        navigate("/cloture")
        swal("cloturez votre caisse SVP !", {
          icon: "danger",
        })
      } else {
        // swal("merci pour votre comprehension!");
        navigate("/cloture")
      }
    });
  }
  return (
    <div className="main_bg">
      <Navbar variant="warning" className="navbar">
        <Container className="main-container">
          <Navbar.Brand>
            <div class="logo-container">
              <img id="chrome" class="logo" src={logo} />
            </div>
          </Navbar.Brand>
          <Navbar.Brand>
            {/* <div
              id="circle"
              style={{ background: connect ? "green" : "red" }}
            ></div> */}
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link>
              <h6
                className="nav_link-h6"
                style={{ color: "white", paddingTop: "5px" }}
                
              >
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  style={{ marginRight: "5px" }}
                  className="ico2"
                />
                Agenda
              </h6>
            </Nav.Link>
            {/* <Nav.Link
            onClick={() => 
              { 
                if(time!=15){
                handlecloture();
                setactivation(true)
              }
            }
            }
          ></Nav.Link> */}
            <Nav.Link onClick={() => navigate("/cloture")}>
              <h6
                style={{ color: "white", paddingTop: "5px" }}
                className="nav_link-h6"
              >
                <FontAwesomeIcon
                  icon={faCashRegister}
                  style={{ marginRight: "5px" }}
                  className="ico1"
                />
                {t("cashier")}
                
              </h6>
            </Nav.Link>
            <Nav.Link onClick={() => handleDisconnect()}>
              <h6
                style={{ color: "white", paddingTop: "5px" }}
                className="nav_link-h6"
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ marginRight: "5px" }}
                  className="ico"
                />
                {t("disconnect")}
              </h6>
            </Nav.Link>
          </Nav>
          <h6
            style={{
              color: "white",
              marginLeft: "1rem",
              marginTop: "0.5rem",
              borderLeft: "1px solid white",
              padding: "5px",
            }}
            className="nav-link"
          >
            <img
              src={serveur}
              width={32}
              height={32}
              style={{ marginRight: "0.5rem" }}
              className="server-img"
            />
            <b>{username}</b>
            <FontAwesomeIcon
              onClick={() => handleDisconnect()}
              size="2x"
              icon={faSignOutAlt}
              style={{ marginLeft: "0.5rem", paddingTop: "0.5rem" }}
            />
          </h6>
        </Container>
      </Navbar>
      <div className="x2">
      
        <Zones />
        <NaviBottom />
      </div>
    </div>
  );
};

export default Main;
