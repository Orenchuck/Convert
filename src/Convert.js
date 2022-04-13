import React from 'react';

export default class Convert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: '',
            value2: '',
            rate1: 1,
            rate2: 1,
            currency1: 'UAH',
            currency2: 'UAH',
        }
    }

    handlerTop = e => {
        const { rate1, rate2 } = this.state;
        const result = (e.target.value / rate2 * rate1).toFixed(2);
        this.setState({
            value1: e.target.value,
            value2: result,
        });
    }

    handlerBottom = e => {
        const { rate1, rate2 } = this.state;
        const result = (e.target.value / rate1 * rate2).toFixed(2);
        this.setState({
            value2: e.target.value,
            value1: result,
        })
    }

    toggleCurrencyTop = e => {
        this.setState({
            currency1: e.target.value,
        });
        const { currencies } = this.props;
        currencies.map(i => {
            if( i.name === e.target.value) {
                this.setState({
                    rate1: i.value,
                })
            }
        })
    }

    toggleCurrencyBottom = e => {
        this.setState({
            currency2: e.target.value,
        });
        const { currencies } = this.props;
        currencies.map(i => {
            if( i.name === e.target.value) {
                this.setState({
                    rate2: i.value
                })
            }
        })
    }

    render() {
        const { value1, value2, currency1, currency2 } = this.state;
        const { currencies } = this.props;
        return (
            <div>
                <div>
                    <input 
                        type="text" 
                        value={value1}
                        onChange={this.handlerTop}></input>
                    <select 
                        value={currency1}
                        onChange={this.toggleCurrencyTop}
                        >
                        {currencies.map((i, idx) => (
                            <option 
                            value={i.name}
                            key={idx}
                            >{i.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input 
                        type="text" 
                        value={value2}
                        onChange={this.handlerBottom}></input>
                    <select 
                        value={currency2}
                        onChange={this.toggleCurrencyBottom}
                    >
                        {currencies.map((i, idx) => (
                            <option 
                            value={i.name}
                            key={idx}
                            >{i.name}</option>
                        ))}
                    </select>
                </div>

            </div>
        );
    }
}