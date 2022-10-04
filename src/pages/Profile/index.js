import { useEffect, useState } from "react";
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
          <h1>{usuariosInfo.user.name}</h1>
          <h4>{usuariosInfo.user.email}</h4>
          <h4>Tipo de assinatura: {usuariosInfo.user.signatureType}</h4>
          <h2>
            Usuario criado em: {date.getDate()}/{date.getMonth() + 1}/
            {date.getFullYear()} às {date.getHours()}:{date.getMinutes()}
          </h2>
        </div>
      )}
    </div>
  );
}
