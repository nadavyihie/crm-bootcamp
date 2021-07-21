import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../Loading/Loading";
import './css/dashboard-style.css'
function Dashboard(props) {
  const [accountID, setaccountID] = useState(
    props.userDetails[0].managerID == -1
      ? props.userDetails[0].id
      : props.userDetails[0].managerID
  );
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    fetchCitiesDashboard();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const fetchCitiesDashboard = () => {
    axios
      .post("http://localhost:991/rentals/readPopularCities/", {
        id: accountID,
      })
      .then((res) => {
        console.log(res.data.cities);
        setCities(res.data.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  };



const citiesData = {
    labels: cities.map((city) => city.City),
    datasets: [
    
      {
        label: 'Profits(dollars)',
        data: cities.map((city) => city.total_Profit),
        backgroundColor:   'rgba(255, 99, 132, 0.2)',
        borderColor: 
            'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        yAxisID: '2',
      },
      {
        label: 'Rentals number',
        data: cities.map((city) => city.Number_of_rentals),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor:   'rgba(54, 162, 235, 1)',
        borderWidth:1,
        yAxisID: '1',
      },

    ],
  };




  if (loading) {
    return <Loading />;
  }
  return (
    <div className='dashboardsContainer'>

       <div className='graphDiv'>
           <span >The most profitable cities
 </span>
        <Bar data={citiesData} />
      </div>

    </div>
  );
}

export default Dashboard;
