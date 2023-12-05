/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react";
import { getAdminDetails, updatePrice } from "../utils/api";
import { Bar } from "react-chartjs-2";
import GoogleFont from 'react-google-fonts';
<GoogleFont family='Poppins' />

// eslint-disable-next-line react/prop-types
const AdminDashboard = ({ token }) => {

  const [customSongAmount, setCustomSongAmount] = useState(0);
  const [regularSongAmounts, setRegularSongAmounts] = useState({
    category_7: 0,
    category_8: 0,
    category_9: 0,
    category_10: 0,
  });
  const [chargeCustomers, setChargeCustomers] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const graphData = {
    labels: ["Custom", "Category 1", "Category 2", "Category 3", "Category 4"],
    datasets: [
      {
        label: "Song Request Amounts",
        backgroundColor: "#F0C3F1",
        borderWidth: 0,
        hoverBackgroundColor: "#6741D9",
        hoverBorderColor: "#F0C3F1",
        barThickness: 15,

        data: [
          customSongAmount,
          regularSongAmounts.category_7,
          regularSongAmounts.category_8,
          regularSongAmounts.category_9,
          regularSongAmounts.category_10,
        ],
      },
    ],
  };
  // const options = {  maintainAspectRatio: false,
  //   scales: {
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: true,
  //         fontColor: '#000',
  //       },
  //       gridLines: {
  //         color: '#000',
  //       },
  //     }],
  //     xAxes: [{
  //       ticks: {
  //         fontColor: '#000',
  //       },
  //       gridLines: {
  //         display: false,
  //       },
  //     }],
  //   },};

  useEffect(() => {
     const isValuesValid = customSongAmount > 99 &&
     regularSongAmounts.category_7 > 79 &&
     regularSongAmounts.category_8 > 59 &&
     regularSongAmounts.category_9 > 39 &&
     regularSongAmounts.category_10 > 19;
 console.log(isValuesValid,chargeCustomers)
   setIsSaveEnabled(isValuesValid && chargeCustomers);
 }, [customSongAmount, regularSongAmounts, chargeCustomers]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminId = 4; 
        const response = await getAdminDetails(adminId);
        setChargeCustomers(response.data.charge_customers);
        setCustomSongAmount(response.data.amount.category_6);
        setRegularSongAmounts({
          category_7: response.data.amount.category_7,
          category_8: response.data.amount.category_8,
          category_9: response.data.amount.category_9,
          category_10: response.data.amount.category_10,
        });
      
        
      } catch (error) {
        console.error("Error fetching data", error);
      
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleCustomSongAmountChange = (event) => {
    setCustomSongAmount(parseInt(event.target.value));
  };

  const handleRegularSongAmountChange = (event, category) => {
    setRegularSongAmounts({
      ...regularSongAmounts,
      [category]: parseInt(event.target.value),
    });
  };

  const handleSave = async () => {
    try {
      const adminId = 4; 
      const updatedPrices = {
        category_6: customSongAmount,
        ...regularSongAmounts,
      }; 
      const response = await updatePrice(adminId, updatedPrices);
      console.log("Prices updated:", response.data);
    
    } catch (error) {
      console.error("Error updating prices", error);
      
    }
  };
  function borderOne(e) {
    e.target.style.borderWidth = '1px';
  }
  function borderZero(e) {
    e.target.style.borderWidth = '0px';
  }

  return (
    <div className="admin-dashboard" style={{  textAlign: 'center'}}>
      <h1>Admin Dashboard</h1>
      {/* Question 1 */}
      <div className="question">
        <p>Do you want to charge your customers for requesting songs?</p>
        <input
          type="radio"
          value="true"
          checked={chargeCustomers}
          onChange={() => setChargeCustomers(true)}
        />
        <label htmlFor="true">Yes</label>
        <input
          type="radio"
          value="false"
          checked={!chargeCustomers}
          onChange={() => setChargeCustomers(false)}
        />
        <label htmlFor="false">No</label>
      </div>
      {/* Question 2 */}
      {chargeCustomers && (
        <div className="question">
          <p>Custom song request amount</p>
          <input style={{width:'50px'}}
            type="number"
            value={customSongAmount}
            min="99"
            onChange={handleCustomSongAmountChange}
          />
        </div>
      )}
      {/* Question 3 */}
      {chargeCustomers && (
        <div className="question" >
          <p>Regular song request amounts, from high to low</p>
          <div className="inputs" style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
          <input
            style={{width:'50px'}}
            type="number"
            value={regularSongAmounts.category_7}
            min="79"
            onChange={(e) => handleRegularSongAmountChange(e, "category_7")}
          />
          <input style={{width:'50px'}}
            type="number"
            value={regularSongAmounts.category_8}
            min="59"
            onChange={(e) => handleRegularSongAmountChange(e, "category_8")}
          />
         
          <input style={{width:'50px'}}
            type="number"
            value={regularSongAmounts.category_9}
            min="39"
            onChange={(e) => handleRegularSongAmountChange(e, "category_9")}
          />
          <input style={{width:'50px'}}
            type="number"
            value={regularSongAmounts.category_10}
            min="19"
            onChange={(e) => handleRegularSongAmountChange(e, "category_10")}
          />
          </div>
        </div>
      )}
      {/* Graph */}
      {chargeCustomers && (
        <div className="graph-container" style={{width:'600px', display:'flex',flexDirection:'column', alignContent:'center'}}>
          <h2>Graph</h2>
          <div >
            <Bar
              data={graphData}
              options={{maintainAspectRatio: false,
              scales:{
                y: {
                  ticks: { color: '#ffffff', beginAtZero: true }
                },
                x: {
                  ticks: { color: '#ffffff', beginAtZero: true }
                }
              }}}
            
            />
          </div>
        </div>
      )}
      <div style={{padding:'16px'}}>
      <button style={{
          width: '600px',
          maxWidth: '300px',
          fontSize: '16px',
          borderRadius:'8px',
          padding:'0.4em',
          fontWeight:'bold',
          color: isSaveEnabled ? '#FFFFFF' : '#414A4C',
          borderWidth:"0px",
          backgroundColor: isSaveEnabled ? '#6741D9' : '#C2C2C2',
          borderColor: isSaveEnabled ? '#F0C3F1' : '#C2C2C2',
          cursor: isSaveEnabled ? 'pointer' : 'not-allowed',
        }}
        onMouseEnter={borderOne}
        onMouseLeave={borderZero}
        onClick={handleSave}
        disabled={!isSaveEnabled && !chargeCustomers} >
        Save
      </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
