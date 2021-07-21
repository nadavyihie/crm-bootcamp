import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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
  const [months, setMonths] = useState([]);

  useEffect(() => {
    fetchCitiesDashboard();
    fetchMonthsDashboard();
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
        setCities(res.data.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMonthsDashboard = () => {
    axios
      .post("http://localhost:991/rentals/readProfitableMonths/", {
        id: accountID,
      })
      .then((res) => {
        setMonths(res.data.months);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const citiesData = {
    labels: cities.map((city) => city.City),
    datasets: [
    
    
      {
        label: 'Rentals per city',
        data: cities.map((city) => city.Number_of_rentals),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor:   'rgba(54, 162, 235, 1)',
        borderWidth:1,
      },

    ],
  };

  const monthsArr=[0,0,0,0,0,0,0,0,0,0,0,0];
  for(const month of months){
    monthsArr[month.Month-1]=month.Profit;
  }
  console.log(monthsArr);
  const monthsData = {
    labels: ['jan', 'feb', 'mar', 'apr', 'may', 'june','july','aug','sep','oct','nov','dec'],

    datasets: [
      {
        label: 'incomes per month',
        data: monthsArr,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        
      },
    ],
  };
  
const monthsOptions = {
  scales: {
    x: {
      
      title: {
        color: 'black',
        display: true,
        text: 'Month'
      },

    
       },
       y: {
        title: {
          color: 'black',
          display: true,
          text: 'Incomes'
        }
         }
    },
}

const citiesOptions = {
  scales: {
    x: {
      
      title: {
        color: 'black',
        display: true,
        text: 'City'
      },

    
       },
       y: {
        title: {
          color: 'black',
          display: true,
          text: 'Rentals number'
        }
         }
    },
}

  if (loading) {
    return <Loading />;
  }
  return (
    <div className='dashboardsContainer'>

       <div className='graphDiv'>
           <span >5 cities with most rentals
 </span>
        <Bar data={citiesData} options={citiesOptions} />
      </div>
      <div className='graphDiv'>
           <span >Monthly revenues
 </span>
      <Line data={monthsData} options={monthsOptions}  />
</div>

    </div>
  );
}

export default Dashboard;
