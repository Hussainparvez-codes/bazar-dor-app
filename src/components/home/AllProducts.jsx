import ProductCard from "@/components/shared/ProductCard";

export default function AllProducts({ products }) {
  return (
    <section id="all-products" className="bg-[#F0F6F1] py-8">
      <div className="mx-auto max-w-7xl px-4">

        {/* Section Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-[#1D271F]">
              সব পণ্য
            </h2>
          </div>

          <p className="mt-2 text-sm font-medium text-[#05893E]">
            মোট{" "}
            {new Intl.NumberFormat("bn-BD").format(products.length)}
            {" "}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}

      </div>
    </section>
  );
}