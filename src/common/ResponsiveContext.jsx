import HeaderContainer from "@/containers/HeaderContainer";
import { createContext, useContext, useState } from "react";

export const ResponsiveContext = createContext(null)

import React from 'react'
import DefaultScreen from "./DefaultScreen";
import { viewport } from "@/store/viewport";
import { headerProps } from "@/containers/HeaderContainer/headerProps";
import { useRouter } from "next/navigation";

function ResponsiveProvider({children}) {
    const router = useRouter()
    const [getHeader,setHeader] = useState({
        onBack:null,
        title:'',
        showBackButton:true,
        appBarType:'',
        appBar:null,
        header:null
    })
    const [search,editSearch] = useState({
        placeholder:'muatparts',
        value:'',
        type:'text'
    })

    const [screen,setScreen]=useState('')
    const {isMobile}=viewport()
    const {headerHeight}=headerProps()
    const renderAppBarMobile = (elm)=> setHeader(prev=>({...prev,appBar:elm}))
    const renderHeader = (elm)=> setHeader(prev=>({...prev,header:elm}))
    const setAppBar = (val)=> setHeader(prev=>({...prev,...val}))
    const setSearch = (val)=> editSearch(prev=>({...prev,...val}))
    const clearScreen = ()=>{
        setScreen('')
        setAppBar({
            onBack:null,
            title:'',
            showBackButton:true,
            appBarType:'',
            appBar:null,
            header:null
        })
    }
    const handleBack = ()=> {
        if (getHeader.onBack) {
            getHeader.onBack()
        } else {
            router.back()
        }
    }
    return (
        <ResponsiveContext.Provider value={{
            appBarType:getHeader.appBarType,
            appBar:getHeader,
            renderAppBarMobile,
            renderHeader,
            setAppBar,
            clearScreen,
            handleBack,
            setScreen,
            screen,
            setSearch,
            search
        }}>
            <HeaderContainer
                renderAppBarMobile={getHeader.appBar}
                renderAppBar={getHeader.header}
                type={getHeader.appBarType}
            />
            {DefaultScreen(getHeader.appBarType)?<div style={{marginTop:`${isMobile?headerHeight+16:headerHeight+24}px`,paddingInline:isMobile?'16px':''}} className={`w-full max-w-[1280px] mx-auto`}>{DefaultScreen(getHeader.appBarType)}</div>:children}
        </ResponsiveContext.Provider>
    )
}

export default ResponsiveProvider

export const useHeader =()=> useContext(ResponsiveContext)
