import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative">
      <div
        className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'w-96' : 'w-10'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => !searchQuery && setIsExpanded(false)}
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={isExpanded ? "Search books..." : ""}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-primary-500 transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}