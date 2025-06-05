"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const isFirstRender = useRef(true);
  const [currentSection, setCurrentSection] = useState("calculator");
  const [inputs, setInputs] = useState({
    live_cages: {
      count: 0, // input
      cost: 0.5, // input
      activity: 5, // input
      trips: 10, // input
    },
    wild_life_removal: {
      count: 5, // input
      cost: 0.5, // input
      activity: 30, // input
      trips: 5, // input
    },
    bait_stations: {
      count: 5, // input
      cost: 0.5, // input
      activity: 80, // input
      trips: 1, // input
    },
    travel: {
      cost: 20.0, // input
      time: 30, // input
    },
    technician: {
      count: 2, // input
      cost: 20.0, // input
      avgOtherProfit: 200.0, // input
      trapServiceTime: 1.0, // input
    },
    additional_costs: {
      higherPriceForBetterService: 1.0, // input
      lowerRisk1: 0.05, // input
      lowerRisk2: 0.05, // input
      lowerRisk3: 0.05, // input
      earlierDetection: 1.0, // input
      baitPrice: 1.0, // input
    },
    client: {
      number: 1,
    },
  });

  const owl_sentry_system_costs = {
    monthly_costs: {
      sensor: 1,
      access_point: 15,
    },
  };

  const [outputs, setOutputs] = useState({
    results: {
      profitHours: 0,
      costsWithOwl: 0,
      costsWithoutOwl: 0,
      profit: 0,
    },
  });

  // Computation logic
  useEffect(() => {
    const max_travel_count = Math.max(
      inputs.live_cages.count ? inputs.live_cages.trips : 1,
      inputs.wild_life_removal.count ? inputs.wild_life_removal.trips : 1,
      inputs.bait_stations.count ? inputs.bait_stations.trips : 1
    );

    const totalTraps =
      Number(inputs.live_cages.count) +
      Number(inputs.wild_life_removal.count) +
      Number(inputs.bait_stations.count);

    const serviceTime =
      (totalTraps * Number(inputs.technician.trapServiceTime)) / 60;

    const tempOwl =
      (Number(inputs.live_cages.count) *
        (100 - Number(inputs.live_cages.activity))) /
        100 +
      (Number(inputs.wild_life_removal.count) *
        (100 - Number(inputs.wild_life_removal.activity))) /
        100 +
      (Number(inputs.bait_stations.count) *
        (100 - Number(inputs.bait_stations.activity))) /
        100;

    const servicingAllTrapsTime =
      (totalTraps *
        Number(max_travel_count) *
        Number(inputs.technician.trapServiceTime)) /
      60;

    const routePlanningTime = servicingAllTrapsTime;
    const documentationHandlingTime = servicingAllTrapsTime * 0.5;
    const employeesSupervision = (totalTraps / 60) * 0.5;

    const servicingAllTrapsTimeWithOwl =
      (tempOwl *
        Number(max_travel_count) *
        (Number(inputs.technician.trapServiceTime) * 0.9)) /
      60;

    const routePlanningTimeWithOwl = servicingAllTrapsTimeWithOwl * 0.5;
    const documentationHandlingTimeWithOwl = servicingAllTrapsTimeWithOwl * 0.5;
    const employeesSupervisionWithOwl = (tempOwl / 60) * 0.5;

    const time =
      servicingAllTrapsTime +
      routePlanningTime +
      documentationHandlingTime +
      employeesSupervision;

    const timeWithOwl =
      servicingAllTrapsTimeWithOwl +
      routePlanningTimeWithOwl +
      documentationHandlingTimeWithOwl +
      employeesSupervisionWithOwl;

    const extraCostsWithOwl =
      totalTraps * owl_sentry_system_costs.monthly_costs.sensor;

    const accessPointsCosts =
      Number(inputs.client.number) *
      owl_sentry_system_costs.monthly_costs.access_point;

    const profitHours = time - timeWithOwl;

    const maxActivityPercent =
      Math.max(
        inputs.bait_stations.count ? inputs.bait_stations.activity : 0,
        inputs.wild_life_removal.count ? inputs.wild_life_removal.activity : 0,
        inputs.live_cages.count ? inputs.live_cages.activity : 0
      ) / 100;

    const costOfOnTheGo =
      (Number(inputs.technician.cost) *
        Number(inputs.travel.time) *
        Number(inputs.technician.count) *
        Number(max_travel_count)) /
      60;

    const costOfOnTheGoWithOwl = costOfOnTheGo * maxActivityPercent;

    const costOfOperating =
      Number(inputs.technician.cost) *
      serviceTime *
      Number(inputs.technician.count) *
      Number(max_travel_count) *
      maxActivityPercent;

    const costOfOperatingWithOwl = costOfOperating * maxActivityPercent;

    const costsOfOwl =
      (time - timeWithOwl) *
        Number(inputs.technician.cost) *
        Number(inputs.technician.count) +
      extraCostsWithOwl +
      accessPointsCosts +
      costOfOperatingWithOwl +
      costOfOnTheGoWithOwl;

    let costsWithoutOwl =
      ((time * Number(inputs.technician.avgOtherProfit)) / 10) *
        Number(inputs.technician.count) +
      totalTraps *
        (Number(inputs.additional_costs.higherPriceForBetterService) +
          Number(inputs.additional_costs.lowerRisk1) +
          Number(inputs.additional_costs.lowerRisk2) +
          Number(inputs.additional_costs.lowerRisk3) +
          Number(inputs.additional_costs.earlierDetection)) +
      ((Number(inputs.additional_costs.baitPrice) *
        Number(inputs.bait_stations.activity)) /
        100) *
        Number(inputs.bait_stations.count) +
      costOfOperating +
      costOfOnTheGo;

    const money = totalTraps == 0 ? 0 : costsWithoutOwl - costsOfOwl;

    setOutputs((prevOutput) => ({
      ...prevOutput,
      results: {
        profitHours: profitHours,
        costsWithOwl: costsOfOwl,
        costsWithoutOwl: costsWithoutOwl,
        profit: money,
      },
    }));
  }, [inputs]);

  // Input change handler for nested state
  const handleInputChange = (category, field) => (e) => {
    const value = Number(e.target.value);
    setInputs((prevInputs) => ({
      ...prevInputs,
      [category]: {
        ...prevInputs[category],
        [field]: value,
      },
    }));
  };

  // Calculate total devices and profit per device
  const totalDevices =
    Number(inputs.live_cages.count) +
    Number(inputs.wild_life_removal.count) +
    Number(inputs.bait_stations.count);

  const profitPerDevice = totalDevices
    ? outputs.results.profit / totalDevices
    : 0;

  return (
    <div className="mt-32">
      <div className="max-w-7xl mx-auto p-8 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          How to triple your profits with Owl Sentry
        </h1>
        <div className="mb-10">
          <p>
            Unlock the full potential of your pest control business with Owl
            Sentry smart devices. Our innovative system isn’t just a tool—it’s a
            game-changer designed to significantly boost your bottom line.
            <br />
            <br />
            <strong>Discover How Much More You Can Earn</strong>
            <br />
            Use our profit calculator to see how integrating Owl Sentry into
            your traps can potentially triple your profits. Simply input your
            current setup details, and get an estimate of the monthly profit
            increase you could achieve. Remember, this estimate is a valuable
            directional tool, meant to provide you with a rough idea of the
            financial benefits you could see, whether for your entire company or
            a specific client setup, such as a single warehouse.
            <br />
            <br />
            <strong>Confidential and Secure</strong>
            <br />
            Your data is secure with us. We store information solely for
            telemetry and error handling purposes. Rest assured, your data
            remains confidential, saved locally on your browser, and transmitted
            anonymously. No other users will have access to your details.
            <br />
            <br />
            While this calculator offers a strong indication of potential profit
            increases, it&apos;s important to view the results as estimates
            rather than precise predictions. Use these insights to guide your
            decision-making and explore the transformative impact Owl Sentry can
            have on your business.
          </p>
          <br />
          <p>
            <b>Note:</b> This is only an <b>ESTIMATION</b>.
          </p>
        </div>

        {currentSection === "calculator" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-6">
              {/* Live Cages */}
              <div className="mb-32">
                <h2 className="text-xl font-semibold mb-2">Live Cages</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Traps
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.live_cages.count}
                    onChange={handleInputChange("live_cages", "count")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Percentage of Catches per Visit (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.live_cages.activity}
                    onChange={handleInputChange("live_cages", "activity")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Current Number of Visits per Month
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.live_cages.trips}
                    onChange={handleInputChange("live_cages", "trips")}
                  />
                </div>
              </div>

              {/* Wild Life Removal */}
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Wild Life Removal
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Traps
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.wild_life_removal.count}
                    onChange={handleInputChange("wild_life_removal", "count")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Percentage of Catches per Visit (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.wild_life_removal.activity}
                    onChange={handleInputChange(
                      "wild_life_removal",
                      "activity"
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Current Number of Visits per Month
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.wild_life_removal.trips}
                    onChange={handleInputChange("wild_life_removal", "trips")}
                  />
                </div>
              </div>

              {/* Bait Stations */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Bait Stations</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Traps
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.bait_stations.count}
                    onChange={handleInputChange("bait_stations", "count")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Percentage of Catches per Visit (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.bait_stations.activity}
                    onChange={handleInputChange("bait_stations", "activity")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Current Number of Visits per Month
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.bait_stations.trips}
                    onChange={handleInputChange("bait_stations", "trips")}
                  />
                </div>
              </div>

              {/* Travel Costs */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Travel Costs</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Time of Trip (minutes)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.travel.time}
                    onChange={handleInputChange("travel", "time")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Cost of One Trip ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.travel.cost}
                    onChange={handleInputChange("travel", "cost")}
                  />
                </div>
              </div>

              {/* Technician Cost */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Technician Cost</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Technicians
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.technician.count}
                    onChange={handleInputChange("technician", "count")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Cost per Hour ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.technician.cost}
                    onChange={handleInputChange("technician", "cost")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Average Other Profit pr Hour ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.technician.avgOtherProfit}
                    onChange={handleInputChange("technician", "avgOtherProfit")}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Average Service Time per Trap (minutes)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.technician.trapServiceTime}
                    onChange={handleInputChange(
                      "technician",
                      "trapServiceTime"
                    )}
                  />
                </div>
              </div>

              {/* Additional Costs */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Additional Costs</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Higher Price for Better Service ($ per device)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.additional_costs.higherPriceForBetterService}
                    onChange={handleInputChange(
                      "additional_costs",
                      "higherPriceForBetterService"
                    )}
                  />
                </div>
                {/* Lower Risks */}
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Reduced Risk ($ per device)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.additional_costs.lowerRisk1}
                    onChange={handleInputChange(
                      "additional_costs",
                      "lowerRisk1"
                    )}
                  />
                </div> */}
                {/* Early Detection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Extra Pay for Early Detection ($ per device)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.additional_costs.earlierDetection}
                    onChange={handleInputChange(
                      "additional_costs",
                      "earlierDetection"
                    )}
                  />
                </div>
                {/* Bait Price */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Bait Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={inputs.additional_costs.baitPrice}
                    onChange={handleInputChange(
                      "additional_costs",
                      "baitPrice"
                    )}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        {/* <div className="w-full flex justify-between">
          <button
            onClick={() => setCurrentSection("calculator")}
            className={`mt-4 px-4 py-2 rounded ${
              currentSection === "calculator"
                ? "opacity-50"
                : "bg-[#1B1464] text-white"
            }`}
            disabled={currentSection === "calculator"}
          >
            {"<"} Previous Section
          </button>
          <button
            onClick={() => setCurrentSection("constants")}
            className={`mt-4 px-4 py-2 rounded ${
              currentSection === "constants"
                ? "opacity-50"
                : "bg-[#1B1464] text-white"
            }`}
            disabled={currentSection === "constants"}
          >
            Next Section {">"}
          </button>
        </div> */}

        {/* Displaying Calculated Results */}
        <div className="mt-10 p-4 border-t border-gray-300 sticky bottom-0 bg-white">
          <div className="flex">
            <div className="w-1/2">
              <h2 className="text-2xl font-semibold m-0 mb-4">
                Calculated Results
              </h2>
              <h3 className="font-medium mb-2">
                Est. extra profit with Owl Sentry:
                <br />
                <strong className="text-2xl underline underline-offset-2">
                  {"  "}${outputs.results.profit.toFixed(2)}
                </strong>
                <span className="font-medium mb-2 text-base no-underline">
                  {" "}
                  per month
                </span>
              </h3>
              <h3 className="font-medium">
                <strong className="text-xl underline underline-offset-2">
                  {"  "}${profitPerDevice.toFixed(2)}
                </strong>{" "}
                per <strong>device</strong> per month
              </h3>
            </div>
            <div className="flex flex-col align-center justify-center w-1/2">
              <h2 className="text-gray-500 text-sm">
                Did we spark your curiosity?
              </h2>
              <a
                className="lg:flex border border-1 items-center justify-center border-[#1B1464] text-[#1B1464] px-2 mr-2 py-1 rounded-md shadow lg:px-4 lg:py-2 text-sm lg:text-base hover:bg-gray-100"
                href="https://store.owlsentry.com/form/eu"
              >
                <div className="lg:text-lg flex gap-1 items-center justify-center">
                  <span className="">GET IN TOUCH</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
