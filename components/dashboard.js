import Container from '../components/container'
import MarketData from './market-data'
import MarketPrice from './market-price'
import MarketPriceCalculator1 from './market-price-calculator1'
import MarketPriceCalculator2 from './market-price-calculator2'
import MarketPriceCalculator3 from './market-price-calculator3'
import TwitterSentiment from './twitter-sentiment'
import InterestRatesNeutrino from './interest-rates-neutrino'

function Dashboard() {
    return (
        <Container>

            <div className='flex flex-row items-stretch justify-center flex-wrap'>
                <TwitterSentiment></TwitterSentiment>
                <MarketPrice></MarketPrice>
            </div>

            <div className='flex flex-row items-stretch justify-center flex-wrap'>
                <MarketPriceCalculator1></MarketPriceCalculator1>
                <MarketPriceCalculator2></MarketPriceCalculator2>
                <MarketPriceCalculator3></MarketPriceCalculator3>
            </div>


            <div className="py-50 flex flex-row flex-wrap justify-center items-stretch overflow-auto">

                <InterestRatesNeutrino></InterestRatesNeutrino>
                <MarketData></MarketData>

            </div>
        </Container>
    )
}

export default Dashboard