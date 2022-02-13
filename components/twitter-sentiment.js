import 'chart.js/auto';
import { Pie } from 'react-chartjs-2'
import useSWR from 'swr'

function TwitterSentiment() {

    const { data, isLoading, isError } = useSentiments();
    if (isError) return <div>Failed to load data from twitter!</div>
    if (isLoading) return <div>Loading...</div>

    return (
        <div class="card w-72">
            <div class="card-body">
                <h5 class="card-title">Twitter Sentiment Analysis</h5>
                <h6 class="card-subtitle mb-2 text-muted">Pie Chart</h6>
                <Pie
                    data={data}
                    width={200}
                    height={200}
                />
            </div>
        </div>
    )
}

export default TwitterSentiment


const fetcher = (...args) => fetch(...args).then((res) => res.json())

function useSentiments() {
    const { data, error } = useSWR('/api/twitter', fetcher, { refreshInterval: 60*1000 })
    if (data) {
        let temp = {
            labels: [
                'Positive',
                'Negative',
                'Neutral'
            ],
            datasets: [{
                data: [data.positive, data.negative, data.neutral],
                backgroundColor: [
                    '#87EBA8',
                    '#F28268',
                    '#EEEEEE'
                ],
                hoverBackgroundColor: [
                    '#87EBA8',
                    '#F28268',
                    '#EEEEEE'
                ]
            }]
        }
        return {
            data: temp,
            isLoading: !error && !temp,
            isError: error
        }
    } else {
        return {
            data: data,
            isLoading: !error && !data,
            isError: error
        }
    }
}
