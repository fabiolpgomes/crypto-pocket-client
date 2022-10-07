import { useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/api";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function Profile() {
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
    try {
      await api.post("/wallets/createwallet", appendWallet);
      setReload(!reload);
      setShowNewWalletForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUser(e) {
    //  faz o delete
    // faz o logout
    //redireiciona pra home
  }

  return (
    <div class="ml-5">
      {!isLoading && (
        <div className="bg-white">
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
                  </div>
                 
                </div>
              </div>
            </div>
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
                            >                              
                            </Dialog.Title>
                            <div className="mt-6 ">
                              <div className="pt-8">
                                <div>
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Personal Information
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
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-indigo-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setShowForm(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-green-300 bg-white px-4 py-2 text-base font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={handleSubmit}
                        >
                          SAVE
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

         {/*  <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <label>Name: </label>
            <input name="name" value={editForm.name} onChange={handleChange} />
            <label>Last Name: </label>
            <input
              name="lastName"
              value={editForm.lastName}
              onChange={handleChange}
            />

            <button type="submit">Update</button>
          </form> */
          }

        </>
      )}

      {/* {!isLoading && (
        <div className="space-y-8 divide-y divide-gray-200">
          <h1>Name: {usuariosInfo.user.name}</h1>
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

          <button
            className=" sm:col-span-2 group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel edition" : "Edit Profile"}
          </button>

          {showUpgrade && (
            <form
              className="space-y-8 divide-y divide-gray-200"
              onSubmit={handleUpgrade}
            >
              <button
                className=" sm:col-span-2 group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
              >
                Change plan
              </button>

              <label>Choose your new plan:</label>
              <select
                classeName="rounded"
                mdname="signatureType"
                onChange={handleChosePlain}
              >
                <option></option>
                <option value="BASIC">BASIC</option>
                <option value="PLUS">PLUS</option>
                <option value="PREMIUM">PREMIUM</option>
              </select>
            </form>
          )}

          <button
            className=" sm:col-span-2 group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setShowUpgrade(!showUpgrade)}
          >
            {showUpgrade ? "Cancel upgrade" : "Upgrade Wallet"}
          </button>

          <div className="sm:col-span-2">
            <button
              className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setShowNewWalletForm(!newWalletForm)}
            >
              {!newWalletForm ? "Create new wallet" : "Cancel wallet creating"}
            </button>
          </div>

          {newWalletForm && (
            <form
              className="sm:col-span-2 space-y-8 divide-y divide-gray-200"
              onSubmit={walletAppending}
            >
              <input
                name="name"
                value={appendWallet.name}
                placeholder="Insert new wallet Name"
                onChange={nameOfWallet}
              />
              <button
                className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
              >
                Add new Wallet
              </button>
            </form>
          )}
        </div>
      )} */}

      {!isLoading &&
        usuariosInfo.user.wallets.map((carteira) => {
          return (
            <Link to={`/dashboard-page/${carteira._id}`}>
              <div className="group relative -bottom-5 flex justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-6 text-md font-medium text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2">
                {carteira.name}
              </div>
            </Link>
          );
        })}
    </div>
  );
}
