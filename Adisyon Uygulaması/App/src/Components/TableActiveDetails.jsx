import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import FoodData from "../subComponents/FoodData";
import axios from "axios";

function TableActiveDetails({ activatedTableDetails, setPanel , tables }) {
  
  const foodItems = FoodData();

  const [selectedFood, setSelectedFood] = useState("Tavukburger");
  const [selectedDrink, setSelectedDrink] = useState("Kola");
  const [isEditMode, setIsEditMode] = useState(false)
  const [amount, setAmount] = useState(0)
  

  const handleFoodChange = (e) =>{
    setSelectedFood(e.target.value);
    // alert("Başarıyla seçildi"+e.target.value)
  }

  const handleDrinkChange = (e) =>{
    setSelectedDrink(e.target.value);
    // alert("Başarıyla seçildi"+e.target.value)
  }

  const handlePrice = () => {
    foodItems.map((food)=>{
      if(food === activatedTableDetails.food){
        console.log(food)
      }
    })
  }  

  const changeEditMode = ()=>{
    setIsEditMode(!isEditMode)
  }
  

  const saveEdit = ()=>{
    // alert("Başarıyla Kaydedildi!"+selectedFood+selectedDrink)
    activatedTableDetails.food = selectedFood;
    activatedTableDetails.drink = selectedDrink;
    activatedTableDetails.price = amount;
    // handlePrice();
    changeEditMode();
    saveToDB(activatedTableDetails.id);
  }

  const resetChanges = ()=>{
    setSelectedFood("Tavukburger")
    setSelectedDrink("Kola")
  }
 
  const saveToDB = (id) =>{
    tables.map((table)=>{
      if(id == table.id){
        changeDB(id)
      }
    })
  }

  const changeDB  = async (id) =>{
      axios.put(`http://localhost:3001/Tables/${id}`,activatedTableDetails).then(response =>{
        console.log("Database")
      }).catch(error =>{
        console.log("HATA!",error)
      })
  }

  const handleAmount = (e) =>{
    setAmount(e.target.value)
  }
  
  if (!activatedTableDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="activeDetails">
      <div className="topPanel">
        <div className="closeButton" onClick={()=>{
          setPanel();
          setIsEditMode(false);
        }}>
          <ImCross className="closeIcon" />
        </div>
      </div>
      { !isEditMode ? (
        <div className="tableInfos" style={{display:'flex'}}>
        <label className="title">Masa No : {activatedTableDetails.id}</label>
        <div className="foodOption">
        <label>Yiyecekler : {activatedTableDetails.food}</label>
        <label style={{textDecoration:'underline'}}>Adet : {activatedTableDetails.price}</label>
        </div>
        <label>İçecekler : {activatedTableDetails.drink}</label>
        <button className="editButton" onClick={changeEditMode}>Düzenle</button>
      </div>
      ):( 
      <div className="tableInfos" style={{display:'flex'}}>
        <label className="title">Masa No : {activatedTableDetails.id}</label>
        <div className="editFoodOption">
          <label>Yiyecekler : </label>
          <select value={selectedFood} onChange={handleFoodChange}> 
            <option value="Tavukburger">Tavukburger</option>
            <option value="Kemiksiz Tavuk(10 adet)">Kemiksiz Tavuk(10 adet)</option>
            <option value="Kemiksiz Tavuk(5 adet)">Kemiksiz Tavuk(5 adet)</option>
            <option value="Kanat(5 adet)">Kanat(5 adet)</option>
            <option value="Kanat(10 adet)">Kanat(10 adet))</option>
          </select>
          <label style={{fontSize:'40px'}}>Adet : </label>
          <input type="number" value={amount} onChange={handleAmount} />
        </div>
        <div className="editFoodOption">
          <label>İçecekler : </label>
          <select value={selectedDrink} onChange={handleDrinkChange}> 
            <option value="Kola">Kola</option>
            <option value="Ayran">Ayran</option>
            <option value="Su">Su</option>
            <option value="Sade Soda">Sade Soda</option>
            <option value="Gazoz">Gazoz</option>
          </select>
        </div>
        
        <div>
          <button className="saveButton" onClick={saveEdit}>Onayla</button>
          <button className="cancelButton" onClick={()=>{
            changeEditMode();
            resetChanges();
          }}>İptal</button>
          </div>
      </div>
    )}
    </div>
  );
}

export default TableActiveDetails;
