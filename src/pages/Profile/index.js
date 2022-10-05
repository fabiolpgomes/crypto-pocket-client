import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";

export function Profile() {
  const [isLoading, setLoading] = useState(true);
  const [usuariosInfo, setUsuario] = useState({});
  const [date, getDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [reload, setReload] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectPlain, setSelectPlain] = useState({});
  const [newWalletForm, setShowNewWalletForm] = useState(false);
  const [appendWallet, setWalletName] = useState({
    name: "",
  });
  useEffect(() => {
    console.log("estou no useffect");
    async function fetchUsuario() {
      try {
        setLoading(true);
        const response = await api.get("/users/profile");
        setUsuario(response.data);
        getDate(new Date(response.data.user.createdAt));

        console.log("dando console.log");
        console.log(response.data);
        setLoading(false);
        setEditForm({
          name: response.data.user.name,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
        });
        setSelectPlain({
          signatureType: response.data.user.signatureType,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsuario();
  }, [reload]);
  function handleChosePlain(e) {
    setSelectPlain({ ...selectPlain, [e.target.name]: e.target.value });
  }

  function handleChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put("/users/edit", editForm);
      setReload(!reload);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpgrade(e) {
    e.preventDefault();
    try {
      await api.put("/users/edit", selectPlain);
      setReload(!reload);
      setShowUpgrade(false);
    } catch (error) {
      console.log(error);
    }
  }
  function nameOfWallet(e) {
    setWalletName({ ...appendWallet, [e.target.name]: e.target.value });
  }
  async function walletAppending(e) {
    e.preventDefault();
    try {
      await api.post("/wallets/createwallet", appendWallet);
      setReload(!reload);
      setShowNewWalletForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>Edit name: </label>
          <input name="name" value={editForm.name} onChange={handleChange} />
          <label>Edit last name: </label>
          <input
            name="lastName"
            value={editForm.lastName}
            onChange={handleChange}
          />
          <label>Edit email:</label>
          <input name="email" value={editForm.email} onChange={handleChange} />
          <button type="submit">Confirm data changing</button>
        </form>
      )}
      {!isLoading && (
        <div>
          <h1>Name : {usuariosInfo.user.name}</h1>
          <h1>Last name: {usuariosInfo.user.lastName}</h1>
          <h4>mail: {usuariosInfo.user.email}</h4>
          <h4>Signature Type: {usuariosInfo.user.signatureType}</h4>
          <h2>

            User created in:{" "}

            {date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/
            {date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1}


            /{date.getFullYear()} at{"  "}

            {date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:
            {date.getMinutes() < 10
              ? `0${date.getMinutes()}`
              : date.getMinutes()}
          </h2>
          <h1
            style={{
              color:
                usuariosInfo.user.profit == 0
                  ? "black"
                  : usuariosInfo.user.profit > 0
                  ? "green"
                  : "red",
            }}
          >
            Profit: {usuariosInfo.user.profit}
          </h1>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel edition" : "Edit user data"}
          </button>
          <button onClick={() => setShowUpgrade(!showUpgrade)}>
            {showUpgrade ? "Cancel upgrade" : "Upgrade"}
          </button>
          {showUpgrade && (
            <form onSubmit={handleUpgrade}>
              <label>Choose your new plan:</label>
              <select name="signatureType" onChange={handleChosePlain}>
                <option></option>
                <option value="BASIC">BASIC</option>
                <option value="PLUS">PLUS</option>
                <option value="PREMIUM">PREMIUM</option>
              </select>
              <button type="submit">Change plan</button>
            </form>
          )}

          <button onClick={() => setShowNewWalletForm(!newWalletForm)}>
            {newWalletForm ? "Create new wallet" : "Cancel wallet creating"}
          </button>

          {newWalletForm && (
            <form onSubmit={walletAppending}>
              <label>Name of the new wallet</label>
              <input
                name="name"
                value={appendWallet.name}
                onChange={nameOfWallet}
              />
              <button type="submit">Adicionar nova carteira</button>
            </form>
          )}
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
