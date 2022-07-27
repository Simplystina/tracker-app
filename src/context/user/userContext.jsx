import React, { createContext, useEffect, useState } from 'react';
import sdk, { getCurrentUser} from '../../Services/connectApi';
import { useRef } from 'react';


export const UserContext = createContext({user:null,isLoading:true});


const UserProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

//subscribe to changes in user account
    useEffect(()=>{
        const unsuscribe = sdk.subscribe('account', data=>{
            console.log(data.event);
            const accountUpdateCOndition =   data.event === 'account.update.email' || data.event === 'account.update.name' || data.event === 'account.update.password' 
            if(accountUpdateCOndition){
                setUser(data.payload)
            }
            else if(data.event === 'account.sessions.delete'){
                setUser(null) //for subsequent calls
            }
        })
        return unsuscribe
    },[])

//get currently logged in user
    useEffect(()=>{
      const registerUserSession = async() =>{
            try {
                const newUser = await getCurrentUser()
                    setUser(newUser) //user logged in
                    setIsLoading(false)
                }  catch(err){
                    if(err.code === 401){
                        setUser(null) //user logged out
                        setIsLoading(false)
                    }
                }
    }
         registerUserSession()
    },[])

return (
    <UserContext.Provider value={{user,isLoading}}>{children}</UserContext.Provider>
)


}

export default UserProvider;