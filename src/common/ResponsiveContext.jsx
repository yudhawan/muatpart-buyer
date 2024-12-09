import HeaderContainer from "@/containers/HeaderContainer";
import { createContext, useState } from "react";

export const ResponsiveContext = createContext(null)
export const ResponsiveConsumer = ResponsiveContext.Consumer

import React from 'react'
import DefaultScreen from "./DefaultScreen";
import { viewport } from "@/store/viewport";
import { headerProps } from "@/containers/HeaderContainer/headerProps";

function ResponsiveProvider({children}) {
    const [component,setComponent] = useState({
        header:null,
        appBar:null,
        appBarType:'',
    })
    const {isMobile}=viewport()
    const {headerHeight}=headerProps()
    const renderAppBarMobile = (elm)=> setComponent(prev=>({...prev,appBar:elm}))
    const renderHeader = (elm)=> setComponent(prev=>({...prev,header:elm}))
    const setAppBarTypeMobile = (val)=> setComponent(prev=>({...prev,appBarType:val}))
    const onBack = (val,screen)=> {
        if(!screen) setAppBarTypeMobile(val)
    }
    return (
        <ResponsiveContext.Provider value={{
            appBarType:component.appBarType,
            renderAppBarMobile,
            renderHeader,
            setAppBarTypeMobile,
            onBack
        }}>
            <HeaderContainer 
                renderAppBarMobile={component.appBar} 
                renderAppBar={component.header}
                type={component.appBarType}
            />
            {DefaultScreen(component.appBarType)?<div style={{marginTop:`${isMobile?headerHeight+16:headerHeight+24}px`,paddingInline:isMobile?'16px':''}} className={`w-full max-w-[1280px] mx-auto`}>{DefaultScreen(component.appBarType)}</div>:children}
        </ResponsiveContext.Provider>
    )
}

export default ResponsiveProvider
