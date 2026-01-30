import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

function FlyTo({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 11, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
}

const ServiceAreaMap = ({ serviceCenters }) => {
  const [search, setSearch] = useState("");
  const [targetPosition, setTargetPosition] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const match = serviceCenters.find((item) =>
      item.covered_area.some((area) =>
        area.toLowerCase().includes(value.toLowerCase()),
      ),
    );

    if (match) {
      setTargetPosition([match.latitude, match.longitude]);
    }
  };

  return (
    <div className="w-full">
      {/* 🔍 Search Bar */}
      <div className="max-w-md  mb-4">
        <input
          type="text"
          placeholder="Search your area (e.g. Uttara, Kotwali)"
          className="input input-bordered input-info w-full bg-[#CBD5E1]"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* 🗺️ Map */}
      <div className="relative z-0">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={9}
          scrollWheelZoom={false}
          className="h-[500px] w-full rounded-xl"
          z-0
          relative
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FlyTo position={targetPosition} />

          {serviceCenters.map((item, index) => (
            <Marker key={index} position={[item.latitude, item.longitude]}>
              <Popup>
                <div className="space-y-1">
                  <h3 className="font-bold text-cyan-600">{item.district}</h3>
                  <p>
                    <strong>Region:</strong> {item.region}
                  </p>
                  <p className="text-sm">
                    <strong>Coverage:</strong> {item.covered_area.join(", ")}
                  </p>
                  <span className="badge badge-success badge-sm">Active</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceAreaMap;
