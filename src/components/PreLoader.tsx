export default function Preloader() {
  return (
    <div
      className={`preloader fixed inset-0 flex flex-col items-center justify-center bg-white z-50 transition-opacity duration-500`}
    >
      <div className="loader rounded-full border-4 border-primary-600 border-t-transparent h-16 w-16 animate-spin mb-2"></div>
      <p className="text-purple-600 font-bold">
        Lates make us better!
      </p>
    </div>
  );
}