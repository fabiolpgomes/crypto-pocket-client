import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
export function DashboardPage() {
  const { idWallet } = useParams();
  const [walletInfo, setWalletInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [diaCriada, setDiacriado] = useState("");
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
  }, []);
  console.log(walletInfo);

  return (
    <div>
      {!isLoading && (
        <div>
          <h1>Name of the wallet: {walletInfo.specificWallet.name}</h1>
          <h2>
            User created in:{" "}
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
      {!isLoading &&
        walletInfo.specificWallet.crypto.map((crypto) => {
          return (
            <div>
              <h4>Name of the coin: {crypto.cryptocurrencie}</h4>{" "}
              <h4>Investment made: {crypto.balance}</h4>
              <h4>Total of crypto: {crypto.totalCrypto}</h4>
              <h4>Valor de cada crypto: {crypto.priceAPI}</h4>
              <h4>Valor atual: {crypto.priceAPI * crypto.totalCrypto}</h4>
            </div>
          );
        })}
    </div>
  );
}
