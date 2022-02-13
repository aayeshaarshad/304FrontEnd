import 'chart.js/auto';
import useSWR from 'swr'

function MarketPrice() {

    const { data, isLoading, isError } = useMarketPrices();
    if (isError) return <div>Failed to load market data!</div>
    if (isLoading) return <div>Loading...</div>
    let objs = filterPrices(data.marketPrice);
    return (
        <>
            <div class="card w-72">
                <div class="card-body">
                    <h5 class="card-title">Waves cryptocurrency</h5>
                    <h6 class="card-subtitle mb-2 text-muted">The Waves blockchain is designed to enable users to create and launch custom crypto tokens.</h6>
                    <br />
                    <p class="card-text text-blue-600">Last market prices are:</p>
                    <Prices items={objs}></Prices>
                </div>
            </div>
        </>
    )
}

export default MarketPrice

function Prices({ items }) {
    if (!items) {
        return <p>no prices found!</p>
    }
    let list = items.map((item, index) => (
        <p>1 Waves = <b>{(item.lastPrice % 1 !== 0) ? item.lastPrice.toFixed(6) : item.lastPrice}</b> {item.vs}</p>
    ));
    return list;
}


const fetcher = (...args) => fetch(...args).then((res) => res.json())
export function useMarketPrices() {
    const { data, error } = useSWR('/api/getMarketData', fetcher, { refreshInterval: 10000 })

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

function filterPrices(marketPrices) {
    let objs = [];
    let count = 4;
    let items = marketPrices;

    let a = new Map();
    for (let i = 0; count != 0; i++) {
        if(a.has(items[i]['vs'])){
            continue;
        }
        if (items[i]['vs'] == 'USD Coin' ||
            items[i]['vs'] == 'USD Tether' ||
            items[i]['vs'] == 'Ethereum' ||
            items[i]['vs'] == 'Bitcoin') {
            objs.push(items[i]);
            a.set(items[i]['vs']);
            count--;
        }
    }
    return objs;
}