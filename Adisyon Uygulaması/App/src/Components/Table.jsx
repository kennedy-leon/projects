import React from "react";
import { GiTable } from "react-icons/gi";

function Table({ tablesDetails, getIndexNumber }) {
  return tablesDetails.map((table, index) => (
    <div className={"table" + (table.food === "" ? "Empty" : "Filled")} key={index} onClick={() => getIndexNumber(index)}>
      <GiTable className="tableIcon" />
      <h3>Masa{table.id}</h3>
    </div>
  ));
}

export default Table;
