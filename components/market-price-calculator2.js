import React, { useState } from "react";
import useSWR from "swr";

export default function MarketPriceCalculator2() {
    const periods = ['1d', '1w', '1m', '3m', '6m', '1y'];
    const { data, isLoading, isError } = useCurrencies();
    const [vsCurrency, setVsCurrency] = useState(0);
    const [period, setPeriod] = useState(0);
    const [rate, setRate] = useState(0);
    const [waiting, setWaiting] = useState(false);
    const [json, setJson] = useState({
        'Sharpe Ratio':100000
    });
    if (isError) return <div>Failed to load currencies data!</div>
    if (isLoading) return <div>Loading...</div>
    const handleVSChange = (e) => {
        setVsCurrency(e.target.value);
    }
    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    }

    const handleRateChange = (e) => {
        if (e.target.value > 100) {
            setRate(100)
        } else if (e.target.value < 0) {
            setRate(0)
        } else {
            setRate(e.target.value);
        }
    }

    const handleClick = () => {
        if (vsCurrency == 0) {
            return;
        }
        setWaiting(true);
        getFactors1(vsCurrency, period, rate).then(res => {
            console.log(res)
            let o = {
                'Sharpe Ratio': res.SR == null? 'Could not calculate': res.SR
            }
            setJson(o)
            setWaiting(false)
        });
    }

    return (
        <div className="card max-w-full">
            <div className="card-body">
                <h5 className="card-title">Sharpe Ratio</h5>
                <h6 className="card-subtitle mb-2 text-muted">calculator</h6>
                <div className="input-group mt-3 mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Waves vs Currency</label>
                    <select className="form-select" id="inputGroupSelect01" value={vsCurrency} onChange={handleVSChange}>
                        <option>Choose...</option>
                        <CurrencyOptions data={data}></CurrencyOptions>
                    </select>
                </div>
                <div className="input-group mt-3 mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">Moving Average Period</label>
                    <select className="form-select" id="inputGroupSelect02" value={period} onChange={handlePeriodChange}>
                        <option>Choose...</option>
                        <PeriodOptions periods={periods}></PeriodOptions>
                    </select>
                </div>
                <div className="input-group mt-3 mb-3">
                    <span className="input-group-text" id="basic-addon1">Risk free rate</span>
                    <input type="number" step={0.01} className="form-control" placeholder="0 to 100" aria-label="rate" aria-describedby="basic-addon1" onChange={handleRateChange} value={rate} />
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

function PeriodOptions({ periods }) {
    if (!periods) {
        return <option value="-1">No records!</option>
    }
    let list = periods.map((item, index) => (
        <option key={item} value={item}>{item}</option>
    ));
    return list;
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


const fetcher = (...args) => fetch(...args).then((res) => res.json())

function getFactors1(currency, period, rate) {
    return fetch(`/api/calculate2/${currency}/${period}/${rate}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => response.json())
};


function useCurrencies() {
    const { data, error } = useSWR('/api/getCurrencies', fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

function CurrencyOptions({ data }) {
    if (!data || !data.coins) {
        return <option value="-1">No records!</option>
    }
    let list = data.coins.map((item, index) => (
        <option key={item.price_asset_id} value={item.price_asset_id}>{item.name}</option>
    ));
    return list;
}