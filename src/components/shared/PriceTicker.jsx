import { fetchFromApi } from "@/lib/api";

const unitMap = {
  kg: "কেজি",
  kilogram: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
};

export default async function PriceTicker() {
  let products = [];

  try {
    const result = await fetchFromApi("/products");

    products = Array.isArray(result)
      ? result
      : Array.isArray(result?.products)
        ? result.products
        : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.data?.products)
            ? result.data.products
            : [];
  } catch (error) {
    console.error("Price ticker error:", error);
  }

  if (products.length === 0) return null;

  const tickerProducts = [...products, ...products];

  const formatBn = (value) =>
    new Intl.NumberFormat("bn-BD").format(value);

  return (
    <section className="w-full overflow-hidden border-y border-green-100 bg-[#F0F9F2]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">

        {/* Moving Ticker */}
        <div className="ticker-container min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center gap-7">

            {tickerProducts.map((product, index) => {
              const direction = product.change?.dir;
              const isUp = direction === "up";
              const isDown = direction === "down";

              const unit =
                unitMap[String(product.unit || "").toLowerCase()] ||
                product.unit;

              return (
                <div
                  key={`${product.id || product.slug}-${index}`}
                  className="flex shrink-0 items-center gap-2 border-r border-green-200 pr-7"
                >
                  <span className="text-sm font-medium text-[#1D271F]">
                    {product.nameBn}
                  </span>

                  <span className="text-sm font-medium text-[#1D271F]">
                    {formatBn(product.today)} টাকা
                  </span>

                  <span className="text-sm font-medium text-[#1D271F]">
                    / {unit}
                  </span>

                  {isUp && (
                    <span className="text-xs font-semibold text-green-600">
                      ▲ {formatBn(product.change.pct)}%
                    </span>
                  )}

                  {isDown && (
                    <span className="text-xs font-semibold text-red-500">
                      ▼ {formatBn(Math.abs(product.change.pct))}%
                    </span>
                  )}

                  {!isUp && !isDown && (
                    <span className="text-xs text-gray-400">
                      —
                    </span>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}



