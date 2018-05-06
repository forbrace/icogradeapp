export default (score) => {
  return (() => {
    let result = Math.min((score.price + score.numberOfICOTokens + score.totalNumberOfTokens + score.totalSupply + score.icoMarketCap + score.appPrototype + score.team + score.advisers + score.idea + score.community + score.type) / 24 * 100, 100)
    return Math.round(result * 100) / 100
  })()
}
