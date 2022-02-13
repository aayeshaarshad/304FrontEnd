const fetcher = (...args) => fetch(...args).then((res) => res.json())
import useSWR from "swr";
export default function InterestRatesNeutrino() {

    const { data, isLoading, error } = useInterestPrices();
    if (error) return <div>Failed to load interest rates!</div>
    if (isLoading) return <div>Loading...</div>


    return (
        <div className="card overflow-auto">
            <div className="card-body">
                <h5 className="card-title">All Markets data</h5>
                <h6 className="card-subtitle mb-2 text-muted">Waves vs other crypto</h6>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Current Rate</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-auto h-20 max-h-20">
                    <MarketItems items={data.rates}></MarketItems>
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
            </tr>
        )
    }
    let list = items.map((item, index) => (
        <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td>{item.currentRate}</td>
        </tr>

    ));
    return list;
}


export function useInterestPrices() {
    const { data, error } = useSWR('/api/interestRates', fetcher, { refreshInterval: 5*60*1000 })
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}