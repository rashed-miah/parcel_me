import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTitle = (title) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `Parcel Point | ${title}`;
  }, [location.pathname, title]);
};

export default usePageTitle;
