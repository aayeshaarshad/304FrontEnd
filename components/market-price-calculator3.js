import React, { useState } from "react";
import { useInterestPrices } from "./interest-rates-neutrino";

export default function MarketPriceCalculator3() {
    const { data, isLoading, isError } = useInterestPrices();
    const [vsCurrency, setVsCurrency] = useState(0);
    const [amount, setAmount] = useState(0);
    const [period, setPeriod] = useState(0);
    const [waiting, setWaiting] = useState(false);
    const [json, setJson] = useState({
        Profit: 0
    });
    if (isError) return <div>Failed to load currencies data!</div>
    if (isLoading) return <div>Loading...</div>
    const handleVSChange = (e) => {
        setVsCurrency(e.target.value);
    }
    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleClick = () => {
        if (vsCurrency == 0) {
            return;
        }
        setWaiting(true);
        getFactors1(vsCurrency, period, amount).then(res => {
            console.log(res)
            let o = {
                Profit: res.profit == null ? 'Could not calculate profit' : res.profit
            }
            setJson(o)
            setWaiting(false)
        });
    }

    return (
        <div className="card max-w-full">
            <div className="card-body">
                <h5 className="card-title">Profit</h5>
                <h6 className="card-subtitle mb-2 text-muted">calculator</h6>
                <div className="input-group mt-3 mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Currency</label>
                    <select className="form-select" id="inputGroupSelect01" value={vsCurrency} onChange={handleVSChange}>
                        <option>Choose...</option>
                        <CurrencyOptions data={data.rates}></CurrencyOptions>
                    </select>
                </div>
                <div className="input-group mt-3 mb-3">
                    <span className="input-group-text" id="basic-addon1">Principle Amount</span>
                    <input type="number" className="form-control" placeholder="e.g. 100000" aria-label="amount" aria-describedby="basic-addon1" onChange={handleAmountChange} value={amount} />
                </div>
                <div className="input-group mt-3 mb-3">
                    <span className="input-group-text" id="basic-addon1">Period (no. of days)</span>
                    <input type="number" className="form-control" placeholder="Number of days i.e. 10" aria-label="period" aria-describedby="basic-addon1" onChange={handlePeriodChange} value={period} />
                </div>

                <ShowKeyValue anObject={json}></ShowKeyValue>
                <button className="btn btn-info" type="button" onClick={handleClick}>
                    {waiting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <></>}
                    Calculate
                </button>
            </div>
        </div>
    )
}

function ShowKeyValue({ anObject }) {
    if (!anObject || anObject['Sharpe Ratio'] == 100000) {
        return <></>
    }
    let list = Object.keys(anObject).map((item, index) => (
        <p key={index}><mark>{item} :</mark>{anObject[item]}</p>
    ));
    return list;
}


function getFactors1(currency, period, amount) {
    return fetch(`/api/profit/${currency}/${amount}/${period}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => response.json())
};


function CurrencyOptions({ data }) {
    if (!data || !data) {
        return <option value="-1">No records!</option>
    }
    let list = data.map((item, index) => (
        <option key={index} value={item.name}>{item.name}</option>
    ));
    return list;
}