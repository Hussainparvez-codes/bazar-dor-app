"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/shared/ProductCard";

export default function CategoryProducts({ products }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortBy === "low-to-high") {
      items.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortBy === "high-to-low") {
      items.sort((a, b) => Number(b.today) - Number(a.today));
    } else if (sortBy === "name") {
      items.sort((a, b) =>
        (a.nameBn || "").localeCompare(b.nameBn || "", "bn")
      );
    }

    return items;
  }, [products, sortBy]);

  return (
    <>
      {/* Sorting Bar */}
      <div className="mb-5 flex items-center justify-end rounded-xl border border-[#E4EDE5] bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <label
            htmlFor="product-sort"
            className="text-xs font-medium text-gray-500"
          >
            সাজান
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-[#1D271F] outline-none focus:border-[#05893E]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম দাম থেকে বেশি</option>
            <option value="high-to-low">বেশি দাম থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
          </select>
        </div>
      </div>

      {/* Products Section */}
      <section>
        <div className="mb-4">
          <p className="mt-1 text-xs text-gray-500">
            মোট {new Intl.NumberFormat("bn-BD").format(products.length)} টি
            পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-5 text-center">
            <p className="text-xs text-gray-500">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>

            <Link
              href="/"
              className="mt-1 inline-block text-xs font-semibold text-[#05893E] transition hover:underline"
            >
              হোম পেজে ফিরে যান →
            </Link>
          </div>
        )}
      </section>
    </>
  );
}