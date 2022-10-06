import { CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import picture from "../../assets/golden-bitcoin-mail-hands.jpg";

const hobbyFeatures = [
  "You can create one wallet",
  "The wallet can have 4 cryptos currencies",
  "No charge",
];
const scaleFeatures = [
  "No limit to your number of wallets",
  "More than 99 crypto currencies available",
  "Recieve messages about crypto markets",
];
const growthFeatures = [
  "You can create two wallets",
  "Each wallet can have multiple cryptos currencies",
  "Most used worldwide",
  "Buy as much crypto currencies as you want",
  "Be part of the huge community of investors",
];

export function HomePage() {
  return (
    <div className="relative bg-indigo-800">
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover" src={picture} alt="btc" />
        <div
          className="absolute inset-0 bg-indigo-4500 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Simplify the way to take care of Cryptocurrencies,
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-indigo-100">
          keep them in your pocket.
        </p>
      </div>

      <div className="bg-gray-900">
        <div className="px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
          <div className="text-center">
            <p className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Simplify the way to take care of Cryptocurrencies,
            </p>
            <p className="mx-auto mt-3 max-w-4xl text-xl text-gray-300 sm:mt-5 sm:text-2xl">
              keep them in your pocket.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white pb-12 lg:mt-20 lg:pb-20">
          <div className="relative z-0">
            <div className="absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative lg:grid lg:grid-cols-7">
                <div className="mx-auto max-w-md lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:mx-0 lg:max-w-none">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-l-lg">
                    <div className="flex flex-1 flex-col">
                      <div className="bg-white px-6 py-10">
                        <div>
                          <h3
                            className="text-center text-2xl font-medium text-gray-900"
                            id="tier-hobby"
                          >
                            Basic
                          </h3>
                          <div className="mt-4 flex items-center justify-center">
                            <span className="flex items-start px-3 text-6xl tracking-tight text-gray-900">
                              <span className="mt-2 mr-2 text-4xl font-medium tracking-tight">
                                $
                              </span>
                              <span className="font-bold">0</span>
                            </span>
                            <span className="text-xl font-medium text-gray-500">
                              /month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
                        <ul role="list" className="space-y-4">
                          {hobbyFeatures.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="h-6 w-6 flex-shrink-0 text-green-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-base font-medium text-gray-500">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <div className="rounded-lg shadow-md">
                            <Link
                              to="/sign-up"
                              className="block w-full rounded-lg border border-transparent bg-white px-6 py-3 text-center text-base font-medium text-indigo-600 hover:bg-gray-50"
                              aria-describedby="tier-hobby"
                            >
                              Select Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-10 max-w-lg lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4 lg:mx-0 lg:mt-0 lg:max-w-none">
                  <div className="relative z-10 rounded-lg shadow-xl">
                    <div
                      className="pointer-events-none absolute inset-0 rounded-lg border-2 border-indigo-600"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 top-0 translate-y-px transform">
                      <div className="flex -translate-y-1/2 transform justify-center">
                        <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-base font-semibold text-white">
                          Most popular
                        </span>
                      </div>
                    </div>
                    <div className="rounded-t-lg bg-white px-6 pt-12 pb-10">
                      <div>
                        <h3
                          className="text-center text-3xl font-semibold tracking-tight text-gray-900 sm:-mx-6"
                          id="tier-growth"
                        >
                          Plus
                        </h3>
                        <div className="mt-4 flex items-center justify-center">
                          <span className="flex items-start px-3 text-6xl tracking-tight text-gray-900 sm:text-6xl">
                            <span className="mt-2 mr-2 text-4xl font-medium tracking-tight">
                              $
                            </span>
                            <span className="font-bold">30</span>
                          </span>
                          <span className="text-2xl font-medium text-gray-500">
                            /month
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-b-lg border-t-2 border-gray-100 bg-gray-50 px-6 pt-10 pb-8 sm:px-10 sm:py-10">
                      <ul role="list" className="space-y-4">
                        {growthFeatures.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckIcon
                                className="h-6 w-6 flex-shrink-0 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base font-medium text-gray-500">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10">
                        <div className="rounded-lg shadow-md">
                          <Link
                            to="/sign-up"
                            className="block w-full rounded-lg border border-transparent bg-indigo-600 px-6 py-4 text-center text-xl font-medium leading-6 text-white hover:bg-indigo-700"
                            aria-describedby="tier-growth"
                          >
                            Select Plan
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-auto mt-10 max-w-md lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3 lg:m-0 lg:max-w-none">
                  <div className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg lg:rounded-none lg:rounded-r-lg">
                    <div className="flex flex-1 flex-col">
                      <div className="bg-white px-6 py-10">
                        <div>
                          <h3
                            className="text-center text-2xl font-medium text-gray-900"
                            id="tier-scale"
                          >
                            Premium
                          </h3>
                          <div className="mt-4 flex items-center justify-center">
                            <span className="flex items-start px-3 text-6xl tracking-tight text-gray-900">
                              <span className="mt-2 mr-2 text-4xl font-medium tracking-tight">
                                $
                              </span>
                              <span className="font-bold">50</span>
                            </span>
                            <span className="text-xl font-medium text-gray-500">
                              /month
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between border-t-2 border-gray-100 bg-gray-50 p-6 sm:p-10 lg:p-6 xl:p-10">
                        <ul role="list" className="space-y-4">
                          {scaleFeatures.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="h-6 w-6 flex-shrink-0 text-green-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-base font-medium text-gray-500">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <div className="rounded-lg shadow-md">
                            <Link
                              to="/sign-up"
                              className="block w-full rounded-lg border border-transparent bg-white px-6 py-3 text-center text-base font-medium text-indigo-600 hover:bg-gray-50"
                              aria-describedby="tier-scale"
                            >
                              Select Plan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
