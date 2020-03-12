import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'

const base_url = 'http://localhost:5000'

const Wallet = () => {
    const [balance, setBalance] = useState(0)
    const [transaction, setTransaction] = useState([])
    const [id, setId] = useState('Testing')

    useEffect(() => {
        axios
            .get(base_url + '/chain')
            .then(res => {
                setTransaction(res.data.chain);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function balance_total() {

    }

    function change_id() {
        axios
            .post(base_url + '/transaction/new', {
                recipient: id
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    console.log('id =', id)

    return(
        <div>
            <button onClick={change_id}>Change ID</button>
            <h1>Balance: {balance}</h1>
            <h1>Transactions:</h1>
            {transaction.map(tran => {
                return(
                    <div>
                    <p><b>Index:</b> {tran.index}</p>
                    <p><b>Proof:</b> {tran.proof}</p>
                    {tran.transactions.map(action => {
                        return(
                            <div className='senderDiv'>
                                <p><b>Sender:</b> {action.sender}</p>
                                <p><b>Recipient:</b> {action.recipient}</p>
                            </div>
                        )
                    })}
                    </div>
                )
            })}
        </div>
    )
}

export default Wallet;