import React from "react";
import { useLoaderData } from "react-router";
import ServiceAreaMap from "./ServiceAreaMap";

const CoveragePage = () => {
  const serviceCenters = useLoaderData();

  return (
    <section className="container mx-auto lg:px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold md:font-extrabold  mb-6">
        We are available in <span className="text-cyan-600">64 districts</span>
      </h2>

      <ServiceAreaMap serviceCenters={serviceCenters} />
    </section>
  );
};

export default CoveragePage;
