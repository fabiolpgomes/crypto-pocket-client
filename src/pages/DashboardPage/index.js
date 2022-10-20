import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Listbox, Transition, Dialog } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";

export function DashboardPage() {
  const { idWallet } = useParams();
  const navigate = useNavigate();
  const [editform, showEditForm] = useState(false);
  const [walletInfo, setWalletInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [diaCriada, setDiacriado] = useState("");
  const [showBuyCrypto, setShowBuyCrypto] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState({
    cryptocurrencie: "",
    investment: "",
  });
  const [walletName, setWalletName] = useState({ name: "" });
  const cancelButtonRef = useRef(null);
  const [reload, setReload] = useState(false);
  const [lastTimeUpdated, setLastTimeUpdated] = useState("");
  useEffect(() => {
    async function fetchDaCarteira() {
      try {
        setIsLoading(true);
        const response = await api.get(`/wallets/getonewallet/${idWallet}`);
        setWalletInfo(response.data);
        setDiacriado(new Date(response.data.specificWallet.createdAt));
        setShowBuyCrypto(false);
        setWalletName({
          [walletName.name]: response.data.specificWallet.name,
        });
        setLastTimeUpdated(new Date(response.data.specificWallet.updatedAt));
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
  function navigateProfile(e) {
    e.preventDefault();
    navigate("/profile");
  }

  function handleChangeWalletName(e) {
    setWalletName({ ...walletName, [e.target.name]: e.target.value });
  }
  async function handleSubmitWalletName(e) {
    e.preventDefault();
    try {
      await api.put(`/wallets/editwallet/${idWallet}`, walletName);
      showEditForm(false);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: " 0 40px",
        }}
      >
        <button
          style={{ marginLeft: "30px", marginTop: "20px" }}
          className="mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-700 px-5 py-3 text-base font-medium text-white hover:bg-blue-900 sm:mt-10 sm:w-auto xl:mt-0"
          onClick={navigateProfile}
        >
          Go back to profile
        </button>
        <button
          style={{ marginLeft: "30px", marginTop: "20px" }}
          className="mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-stone-700 px-5 py-3 text-base font-medium text-white hover:bg-blue-900 sm:mt-10 sm:w-auto xl:mt-0"
          onClick={() => showEditForm(!showBuyCrypto)}
        >
          Change wallet name
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{ margin: "auto" }}
          className={
            showBuyCrypto
              ? "mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-5 py-3 text-base font-medium text-white hover:bg-gray-700 sm:mt-10 sm:w-auto xl:mt-0"
              : "mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-5 py-3 text-base font-medium text-white hover:bg-green-700 sm:mt-10 sm:w-auto xl:mt-0"
          }
          onClick={() => setShowBuyCrypto(!showBuyCrypto)}
        >
          {showBuyCrypto ? "Cancel crypto purchase" : "Buy crypto currencie"}
        </button>
      </div>
      {showBuyCrypto && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <label
            htmlFor="location"
            className="block text-sm font-xxlarge text-gray-700"
            style={{ margin: "auto", fontSize: "30px", marginTop: "30px" }}
          >
            Which cryptocurrencie do you wanna buy?
          </label>
          <select
            id="location"
            name="cryptocurrencie"
            onChange={choseCrypto}
            style={{ margin: "auto", marginTop: "20px" }}
            required="true"
            className="mt-1 block  rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue="Canada"
          >
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
          <label
            style={{ margin: "auto", fontSize: "30px", marginTop: "30px" }}
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            How much will you invest?
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              style={{ margin: "auto", marginTop: "20px" }}
              type="number"
              name="investment"
              value={purchaseOrder.investment}
              onChange={choseAmountMoney}
              required="true"
              className="block  rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0.00 U$D"
              aria-describedby="price-currency"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <button
                style={{
                  margin: "auto",
                  marginTop: "20px",
                }}
                className="mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-5 py-3 text-base font-medium text-white hover:bg-green-700 sm:mt-10 sm:w-auto xl:mt-0"
                onClick={tradingCoin}
              >
                Purchase coin
              </button>
            </div>
          </div>
        </div>
      )}
      {editform && (
        <>
          <Transition.Root show={editform} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={showEditForm}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            ></Dialog.Title>
                            <div className="mt-6 ">
                              <div className="pt-8">
                                <div>
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Edit the wallet name
                                  </h3>
                                </div>
                                <div className="mt-6 ">
                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="first-name"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      New name
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        type="text"
                                        name="name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={walletName.name}
                                        onChange={handleChangeWalletName}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-indigo-300 bg-stone-400 px-4 py-2 text-white font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => showEditForm(!editform)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border bg-green-600 bg-white px-4 py-2 text-white font-medium text-base shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={handleSubmitWalletName}
                        >
                          Save changes
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      )}

      {!isLoading && (
        <div
          style={{
            backgroundColor: "#ddd6fe",
            marginTop: "15px",
            borderRadius: "18px",
          }}
          className="mx-auto max-w-2xl py-16 px-4 sm:py-9 sm:px-6 lg:px-8"
        >
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="lg:grid lg:grid-cols-2 lg:gap-2"
          >
            <h2 className="mx-auto max-w-md text-center text-5xl font-bold tracking-tight text-indigo-900 lg:max-w-xl lg:text-left">
              Name of the wallet:<p></p> {walletInfo.specificWallet.name}
            </h2>
            <h5 className="mx-auto max-w-md text-center text-2xl font-bold tracking-tight text-indigo-900 lg:max-w-xl lg:text-left">
              Wallet created in:{" "}
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
            </h5>
            <h5 className="mx-auto max-w-md text-center text-2xl font-bold tracking-tight text-indigo-900 lg:max-w-xl lg:text-left">
              Last time updated in:{" "}
              {lastTimeUpdated.getDate() < 10
                ? `0${lastTimeUpdated.getDate()}`
                : lastTimeUpdated.getDate()}
              /
              {lastTimeUpdated.getMonth() + 1 < 10
                ? `0${lastTimeUpdated.getMonth() + 1}`
                : lastTimeUpdated.getMonth() + 1}
              /{lastTimeUpdated.getFullYear()} at{"  "}
              {lastTimeUpdated.getHours() < 10
                ? `0${lastTimeUpdated.getHours()}`
                : lastTimeUpdated.getHours()}
              :
              {lastTimeUpdated.getMinutes() < 10
                ? `0${lastTimeUpdated.getMinutes()}`
                : lastTimeUpdated.getMinutes()}
            </h5>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: "30px",
        }}
      >
        <button
          className="mt-10 inline-flex  items-center justify-center rounded-md border border-transparent bg-cyan-500 px-5 py-3 text-base font-medium text-white hover:bg-cyan-700 sm:mt-10 sm:w-auto xl:mt-0"
          onClick={updateCoinsWorth}
        >
          UPDATE ALL COINS NET WORTH
        </button>
      </div>
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
                                cryptoData.investment >
                              0
                                ? "whitespace-nowrap px-2 py-2 text-sm text-green-500"
                                : cryptoData.priceAPI * cryptoData.totalCrypto -
                                    cryptoData.investment ==
                                  0
                                ? "whitespace-nowrap px-2 py-2 text-sm text-gray-500"
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
                                cryptoData.investment >
                              0
                                ? "whitespace-nowrap px-2 py-2 text-sm text-green-500"
                                : cryptoData.priceAPI * cryptoData.totalCrypto -
                                    cryptoData.investment ==
                                  0
                                ? "whitespace-nowrap px-2 py-2 text-sm text-gray-500"
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
