import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Link } from "react-router-dom";
export function DashboardPage() {
  const { idWallet } = useParams();
  const navigate = useNavigate();
  const [pageTo, setPageTo] = useState("");
  const [walletInfo, setWalletInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [diaCriada, setDiacriado] = useState("");
  const [showBuyCrypto, setShowBuyCrypto] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState({
    cryptocurrencie: "",
    investment: "",
  });
  const [reload, setReload] = useState(false);
  useEffect(() => {
    async function fetchDaCarteira() {
      try {
        setIsLoading(true);
        const response = await api.get(`/wallets/getonewallet/${idWallet}`);
        setWalletInfo(response.data);
        setDiacriado(new Date(response.data.specificWallet.createdAt));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDaCarteira();
  }, [reload]);

  function choseCrypto(e) {
    setPurchaseOrder({ ...purchaseOrder, [e.target.name]: e.target.value });
  }
  function choseAmountMoney(e) {
    setPurchaseOrder({
      ...purchaseOrder,
      [e.target.name]: Number(e.target.value),
    });
  }
  async function tradingCoin(e) {
    e.preventDefault();
    try {
      await api.post(`/cryptotrade/purchasecoin/${idWallet}`, purchaseOrder);
      setReload(!reload);
      showBuyCrypto(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateCoinsWorth(e) {
    e.preventDefault();
    try {
      await api.get(`/cryptotrade/updatingcrypto/${idWallet}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={() => setShowBuyCrypto(!showBuyCrypto)}>
        {showBuyCrypto ? "Cancel crypto purchase" : "Buy crypto currencie"}
      </button>
      {showBuyCrypto && (
        <form onSubmit={tradingCoin}>
          <label>Select the crypto you wanna buy:</label>
          <select name="cryptocurrencie" onChange={choseCrypto} required="true">
            <option value="Bitcoin"> Bitcoin</option>
            <option value="Ethereum"> Ethereum</option>
            <option value="Tether"> Tether</option>
            <option value="USD Coin"> USD Coin</option>
            <option value="BNB"> BNB</option>
            <option value="XRP"> XRP</option>
            <option value="Binance USD"> Binance USD</option>
            <option value="Cardano"> Cardano</option>
            <option value="Solana"> Solana</option>
            <option value="Dogecoin"> Dogecoin</option>
            <option value="Polkadot"> Polkadot</option>
            <option value="Polygon"> Polygon</option>
            <option value="Dai"> Dai</option>
            <option value="Shiba Inu"> Shiba Inu</option>
            <option value="TRON"> TRON</option>
            <option value="Avalanche"> Avalanche</option>
            <option value="Uniswap"> Uniswap</option>
            <option value="Wrapped Bitcoin"> Wrapped Bitcoin</option>
            <option value="UNUS SED LEO"> UNUS SED LEO</option>
            <option value="Litecoin"> Litecoin</option>
            <option value="Ethereum Classic"> Ethereum Classic</option>
            <option value="Cosmos"> Cosmos</option>
            <option value="Chainlink"> Chainlink</option>
            <option value="FTX Token"> FTX Token</option>
            <option value="Stellar"> Stellar</option>
            <option value="NEAR Protocol"> NEAR Protocol</option>
            <option value="Cronos"> Cronos</option>
            <option value="Monero"> Monero</option>
            <option value="Algorand"> Algorand</option>
            <option value="Bitcoin Cash"> Bitcoin Cash</option>
            <option value="Terra Classic"> Terra Classic</option>
            <option value="Flow"> Flow</option>
            <option value="VeChain"> VeChain</option>
            <option value="Quant"> Quant</option>
            <option value="Toncoin"> Toncoin</option>
            <option value="Filecoin"> Filecoin</option>
            <option value="Internet Computer"> Internet Computer</option>
            <option value="ApeCoin"> ApeCoin</option>
            <option value="Hedera"> Hedera</option>
            <option value="Chiliz"> Chiliz</option>
            <option value="Tezos"> Tezos</option>
            <option value="Decentraland"> Decentraland</option>
            <option value="The Sandbox"> The Sandbox</option>
            <option value="EOS"> EOS</option>
            <option value="Elrond"> Elrond</option>
            <option value="Aave"> Aave</option>
            <option value="Theta Network"> Theta Network</option>
            <option value="Axie Infinity"> Axie Infinity</option>
            <option value="Pax Dollar"> Pax Dollar</option>
            <option value="OKB"> OKB</option>
            <option value="Bitcoin SV"> Bitcoin SV</option>
            <option value="KuCoin Token"> KuCoin Token</option>
            <option value="TrueUSD"> TrueUSD</option>
            <option value="Zcash"> Zcash</option>
            <option value="USDD"> USDD</option>
            <option value="Maker"> Maker</option>
            <option value="eCash"> eCash</option>
            <option value="IOTA"> IOTA</option>
            <option value="BitTorrent-New"> BitTorrent-New</option>
            <option value="The Graph"> The Graph</option>
            <option value="Neutrino USD"> Neutrino USD</option>
            <option value="PancakeSwap"> PancakeSwap</option>
            <option value="Helium"> Helium</option>
            <option value="Huobi Token"> Huobi Token</option>
            <option value="Neo"> Neo</option>
            <option value="Klaytn"> Klaytn</option>
            <option value="Fantom"> Fantom</option>
            <option value="PAX Gold"> PAX Gold</option>
            <option value="Synthetix"> Synthetix</option>
            <option value="THORChain"> THORChain</option>
            <option value="Nexo"> Nexo</option>
            <option value="Curve DAO Token"> Curve DAO Token</option>
            <option value="Lido DAO"> Lido DAO</option>
            <option value="GateToken"> GateToken</option>
            <option value="Enjin Coin"> Enjin Coin</option>
            <option value="Dash"> Dash</option>
            <option value="Basic Attention Token">Basic Attention Token</option>
            <option value="Compound"> Compound</option>
            <option value="Stacks"> Stacks</option>
            <option value="Kava"> Kava</option>
            <option value="Zilliqa"> Zilliqa</option>
            <option value="Fei USD"> Fei USD</option>
            <option value="Ravencoin"> Ravencoin</option>
            <option value="Waves"> Waves</option>
            <option value="Mina"> Mina</option>
            <option value="Reserve Rights"> Reserve Rights</option>
            <option value="Loopring"> Loopring</option>
            <option value="XDC Network"> XDC Network</option>
            <option value="Trust Wallet Token"> Trust Wallet Token</option>
            <option value="Decred"> Decred</option>
            <option value="STEPN"> STEPN</option>
            <option value="NEM"> NEM</option>
            <option value="Celo"> Celo</option>
            <option value="Kusama"> Kusama</option>
            <option value="Bitcoin Gold"> Bitcoin Gold</option>
            <option value="Holo"> Holo</option>
            <option value="1inch Network"> 1inch Network</option>
            <option value="Convex Finance"> Convex Finance</option>
            <option value="BinaryX"> BinaryX</option>
            <option value="Celsius"> Celsius</option>
          </select>
          <input
            type="number"
            name="investment"
            value={purchaseOrder.investment}
            onChange={choseAmountMoney}
            required="true"
          />
          <button type="submit">Purchase coin</button>
        </form>
      )}
      <button onClick={updateCoinsWorth}>UPDATE ALL COINS NET WORTH</button>
      {!isLoading && (
        <div>
          <h1>Name of the wallet: {walletInfo.specificWallet.name}</h1>
          <h2>
            Wallet created at:{" "}
            {diaCriada.getDate() < 10
              ? `0${diaCriada.getDate()}`
              : diaCriada.getDate()}
            /
            {diaCriada.getMonth() + 1 < 10
              ? `0${diaCriada.getMonth() + 1}`
              : diaCriada.getMonth() + 1}
            /{diaCriada.getFullYear()} at{"  "}
            {diaCriada.getHours() < 10
              ? `0${diaCriada.getHours()}`
              : diaCriada.getHours()}
            :
            {diaCriada.getMinutes() < 10
              ? `0${diaCriada.getMinutes()}`
              : diaCriada.getMinutes()}
          </h2>
        </div>
      )}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Crypto name
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Crypto value when bought
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount of crypto
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Investment made
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Crypto current value
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount of worth
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Profit / Loss
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      % of profit
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Sell this coin
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {!isLoading &&
                    walletInfo.specificWallet.crypto.map((cryptoData) => {
                      return (
                        <tr>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {cryptoData.cryptocurrencie}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            {(
                              cryptoData.investment / cryptoData.totalCrypto
                            ).toFixed(2)}{" "}
                            (U$D/
                            {cryptoData.cryptocurrencie})
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                            {cryptoData.totalCrypto.toFixed(5)}{" "}
                            {cryptoData.cryptocurrencie}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {cryptoData.investment.toFixed(2)} U$D
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {cryptoData.priceAPI.toFixed(2)} (U$D/
                            {cryptoData.cryptocurrencie})
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {(
                              cryptoData.priceAPI * cryptoData.totalCrypto
                            ).toFixed(2)}{" "}
                            U$D
                          </td>
                          <td
                            className={
                              cryptoData.priceAPI * cryptoData.totalCrypto -
                                cryptoData.investment >=
                              0
                                ? "whitespace-nowrap px-2 py-2 text-sm text-green-500"
                                : "whitespace-nowrap px-2 py-2 text-sm text-red-500"
                            }
                          >
                            {(
                              cryptoData.priceAPI * cryptoData.totalCrypto -
                              cryptoData.investment
                            ).toFixed(2)}{" "}
                            U$D
                          </td>
                          <td
                            className={
                              cryptoData.priceAPI * cryptoData.totalCrypto -
                                cryptoData.investment >=
                              0
                                ? "whitespace-nowrap px-2 py-2 text-sm text-green-500"
                                : "whitespace-nowrap px-2 py-2 text-sm text-red-500"
                            }
                          >
                            {(
                              (100 *
                                (cryptoData.priceAPI * cryptoData.totalCrypto -
                                  cryptoData.investment)) /
                              cryptoData.investment
                            ).toFixed(2)}{" "}
                            %
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-green-100">
                            <Link
                              to={`/CryptoDetailst/${cryptoData._id}`}
                              style={{
                                backgroundColor: "green",
                                padding: "6px",
                                borderRadius: "5px",
                              }}
                            >
                              {" "}
                              Go to crypto
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* 
{!isLoading &&
  walletInfo.specificWallet.crypto.map((crypto) => {
    const date = new Date(crypto.createdAt);
    let dd;
    let mm;
    let yy;

    date.getDate() < 10
      ? (dd = `0${date.getDate()}`)
      : (dd = date.getDate());
    date.getMonth() + 1 < 10
      ? (mm = `0${date.getMonth()}`)
      : (mm = date.getMonth());
    yy = date.getFullYear();
    return (
      <Link to={`/CryptoDetailst/${crypto._id}`}>
        <h4>Name of the coin: {crypto.cryptocurrencie}</h4>{" "}
        <h4>Data de aporte: {`${dd}/${mm + 1}/${yy}`} </h4>
        <h4>Valor investido na compra: {crypto.balance}U$D</h4>
        <h4>
          Total of crypto: {crypto.totalCrypto} {crypto.cryptocurrencie}
        </h4>
        <h4>
          Valor de cada crypto: {crypto.priceAPI}U$D/
          {crypto.cryptocurrencie}
        </h4>
        <h4>Valor atual: {crypto.priceAPI * crypto.totalCrypto}U$D</h4>
        <h4>
          {crypto.priceAPI * crypto.totalCrypto - crypto.balance > 0
            ? "Profit "
            : "Loss "}{" "}
          {crypto.priceAPI * crypto.totalCrypto - crypto.balance} U$D
        </h4>
        <h4>
          Porcentagem de lucro (%) :{" "}
          {((crypto.priceAPI * crypto.totalCrypto - crypto.balance) /
            crypto.balance) *
            100}
          %
        </h4>
      </Link>
    );
  })} */
