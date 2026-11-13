import ProductCard from "@/components/shared/ProductCard";

function PriceSection({ products, type }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-[#F0F6F1] px-4 py-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#1D271F]">
            {type === "up" ? (
              <>
                আজ দাম বেড়েছে{" "}
                <span className="text-red-600">▲</span>
              </>
            ) : (
              <>
                আজ দাম কমেছে{" "}
                <span className="text-green-600">▼</span>
              </>
            )}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            মোট {products.length.toLocaleString("bn-BD")} টি পণ্য
            দেখানো হচ্ছে
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id || product.slug}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PriceChangeSections({ products = [] }) {
  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Math.abs(Number(b.change?.pct) || 0) -
        Math.abs(Number(a.change?.pct) || 0)
    )
    .slice(0, 6);

  const decreasedProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(Number(b.change?.pct) || 0) -
        Math.abs(Number(a.change?.pct) || 0)
    )
    .slice(0, 6);

  return (
    <>
      <PriceSection
        products={increasedProducts}
        type="up"
      />

      <PriceSection
        products={decreasedProducts}
        type="down"
      />
    </>
  );
}