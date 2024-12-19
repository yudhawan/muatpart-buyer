import GlobalLoading from '@/components/GlobalLoading/GlobalLoading'
import React, { Suspense } from 'react'

function layout({children}) {
  return <Suspense fallback={<GlobalLoading/>}>{children}</Suspense>
}

export default layout
