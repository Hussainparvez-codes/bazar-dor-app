export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E3EAE4] bg-[#F8FAF8]">
      <div className="mx-auto flex w-full max-w-[1250px] flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:gap-4">

        {/* Left Text */}
        <p className="text-center text-[10px] text-[#344238] sm:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Text */}
        <p className="text-center text-[10px] text-[#344238] sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>

      </div>
    </footer>
  );
}