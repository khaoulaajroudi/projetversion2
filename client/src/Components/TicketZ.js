import React from "react";
import _ from "lodash";
import  { useState } from "react";

const TicketZ = ({ data, recap, selectedDate, products, tvas , tvasum}) => {
  // const [toShowOrder, settoShowOrder] = useState(order);
  // const currency = localStorage.getItem("currency");
  let ouvDate = recap?.lastOuverture?.date.substr(0, 10);
  let ouvTime = recap?.lastOuverture?.date.substr(11, 5);
  var curr = new Date();
  let nowTime = curr.toISOString().substr(11, 5);
  let ouverture = ouvDate + "  " + ouvTime;
console.log("recapz",recap)
const annuleshistory =recap?.today?.logs?.filter((e) => e.title_log == "Annulation")
console.log("annuleshistory",annuleshistory)

  let tvass =[];
  let v3,v1,v2,vs1,vs2,vs3,ht1,ht2,ht3,totalht2,qqt2,vp2,totalprice2,totalht3,qqt3,vp3,totalprice3,totalht1,qqt1,vp1,totalprice1;
  v2=0;
  v1=0;
  v3=0;
  vs1=0;
  vs2=0;
  vs3=0;
  totalht2=0;
  totalprice2=0;
  qqt2=0;
  vp2=0;

  totalht3=0;
  totalprice3=0;
  qqt3=0;
  vp3=0;
  totalht1=0;
  totalprice1=0;
  qqt1=0;
  vp1=0;

  recap.today?.orderItems?.map((item) => {
    if (item.tva==10) {
      v2=v2+(item.quantity);
      qqt2=(item.quantity)
      vp2=(item.price);
      vs2=+(qqt2*(item.price));
      totalprice2=totalprice2+vs2;
      ht2=qqt2*(vp2/(1+(10/100)));
      totalht2=ht2+totalht2;
      console.log("totalprice2",totalprice2)
     }
     else if(item.tva==20){
      v3=v3+(item.quantity);
      qqt3=(item.quantity)
      vp3=(item.price);
      vs3=+(qqt3*(item.price));
      totalprice3=totalprice3+vs3;
      ht3=qqt3*(vp3/(1+(20/100)));
      totalht3=ht3+totalht3;
      console.log("totalprice3",totalprice3)
     }
       else if (item.tva==5.5) {
        v1=v1+(item.quantity);
      qqt1=(item.quantity)
      vp1=(item.price);
      vs1=+(qqt1*(item.price));
      totalprice1=totalprice1+vs1;
      ht1=qqt1*(vp1/(1+(5.5/100)));
      totalht1=ht1+totalht1;
      console.log("totalprice1",totalprice1)
       }
      
      
      
       
      var tva5= {
        "name": "5.5",
        "count":v1,
        "amount":totalht1.toFixed(2)
      };
      var tva10= {
        "name": "10",
        "count":v2,
        "amount":totalht2.toFixed(2)
      
      };
      var tva20= {
        "name": "20",
        "count":v3,
        "amount":totalht3.toFixed(2)
      };
      tvass[0] = tva5;
      tvass[1] = tva10;
      tvass[2] = tva20;
      console.log(tvass)
   });
  // var tvasum = 0;
 let calcul,va1,vas1;
 let tanul=[]
// 
calcul=0
va1=0
vas1=0
annuleshistory?.map((e)=>{
  va1=+va1
  vas1=e.price
totalprice1=totalprice1+vas1;
var ta1= {
  "name": "Les commandes anuulées : ",
  "count":va1,
  "totaltcc":totalprice1,
};
tanul[0] = ta1;
})


  // let tvas = _.groupBy(recap.today?.orderItems, function (b) {
  //   return b.tva_perc;
  // });
  // console.log(recap.today?.orderItems);
  // Object.keys(tvas).forEach(
  //   (key) => (tvas[key] = tvas[key].reduce((acc, curr) => acc + curr.tva, 0))
  // );
  // console.log(tvas);
  // const renderHTML = (rawHTML: string) =>
  //   React.createElement("div", {
  //     dangerouslySetInnerHTML: { __html: rawHTML },
  //   });
  return (
    <div className="ticketz">
      <div className="z-head">
        <h3>{recap?.Restaurant?.name}</h3>
        <h1>Ticket Z</h1>
        <p>{recap?.Restaurant?.address}</p>
        <p>Tel : {recap?.Restaurant?.telephone}</p>
      </div>
      <div className="z-body">
        <p>---------------------------------</p>
        <div className="b_el" style={{marginRight:"20px"}}>
          <p>
            <b>Impression :</b>
          </p>
          <p>{selectedDate + " " + nowTime}</p>
        </div>
        <div className="b_el" style={{marginRight:"20px"}}>
          <p>
            <b>Ouverture :</b>
          </p>
          <p>{ouverture}</p>
        </div>
        <div className="b_el" style={{marginRight:"20px"}}>
          <p>
            <b>Fermeture :</b>
          </p>
          <p>{selectedDate + " " + nowTime}</p>
        </div>
        <p>---------------------------------</p>
        <h6>
          <b>Commandes :</b> {recap?.today?.nbr}
        </h6>
        <h6>
          <b>Clients :</b> {Object.keys(recap?.today?.clientGroups || {}).length}
        </h6>
        <h6>
          <b>Ticket moyen :</b>{" "}
          {Number(
            (
              (recap?.today?.total) /
              recap?.today?.nbr
            ).toFixed(2)
          ) || 0}
          €
          {/*  */}
        </h6>
        <h6>
        <b>Annules :</b>{" "}
        {annuleshistory?.map((e) => e).length}
        </h6>
        {tanul.map((item) => (
  <>

<div>
                      
    <li>   {item.name} {item.totaltcc} €</li>
    </div>
    </>
        ))}
      {/* annulation */}
          {/* {toShowOrder.orderItems &&
            toShowOrder.orderItems.map((item, key) => (
              <>
                <div className="ticket_item">
                  <p>{key + 1 + "-" + item?.name}</p>
                  <div
                    style={{
                      display: "flex",
                      width: "30%",
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
                {item?.stepItems && Object.keys(item.stepItems).length ? (
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
            ))} */}
        
        <p>---------------------------------</p>
        {products?.map((item) => (
          <div className="b_el" style={{marginRight:"20px"}}>
            <p>
              <b>{item.quantity + " X " + item.name}</b>
            </p>
            <p>{item.totalPrice.toFixed(2)}€</p>
          </div>
        ))
        }
 

        <p>---------------------------------</p>
        {Object.keys(recap.today?.groups || {}).map((key) => (
          <div className="b_el" style={{marginRight:"20px"}}>
            <p>
              <b>{recap.today?.groups[key].length} X </b>
              <b>{key == 1 ? "Carte Bancaire" : key == 2 ? "Espéces" : key}</b>
            </p>
            <p>
              {recap.today?.groups[key]
                .reduce(
                  (acc, curr) =>
                    acc + (curr.price + (curr.price * curr.tva) / 100),
                  0
                )
                .toFixed(2) + "€"}
            </p>
          </div>
        ))}
        <p>---------------------------------</p>
        {/* {Object.keys(tvas || {}).map((key) => {
          // tvasum = tvasum + tvas[key];
          return (
            <div className="b_el">
              <p>
                <b>TVA({Number(key).toFixed(2)}%)</b>
              </p>
              <p>{tvas[key].toFixed(2)}€</p>
            </div>
          );
        })} */}
        {tvass.map((item) => (
  <div className="tva" style={{display:"flex",justifyContent: "space-between", marginRight:"20px"}}>
    <p>TVA({item.name})% :</p>
    <p>{item.count}</p>
    <p>Total HT : {item.amount}</p>
  </div>
 )
 )}
        {/* <div className="b_el">
          <p>
            <b>Total HT</b>
          </p>
          <p>{(recap.today?.total-tvasum).toFixed(2)}€</p>
        </div> */}
        <div className="b_el" style={{marginRight:"20px"}}>
          <p>
            <b>Total TTC</b>
          </p>
          <p>{(recap.today?.total ).toFixed(2)}€</p>
        </div>
        <p>---------------------------------</p>
        <div className="b_el" style={{marginRight:"20px"}}>
          <p>
            <b>Fond de caisse initial</b>
          </p>
          <p>{recap.lastOuverture?.montant.toFixed(2)}€</p>
        </div>
        <div className="b_el" style={{marginRight:"20px"}}>
          <p>
            <b>Fond de caisse final</b>
          </p>
          <p>
            {(
              recap.lastOuverture?.montant +
              recap.today?.total 
             
            ).toFixed(2)}
            €
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketZ;
