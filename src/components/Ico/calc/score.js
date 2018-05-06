import bestIco from './best-icos'

export default (ico) => {
  return {
    price: (+ico.price > bestIco.std_plus_2.price
      ? 0 : (+ico.price > bestIco.std_plus_1.price ? 0.5 : 0)) + (+ico.price > bestIco.std_minus_1.price
      ? (+ico.price < bestIco.std_plus_1.price ? 1 : 0) : 0) + (+ico.price < bestIco.std_minus_1.price
      ? (+ico.price > bestIco.std_minus_2.price ? 0.5 : 0) : 0),

    numberOfICOTokens: (+ico.numberOfICOTokens > bestIco.std_minus_3.numberOfICOTokens
      ? (+ico.numberOfICOTokens < bestIco.std_minus_2.numberOfICOTokens ? 1 / 3 : 0) : 0) + (+ico.numberOfICOTokens > bestIco.std_minus_2.numberOfICOTokens
      ? (+ico.numberOfICOTokens < bestIco.std_minus_1.numberOfICOTokens ? 2 / 3 : 0) : 0) + (+ico.numberOfICOTokens > bestIco.std_minus_1.numberOfICOTokens
      ? (+ico.numberOfICOTokens < bestIco.std_plus_1.numberOfICOTokens ? 3 / 3 : 0) : 0) + (+ico.numberOfICOTokens > bestIco.std_plus_1.numberOfICOTokens
      ? (+ico.numberOfICOTokens < bestIco.std_plus_2.numberOfICOTokens ? 2 / 3 : 0) : 0) + (+ico.numberOfICOTokens > bestIco.std_plus_2.numberOfICOTokens
      ? (+ico.numberOfICOTokens < bestIco.std_plus_3.numberOfICOTokens ? 1 / 3 : 0) : 0),

    totalNumberOfTokens: (+ico.totalNumberOfTokens > bestIco.std_minus_3.totalNumberOfTokens
      ? (+ico.totalNumberOfTokens < bestIco.std_minus_2.totalNumberOfTokens ? 1 / 3 : 0) : 0) + (+ico.totalNumberOfTokens > bestIco.std_minus_2.totalNumberOfTokens
      ? (+ico.totalNumberOfTokens < bestIco.std_minus_1.totalNumberOfTokens ? 2 / 3 : 0) : 0) + (+ico.totalNumberOfTokens > bestIco.std_minus_1.totalNumberOfTokens
      ? (+ico.totalNumberOfTokens < bestIco.std_plus_1.totalNumberOfTokens ? 3 / 3 : 0) : 0) + (+ico.totalNumberOfTokens > bestIco.std_plus_1.totalNumberOfTokens
      ? (+ico.totalNumberOfTokens < bestIco.std_plus_2.totalNumberOfTokens ? 2 / 3 : 0) : 0) + (+ico.totalNumberOfTokens > bestIco.std_plus_2.totalNumberOfTokens
      ? (+ico.totalNumberOfTokens < bestIco.std_plus_3.totalNumberOfTokens ? 1 / 3 : 0) : 0),

    totalSupply: (+ico.totalSupply > bestIco.std_minus_3.totalSupply
      ? (+ico.totalSupply < bestIco.std_minus_2.totalSupply ? 1 / 3 : 0) : 0) + (+ico.totalSupply > bestIco.std_minus_2.totalSupply
      ? (+ico.totalSupply < bestIco.std_minus_1.totalSupply ? 2 / 3 : 0) : 0) + (+ico.totalSupply > bestIco.std_minus_1.totalSupply
      ? (+ico.totalSupply < bestIco.std_plus_1.totalSupply ? 3 / 3 : 0) : 0) + (+ico.totalSupply > bestIco.std_plus_1.totalSupply
      ? (+ico.totalSupply < bestIco.std_plus_2.totalSupply ? 2 / 3 : 0) : 0) + (+ico.totalSupply > bestIco.std_plus_2.totalSupply
      ? (+ico.totalSupply < bestIco.std_plus_3.totalSupply ? 1 / 3 : 0) : 0),

    icoMarketCap: (+ico.icoMarketCap < bestIco.std_plus_3.icoMarketCap
      ? (+ico.icoMarketCap > 0 ? 4 - 4 * +ico.icoMarketCap / bestIco.std_plus_3.icoMarketCap : 0) : 0),
    appPrototype: ico.appPrototype ? 6 : 0,

    team: (ico.team >= 3 ? 4 : 0) + (ico.team > 1 ? (ico.team < 3 ? ico.team / 3 * 4 : 0) : 0) + (ico.team > 0 ? (ico.team <= 1 ? ico.team / 3 * 4 : 0) : 0),

    advisers: (ico.advisers >= 2 ? 2 : 0) + (ico.advisers >= 1 ? (ico.advisers < 2 ? ico.advisers / 3 * 2 : 0) : 0),

    idea: ico.idea ? ico.idea : 0,

    community: Math.min(1, isNaN(ico.community) || !ico.community ? 0 : ico.community / bestIco.mean.community),

    type: (() => {
      if (ico.type === 'Blockchain') {
        return 2
      }
      if (ico.type === 'Infrastructure') {
        return 1
      }
      if (ico.type === 'Application') {
        return 0
      }
      return 0
    })()
  }
}
