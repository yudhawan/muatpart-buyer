import NavbarContainer from "@/containers/NavbarContainer";
import { createContext, useState } from "react";

export const ComponentContext = createContext(null)
export const ComponentConsumer = ComponentContext.Consumer
function ComponentProvider({children}) {
    const [getComponent,setComponent]=useState({
        appBar:null,
        appBarType:'',
        appBarClickBack:()=>{},
        screen:null,
        header:null
    })
    const renderAppBar = (elm)=> setComponent(prev=>({...prev,appBar:elm}))
    const renderHeader = (elm)=> setComponent(prev=>({...prev,header:elm}))
    const setAppBarType = (val)=> setComponent(prev=>({...prev,appBarType:val}))
    const setAppBarClickBack = (val)=> setComponent(prev=>({...prev,appBarClickBack:val}))
    const renderScreen = (elm)=> setComponent(prev=>({...prev,screen:elm}))
    return (
        <ComponentContext.Provider value={{
            renderAppBar,
            renderHeader,
            setAppBarType,
            setAppBarClickBack,
            renderScreen
        }}>
            <NavbarContainer 
            children={getComponent.header} 
            childrenMobile={getComponent.appBar}
            setAppBarClickBack={getComponent.appBarClickBack}
             />
            {getComponent.screen?getComponent.screen:children}
        </ComponentContext.Provider>
    )
}
export default ComponentProvider