import { Suspense } from "react";
import Link from "next/link";
import CategoryProducts from "@/components/shared/CategoryProducts";
import { fetchFromApi } from "@/lib/api";

const categories = {
  chal: { name: "চাল", icon: "🍚" },
  dal: { name: "ডাল", icon: "🫘" },
  tel: { name: "তেল", icon: "🫒" },
  mach: { name: "মাছ", icon: "🐟" },
  mangsho: { name: "মাংস", icon: "🥩" },
  sobji: { name: "সবজি", icon: "🥬" },
  "dim-dui": { name: "ডিম-দুধ", icon: "🥛" },
  moshla: { name: "মসলা", icon: "🌶️" },
};

function EmptyState() {
  return (
    <div className="py-5 text-center">
      <p className="text-xs text-gray-500">
        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
      </p>

      <Link
        href="/"
        className="mt-1 inline-block text-xs font-semibold text-[#05893E] hover:underline"
      >
        হোম পেজে ফিরে যান →
      </Link>
    </div>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const category = categories[slug];

  let products = [];

  if (category) {
    try {
      const result = await fetchFromApi(
        `/products?category=${encodeURIComponent(slug)}`
      );

      products = Array.isArray(result)
        ? result
        : Array.isArray(result?.products)
          ? result.products
          : Array.isArray(result?.data)
            ? result.data
            : [];
    } catch (error) {
      console.error("Category products error:", error);
    }
  }

  if (!category) {
    return (
      <main className="min-h-[50vh] bg-[#F0F6F1] px-4 py-10">
        <EmptyState />
      </main>
    );
  }

  const productCount = new Intl.NumberFormat("bn-BD").format(
    products.length
  );

  return (
    <main className="min-h-screen bg-[#F0F6F1] py-6 sm:py-8">
      <div className="mx-auto w-full max-w-6xl px-4">
        <section className="mb-3 flex items-center gap-3 rounded-xl border border-[#E4EDE5] bg-white px-4 py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0F6F1] text-2xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-lg font-bold text-[#1D271F]">
              {category.name}
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              {productCount}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <CategoryProducts products={products} />
        )}
      </div>
    </main>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F0F6F1] py-20 text-center text-sm text-gray-500">
          পণ্য লোড হচ্ছে...
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}