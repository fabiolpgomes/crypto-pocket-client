import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import { RadioGroup } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function Profile() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [usuariosInfo, setUsuario] = useState({});
  const [date, getDate] = useState("");
  const [editForm, setEditForm] = useState({});
  const [reload, setReload] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectPlain, setSelectPlain] = useState({});
  const [newWalletForm, setShowNewWalletForm] = useState(false);
  const [appendWallet, setWalletName] = useState({
    name: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);
  useEffect(() => {
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
    if (
      (usuariosInfo.user.wallets.length > 0 &&
        usuariosInfo.user.signatureType === "BASIC") ||
      (usuariosInfo.user.wallets.length > 1 &&
        usuariosInfo.user.signatureType === "PLUS")
    ) {
      toast.error("You can't have more wallets. Please upgrade your plan.");
    } else {
      toast.success("You created a new wallet");
    }
    try {
      await api.post("/wallets/createwallet", appendWallet);
      setReload(!reload);
      setShowNewWalletForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUser(e) {
    e.preventDefault();
    try {
      await api.get(`/users/desactived-account/${usuariosInfo.user._id}`);
      navigate("/sign-up");
    } catch (error) {
      console.log(error);
    }
  }

  function logoutNavigate(e) {
    e.preventDefault();
    navigate("/");
  }
  return (
    <div class="ml-5">
      <Toaster position="top-center" reverseOrder={false} />
      {!isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-arround",
          }}
          className="bg-white"
        >
          <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:py-9 lg:px-8">
            <div className="divide-y-2 divide-gray-200">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
                  Profile Page
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {`${usuariosInfo.user.name} ${usuariosInfo.user.lastName}`}
                    </h3>
                    <dl className="mt-2 text-base text-gray-500">
                      <div>
                        <dt className="sr-only">Email</dt>
                        <dd>{usuariosInfo.user.email}</dd>
                      </div>
                    </dl>
                    <dl className="mt-2 text-base ">
                      <div>
                        <dt className="sr-only">Email</dt>
                        <dd
                          className={
                            usuariosInfo.user.signatureType === "BASIC"
                              ? "text-lg font-medium leading-6 text-green-500"
                              : usuariosInfo.user.signatureType === "PLUS"
                              ? "text-lg font-medium leading-6 text-stone-500"
                              : "text-lg font-medium leading-6 text-yellow-500"
                          }
                        >
                          {" "}
                          {usuariosInfo.user.signatureType}
                          <span>{"  "}signature type</span>
                        </dd>
                      </div>
                    </dl>
                    <dl className="mt-2 text-base text-gray-500">
                      <div>
                        <dt className="sr-only">Email</dt>
                        <dd>
                          User signed up in{" "}
                          {date.getDate() < 10
                            ? `0${date.getDate()}`
                            : date.getDate()}
                          /
                          {date.getMonth() + 1 < 10
                            ? `0${date.getMonth() + 1}`
                            : date.getMonth() + 1}
                          /{date.getFullYear()} at{"  "}
                          {date.getHours() < 10
                            ? `0${date.getHours()}`
                            : date.getHours()}
                          :
                          {date.getMinutes() < 10
                            ? `0${date.getMinutes()}`
                            : date.getMinutes()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginRight: "2vw",
              justifyContent: "collumn",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              style={{
                marginTop: "20px",
              }}
              className="mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-400 px-5 py-3 text-base font-medium text-white hover:bg-blue-700 sm:mt-10 sm:w-auto xl:mt-0"
              onClick={logoutNavigate}
            >
              Log out
            </button>
            <button
              style={{
                marginTop: "20px",
              }}
              className="mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-5 py-3 text-base font-medium text-white hover:bg-gray-700 sm:mt-10 sm:w-auto xl:mt-0"
              onClick={() => setShowForm(!showForm)}
            >
              Edit user info data
            </button>
            <button
              style={{
                marginTop: "20px",
              }}
              className="mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-amber-400 px-5 py-3 text-base font-medium text-white hover:bg-amber-700 sm:mt-10 sm:w-auto xl:mt-0"
              onClick={() => setShowUpgrade(!showUpgrade)}
            >
              Upgrade signature
            </button>
          </div>
        </div>
      )}
      {!isLoading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <dl
              style={{ alignItems: "center" }}
              className="mt-5 grid  gap-5 sm:grid-"
            >
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-lg font-medium text-gray-500">
                  {usuariosInfo.user.profit > 0
                    ? "Profit made in trades  "
                    : "Loss in trades  "}
                </dt>
                <dd
                  className={
                    usuariosInfo.user.profit === 0
                      ? "mt-1 text-3xl font-semibold tracking-tight text-stone-900"
                      : usuariosInfo.user.profit > 0
                      ? "mt-1 text-3xl font-semibold tracking-tight text-green-500"
                      : "mt-1 text-3xl font-semibold tracking-tight text-red-500"
                  }
                >
                  {usuariosInfo.user.profit.toFixed(2)}
                  {"  "}U$D
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
      {showForm && (
        <>
          <Transition.Root show={showForm} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setShowForm}
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
                                    Edit personal information
                                  </h3>
                                </div>
                                <div className="mt-6 ">
                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="first-name"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      First name
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        type="text"
                                        name="name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={editForm.name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="sm:col-span-3">
                                    <label
                                      htmlFor="last-name"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Last name
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        type="text"
                                        name="lastName"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={editForm.lastName}
                                        onChange={handleChange}
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
                          onClick={() => setShowForm(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border bg-green-600 bg-white px-4 py-2 text-white font-medium text-base shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={handleSubmit}
                        >
                          Save changes
                        </button>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={handleDeleteUser}
                        >
                          Desactivate User
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
      {showUpgrade && (
        <>
          <Transition.Root show={showUpgrade} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setSelectPlain}
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
                                    Select you plan
                                  </h3>
                                </div>
                                <div className="mt-6 ">
                                  <div className="sm:col-span-3">
                                    <div className="mt-1">
                                      <select
                                        id="location"
                                        name="signatureType"
                                        onChange={handleChosePlain}
                                        style={{
                                          margin: "auto",
                                          marginTop: "20px",
                                        }}
                                        required="true"
                                        className="mt-1 block  rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                      >
                                        <option></option>
                                        <option value="BASIC">BASIC</option>
                                        <option value="PLUS">PLUS</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                      </select>
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
                          onClick={() => setShowUpgrade(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border bg-green-600 bg-white px-4 py-2 text-white font-medium text-base shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={handleUpgrade}
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
        <div style={{ width: "70vh", margin: "auto" }}>
          <div className="mt-6 flow-root" style={{ marginBottom: "20px" }}>
            <label
              style={{ textAlign: "center", fontSize: "70px" }}
              className="block  font-medium text-gray-700"
            >
              Wallets
            </label>
            <button
              style={{
                marginTop: "20px",
              }}
              className={
                newWalletForm
                  ? "mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-5 py-3 text-base font-medium text-white hover:bg-gray-700 sm:mt-10 sm:w-auto xl:mt-0"
                  : "mt-10 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-400 px-5 py-3 text-base font-medium text-white hover:bg-green-700 sm:mt-10 sm:w-auto xl:mt-0"
              }
              onClick={() => setShowNewWalletForm(!newWalletForm)}
            >
              {newWalletForm ? "Cancel wallet creation" : "Create new wallet"}
            </button>
            {newWalletForm && (
              <form
                className="sm:col-span-2 space-y-8 divide-y divide-gray-200"
                onSubmit={walletAppending}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Wallet name
                  </label>
                  <div className="mt-1">
                    <input
                      name="name"
                      value={appendWallet.name}
                      placeholder="Insert new wallet Name"
                      style={{ padding: "5px" }}
                      onChange={nameOfWallet}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="example: college fund"
                    />
                  </div>
                </div>

                <button
                  className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                >
                  Add new Wallet
                </button>
              </form>
            )}
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {usuariosInfo.user.wallets.map((wallet) => (
                <li
                  style={{
                    marginTop: "40px",
                    border: "2px solid grey",
                    borderRadius: "9px",
                    padding: "20px",
                  }}
                  className="py-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {wallet.name}
                      </p>
                    </div>
                    <div>
                      <Link
                        to={`/dashboard-page/${wallet._id}`}
                        className="inline-flex items-center rounded-full border border-gray-300 bg-green-500 px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-green-200"
                      >
                        Browse this wallet
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
