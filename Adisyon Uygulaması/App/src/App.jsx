import "./App.css";
import { FaToilet } from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import TableDetails from "./Components/TableDetails";
import axios from "axios";
import { useEffect, useState } from "react";
import Payment from "./Components/Payment";

function App() {
  const [tables, setTables] = useState([]);
  const [isPayActive, setIsPayActive] = useState(false)
  

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Tables");
      setTables(response.data);
    } catch (error) {
      alert(error);
    }
  };


  useEffect(() => {
    fetchTables();
  }, []);


  const handlePayActive = ()=>{
    setIsPayActive(!isPayActive)
    console.log(isPayActive)
  }

  useEffect(() => {
    console.log(isPayActive)
  }, [isPayActive])

  const toilet = () =>{
    alert("Tuvalet dolu içeride Utku Lale var")
  }

  return (
    <>
      <div className="mainDiv">
        <div className="entrance">
          <div className="door">
            <div>
              <FaDoorOpen className="icon" />
              <h2>Giriş</h2>
            </div>
          </div>
          <div className="cashRegister" onClick={handlePayActive}>
            <div>
              <FaCashRegister className="icon" />
              <h2>Kasa</h2>
            </div>
            
          </div>
          <div className="wc">
            <div>
              <FaToilet className="icon"  onClick={toilet}/>
              <h2>WC</h2>
            </div>
          </div>
        </div>
        <div className="tables">
          <TableDetails tablesDetails={tables} payActive={isPayActive} handlePayActive={handlePayActive}/>
        </div>
        <div className="kitchen">
          <h1>Mutfak Alanı</h1>
        </div>
      </div>
    </>
  );
}

export default App;
