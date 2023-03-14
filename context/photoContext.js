import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../helper/base_url";
import { KEY_PHOTO } from "../helper/query_keys";
import { getPhoto } from "../hooks/useFetchPhoto";



export const PhotoContext = createContext();

const PhotoContextProvider = ({ children }) => {

  
    const propsPhotosQuery = useQuery([KEY_PHOTO],() => getPhoto(`${BASE_URL}/api/photo/`))

    
    return (
        <PhotoContext.Provider
        value={{
            propsPhotosQuery,
        }}
        >
            { children }
        </PhotoContext.Provider>
    )

}

export default PhotoContextProvider;


export const usePhotosInfo = () => {
    const values = useContext(PhotoContext);
    return {...values };
};