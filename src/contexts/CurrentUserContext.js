import React from "react";
import { useContext} from "react"
export const CurrentUserContext = React.createContext({user:{}});
export const useCurrentUserContext = () => {
    return useContext(CurrentUserContext)
}
