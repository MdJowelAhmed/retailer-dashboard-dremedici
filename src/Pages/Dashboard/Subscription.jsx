import React, { useEffect, useState } from 'react';
import LoyalityProgramTable from '../../components/loyaltyProgram/LoyalityProgramTable';
import PaymentForm from '../../components/loyaltyProgram/PaymentForm';

const Subscription = () => {


    return (
      <div>
        {/* header
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Subscription</h1>
                <button className='bg-primary text-white h-10 px-4 rounded-md'>Create Subscription</button>
            </div> */
        }

        <LoyalityProgramTable />
        <PaymentForm />
      </div>
    );
}

export default Subscription