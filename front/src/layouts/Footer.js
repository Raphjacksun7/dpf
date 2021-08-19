import React from 'react'
import { CFooter } from '@coreui/react'

const Footer = () => {
  return (
    <CFooter fixed={false}>
        <strong>Digit Act © </strong> 2021 Powered by ADHERE 
    </CFooter>
  )
}

export default React.memo(Footer)
