import HeaderContainer from "@/containers/HeaderContainer";
import { createContext, useState } from "react";

export const ResponsiveContext = createContext(null)
export const ResponsiveConsumer = ResponsiveContext.Consumer

import React from 'react'

function ResponsiveProvider({children}) {
    const [component,setComponent] = useState({
        header:null,
        appBar:null,
        appBarType:'',
    })
    const renderAppBarMobile = (elm)=> setComponent(prev=>({...prev,appBar:elm}))
    const renderHeader = (elm)=> setComponent(prev=>({...prev,header:elm}))
    const setAppBarTypeMobile = (val)=> setComponent(prev=>({...prev,appBarType:val}))
    return (
        <ResponsiveContext.Provider value={{
            renderAppBarMobile,
            renderHeader,
            setAppBarTypeMobile,
        }}>
            <HeaderContainer 
                renderAppBarMobile={component.appBar} 
                renderAppBar={component.header}
                type={component.appBarType}
            />
            {children}
        </ResponsiveContext.Provider>
    )
}

export default ResponsiveProvider
