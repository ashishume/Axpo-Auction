import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
interface SnackbarProps {
  message: string;
  duration?: number;
  isError?: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  duration = 3000,
  isError = false,
}) => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      {showSnackbar && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md flex items-center">
          {isError ? <CloseIcon /> : <CheckIcon />}
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Snackbar;
