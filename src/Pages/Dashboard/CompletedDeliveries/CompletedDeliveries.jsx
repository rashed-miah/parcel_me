import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosInstance";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const [cashAmount, setCashAmount] = useState("");

  /* ---------------- FETCH COMPLETED ---------------- */

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completedDeliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/completed-deliveries");
      return res.data;
    },
  });

  /* ---------------- FETCH WITHDRAW ---------------- */

  const { data: withdrawData } = useQuery({
    queryKey: ["withdrawTotal"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/withdraw-total");
      return res.data.total;
    },
  });

  /* ---------------- EARN CALC ---------------- */

  const enriched = useMemo(() => {
    return parcels.map((p) => {
      const sameDistrict = p.senderDistrict === p.receiverDistrict;

      const riderEarned = sameDistrict ? p.totalCost * 0.8 : p.totalCost * 0.3;

      return { ...p, riderEarned };
    });
  }, [parcels]);

  /* ---------------- TOTAL EARN ---------------- */

  const totalEarned = enriched.reduce((sum, p) => sum + p.riderEarned, 0);

  const withdrawn = withdrawData || 0;
  const available = totalEarned - withdrawn;

  /* ---------------- TIME FILTER HELPERS ---------------- */

  const now = new Date();

  const todayEarn = enriched
    .filter((p) => {
      const d = new Date(p.deliveredAt);
      return d.toDateString() === now.toDateString();
    })
    .reduce((s, p) => s + p.riderEarned, 0);

  const weekEarn = enriched
    .filter((p) => {
      const d = new Date(p.deliveredAt);
      const diff = (now - d) / 86400000;
      return diff <= 7;
    })
    .reduce((s, p) => s + p.riderEarned, 0);

  const monthEarn = enriched
    .filter((p) => {
      const d = new Date(p.deliveredAt);
      return d.getMonth() === now.getMonth();
    })
    .reduce((s, p) => s + p.riderEarned, 0);

  const yearEarn = enriched
    .filter((p) => {
      const d = new Date(p.deliveredAt);
      return d.getFullYear() === now.getFullYear();
    })
    .reduce((s, p) => s + p.riderEarned, 0);

  /* ---------------- CASHOUT ---------------- */

  const handleCashout = async () => {
    if (!cashAmount || cashAmount <= 0) return;

    if (cashAmount > available) {
      return Swal.fire("Error", "Not enough balance", "error");
    }

    try {
      await axiosSecure.post("/rider/cashout", {
        amount: Number(cashAmount),
      });

      Swal.fire("Success", "Cashout done", "success");
      setCashAmount("");
      refetch();
    } catch {
      Swal.fire("Error", "Cashout failed", "error");
    }
  };

  /* ---------------- LOADING ---------------- */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">Completed Deliveries</h2>

      {/* CARDS */}

      <div className="grid md:grid-cols-3 gap-4 ">
        <Card title="Total Earned" value={totalEarned} color="green" />
        <Card title="Available" value={available} color="orange" />
        <Card title="Withdrawn" value={withdrawn} color="red" />
      </div>

      {/* TIME STATS */}

      <div className="grid md:grid-cols-4 gap-4">
        <Mini title="Today" v={todayEarn} />
        <Mini title="This Week" v={weekEarn} />
        <Mini title="This Month" v={monthEarn} />
        <Mini title="This Year" v={yearEarn} />
      </div>

      {/* CASHOUT */}

      <div className="flex gap-3">
        <input
          value={cashAmount}
          onChange={(e) => setCashAmount(e.target.value)}
          type="number"
          className="input input-bordered"
          placeholder="Amount"
        />
        <button onClick={handleCashout} className="btn btn-success">
          Cashout
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
              <th>Picked</th>
              <th>Delivered</th>
              <th>Parcel Cost</th>
              <th>Rider Earned</th>
            </tr>
          </thead>

          <tbody>
            {enriched.map((p, i) => (
              <tr key={p._id}>
                <td>{i + 1}</td>
                <td>{p.trackingId}</td>
                <td>{p.senderName}</td>
                <td>{p.receiverName}</td>
                <td>Delivered</td>
                <td>{new Date(p.pickedAt).toLocaleString()}</td>
                <td>{new Date(p.deliveredAt).toLocaleString()}</td>
                <td>৳{p.totalCost}</td>
                <td className="text-green-600 font-bold">
                  ৳{p.riderEarned.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------- small ui ---------- */

const Card = ({ title, value, color }) => (
  <div className="bg-white shadow rounded-xl p-5 text-center">
    <p className="font-semibold">{title}</p>
    <p className={`text-2xl font-bold text-${color}-600`}>
      ৳{value.toFixed(2)}
    </p>
  </div>
);

const Mini = ({ title, v }) => (
  <div className="bg-base-200 p-3 rounded-lg text-center">
    <p>{title}</p>
    <p className="font-bold">৳{v.toFixed(2)}</p>
  </div>
);

export default CompletedDeliveries;
