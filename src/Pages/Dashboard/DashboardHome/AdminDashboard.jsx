import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosInstance";
import ChartCard from "../../../Components/ChartCard/ChartCard";
import PieBlock from "../../../Components/PieBlock/PieBlock";
import Loader from "../../../SharedPages/Loader";
import RevenuePieChart from "../../../Components/RevenuePieChart/RevenuePieChart";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  /* -------- FORMAT DATA -------- */
  const paymentData = [
    { name: "Paid", value: data.parcelCounts.paid },
    { name: "Unpaid", value: data.parcelCounts.unpaid },
  ];
  const revenueData = [
    {
      name: "Total Revenue",
      value: data.parcelCounts.totalRevenue,
    },
    {
      name: "Rider Earn",
      value: data.parcelCounts.totalRiderEarn,
    },
    {
      name: "Partform Revenue",
      value: data.parcelCounts.platformRevenue,
    },
  ];

  const deliveryData = [
    { name: "Rider Assigned", value: data.deliveryStatusCounts.rider_assign },
    { name: "In Transit", value: data.deliveryStatusCounts.in_transit },
    { name: "Completed", value: data.deliveryStatusCounts.completed },
    { name: "Not Collected", value: data.deliveryStatusCounts.not_collected },
  ];

  const riderData = [
    { name: "Active", value: data.riderCounts.active },
    { name: "Rejected", value: data.riderCounts.rejected },
    { name: "Deactivated", value: data.riderCounts.deactivated },
  ];
  const rolePieData = [
    { name: "User", value: data.userRoleCounts.user },
    { name: "Rider", value: data.userRoleCounts.rider },
    { name: "Admin", value: data.userRoleCounts.admin },
  ];

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-bold text-center text-primary">
        Admin Dashboard
      </h2>

      <RevenuePieChart revenueData={revenueData}></RevenuePieChart>
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
        {/* PAYMENT STATUS */}
        <ChartCard title="Parcel Payment Status">
          <PieBlock data={paymentData} />
        </ChartCard>

        {/* DELIVERY STATUS */}
        <ChartCard title="Delivery Status">
          <PieBlock data={deliveryData} />
        </ChartCard>

        {/* RIDER STATUS */}
        <ChartCard title="Rider Status">
          <PieBlock data={riderData} />
        </ChartCard>
        {/* ROLE DATA */}
        <ChartCard title="User Roles">
          <PieBlock data={rolePieData} />
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
