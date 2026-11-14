import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import { fetchFromApi } from "@/lib/api";

async function getProduct(slug) {
  try {
    const result = await fetchFromApi("/products");

    const products = Array.isArray(result)
      ? result
      : Array.isArray(result?.products)
        ? result.products
        : Array.isArray(result?.data)
          ? result.data
          : [];

    return (
      products.find(
        (product) => String(product.slug) === String(slug)
      ) || null
    );
  } catch (error) {
    console.error("Product API error:", error);
    return null;
  }
}

async function ProductContent({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F0F6F1] px-4 py-6">
      <div className="mx-auto w-full max-w-6xl px-4">
        <ProductDetails product={product} />
      </div>
    </main>
  );
}

export default function ProductDetailsPage({ params }) {
  return (
    <>
      <Suspense
        fallback={
          <main className="min-h-screen bg-[#F0F6F1] p-10 text-center">
            পণ্যের তথ্য লোড হচ্ছে...
          </main>
        }
      >
        <ProductContent params={params} />
      </Suspense>
    </>
  );
}