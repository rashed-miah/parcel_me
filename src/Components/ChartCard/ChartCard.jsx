import React from "react";

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;
