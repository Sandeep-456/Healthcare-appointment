const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img
        src="/assets/not_found.svg"
        alt="Not Found"
        className="w-[30%] mb-6"
      />
      <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
