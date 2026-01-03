import errorIcon from "../../assets/images/icon-error.svg";
import iconRetry from "../../assets/images/icon-retry.svg";

const Error = ({ message }) => {
  return (
    <div className="mt-20 text-center">
      <img src={errorIcon} alt="error" className="h-8 mx-auto mb-2" />
      <p className="text-5xl font-bricolage">Something went wrong</p>
      <p className="max-w-100 text-center mx-auto mt-5 text-gray-400 text-md">
        {message}
      </p>
      <button
        cursor="pointer"
        onClick={() => window.location.reload()}
        className="mt-4 bg-secondary px-4 py-2 rounded-lg text-gray-300"
      >
        <img
          src={iconRetry}
          alt="retry"
          className="h-4 inline-block mr-2 cursor-pointer"
        />
        Retry
      </button>
    </div>
  );
};

export default Error;
