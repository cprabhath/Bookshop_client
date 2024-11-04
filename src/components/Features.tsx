import { BookOpen, Sparkles, Star, Users } from "lucide-react";

const Features = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
          <div className="relative z-10 mx-auto max-w-md">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
              <BookOpen className="h-6 w-6 text-white" />
            </span>
            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
              <h3 className="text-lg font-semibold mb-2">Vast Collection</h3>
              <p>Over 10,000 books across various genres</p>
            </div>
          </div>
        </div>

        <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-orange-500 transition-all duration-300 group-hover:scale-[10]"></span>
          <div className="relative z-10 mx-auto max-w-md">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-orange-500 transition-all duration-300 group-hover:bg-orange-400">
              <Users className="h-6 w-6 text-white" />
            </span>
            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
              <h3 className="text-lg font-semibold mb-2">Expert Curation</h3>
              <p>Handpicked recommendations</p>
            </div>
          </div>
        </div>

        <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-lime-500 transition-all duration-300 group-hover:scale-[10]"></span>
          <div className="relative z-10 mx-auto max-w-md">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-lime-500 transition-all duration-300 group-hover:bg-lime-400">
              <Star className="h-6 w-6 text-white" />
            </span>
            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p>High-quality prints and binding</p>
            </div>
          </div>
        </div>

        <div className="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-indigo-500 transition-all duration-300 group-hover:scale-[10]"></span>
          <div className="relative z-10 mx-auto max-w-md">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-indigo-500 transition-all duration-300 group-hover:bg-indigo-400">
              <Sparkles className="h-6 w-6 text-white" />
            </span>
            <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
              <h3 className="text-lg font-semibold mb-2">Special Offers</h3>
              <p>Regular discounts and deals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
