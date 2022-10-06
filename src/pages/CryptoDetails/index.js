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
  console.log(cryptoData);

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

  return (
    <div>
      {!isLoading && (
        <div>
          <h1>Name of the crypto coin: --->{cryptoData.cryptocurrencie}</h1>
          <h3>
            You bought it in --->{" "}
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
          </h3>
          <h3>
            When you bought this it was worth:---->{" "}
            {cryptoData.investment / cryptoData.totalCrypto} U$D/
            {cryptoData.cryptocurrencie}
          </h3>
          <h3>
            You have an amount of {cryptoData.totalCrypto}{" "}
            {cryptoData.cryptocurrencie}
          </h3>
          <h3>
            You spent an amount of {cryptoData.investment}U$D in this crypto
          </h3>
          <h3>
            The last time this crypto net worth was updated is :---->
            {lastTimeUpdated.getDate() < 10
              ? `0${lastTimeUpdated.getDate()}`
              : lastTimeUpdated.getDate()}
            /
            {lastTimeUpdated.getMonth() + 1 < 10
              ? `0${lastTimeUpdated.getMonth() + 1}`
              : lastTimeUpdated.getMonth() + 1}
            /{lastTimeUpdated.getFullYear()} at{" "}
            {lastTimeUpdated.getHours() < 10
              ? `0${lastTimeUpdated.getHour()}`
              : lastTimeUpdated.getHours()}
            :
            {lastTimeUpdated.getMinutes() < 10
              ? `0${lastTimeUpdated.getMinutes()}`
              : lastTimeUpdated.getMinutes()}
          </h3>
          <h3>
            Now each crypto is worth an amount of ----> {cryptoData.priceAPI}{" "}
            U$D/{cryptoData.cryptocurrencie}
          </h3>
          <h3>
            The amount of money all your crypto is worth now in this coin is{" "}
            {cryptoData.priceAPI * cryptoData.totalCrypto} U$D
          </h3>
          <h3>
            Your{" "}
            {cryptoData.priceAPI * cryptoData.totalCrypto -
              cryptoData.investment >
            0
              ? "profit  "
              : "loss  "}
            is -->
            {cryptoData.priceAPI * cryptoData.totalCrypto -
              cryptoData.investment}{" "}
            U$D
          </h3>
          <h3>
            The percentage of your
            {cryptoData.priceAPI * cryptoData.totalCrypto -
              cryptoData.investment >
            0
              ? "  profit  "
              : "  loss  "}{" "}
            is{" "}
            {(100 *
              (cryptoData.priceAPI * cryptoData.totalCrypto -
                cryptoData.investment)) /
              cryptoData.investment}
            %{" "}
          </h3>
          <button onClick={updateCoinWorth}>
            Update the net worth of your wallet
          </button>
          <button
            onClick={selltradingCrypto}
            style={{
              backgroundColor: "lightgreen",
              padding: "30px",
              borderRadius: "20px",
              margin: "20px 40px",
            }}
          >
            SELL THIS CRYPTO
          </button>
        </div>
      )}
    </div>
  );
}
