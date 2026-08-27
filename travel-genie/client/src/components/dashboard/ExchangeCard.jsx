import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, ChevronDown, Search, X } from "lucide-react";
import { useTrips } from "../../context/TripContext.jsx";

const destinationCurrencies = {
  Afghanistan: "AFN",
  Pakistan: "PKR",
  India: "INR",
  Turkey: "TRY",
  Türkiye: "TRY",
  Dubai: "AED",
  UAE: "AED",
  "United Arab Emirates": "AED",
  China: "CNY",
  Japan: "JPY",
  Germany: "EUR",
  France: "EUR",
  Italy: "EUR",
  Spain: "EUR",
  England: "GBP",
  "United Kingdom": "GBP",
  Canada: "CAD",
  Australia: "AUD",
  USA: "USD",
  "United States": "USD",
};

// =====================================================
// CURRENCY PICKER
// =====================================================

function CurrencyPicker({ value, onChange, currencies, label, dark = false }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const pickerRef = useRef(null);
  const searchRef = useRef(null);

  const selectedCurrency = currencies.find(
    (currency) => currency.code === value,
  );

  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return currencies;

    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query),
    );
  }, [currencies, search]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      searchRef.current?.focus();
    }, 0);

    return () => clearTimeout(timer);
  }, [open]);

  const handleSelect = (currencyCode) => {
    onChange(currencyCode);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={pickerRef} className="relative min-w-0 flex-1">
      {/* Selected Currency */}
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`flex w-full min-w-0 items-center justify-between gap-1 text-left ${
          dark ? "text-white" : "text-gray-800 dark:text-white"
        }`}
        aria-label={label}
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold">
          {selectedCurrency
            ? `${selectedCurrency.code} — ${selectedCurrency.name}`
            : value}
        </span>

        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          } ${dark ? "text-white/70" : "text-gray-600 dark:text-white/60"}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute left-1/2 top-full z-[100] mt-2
            w-[280px] max-w-[calc(100vw-2rem)] -translate-x-1/2
            overflow-hidden rounded-2xl border border-gray-200 bg-white
            shadow-2xl
            dark:border-white/10 dark:bg-[#10252b]
            sm:w-[320px]
          "
        >
          {/* Search */}
          <div className="border-b border-gray-200 p-3 dark:border-white/10">
            <div
              className="
                flex h-10 min-w-0 items-center gap-2.5 rounded-xl
                border border-gray-200 bg-gray-50 px-3
                dark:border-white/10 dark:bg-white/10
              "
            >
              <Search
                size={16}
                className="shrink-0 text-gray-500 dark:text-white/50"
              />

              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search currency..."
                className="
                  min-w-0 flex-1 bg-transparent text-sm
                  text-gray-900 outline-none
                  placeholder:text-gray-400
                  dark:text-white dark:placeholder:text-white/40
                "
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setOpen(false);
                    setSearch("");
                  }
                }}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="
                    flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full text-gray-500 transition
                    hover:bg-gray-200 hover:text-gray-800
                    dark:text-white/50 dark:hover:bg-white/10
                    dark:hover:text-white
                  "
                  aria-label="Clear currency search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Currency List */}
          <div className="max-h-[320px] overflow-y-auto p-2">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => handleSelect(currency.code)}
                  className={`
                    flex min-h-[46px] w-full min-w-0 items-center justify-between
                    gap-3 rounded-xl px-3 py-2.5 text-left transition
                    ${
                      currency.code === value
                        ? "bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 text-blue-700 dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-purple-500/10 dark:text-cyan-400"
                        : "text-gray-800 hover:bg-gray-100 dark:text-white/80 dark:hover:bg-white/10"
                    }
                  `}
                >
                  <span className="min-w-0 flex-1 truncate">
                    <span className="text-sm font-bold">{currency.code}</span>

                    <span className="ml-2 text-sm text-gray-600 dark:text-white/50">
                      {currency.name}
                    </span>
                  </span>

                  {currency.code === value && (
                    <span
                      className="
                        shrink-0 text-xs font-semibold
                        bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500
                        bg-clip-text text-transparent
                      "
                    >
                      Selected
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center">
                <Search
                  size={22}
                  className="mx-auto mb-2 text-gray-400 dark:text-white/20"
                />

                <p className="text-sm font-medium text-gray-600 dark:text-white/50">
                  No currencies found
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-white/30">
                  Try another name or currency code.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// EXCHANGE CARD
// =====================================================

function ExchangeCard() {
  const { trips, loading } = useTrips();

  const [amount, setAmount] = useState("100");
  const [currencies, setCurrencies] = useState([]);
  const [currenciesLoading, setCurrenciesLoading] = useState(true);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const [rate, setRate] = useState(null);
  const [exchangeLoading, setExchangeLoading] = useState(false);
  const [exchangeError, setExchangeError] = useState("");

  // =====================================================
  // GET NEWEST TRIP
  // =====================================================

  const latestTrip = useMemo(() => {
    if (!Array.isArray(trips) || trips.length === 0) return null;

    return [...trips].sort((a, b) => Number(b.id) - Number(a.id))[0];
  }, [trips]);

  // =====================================================
  // LOAD ALL CURRENCIES
  // =====================================================

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        setCurrenciesLoading(true);
        setExchangeError("");

        const response = await fetch(
          "https://api.frankfurter.dev/v2/currencies",
        );

        if (!response.ok) {
          throw new Error("Could not load currencies.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid currency list received.");
        }

        const formattedCurrencies = data
          .map((currency) => ({
            code: currency.iso_code,
            name: currency.name,
            symbol: currency.symbol || "",
          }))
          .filter((currency) => currency.code && currency.name)
          .sort((a, b) => a.code.localeCompare(b.code));

        setCurrencies(formattedCurrencies);
      } catch (error) {
        console.error("Currency loading error:", error);
        setExchangeError("Could not load available currencies.");
      } finally {
        setCurrenciesLoading(false);
      }
    };

    loadCurrencies();
  }, []);

  // =====================================================
  // AUTOMATICALLY SELECT DESTINATION CURRENCY
  // =====================================================

  useEffect(() => {
    const destination = latestTrip?.destination?.trim();

    if (!destination) return;

    if (destinationCurrencies[destination]) {
      setToCurrency(destinationCurrencies[destination]);
      return;
    }

    const foundCountry = Object.keys(destinationCurrencies).find((country) =>
      destination.toLowerCase().includes(country.toLowerCase()),
    );

    if (foundCountry) {
      setToCurrency(destinationCurrencies[foundCountry]);
    }
  }, [latestTrip?.destination]);

  // =====================================================
  // GET LIVE EXCHANGE RATE
  // =====================================================

  useEffect(() => {
    const getExchangeRate = async () => {
      if (!fromCurrency || !toCurrency) return;

      if (fromCurrency === toCurrency) {
        setRate(1);
        setExchangeError("");
        setExchangeLoading(false);
        return;
      }

      try {
        setExchangeLoading(true);
        setExchangeError("");

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`,
        );

        if (!response.ok) {
          throw new Error("Could not load the exchange rate.");
        }

        const data = await response.json();

        if (typeof data.rate !== "number") {
          throw new Error("Invalid exchange rate received.");
        }

        setRate(data.rate);
      } catch (error) {
        console.error("Exchange rate error:", error);
        setRate(null);
        setExchangeError("Live exchange rate unavailable.");
      } finally {
        setExchangeLoading(false);
      }
    };

    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  // =====================================================
  // CALCULATE CONVERSION
  // =====================================================

  const convertedAmount =
    rate !== null && amount !== "" && !Number.isNaN(Number(amount))
      ? Number(amount) * Number(rate)
      : null;

  // =====================================================
  // SWAP CURRENCIES
  // =====================================================

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatAmount = (value) => {
    if (value === null || value === undefined) return "—";

    return Number(value).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading || currenciesLoading) {
    return (
      <section
        className="
          h-full min-h-[220px] rounded-[24px]
          border border-white/40 bg-white/25 p-5
          shadow-sm backdrop-blur-xl
          dark:border-white/10 dark:bg-white/[0.06]
        "
      >
        <p className="text-sm text-gray-700 dark:text-white/60">
          Loading currency information...
        </p>
      </section>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      className="
        relative h-full min-h-[220px] overflow-visible
        rounded-[24px] border border-white/40
        bg-[#B8C0C5] px-4 py-3.5
        shadow-sm backdrop-blur-xl
        dark:border-white/10 dark:bg-white/[0.06]
      "
    >
      {/* Header */}
      <div className="min-w-0">
        <h2
          className="
            truncate font-semibold text-gray-900
            dark:text-white
          "
        >
          Currency Exchange
        </h2>

        <p className="mt-0.5 truncate text-[11px] text-gray-700 dark:text-white/60">
          Live currency conversion
        </p>
      </div>

      {/* Conversion */}
      <div className="mt-4 flex min-w-0 items-stretch gap-2">
        {/* FROM */}
        <div
          className="
            min-w-0 flex-[1_1_0%]
            rounded-2xl
            bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500
            px-3 py-3 text-white
            shadow-sm
          "
        >
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="
              w-full min-w-0 bg-transparent
              text-lg font-semibold text-white outline-none
              placeholder:text-white/70
            "
            aria-label="Amount to convert"
          />

          <div className="mt-2 flex min-w-0 items-center border-t border-white/25 pt-2">
            <CurrencyPicker
              value={fromCurrency}
              onChange={setFromCurrency}
              currencies={currencies}
              label="From currency"
              dark
            />
          </div>
        </div>

        {/* SWAP */}
        <button
          type="button"
          onClick={handleSwap}
          className="
            flex h-9 w-9 shrink-0 self-center
            items-center justify-center rounded-full
            border border-white/70 bg-white/70
            shadow-sm transition
            hover:scale-105 hover:bg-white
            active:scale-95
            dark:border-white/10 dark:bg-white/10
          "
          aria-label="Swap currencies"
          title="Swap currencies"
        >
          <ArrowLeftRight
            size={16}
            className="text-blue-600 dark:text-cyan-400"
          />
        </button>

        {/* TO */}
        <div
          className="
            min-w-0 flex-[1_1_0%]
            rounded-2xl border border-white/50
            bg-white/40 px-3 py-3
            dark:border-white/10 dark:bg-white/10
          "
        >
          <div
            className="
              min-w-0 truncate text-lg font-semibold
              text-gray-800 dark:text-white
            "
          >
            {exchangeLoading ? "..." : formatAmount(convertedAmount)}
          </div>

          <div
            className="
              mt-2 flex min-w-0 items-center
              border-t border-gray-400/20 pt-2
              dark:border-white/10
            "
          >
            <CurrencyPicker
              value={toCurrency}
              onChange={setToCurrency}
              currencies={currencies}
              label="To currency"
            />
          </div>
        </div>
      </div>

      {/* EXCHANGE RATE */}
      {rate !== null && !exchangeLoading && (
        <p className="mt-3 min-w-0 truncate text-[11px] font-medium text-gray-700 dark:text-white/70">
          1 {fromCurrency} ={" "}
          {Number(rate).toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })}{" "}
          {toCurrency}
          <span
            className="
              ml-1.5 font-semibold
              bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500
              bg-clip-text text-transparent
            "
          >
            • Live rate
          </span>
        </p>
      )}

      {/* ERROR */}
      {exchangeError && (
        <p className="mt-3 min-w-0 truncate text-[11px] font-medium text-red-600 dark:text-red-400">
          {exchangeError}
        </p>
      )}

      {/* NO TRIP */}
      {!latestTrip && (
        <p className="mt-3 min-w-0 truncate text-[11px] text-gray-700 dark:text-white/60">
          Select any currencies you want to convert.
        </p>
      )}
    </section>
  );
}

export default ExchangeCard;
