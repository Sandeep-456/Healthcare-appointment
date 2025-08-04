const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <img
        src="/assets/not_found.svg"
        alt="Not Found"
        className="w-[60%] sm:w-[40%] md:w-[30%] mb-6"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
        Page Not Found
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mt-4">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
