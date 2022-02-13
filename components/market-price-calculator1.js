import React, { useState } from "react";
import useSWR from "swr";

export default function MarketPriceCalculator1() {
    const periods = ['1d', '1w', '1m', '3m', '6m', '1y'];
    const { data, isLoading, isError } = useCurrencies();
    const [vsCurrency, setVsCurrency] = useState(0);
    const [period, setPeriod] = useState(0);
    const [waiting,setWaiting] = useState(false);
    const [json, setJson] = useState({
        SMA: 0,
        EMA: 0,
        WMA: 0
    });
    if (isError) return <div>Failed to load currencies data!</div>
    if (isLoading) return <div>Loading...</div>
    const handleVSChange = (e) => {
        setVsCurrency(e.target.value);
    }
    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    }

    const handleClick = () => {
        if(vsCurrency==0){
            return;
        }
        setWaiting(true);
        getFactors1(vsCurrency, period).then(res => {
            let o = {
                SMA: res.SMA,
                EMA: res.EMA,
                WMA: res.WMA
            }
            setJson(o)
            setWaiting(false)
        });
    }

    return (
        <div className="card max-w-full">
            <div className="card-body">
                <h5 className="card-title">Moving Averages Calculator</h5>
                <h6 className="card-subtitle mb-2 text-muted">SMA, WMA, EMA</h6>
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
                <ShowKeyValue anObject={json}></ShowKeyValue>
                <button className="btn btn-info" type="button" onClick={handleClick}>
                    {waiting? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <></>}
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
    if (!anObject || anObject.EMA == 0 && anObject.SMA==0 && anObject.WMA==0) {
        return <></>
    }
    let list = Object.keys(anObject).map((item, index) => (
        <p key={index}>{index + 1}. <mark>{item} :</mark>{anObject[item]}</p>
    ));
    return list;
}


const fetcher = (...args) => fetch(...args).then((res) => res.json())

function getFactors1(currency, period) {
    return fetch(`/api/calculate1/${currency}/${period}`, {
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