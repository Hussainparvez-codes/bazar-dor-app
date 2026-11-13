import Hero from "@/components/shared/Hero";
import PriceChangeSections from "@/components/home/PriceChangeSections";
import AllProducts from "@/components/home/AllProducts";
import { fetchFromApi } from "@/lib/api";

export default async function Home() {
  let products = [];

  try {
    const result = await fetchFromApi("/products");

    products = Array.isArray(result)
      ? result
      : Array.isArray(result?.products)
        ? result.products
        : Array.isArray(result?.data)
          ? result.data
          : [];

  } catch (error) {
    console.error("Products fetch error:", error);
  }

  return (
    <>
      <Hero />

      {/* দাম বেড়েছে ও কমেছে */}
      <PriceChangeSections products={products} />

      {/* সব পণ্য */}
      <AllProducts products={products} />
    </>
  );
}