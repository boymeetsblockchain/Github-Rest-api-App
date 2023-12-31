import { createContext ,useReducer} from "react";
import githubReducer from "./GIthubReducer";
const GithubContext= createContext()

const GITHUB_URL= process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN= process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider= ({children})=>{
 const initialState={
    users:[],
    user:{},
    loading:false,
    repos:[]
 }

 const[state,dispatch]= useReducer(githubReducer,initialState)
    const searchUsers= async(text)=>{
        const params= new URLSearchParams({
            q:text
        })
        setLoading()
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers:{
                Authorization:`token ${GITHUB_TOKEN}`
            }
        })
     const {items} = await response.json()
      dispatch({
        type:"GET_USERS",
        payload:items
      })
    }

    const getUser= async(login)=>{
      
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            headers:{
                Authorization:`token ${GITHUB_TOKEN}`
            }
        })
        if(response.status===404){
            window.location="/notfound"
        }else{
            const data = await response.json()
            dispatch({
              type:"GET_USER",
              payload:data
            })
        }
    
    }
    const getUserRepos= async(login)=>{
        const params= new URLSearchParams({
            sort:"created",
            per_page:10
        })

        setLoading()
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
            headers:{
                Authorization:`token ${GITHUB_TOKEN}`
            }
        })
        if(response.status===404){
            window.location="/notfound"
        }else{
            const data = await response.json()
            dispatch({
              type:"GET_REPOS",
              payload:data
            })
        }
    
    }
    const clearUsers=()=>dispatch({type:"CLEAR_USERS"})

    // set Loading
    const setLoading=()=> dispatch({type:"SET_LOADING"})
    return <GithubContext.Provider value={{users:state.users,
        searchUsers,clearUsers,user:state.user,getUser,
        repos:state.repos,
        getUserRepos,
    loading:state.loading}}>
        {children}
    </GithubContext.Provider>

}

export default GithubContext