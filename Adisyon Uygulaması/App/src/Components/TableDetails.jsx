import React, { useEffect, useState } from "react";
import { GiTable } from "react-icons/gi";
import Table from "./Table";
import TableActiveDetails from "./TableActiveDetails";
import Payment from "./Payment";

function TableDetails({ tablesDetails , payActive , handlePayActive}) {
  const [isActive, setIsActive] = useState(false);
  const [tableIndex, setTableIndex] = useState();
  const [selectedTableID, setSelectedTableID] = useState("")
  

  const selectedTableNumber = (index) => {
    setIsActive(!isActive);
    tablesDetails.map((tableDetail) => {
      if (index + 1 == tableDetail.id) {
        setTableIndex(tableDetail);
        setSelectedTableID(tableDetail.id)
      }
    });
  };

  const changeActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="tablesContainer">
     <div className={payActive ? "paymentScreen" : "paymentScreenNone"} >
      <Payment changeDisplay={handlePayActive}/>
     </div>
      <Table
        tablesDetails={tablesDetails}
        getIndexNumber={selectedTableNumber}
      />
      <div className={isActive ? "tableActive" : "tableActiveNone"}>
        <TableActiveDetails
          activatedTableDetails={tableIndex}
          setPanel={changeActive}
          tableID={selectedTableID}
          tables={tablesDetails}
        />
      
      </div>
    </div>
  );
}

export default TableDetails;
