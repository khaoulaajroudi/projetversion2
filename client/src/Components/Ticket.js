import axios from "axios";
import { wrap } from "lodash";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import aprc from "./../Shared/aprc.png";

const Ticket = ({ order, thisDate, ping }) => {
  const address = localStorage.getItem("address");
  const user_id = localStorage.getItem("user_id");
  let tvasst =[];
  const params = useParams();
  const { table_id } = params;
  const telephone = localStorage.getItem("telephone");
  const [toShowOrder, settoShowOrder] = useState(order);
  console.log("toShowOrder",toShowOrder)
  const currency = localStorage.getItem("currency");
  const [isBusy, setIsBusy] = useState(true);
  const [restaurant, setrestaurant] = useState({});
  // let toShowOrder = ordersData.filter((o) => o.order_id == table_id)[0] || {};

  // useEffect(() => {
  //   if (toShowOrder?.orderItems && toShowOrder?.orderItems.length) {
  //     setIsBusy(false);
  //     console.log(toShowOrder?.orderItems);
  //   }
  // }, [toShowOrder]);

  useEffect(() => {
    axios
      .post("http://192.168.1.166:5000/api/getRestaurantData", { user_id })
      .then((res) => {
       
        setrestaurant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toShowOrder]);

  useEffect(() => {
    settoShowOrder(order);
  }, [order]);
  
  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x.value);
      return rv;
    }, {});
  };

  let tvass = groupBy(toShowOrder?.tvas || [], "perc");
  const calcOrder = (order) => {
    let price = order.price;
    let tva = order.tva;
    if (order.extras && order.extras.length) {
    
      order.extras.map((extra) => {
     
        price += extra.price * extra.default_quantity;
      });
    }
    // if (order.stepItems && order.stepItems != {}) {
    //   Object.keys(order.stepItems).map((e) => {
    //     order.stepItems[e].map((item) => {
    //       price += item.price;
         
    //     });
    //   });
    // }
    return { price: price * order.qt, tva: (price * order.qt * tva) / 100 };
  };

  let tva = 0;
  console.log(tva)
  let is_alcool = false;
  let is_conserved=false;
  let test = order.orderItems;
  order.orderItems?.forEach((element) => {
    if (element.is_alcool == true) {
      is_alcool = true;
    } else if (element.is_conserved == true)
     {
      is_conserved = true;
    }
  });

  if (is_alcool == true) {
    tva = 20;}
    else if (is_conserved==true){
      tva=5.5;
    }
    else {tva=10}
    console.log(tva)
  // } else {
  //   let is = order.orderType == undefined ? order.order_type : order.orderType;
  //   switch (is) {
  //     case "sur place":
  //       tva = 10;
  //       break;
  //     case "emporter":
  //       tva = 5.5;
  //       break;
  //     case "livraison":
  //       tva = 5.5;
  //       break;
  //     default:
  //       tva = 10;
  //       break;
  //   }
  // }
  // let tax = (toShowOrder.taxPrice * calcTotal(toShowOrder?.orderItems)) / 100;
  let v3,v1,v2,vs1,vs2,vs3,ht1,ht2,ht3,totaltva,totalht3,qqt3,vp3,totalprice3,totalht1,qqt1,vp1,totalprice1,totalht2,qqt2,vp2,totalprice2;
   v2=0;
   v1=0;
   v3=0;
   vs1=0;
   vs2=0;
   vs3=0;
   totalht3=0;
  totalprice3=0;
  qqt3=0;
  vp3=0;
  totalht1=0;
  totalprice1=0;
  qqt1=0;
  vp1=0;

  totalht2=0;
  totalprice2=0;
  qqt2=0;
  vp2=0;
  order?.orderItems?.map((item) => {
    if (item.is_alcool==true) {
    //  item.tva=20;
      // v3=v3+item.qt;
      // vs3=vs3+(item.price);
      v3=v3+(item.qt);
      qqt3=(item.qt)
      vp3=(item.price);
      vs3=+(qqt3*(item.price));
      totalprice3=totalprice3+vs3;
      ht3=qqt3*(vp3/(1+(20/100)));
      totalht3=ht3+totalht3;
     }
     else if(item.is_conserved==true){
      // item.tva=5.5;
      v1=v1+(item.qt);
      qqt1=(item.qt)
      vp1=(item.price);
      vs1=+(qqt1*(item.price));
      totalprice1=totalprice1+vs1;
      ht1=qqt1*(vp1/(1+(5.5/100)));
      totalht1=ht1+totalht1;
      console.log("totalprice1",totalprice1)
     }
 
       else if ((item.is_alcool==false) && (item.is_conserved==false)  ) {
       
        v2=v2+(item.qt);
        qqt2=(item.qt)
        vp2=(item.price);
        vs2=+(qqt2*(item.price));
        totalprice2=totalprice2+vs2;
        ht2=qqt2*(vp2/(1+(10/100)));
        totalht2=ht2+totalht2;
        console.log("totalprice2",totalprice2)
       }
 
     
       totaltva=ht1+ht2+ht3;
       console.log("ht",ht3);
      var tva5= {
        "name": "TVA 5.5",
        "count":v1,
        "totaltcc":totalprice1,
        "amount":totalht1.toFixed(2)
      };
      var tva10= {
        "name": "TVA 10%",
        "count":v2,
        "totaltcc":totalprice2,
        "amount":totalht2.toFixed(2)
      };
      var tva20= {
        "name": "TVA  20%",
        "count":v3,
        "totaltcc":totalprice3,
        "amount":totalht3.toFixed(2)
      };
      tvasst[0] = tva5;
      tvasst[1] = tva10;
      tvasst[2] = tva20;
   });
  const renderHTML = (rawHTML: string) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });
  // useEffect(() => {
  //   if (order.part > 1) {
  //     let copy = JSON.parse(JSON.stringify(order) || {});
  //     copy = { ...copy };
  //     settoShowOrder(copy);
  //   }
  // }, [ping]);

  return (
    <Container fluid>
      <div className="ticket">
        <div className="ticket_container">
          <h3 style={{ marginTop: "0.5rem" }}>
            <b>Ticket d'encaissement</b>
          </h3>
          <p>
            {restaurant.name} <br />
            {address || "" + "-" + telephone || ""} <br />
            tel: {restaurant.telephone}
          </p>
          <h1>
            <b style={{ fontSize: "56px" }}>{toShowOrder?.order_id}</b>
          </h1>
          <div className="ticket_item" style={{ flexWrap: "wrap" }}>
            <p>Client :{toShowOrder.customer_name}</p>
            <p>Type :{toShowOrder.orderType}</p>
            <p>Numero :{toShowOrder.customer_tel}</p>
            <p>Adresse:{toShowOrder.customer_adress}</p>
          </div>
          <span style={{ marginBottom: "0.5rem" }}>
            -------------------------------------
          </span>
          {toShowOrder.orderItems &&
            toShowOrder.orderItems.map((item, key) => (
              <>
                <div className="ticket_item">
                  <p>{key + 1 + "-" + item?.name}</p>
                  {/* <p>TVA : {item?.tva} %</p> */}
                  <div
                    style={{
                      display: "flex",
                      width: "50%",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <p>
                      {item?.qt == undefined ? item.quantity : item.qt + "x"}
                    </p>
                    <p>
                      {`  ${item?.price.toFixed(2)} `}{" "}
                      {renderHTML(`<i>${currency}</i>`)}
                    </p>
                  </div>
                </div>
                {item.stepItems && Object.keys(item.stepItems).length ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    className="step_item"
                  >
                    {Object.keys(item.stepItems).map((key) =>
                      item.stepItems[key].map((el) => (
                        <span style={{ textAlign: "start", color: "grey" }}>
                          -{el.name}
                        </span>
                      ))
                    )}
                  </div>
                ) :item?.steps != []? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    className="step_item"
                  >
                    {
                      item.steps?.map((el) => (
                        <span style={{ textAlign: "start", color: "grey" }}>
                          -{el.name}
                        </span>
                      ))
                    }
                  </div>
                ): (
                  ""
                )}
                {item?.extras != []
                  ? item?.extras?.map((extra) =>
                      extra.default_quantity > 0 ? (
                        <div className="ticket_extra">
                          <p>+ {extra.title}</p>
                          <div
                            style={{
                              display: "flex",
                              width: "30%",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {" "}
                            <p>{extra.default_quantity + "x"}</p>
                            <p>
                              {`  ${extra.price.toFixed(2)} `}
                              {renderHTML(`<i>${currency}</i>`)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </>
            ))}
          <span style={{ marginBottom: "0.5rem" }}>
            -------------------------------------
          </span>
          {/* <div className="ticket_item ticket_last">
            <p>Total HT : </p>
            <div
              style={{
                display: "flex",
                width: "20%",
                justifyContent: "space-evenly",
              }}
            >
              <p>
                {(toShowOrder?.totalPrice /(1+tva/100)).toFixed(2)} {renderHTML(`<i>${currency}</i>`)}
              </p>
            </div>
          </div> */}
          {/* {Object.keys(tvass).map((key) => (
            <div className="ticket_item ticket_last">
              <p>TVA({key}%):</p>
              <div
                style={{
                  display: "flex",
                  width: "20%",
                  justifyContent: "space-evenly",
                }}
              >
                <p>
                  {tvass[key].reduce((a, b) => a + b).toFixed(2)}{" "}
                  {renderHTML(`<i>${currency}</i>`)}
                </p>
              </div>
            </div>
          ))} */}
            {
            (
            (
              <div className="ticket_item ticket_last" style={{width:"200px"}} >
                
              {tvasst.map((item) => (
  <>

<div style={{
                    display: "flex",
                    flexDirection:"column",
                    flexwrap: "wrap",
                   width:"100px",
                    marginTop:"30px",
                  alignItems:"center",
                  height:"60px"
                }}
                    >
                      
    <li style={{marginBottom:"-5px"}}>{item.name}</li>
    <p style={{marginBottom:"-5px"}}>{item.count} </p>
    <p style={{marginBottom:"-5px"}}>{item.amount}</p>
    </div>
  
    </>
 )
 )}     
                {/* <div
                  style={{
                    display: "flex",
                    width: "20%",
                    justifyContent: "space-evenly",
                  }}
                > */}
                  {/* <p>
                    {((toShowOrder?.totalPrice /(1+tva/100))*tva/100).toFixed(2)}
                    {renderHTML(`<i>${currency}</i>`)}
                  </p> */}
                {/* </div> */}
              </div>
            ))
          }
          {/* <div className="ticket_item ticket_last">
            <p>
              TVA({(toShowOrder?.taxPrice / toShowOrder?.totalPrice) * 100}%):
            </p>
            <div
              style={{
                display: "flex",
                width: "20%",
                justifyContent: "space-evenly",
              }}
            >
              <p>
                {toShowOrder?.taxPrice.toFixed(2)}{" "}
                {renderHTML(`<i>${currency}</i>`)}
              </p>
            </div>
          </div> */}
          
         <div style={{
                
                marginTop:"20px"}}> -------------------------------------</div>
          <div className="ticket_item ticket_last" style={{
                
                marginTop:"20px"}}>
                 
            <p>Total TTC : </p>
            <div
              style={{
                display: "flex",
                width: "20%",
                justifyContent: "space-evenly",
              }}
            >
              <p>
                {
                  toShowOrder?.totalPrice 
                }
                {renderHTML(`<i>${currency}</i>`)}
              </p>
            </div>
          </div>
          {toShowOrder.paymentsInDb?.length > 0 && (
            <>
              <span style={{ marginBottom: "0.5rem" }}>
                -------------------------------------
              </span>
              {toShowOrder.paymentsInDb?.map((one) => (
                <div className="ticket_item ticket_last">
                  <p>Payé({one.pay_method})</p>
                  <div
                    style={{
                      display: "flex",
                      width: "20%",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <p>
                      {one.amount.toFixed(2)}
                      {renderHTML(`<i>${currency}</i>`)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="ticket_item ticket_last">
                {toShowOrder.paymentsInDb?.reduce(
                  (acc, curr) => acc + curr.amount,
                  0
                ) -
                  (toShowOrder?.totalPrice ) >
                0 ? (
                  <>
                    <p>Rendre monnaie</p>
                    <div
                      style={{
                        display: "flex",
                        width: "20%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <p>
                        {(
                          toShowOrder.paymentsInDb?.reduce(
                            (acc, curr) => acc + curr.amount,
                            0
                          ) -
                          (toShowOrder?.totalPrice )
                        )?.toFixed(2)}
                        {renderHTML(`<i>${currency}</i>`)}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Reste a payer</p>
                    <div
                      style={{
                        display: "flex",
                        width: "20%",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <p>
                        {Math.abs(
                          (
                            toShowOrder.paymentsInDb?.reduce(
                              (acc, curr) => acc + curr.amount,
                              0
                            ) -
                            toShowOrder?.totalPrice 
                              
                          ).toFixed(2)
                        )}
                        {renderHTML(`<i>${currency}</i>`)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          <p>
            <b>
              {toShowOrder?.part && toShowOrder?.type == "partager" ? (
                <p style={{ display: "flex" }}>
                  {`Votre part pour 1/${toShowOrder?.part} personnes est : ${
                    (toShowOrder?.totalPrice /toShowOrder.part
                  ).toFixed(2)}
              `}
                  {renderHTML(`<i>${currency}</i>`)}
                </p>
              ) : (
                ""
              )}
            </b>
          </p>
          <p>{thisDate}</p>
          {/* <QRCode
            value={toShowOrder?.order_id?.toString() || "000"}
            size={100}
          /> */}
          <img
            src={`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${toShowOrder?.order_id}&choe=UTF-8+`}
            width="40%"
          />
          <p>Scanner le numero de Commande {toShowOrder?.order_id}</p>
        </div>
      </div>
    </Container>
  );
};

export default Ticket;

