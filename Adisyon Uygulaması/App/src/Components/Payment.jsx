import axios from 'axios'
import React, { useState } from 'react'
import FoodData from '../subComponents/FoodData'
import { ImCross } from "react-icons/im";

function Payment({changeDisplay}) {

  const foodItems = FoodData();

  const [tableNo, setTableNo] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [price, setPrice] = useState(0)

  const handleTableNo = () =>{
    if(tableNo == ""){
      setIsActive(false)
    }
    else{
      setIsActive(true)
    }
    showPrice();
  }

  const handleActive = () =>{
    setIsActive(!isActive)
    setTableNo("");
  }

  const paidSuccess = async () => {
      const response = await axios.get(`http://localhost:3001/Tables/${tableNo}`);
      const resetData = response.data;
      resetData.food = "";
      resetData.drink = "";
      resetData.price = 0;

      axios.put(`http://localhost:3001/Tables/${tableNo}`,resetData).then(response =>{
        console.log("Veri güncellendi", response.data);
      }).catch(error =>{
        console.log("Hata",error)
      })


    alert("Ödeme işleminiz başarıyla tamamlandı!")
    setIsActive(!isActive)
    setTableNo("")
    window.location.reload();
  }

  const showPrice = async () =>{
    try{
      const response = await axios.get(`http://localhost:3001/Tables/${tableNo}`);
      console.log(response.data)
      foodItems.map((item)=>{
        if(item.name === response.data.food){
          const price = item.price * response.data.price
          setPrice(price)
        }
      })
    }catch(error){
      alert(error)
    }
  }

  const handleClick = () =>{
    changeDisplay();
    handleActive();
  }

  return (
    <>
    <div className='paymentTopDiv'>
      <button className='paymentButton' onClick={handleClick}><ImCross className='cashButton'/></button>
    </div>
    <div className='paymentMainDiv'>
       <label>Masa No Giriniz   </label>
       <input type='text' value={tableNo} onChange={(e)=>{setTableNo(e.target.value)}}></input>
       <label className={isActive ? "totalPrice" : "totalPriceNone"} >Toplam Tutar : {price} TL</label>
       <button className={isActive ? "buttonActiveNone" : "buttonActive"} onClick={()=>{
        handleTableNo();
        }}>Masa Ara</button>
       <div className='paymentButtons'>
       <button style={{backgroundColor:'rgb(83, 83, 175)' , color:'black' }} className={isActive ? "buttonActive" : "buttonActiveNone"} onClick={paidSuccess}>Ödemeyi Tamamla</button>
       <button style={{backgroundColor:'red' , color:'white' }} className={isActive ? "buttonActive" : "buttonActiveNone"} onClick={handleActive}>İptal</button>
       </div>
       </div>

    </>
  )
}

export default Payment
