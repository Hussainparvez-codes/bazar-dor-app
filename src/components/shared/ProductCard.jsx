import Link from "next/link";

export default function ProductCard({ product }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("bn-BD").format(price);

  const formatUnit = (unit) => {
    const units = {
      kg: "কেজি",
      liter: "লিটার",
      litre: "লিটার",
      l: "লিটার",
      piece: "পিস",
      pcs: "পিস",
      dozen: "ডজন",
    };

    return units[unit.toLowerCase()] || unit;
  };

  const isUp = product.change?.dir === "up";

  const changeColor = isUp
    ? "bg-red-50 text-red-600"
    : "bg-green-50 text-green-600";

  return (
   <Link href={`/products/${product.slug}`} className="block">
      <article className="flex h-full flex-col justify-between rounded-xl border border-[#E5ECE6] bg-[#FAFCFA] p-3 transition-all hover:border-[#05893E]/30 hover:shadow-sm">

        {/* Product information */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0F5F1] text-xl">
            {product.image || product.categoryIcon}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-[#1D271F]">
              {product.nameBn}
            </h3>

            <p className="text-[10px] text-gray-500">
              প্রতি {formatUnit(product.unit)}
            </p>
          </div>
        </div>

        {/* Price information */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-0.5 text-base font-bold text-[#1D271F]">
              {formatPrice(product.today)} টাকা
            </p>
          </div>

          {/* Price change */}
          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${changeColor}`}
          >
            {isUp ? "▲" : "▼"}{" "}
            {formatPrice(Math.abs(product.change?.pct ?? 0))}%
          </span>
        </div>
      </article>
    </Link>
  );
}