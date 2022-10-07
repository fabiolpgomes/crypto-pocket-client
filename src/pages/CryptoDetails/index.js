import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";

export function CryptoDetails() {
  const navigate = useNavigate();
  const { idCrypto } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [cryptoData, setCrypto] = useState({});
  const [timeBought, loadTimeBought] = useState("");
  const [lastTimeUpdated, loadTimeUpdated] = useState("");
  const [reload, setReload] = useState(true);
  useEffect(() => {
    async function fetchCryptoDetail() {
      try {
        setIsLoading(true);
        const response = await api.get(
          `/cryptotrade/cryptodetails/${idCrypto}`
        );
        setCrypto(response.data.cryptoDetail);
        setIsLoading(false);
        loadTimeBought(new Date(response.data.cryptoDetail.createdAt));
        loadTimeUpdated(new Date(response.data.cryptoDetail.updatedAt));
      } catch (error) {
        console.log(error);
      }
    }
    fetchCryptoDetail();
  }, [reload]);
  console.log(lastTimeUpdated);

  async function updateCoinWorth(e) {
    e.preventDefault();
    try {
      await api.get(`/cryptotrade/updatingcrypto/${cryptoData.wallet}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }
  async function selltradingCrypto(e) {
    e.preventDefault();
    try {
      await api.delete(`/cryptotrade/selling/${cryptoData._id}`);
      navigate(`/dashboard-page/${cryptoData.wallet}`);
    } catch (error) {
      console.log(error);
    }
  }
  function backToWallet(e) {
    e.preventDefault();
    navigate(`/dashboard-page/${cryptoData.wallet}`);
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div style={{ marginTop: "30px" }} className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Crypto information for trading
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Check all informations about your crypto and update data or sell
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={backToWallet}
            type="button"
            style={{ marginRight: "60px" }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Go back to the wallet
          </button>
          <button
            onClick={updateCoinWorth}
            type="button"
            style={{ marginRight: "60px" }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-stone-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Update crypto current values of this wallet
          </button>
          <button
            onClick={selltradingCrypto}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Sell this crypto
          </button>
        </div>
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
                      Amount of worth{" "}
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {!isLoading && (
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
                        {(cryptoData.priceAPI * cryptoData.totalCrypto).toFixed(
                          2
                        )}{" "}
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
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {!isLoading && (
        <fieldset style={{ marginBottom: "30px" }}>
          <legend
            style={{ marginTop: "40px", marginBottom: "10px" }}
            className="text-lg font-medium text-gray-900"
          >
            Crypto data
          </legend>
          <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
            <div className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  Name of the crypto coin: {"   "}
                  {cryptoData.cryptocurrencie}
                </label>
              </div>
            </div>
            <div key={2} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  You bought it in{" "}
                  {timeBought.getDate() < 10
                    ? `0${timeBought.getDate()}`
                    : timeBought.getDate()}
                  /
                  {timeBought.getMonth() + 1 < 10
                    ? `0${timeBought.getMonth() + 1}`
                    : timeBought.getMonth() + 1}
                  /{timeBought.getFullYear()} at{" "}
                  {timeBought.getHours() < 10
                    ? `0${timeBought.getHour()}`
                    : timeBought.getHours()}
                  :
                  {timeBought.getMinutes() < 10
                    ? `0${timeBought.getMinutes()}`
                    : timeBought.getMinutes()}
                </label>
              </div>
            </div>
            <div key={3} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  When you bought this it was worth{" "}
                  {(cryptoData.investment / cryptoData.totalCrypto).toFixed(2)}{" "}
                  U$D/
                  {cryptoData.cryptocurrencie}
                </label>
              </div>
            </div>
            <div key={4} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  You have an amount of {cryptoData.totalCrypto.toFixed(5)}{" "}
                  {cryptoData.cryptocurrencie}
                </label>
              </div>
            </div>
            <div key={5} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  You spent an amount of {cryptoData.investment.toFixed(2)}U$D
                  in this crypto
                </label>
              </div>
            </div>
            <div key={6} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  The last time this crypto net worth was updated is
                  {lastTimeUpdated.getDate() < 10
                    ? `0${lastTimeUpdated.getDate()}`
                    : lastTimeUpdated.getDate()}
                  /
                  {lastTimeUpdated.getMonth() + 1 < 10
                    ? `0${lastTimeUpdated.getMonth() + 1}`
                    : lastTimeUpdated.getMonth() + 1}
                  /{lastTimeUpdated.getFullYear()} at{" "}
                  {lastTimeUpdated.getHours() < 10
                    ? `0${lastTimeUpdated.getHours()}`
                    : lastTimeUpdated.getHours()}
                  :
                  {lastTimeUpdated.getMinutes() < 10
                    ? `0${lastTimeUpdated.getMinutes()}`
                    : lastTimeUpdated.getMinutes()}
                </label>
              </div>
            </div>
            <div key={7} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  Now each crypto is worth an amount of{" "}
                  {cryptoData.priceAPI.toFixed(2)} U$D/
                  {cryptoData.cryptocurrencie}
                </label>
              </div>
            </div>
            <div key={8} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  The amount of money all your crypto is worth now in this coin
                  is {(cryptoData.priceAPI * cryptoData.totalCrypto).toFixed(2)}{" "}
                  U$D
                </label>
              </div>
            </div>
            <div key={9} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  Your{" "}
                  {cryptoData.priceAPI * cryptoData.totalCrypto -
                    cryptoData.investment >
                  0
                    ? "profit  "
                    : "loss  "}
                  is
                  {(
                    cryptoData.priceAPI * cryptoData.totalCrypto -
                    cryptoData.investment
                  ).toFixed(2)}{" "}
                  U$D
                </label>
              </div>
            </div>
            <div key={10} className="relative flex items-start py-4">
              <div className="min-w-0 flex-1 text-sm">
                <label className="select-none font-medium text-gray-700">
                  The percentage of your
                  {cryptoData.priceAPI * cryptoData.totalCrypto -
                    cryptoData.investment >
                  0
                    ? "  profit  "
                    : "  loss  "}{" "}
                  is{" "}
                  {(
                    (100 *
                      (cryptoData.priceAPI * cryptoData.totalCrypto -
                        cryptoData.investment)) /
                    cryptoData.investment
                  ).toFixed(2)}
                  %{" "}
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      )}
    </div>
  );
}
