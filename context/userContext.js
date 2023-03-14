import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../helper/base_url";
import { KEY_USER } from "../helper/query_keys";
import { getUsers } from "../hooks/useFetchUser";


export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  
    const propsUsersQuery = useQuery([KEY_USER],() => getUsers(`${BASE_URL}/api/user/`))
    //console.log(propsUsersQuery)
    const [currentProfile, setCurrentProfile] = useState([])
    const [currentPhotoURL, setCurrentPhotoURL] = useState("");
    const [oldPhotoURL, setOldPhotoURL] = useState("");
    const [newPhoto, setNewPhoto] = useState(false)
   
    return (
        <UserContext.Provider
        value={{
            propsUsersQuery,
            currentProfile, setCurrentProfile,
            currentPhotoURL, setCurrentPhotoURL,
            oldPhotoURL, setOldPhotoURL,
            newPhoto, setNewPhoto
        }}
        >
            { children }
        </UserContext.Provider>
    )

}

export default UserContextProvider;


export const useUsersInfo = () => {
    const values = useContext(UserContext);
    return {...values };
};