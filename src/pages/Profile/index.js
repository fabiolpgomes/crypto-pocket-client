import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
export function Profile() {
  const [isLoading, setLoading] = useState(true);
  const [usuariosInfo, setUsuario] = useState({});
  const [date, getDate] = useState("");

  useEffect(() => {
    async function fetchUsuario() {
      try {
        setLoading(true);
        const response = await api.get("/users/profile");
        setUsuario(response.data);
        setLoading(false);
        getDate(new Date(response.data.user.createdAt));
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsuario();
  }, []);

  console.log(usuariosInfo);

  return (
    <div>
      {!isLoading && (
        <div>
          <h1>Usuário : {usuariosInfo.user.name}</h1>
          <h4>Email do usuário: {usuariosInfo.user.email}</h4>
          <h4>Tipo de assinatura: {usuariosInfo.user.signatureType}</h4>
          <h2>
            Usuario criado em:{" "}
            {date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/
            {date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1}
            /{date.getFullYear()} às{" "}
            {date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:
            {date.getMinutes() < 10
              ? `0${date.getMinutes()}`
              : date.getMinutes()}
          </h2>
          <h1
            style={{ color: usuariosInfo.user.profit >= 0 ? "green" : "red" }}
          >
            Lucro: {usuariosInfo.user.profit}
          </h1>
        </div>
      )}
      {usuariosInfo.user.wallets.map((carteira) => {
        return (
          <Link>
            <div style={{ backgroundColor: "orange", height: "90px" }}>
              {carteira.name}
              <p>Aqui vou colocar algumas informações sobre a carteira</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
