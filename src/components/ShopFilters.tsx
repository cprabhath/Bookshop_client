import { Filter } from 'lucide-react';
import { useState } from 'react';

interface ShopFiltersProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export default function ShopFilters({
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: ShopFiltersProps) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="border w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2"
        >
          <option value="featured">Featured</option>
          <option value="title_asc">Title: A to Z</option>
          <option value="title_desc">Title: Z to A</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>

      {/* Categories */}
      <div>
      <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
      <div className="space-y-2">
        {(showAll ? categories : categories.slice(0, 6)).map((category, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <span className="ml-2 text-gray-600">{category}</span>
          </label>
        ))}
      </div>
      {categories.length > 6 && (
        <button onClick={toggleShowAll} className="text-blue-500 hover:underline mt-2">
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      )}
    </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange([priceRange[0], parseInt(e.target.value)])
              }
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-black">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => {
          onSortChange('featured');
          onPriceRangeChange([0, 100]);
          onCategoryChange('All');
        }}
        className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}