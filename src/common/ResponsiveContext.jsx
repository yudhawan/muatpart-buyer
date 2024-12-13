import HeaderContainer from "@/containers/HeaderContainer";
import { createContext, useContext, useState } from "react";

export const ResponsiveContext = createContext(null)

import React from 'react'
import DefaultScreen from "./DefaultScreen";
import { viewport } from "@/store/viewport";
import { headerProps } from "@/containers/HeaderContainer/headerProps";
import { useRouter } from "next/navigation";
import BottomTabNavigation from "@/containers/BottomTabNavigation/BottomTabNavigation";

function ResponsiveProvider({children}) {
    const router = useRouter()
    const [getHeader,setHeader] = useState({
        onBack:null,
        onAction:null,
        title:'',
        showBackButton:true,
        appBarType:'',
        renderBack:null,
        renderActionButton:null,
        renderAppBar:null,
        renderHeader:null,
        shadow:true,
        defaultType:''
    })
    const [search,editSearch] = useState({
        placeholder:'muatparts',
        value:'',
        type:'text'
    })

    const [screen,setScreen]=useState('')
    const [getGlobalPadding,setGlobalPadding]=useState(true)
    const {isMobile}=viewport()
    const {headerHeight}=headerProps()
    const renderAppBarMobile = (elm)=> setHeader(prev=>({...prev,renderAppBar:elm}))
    const renderHeader = (elm)=> setHeader(prev=>({...prev,renderHeader:elm}))
    const setAppBar = (val)=> setHeader(prev=>({...prev,...val}))
    const setSearch = (val)=> editSearch(prev=>({...prev,...val}))
    const clearScreen = ()=>{
        setScreen('')
        setAppBar({
            onBack:null,
            title:'',
            showBackButton:true,
            appBarType:'',
            renderAppBar:null,
            renderHeader:null,
            renderBack:null,
            renderActionButton:null,
            shadow:true,
            defaultType:''
        })
    }
    const handleBack = ()=> {
        if (getHeader.onBack) {
            getHeader.onBack()
        } else {
            router.back()
        }
    }
    const handleAction = ()=> {
        if (getHeader.onAction) {
            getHeader.onAction()
        } else {
            console.log('do something')
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
            handleAction,
            setGlobalPadding,
            search,
            shadow:getHeader.shadow
        }}>
            <HeaderContainer 
                renderAppBarMobile={getHeader.renderAppBar} 
                renderAppBar={getHeader.renderHeader}
                type={getHeader.appBarType}
            />
            {
                DefaultScreen(getHeader.defaultType)?
                <div style={{marginTop:`${headerHeight}px`,}} className={`w-full ${getGlobalPadding?'max-w-[1280px] mx-auto':''}`}>
                    {DefaultScreen(getHeader.defaultType)}
                </div>
                :children
            }
            {/* <BottomTabNavigation/> */}
        </ResponsiveContext.Provider>
    )
}

export default ResponsiveProvider

export const useHeader =()=> useContext(ResponsiveContext)
