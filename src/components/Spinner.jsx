import React from 'react'
import { HashLoader } from 'react-spinners'
function Spinner() {
  return (
    <div className="w-100 mt-20 flex justify-center items-center">
        <HashLoader color="#fff" size={200} />
    </div>
  )
}

export default Spinner