import React from 'react';
import axios from 'axios';
import Convert from './Convert';

class Header extends React.Component {
  constructor(){
    super();
    this.state = {
      currencies: [],
      USD: 0,
      EUR: 0,    
    }
  }

  componentDidMount() {
    axios.get('https://cdn.cur.su/api/nbu.json')
      .then(res => {
        const eurRate = (res.data.rates.UAH / res.data.rates.EUR).toFixed(2);
        const usdRate = res.data.rates.UAH.toFixed(2);
        const currencies = [
          {
            name: 'USD',
            value: usdRate,
          },
          {
            name: 'EUR',
            value: eurRate,
          },
          {
            name: 'UAH',
            value: 1,
          },
        ];
        this.setState({  
          currencies,
          USD: res.data.rates.UAH,
          EUR: eurRate,
        })
      })
      .catch( err => console.log(err))
  }

  render(){
    const { currencies, USD, EUR } = this.state;

  return (
    <div className="App">
      <header className="App-header">
        <div>current USD: {USD}</div>
        <div>current EUR: {EUR}</div>
      </header>
      <Convert currencies={currencies} />
    </div>
  );
}
}

export default Header;
