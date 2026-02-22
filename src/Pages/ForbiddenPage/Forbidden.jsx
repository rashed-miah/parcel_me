import { Link } from "react-router-dom";
import { FaBan, FaArrowLeft } from "react-icons/fa";
import usePageTitle from "../../Hook/usePageTitle";

const Forbidden = () => {
  usePageTitle("Forbidden ");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4 rounded-2xl my-4 text-center">
      <FaBan className="text-red-500 text-6xl mb-4" />

      <h1 className="text-3xl font-bold mb-2">403 – Forbidden</h1>

      <p className="text-gray-500 max-w-md mb-6">
        You don’t have permission to access this page. Please contact the
        administrator if you believe this is a mistake.
      </p>

      <Link to="/" className="btn btn-primary gap-2 text-black">
        <FaArrowLeft />
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
