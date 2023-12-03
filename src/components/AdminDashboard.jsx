/* eslint-disable no-unused-vars */
// AdminDashboard.jsx

import { useState, useEffect } from "react";
import { getAdminDetails, updatePrice } from "../utils/api";
import { Bar } from "react-chartjs-2";

// eslint-disable-next-line react/prop-types
const AdminDashboard = ({ token }) => {
  // eslint-disable-next-line no-unused-vars

  const [data, setData] = useState(null);
  const [customSongAmount, setCustomSongAmount] = useState(0);
  const [regularSongAmounts, setRegularSongAmounts] = useState({
    category_7: 80,
    category_8: 60,
    category_9: 40,
    category_10: 20,
  });
  const [chargeCustomers, setChargeCustomers] = useState(false);
  const graphData = {
    labels: [
      "Custom Amount",
      "Category 7",
      "Category 8",
      "Category 9",
      "Category 10",
    ],
    datasets: [
      {
        label: "Song Request Amounts",
        backgroundColor: "#F0C3F1",
        borderColor: "#FFFFFF",
        borderWidth: 1,
        hoverBackgroundColor: "#6741D9",
        hoverBorderColor: "#F0C3F1",
        barThickness: 6,
        
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminId = 4; // Set the adminId here (or receive it as a prop)
        const response = await getAdminDetails(adminId);
        setData(response.data);
        setChargeCustomers(response.data.charge_customers);
        setCustomSongAmount(response.data.amount.category_6);
        setRegularSongAmounts({
          category_7: response.data.amount.category_7,
          category_8: response.data.amount.category_8,
          category_9: response.data.amount.category_9,
          category_10: response.data.amount.category_10,
        });
        // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data", error);
        // Handle error
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
      const adminId = 4; // Set the adminId here (or receive it as a prop)
      const updatedPrices = {
        category_6: customSongAmount,
        ...regularSongAmounts,
      }; // Example updated prices
      const response = await updatePrice(adminId, updatedPrices);
      console.log("Prices updated:", response.data);
      // Handle successful price update
    } catch (error) {
      console.error("Error updating prices", error);
      // Handle error
    }
  };

  return (
    <div className="admin-dashboard">
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
          <input
            type="number"
            value={customSongAmount}
            min="99"
            onChange={handleCustomSongAmountChange}
          />
        </div>
      )}
      {/* Question 3 */}
      {chargeCustomers && (
        <div className="question">
          <p>Regular song request amounts, from high to low</p>
          <input
            type="number"
            value={regularSongAmounts.category_7}
            min="79"
            onChange={(e) => handleRegularSongAmountChange(e, "category_7")}
          />
          <input
            type="number"
            value={regularSongAmounts.category_8}
            min="59"
            onChange={(e) => handleRegularSongAmountChange(e, "category_8")}
          />
          <input
            type="number"
            value={regularSongAmounts.category_9}
            min="39"
            onChange={(e) => handleRegularSongAmountChange(e, "category_9")}
          />
          <input
            type="number"
            value={regularSongAmounts.category_10}
            min="19"
            onChange={(e) => handleRegularSongAmountChange(e, "category_10")}
          />
        </div>
      )}
      {/* Graph */}
      {/* Render the graph based on customSongAmount and regularSongAmounts */}
      {chargeCustomers && (
        <div className="graph-container">
          <h2>Graph</h2>
          <div className="graph">
            <Bar
              data={graphData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  // yAxes: [{
                  //   ticks: {
                  //     beginAtZero: true,
                  //     fontColor: '#FFFFFF', // Change as per style requirements
                  //   },
                  //   gridLines: {
                  //     color: '#FFFFFF', // Change as per style requirements
                  //   },
                  // }],
                  // xAxes: [{
                  //   ticks: {
                  //     fontColor: '#FFFFFF', // Change as per style requirements
                  //   },
                  //   gridLines: {
                  //     display: false,
                  //   },
                  // }],
                  y: {
                    min: -15,
                    max: 15,
                    stepSize: 5,
                    ticks:{
                      color: '#FFFFFF'
                    }
                  },
                  x: {},
                },
              }}
            />
          </div>
        </div>
      )}
      <button onClick={handleSave} disabled={!chargeCustomers}>
        Save
      </button>
    </div>
  );
};

export default AdminDashboard;
