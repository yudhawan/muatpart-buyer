import { authZustand } from '@/store/auth/authZustand'
import React from 'react'

function ProtectComponent(Component,) {
  return props=>{
    const {token}=authZustand()
    return <Component {...props} />
  }
}

export default ProtectComponent
