import Link from "next/link";

function formatPrice(value) {
  const number = Number(value);

  if (value === null || value === undefined || !Number.isFinite(number)) {
    return "—";
  }

  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(number);
}

function getUnit(unit) {
  const units = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    l: "লিটার",
    piece: "পিস",
    pcs: "পিস",
    dozen: "ডজন",
  };

  return units[String(unit || "").toLowerCase()] || unit || "";
}

function getMarketStats(markets) {
  const validMarkets = markets
    .map((market) => ({
      min: Number(market.min),
      max: Number(market.max),
    }))
    .filter(
      (market) =>
        Number.isFinite(market.min) &&
        Number.isFinite(market.max)
    );

  if (!validMarkets.length) {
    return { min: null, max: null, avg: null };
  }

  const min = Math.min(...validMarkets.map((item) => item.min));
  const max = Math.max(...validMarkets.map((item) => item.max));

  const avg =
    validMarkets.reduce(
      (sum, item) => sum + (item.min + item.max) / 2,
      0
    ) / validMarkets.length;

  return { min, max, avg };
}

export default function ProductDetails({ product }) {
  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const stats = getMarketStats(markets);
  const unit = getUnit(product.unit);

  const today = Number(product.today);
  const yesterday = Number(product.yesterday);

  const hasPriceComparison =
    Number.isFinite(today) && Number.isFinite(yesterday);

  const priceDifference = hasPriceComparison
    ? Math.abs(today - yesterday)
    : null;

  const isUp = hasPriceComparison && today > yesterday;
  const isDown = hasPriceComparison && today < yesterday;

  return (
    <div className="space-y-5">

      {/* Breadcrumb */}
      <div className="text-xs text-gray-500">
        <Link
          href="/"
          className="transition-colors hover:text-[#267A45]"
        >
          হোম
        </Link>

        <span className="mx-2">/</span>

        <Link
          href={`/category/${product.category}`}
          className="transition-colors hover:text-[#267A45]"
        >
          {product.categoryNameBn}
        </Link>

        <span className="mx-2">/</span>

        <span className="font-medium text-[#267A45]">
          {product.nameBn}
        </span>
      </div>

      {/* Product Card */}
      <section className="flex flex-col gap-4 rounded-xl border border-[#E3EEE5] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F0F9F2] text-4xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#1D271F]">
              {product.nameBn}
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              প্রতি {unit} {product.categoryNameBn}
            </p>

            <p className="mt-1 text-sm text-black-bold">
              {!hasPriceComparison
                ? "দামের পরিবর্তনের তথ্য নেই"
                : isUp
                  ? `গতকালের তুলনায় আজ দাম বেড়েছে ${formatPrice(priceDifference)} টাকা `
                  : isDown
                    ? `গতকালের তুলনায় আজ দাম কমেছে ${formatPrice(priceDifference)} টাকা `

                    : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#F0F9F2] px-5 py-3 sm:min-w-[120px] sm:text-center">
          <p className="text-xs text-gray-500">
            বর্তমান দাম
          </p>

          <p className="text-2xl font-bold text-[#267A45]">
            {formatPrice(product.today)}
          </p>

          <p className="text-xs text-gray-500">
            টাকা / {unit}
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-xl border border-[#E3EEE5] bg-white p-4 sm:p-5">

        <h2 className="mb-4 text-base font-bold text-[#1D271F]">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

          {/* Minimum Price */}
          <div className="rounded-xl border border-[#E3EEE5] bg-[#FAFCFA] p-4">
            <p className="text-xs text-gray-500">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 text-xl font-bold text-[#267A45]">
              {stats.min !== null
                ? `${formatPrice(stats.min)} টাকা`
                : "তথ্য নেই"}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* Maximum Price */}
          <div className="rounded-xl border border-[#E3EEE5] bg-[#FAFCFA] p-4">
            <p className="text-xs text-gray-500">
              সর্বাধিক দাম
            </p>

            <p className="mt-2 text-xl font-bold text-[#D64545]">
              {stats.max !== null
                ? `${formatPrice(stats.max)} টাকা`
                : "তথ্য নেই"}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Average Price */}
          <div className="rounded-xl border border-[#E3EEE5] bg-[#FAFCFA] p-4">
            <p className="text-xs text-gray-500">
              গড় দাম
            </p>

            <p className="mt-2 text-xl font-bold text-[#267A45]">
              {stats.avg !== null
                ? `${formatPrice(stats.avg)} টাকা`
                : "তথ্য নেই"}
            </p>

            <p className="mt-2 text-xs text-gray-500">
              প্রতি {unit} হিসাবে
            </p>
          </div>

        </div>
      </section>

      {/* Market Details */}
      <section className="overflow-hidden rounded-xl border border-[#E3EEE5] bg-white">

        <div className="p-4 sm:p-5">
          <h2 className="text-base font-bold text-[#1D271F]">
            বাজারভিত্তিক আজকের দাম
          </h2>
        </div>

        {markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">

              <thead className="bg-[#F0F9F2] text-[#34483A]">
                <tr>
                  <th className="px-4 py-3 font-semibold">বাজার</th>
                  <th className="px-4 py-3 font-semibold">বিভাগ</th>
                  <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                  <th className="px-4 py-3 font-semibold">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-semibold">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const min = Number(market.min);
                  const max = Number(market.max);

                  const average =
                    Number.isFinite(min) && Number.isFinite(max)
                      ? (min + max) / 2
                      : null;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className={
                        index % 2 === 0
                          ? "border-b border-[#E8EFE9] bg-white"
                          : "border-b border-[#E8EFE9] bg-[#FAFCFA]"
                      }
                    >
                      <td className="px-4 py-3 font-medium text-[#34483A]">
                        {market.market}
                      </td>

                      <td className="px-4 py-3 text-[#34483A]">
                        {market.division}
                      </td>

                      <td className="px-4 py-3 text-[#1D271F]">
                        {formatPrice(min)} টাকা
                      </td>

                      <td className="px-4 py-3 text-[#1D271F]">
                        {formatPrice(max)} টাকা
                      </td>

                      <td className="px-4 py-3 text-right font-semibold text-[#1D271F]">
                        {average !== null
                          ? `${formatPrice(average)} টাকা`
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        ) : (
          <p className="p-6 text-center text-sm text-gray-500">
            এই পণ্যের বাজারের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

    </div>
  );
}