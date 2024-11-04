import { BookOpen } from 'lucide-react';

export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500">
      <div className="flex flex-col items-center">
        <BookOpen className="h-16 w-16 text-primary-600 animate-bounce" />
        <div className="mt-4 flex space-x-1">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
          <div className="w-3 h-3 bg-secondary-500 rounded-full animate-[bounce_1s_ease-in-out_0.2s_infinite]"></div>
          <div className="w-3 h-3 bg-accent-500 rounded-full animate-[bounce_1s_ease-in-out_0.4s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}