import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../Hook/useAxiosInstance";
import useAuth from "../../../Hook/useAuth";
import Loader from "../../../SharedPages/Loader";
import ChartCard from "../../../Components/ChartCard/ChartCard";
import PieBlock from "../../../Components/PieBlock/PieBlock";

const COLORS = ["#22c55e", "#3b82f6"];

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["rider-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/rider-stats?email=${user.email}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  const deliveryData = [
    { name: "Assigned", value: data.deliveryStatusCounts.rider_assign },
    { name: "Completed", value: data.deliveryStatusCounts.completed },
  ];

  const earningData = [{ name: "Total Earned", value: data.totalEarned }];

  return (
    <div className="className=p-6 space-y-10">
      {/* DELIVERY STATUS PIE */}

      <h2 className="text-3xl font-bold text-center text-primary">
        Rider Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
        <ChartCard title="Parcel Summary">
          <PieBlock data={deliveryData} />
        </ChartCard>
        <ChartCard title="earning">
          <PieBlock data={earningData} />
        </ChartCard>
      </div>

      {/* TOTAL EARNINGS PIE */}
    </div>
  );
};

export default RiderDashboard;
