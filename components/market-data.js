import useSWR from 'swr'
import {
    useMarketPrices
} from './market-price';
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function MarketData() {

    const { data, isLoading, error } = useMarketPrices();
    if (error) return <div>Failed to load market data!</div>
    if (isLoading) return <div>Loading...</div>


    return (
        <div class="card overflow-auto h-96">
            <div class="card-body">
                <h5 class="card-title">All Markets data</h5>
                <h6 class="card-subtitle mb-2 text-muted">Waves vs other crypto</h6>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Market</th>
                            <th scope="col">Last Price</th>
                            <th scope="col">Volume</th>
                        </tr>
                    </thead>
                    <tbody class="overflow-y-auto h-20 max-h-20">
                    <MarketItems items={data.marketPrice}></MarketItems>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function MarketItems({ items }) {
    if (!items) {
        return (
            <tr>
                <th scope="row">0</th>
                <td>no data</td>
                <td>no data</td>
                <td>no data</td>
            </tr>
        )
    }
    let list = items.map((item, index) => (
        <tr>
            <th scope="row">{index}</th>
            <td>Waves/{item.vs}</td>
            <td>{(item.lastPrice % 1 !== 0) ? item.lastPrice.toFixed(6) : item.lastPrice}</td>
            <td>{item.volume}</td>
        </tr>

    ));
    return list;
}