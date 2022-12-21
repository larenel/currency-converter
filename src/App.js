import React from 'react'
import { Block } from './Block'
import './index.scss'

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB')
  const [toCurrency, setToCurrency] = React.useState('USD')
  const [rates, setRates] = React.useState({})
  const [fromPrice, setfromPrice] = React.useState(0)
  const [toPrice, setToPrice] = React.useState(1)
  const ratesRef = React.useRef({})

  React.useEffect(() => {
    fetch(
      'https://openexchangerates.org/api/latest.json?app_id=4dabe13d1f5a4654ad2f737c66d16718'
    )
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.rates)
        ratesRef.current = json.rates
        onChangeToPrice(1)
      })
      .catch((err) => {
        console.warn(err)
        alert('Видимо, лимит на запросы апишки истек :(')
      })
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setToPrice(result.toFixed(5))
    setfromPrice(value)
  }
  const onChangeToPrice = (value) => {
    const result =
      (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
    setfromPrice(result.toFixed(5))
    setToPrice(value)
  }

  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  )
}

export default App
