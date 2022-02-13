module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/twitter',
            destination: 'https://wavesassignment.glitch.me/getTwitterSentiments'
          },
          {
            source: '/api/getMarketData',
            destination: 'https://wavesassignment.glitch.me/waves/getMarkets',
          },
          {
            source: '/api/getCurrencies',
            destination: 'https://wavesassignment.glitch.me/waves/getCurrencies'
          },
          {
            source: '/api/calculate1/:currency/:duration',
            destination: 'https://wavesassignment.glitch.me/Calculate/All/:currency/:duration', // Matched parameters can be used in the destination
          },
          {
            source: '/api/calculate2/:currency/:duration/:rate',
            destination: 'https://wavesassignment.glitch.me/Calculate/SharpeeRatio/:currency/:duration/:rate', // Matched parameters can be used in the destination
          },
          {
            source: '/api/interestRates',
            destination: 'https://wavesassignment.glitch.me/neutrino/getRate'
          },
          {
            source: '/api/profit/:currency/:amount/:period',
            destination: 'https://wavesassignment.glitch.me/neutrino/getProfit/:currency/:amount/:period'
          },


          
        ]
      },
  };