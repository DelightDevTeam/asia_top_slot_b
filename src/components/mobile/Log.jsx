import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseURL';
import TransferLogs from './TransferLogs';
import GameLogs from '../mobile/GameLogs';
import DepositLog from '../mobile/DepositLog';
import WithdrawLog from '../mobile/WithdrawLog';

const Log = ({content}) => {
  const [selectedTab,setSelectedTab]=useState(1);
  const tabs=[
      {id:1,name:content.wallet.deposit,value:''},
      {id:2,name:content.wallet.withdraw,value:''},
      {id:3,name:content.log.transfer_log,value:''},
      {id:4,name:content.log.game_log,value:''},
   ];

  return (
    <div className='container-fluid'>
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-1 gap-sm-2">
        {tabs.map((tab, index)=>{
            return <div onClick={()=>setSelectedTab(tab.id)} className={`btn py-1 px-3 py-sm-2 px-sm-5 ${tab.id===selectedTab ? 'navLoginBtn text-black' : 'bg-dark text-white' }  `} key={index}>
                <p className="fw-semibold moneyTransferTabTitle">{tab.name}</p>
            </div>
        })}
      </div>
      {/* cash in */}
      {selectedTab === 1 && (
        <DepositLog />
      )}
      {/* cash out */}
      {selectedTab === 2 && (
        <WithdrawLog />
      )}
      {/* transaction */}
      {selectedTab === 3 && (
        <TransferLogs content={content} />
      )}
      {/* game logs */}
      {selectedTab === 4 && (
        <GameLogs content={content} />
      )}
    </div>
  )
}

export default Log