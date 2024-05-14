import React, { useEffect } from 'react'

function PriceDetails({tablePrice}) {
    useEffect(() => {
        console.log(tablePrice)
    }, [tablePrice])
    
  return (
    <div>
      <label>Toplam Tutar : {tablePrice}</label>
    </div>
  )
}

export default PriceDetails
