import React from 'react'
import LoyalityProgramTable from '../../components/loyaltyProgram/LoyalityProgramTable'
import LoyalityCard from '../../components/loyaltyProgram/LoyalityCard'
import PaymentForm from '../../components/loyaltyProgram/PaymentForm'

const LoyaltyProgram = () => {
  return (
    <div className=' space-y-8'>
        {/* <LoyalityCard /> */}
      <LoyalityProgramTable />
      {/* <PaymentForm /> */}
    </div>
  )
}

export default LoyaltyProgram
