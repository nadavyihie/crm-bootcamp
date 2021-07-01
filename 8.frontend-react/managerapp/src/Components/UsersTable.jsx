import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../Pages/Table";

function UsersTable(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    // alert(props.userDetails.id);
    axios
      .get("http://localhost:8005/users/fetchallusers", {
        headers: {
          name: props.userDetails.userName,
        },
      })
      .then(function (response) {
        
        setData(response.data.allUsers);
        console.log(response.data.allUsers);
      
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  

  const columns = React.useMemo(
    () => [
        {
            Header: "ID",
            accessor: "id", // accessor is the "key" in the data
          },
      {
        Header: " user name",
        accessor: "userName", // accessor is the "key" in the data
      },
      {
        Header: "full name",
        accessor: "fullName",
      },
      {
        Header: "phone number",
        accessor: "phoneNumber",
      },
      {
        Header: "email",
        accessor: "email",
      },
    //   {
    //     Header: "managerID",
    //     accessor: "managerID",
    //   },
    ],
    []
  );

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default UsersTable;
