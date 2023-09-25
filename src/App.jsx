import React, { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './CustomHooks/useCurrencyInfo';


function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat transition-all duration-500">
      {/* Background image styling */}
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-500"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          filter: 'blur(10px)',
          zIndex: -1,
        }}
      ></div>

      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 text-center transition-all duration-500">
        <form
          className="transition-all duration-300"
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 transition-all duration-300">Currency Converter</h1>
            <p className="text-gray-600 transition-all duration-300">Convert currencies easily!</p>
          </div>
          <div className="w-full mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>
          <div className="relative w-full h-0.5 mb-4">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mt-4 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
