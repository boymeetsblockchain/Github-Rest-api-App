import React from 'react'
import { useState,useContext} from 'react'
import GithubContext from '../../context/github/GIthubContext'
import AlertContext from '../../context/alert/AlertContext'
function UserSearch() {
  const [text,setText]= useState("")
  const {users,searchUsers,clearUsers}= useContext(GithubContext)
  const {setAlert}= useContext(AlertContext)
  const handleSubmit=(e)=>{
    e.preventDefault()

    if(text ===""){
      setAlert("please enter something","error")
    }else{
      searchUsers(text)
      setText("")
    }
  }
  const handleClearUser=()=>{
    clearUsers()
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black " 
              onChange={(e)=>setText(e.target.value)}
              value={text}
              placeholder='Search' />
              <button className="absolute top-0 right-0 rounded-l-none w-36 text-white btn btn-lg">
                GO
              </button>
            </div>
          </div>
        </form>
      </div>
      {
        users.length>0 && (
          <div>
          <button className="btn btn-ghost btn-lg" onClick={handleClearUser}>
            Clear
          </button>
        </div>
        )
      }
      
    </div>
  )
}

export default UserSearch