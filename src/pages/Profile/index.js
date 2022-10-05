import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";

export function Profile() {
  const [isLoading, setLoading] = useState(true);
  const [usuariosInfo, setUsuario] = useState({});
  const [date, getDate] = useState("");

  useEffect(() => {
    console.log("estou no useffect");
    async function fetchUsuario() {
      try {
        setLoading(true);
        const response = await api.get("/users/profile");
        setUsuario(response.data);
        getDate(new Date(response.data.user.createdAt));
        console.log(response);
        setLoading(false);
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
          <h1>User : {usuariosInfo.user.name}</h1>
          <h4>Email user: {usuariosInfo.user.email}</h4>
          <h4>Type Signature: {usuariosInfo.user.signatureType}</h4>
          <h2>
            User created on:{" "}
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
            Profit: {usuariosInfo.user.profit}
          </h1>
        </div>
      )}
      {!isLoading &&
        usuariosInfo.user.wallets.map((carteira) => {
          return (
            <Link>
              <div style={{ backgroundColor: "orange", height: "90px" }}>
                {carteira.name}
                <p>Will put some information about the wallet</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
