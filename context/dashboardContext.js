import { createContext, useContext } from "react";

export const DashboardContext = createContext();

const dashboardContextProvider = ({ children }) => {

    
    return (
        <DashboardContext.Provider
        value={{

        }}
        >
            { children }
        </DashboardContext.Provider>
    )

}

export default dashboardContextProvider;


export const useDashboardInfo = () => {
    const values = useContext(dashboardContext);
    return {...values };
};