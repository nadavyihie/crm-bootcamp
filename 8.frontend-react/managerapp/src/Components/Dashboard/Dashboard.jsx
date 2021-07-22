import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ImUsers } from "react-icons/im";
import Loading from "../Loading/Loading";
import "./css/dashboard-style.css";
function Dashboard(props) {
  const [accountID, setaccountID] = useState(
    props.userDetails[0].managerID == -1
      ? props.userDetails[0].id
      : props.userDetails[0].managerID
  );
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [totalEarn, setTotalEarn] = useState([]);
  const [months, setMonths] = useState([]);
  const [genres, setGenres] = useState([]);
  const [totalRent, setTotalRent] = useState([]);
  const [clientsNumber,setClientsNumber]=useState([])
  useEffect(() => {
   
      fetchCitiesDashboard();
      fetchMonthsDashboard();
      fetchGenresDashboard();
      fetchEarnDashboard();
      fetchTotalRentDashboard();
      fetchClientsNumber();
   
   
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

  const fetchEarnDashboard = () => {
    axios
      .post("http://localhost:991/rentals/readTotalEarning/", {
        id: accountID,
      })
      .then((res) => {
        setTotalEarn(res.data.earning[0].total_earning);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const fetchClientsNumber = () => {
    axios
      .post("http://localhost:991/rentals/readClientsNumber/", {
        id: accountID,
      })
      .then((res) => {
        setClientsNumber(res.data.clientsNumber[0].clients_number);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const fetchTotalRentDashboard = () => {
    axios
      .post("http://localhost:991/rentals/readTotalRentals/", {
        id: accountID,
      })
      .then((res) => {
        setTotalRent(res.data.rentals[0].total_rentals);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const fetchGenresDashboard = () => {
    axios
      .post("http://localhost:991/rentals/readGenreData/", {
        id: accountID,
      })
      .then((res) => {
        setGenres(res.data.genres);
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
        label: "Rentals per city",
        data: cities.map((city) => city.Number_of_rentals),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const monthsArr =[];
  for(let i=0;i<12;i++){
    monthsArr.push({"income":0,"rentals_number":0})
  }

  console.log(months);
  for (const month of months) {
    monthsArr[month.Month - 1].income = parseInt(month.Profit);
    monthsArr[month.Month - 1].rentals_number =parseInt(month.rentals_number);
  }
 

  const monthsData = {
    labels: [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "june",
      "july",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ],

    datasets: [
      {
        label: "Month income",
        data: monthsArr.map(month=>(month.income)),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.3)",
        yID: 'y1',
      },
      {
        label: "Month rentals number",
        data: monthsArr.map(month=>(month.rentals_number)),
        fill: false,
        backgroundColor: "rgb(47, 61, 214)",
        borderColor: "rgba(26, 41, 210, 0.3)",
        yAxisID: 'y2',
      },
    ],
  };

  const monthsOptions = {
    scales: {
      x: {
        title: {
          color: "black",
          display: true,
          text: "Month",
        },
      },
      y: [
        
        {
          
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y1',
        },
        {
          
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y2',
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };

  const citiesOptions = {
    scales: {
      x: {
        title: {
          color: "black",
          display: true,
          text: "City",
        },
      },
      y: {
        title: {
          color: "black",
          display: true,
          text: "Rentals number",
        },
      },
    },
  };

  const genreData = {
    labels: genres.map((genre) => genre.genre),
    datasets: [
      {
        data: genres.map((genre) => genre.rentals_number),
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
          "rgba(110, 63, 52,0.3)",
          "rgba(210, 61, 11, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(121, 70, 58, 1)",
          "rgba(182, 56, 14, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="dashboardsContainer">
      <div className="totalDiv">
       
          <div className='totalItem'>
            <div className="dataDiv">
          
          <div className="earnsImg"></div>
         {totalEarn}$
            </div>
            <span>Total earning</span>
        </div>
        <div className='totalItem'>
            <div className="dataDiv">
          
          <div className="rentalsImg"></div>
          {totalRent}
            </div>
            <span>Total rentals</span>
        </div>
        <div className='totalItem'>
            <div className="dataDiv">
          <ImUsers className="icon" />
            {clientsNumber}
            </div>
            <span>Total clients</span>
        </div>
      </div>

      <div className="graphDiv">
        <div className="widgetTitle">5 cities with most rentals</div>
        <Bar data={citiesData} options={citiesOptions} />
      </div>
      <div className="graphDiv">
        <div className="widgetTitle">Monthly revenue</div>
        <Line data={monthsData} options={monthsOptions} />
      </div>
      <div className="pieDiv">
        <div className="widgetTitle">Rentals per genre</div>
        <Pie data={genreData} />
      </div>
    </div>
  );
}

export default Dashboard;
