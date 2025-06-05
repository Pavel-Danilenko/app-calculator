"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const isFirstRender = useRef(true);
  const [currentSection, setCurrentSection] = useState("calculator");
  const [liveCages, setLiveCages] = useState({
    countOfTraps: 10, // input
    cost: 0.5, // input
    numberOfCatches: 5, // input
    numberOfTrips: 15, // input
  });

  const [liveTraps, setLiveTraps] = useState({
    countOfTraps: 10, // input
    cost: 0.5, // input
    numberOfCatches: 30, // input
    numberOfTrips: 7, // input
  });

  const [baitStations, setBaitStations] = useState({
    countOfTraps: 0, // input
    cost: 0.5, // input
    numberOfCatches: 80, // input
    numberOfTrips: 2, // input
  });

  const [travelCosts, setTravelCosts] = useState({
    timeOfTrip: 30, // input
    numberOfTrips: 1, // input
    costOfOneTrip: 20.0, // input
    allTravelCosts: 0, // output
  });

  const [avgServiceTime, setAvgServiceTime] = useState(1.0);

  const [technicianCost, setTechnicianCost] = useState({
    numberOfTechinicians: 2, // input
    cost: 20.0, // input
    costOfOnTheGo: 0, // output
    costOfOperating: 0, // output
    summary: 0, // output
    summaryWithOwl: 0, // output
  });

  const [totalHandlingTimeOfAllTraps, setTotalHandlingTimeOfAllTraps] =
    useState({
      timeOfServicingAllTrapsTime: 0, // output
      routePlanningTime: 0, // output
      documentationHandlingTime: 0, // output
      employeesSupervision: 0, // output
      timeOfServicingAllTrapsTimeWithOwl: 0, // output
      routePlanningTimeWithOwl: 0, // output
      documentationHandlingTimeWithOwl: 0, // output
      employeesSupervisionWithOwl: 0, // output
    });

  const [profitOfHours, setProfitOfHours] = useState(0); // output

  const [others, setOthers] = useState({
    avgTechnicianOtherProfit: 100.0, // input
  });

  const [profit, setProfit] = useState({
    extraProfitWithOwlSentry: 0, // output
  });

  const [constants, setConstants] = useState({
    higherPriceForBetterService: 1.0, // input
    lowerRisk1: 0.05, // input
    lowerRisk2: 0.05, // input
    lowerRisk3: 0.05, // input
    earlierDetection: 2.0, // input
  });
  // Load data from localStorage on the client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLiveCages = JSON.parse(localStorage.getItem("liveCages"));
      const savedLiveTraps = JSON.parse(localStorage.getItem("liveTraps"));
      const savedBaitStations = JSON.parse(
        localStorage.getItem("baitStations")
      );
      const savedTravelCosts = JSON.parse(localStorage.getItem("travelCosts"));
      const savedAvgServiceTime = JSON.parse(
        localStorage.getItem("avgServiceTime")
      );
      const savedTechnicianCost = JSON.parse(
        localStorage.getItem("technicianCost")
      );
      const savedConstants = JSON.parse(localStorage.getItem("constants"));
      const savedCurrentSection = JSON.parse(
        localStorage.getItem("currentSection")
      );
      const savedOthers = JSON.parse(localStorage.getItem("others"));

      if (savedLiveCages) setLiveCages(savedLiveCages);
      if (savedLiveTraps) setLiveTraps(savedLiveTraps);
      if (savedBaitStations) setBaitStations(savedBaitStations);
      if (savedTravelCosts) setTravelCosts(savedTravelCosts);
      if (savedAvgServiceTime) setAvgServiceTime(savedAvgServiceTime);
      if (savedTechnicianCost) setTechnicianCost(savedTechnicianCost);
      if (savedConstants) setConstants(savedConstants);
      if (savedOthers) setOthers(savedOthers);
      if (savedCurrentSection) setCurrentSection(savedCurrentSection);
    }
  }, []);

  // Save data to localStorage on every state change
  useEffect(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("liveCages", JSON.stringify(liveCages));
        localStorage.setItem("liveTraps", JSON.stringify(liveTraps));
        localStorage.setItem("baitStations", JSON.stringify(baitStations));
        localStorage.setItem("travelCosts", JSON.stringify(travelCosts));
        localStorage.setItem("avgServiceTime", JSON.stringify(avgServiceTime));
        localStorage.setItem("technicianCost", JSON.stringify(technicianCost));
        localStorage.setItem("constants", JSON.stringify(constants));
        localStorage.setItem("others", JSON.stringify(others));
        localStorage.setItem("currentSection", JSON.stringify(currentSection));
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      liveCages.countOfTraps,
      liveCages.cost,
      liveCages.numberOfCatches,
      liveTraps.countOfTraps,
      liveTraps.cost,
      liveTraps.numberOfCatches,
      baitStations.countOfTraps,
      baitStations.cost,
      baitStations.numberOfCatches,
      travelCosts.timeOfTrip,
      travelCosts.numberOfTrips,
      travelCosts.costOfOneTrip,
      avgServiceTime,
      technicianCost.numberOfTechinicians,
      technicianCost.cost,
      others.avgTechnicianOtherProfit,
      currentSection,
    ]
  );

  const calculateAll = () => {
    const allTravelCosts =
      travelCosts.numberOfTrips * travelCosts.costOfOneTrip;
    setTravelCosts((prevCosts) => ({
      ...prevCosts,
      allTravelCosts,
    }));

    const hoursSpentByTechnicians =
      ((liveTraps.countOfTraps +
        baitStations.countOfTraps +
        liveCages.countOfTraps) *
        avgServiceTime) /
      60;

    const costOfOnTheGo =
      (technicianCost.cost *
        travelCosts.timeOfTrip *
        technicianCost.numberOfTechinicians *
        travelCosts.numberOfTrips) /
      60;

    const costOfOperating =
      hoursSpentByTechnicians *
      technicianCost.cost *
      technicianCost.numberOfTechinicians *
      travelCosts.numberOfTrips;

    setTechnicianCost((prevCosts) => ({
      ...prevCosts,
      costOfOnTheGo: costOfOnTheGo.toFixed(2),
      costOfOperating: costOfOperating.toFixed(2),
      summary: (costOfOnTheGo + costOfOperating).toFixed(2),
      summaryWithOwl: (
        costOfOnTheGo +
        costOfOperating * avgServiceTime * 0.9
      ).toFixed(2),
    }));

    const totalHandlingTime = {
      timeOfServicingAllTrapsTime: (
        ((liveCages.countOfTraps +
          liveTraps.countOfTraps +
          baitStations.countOfTraps) *
          travelCosts.numberOfTrips *
          avgServiceTime) /
        60
      ).toFixed(2),

      routePlanningTime: (
        ((liveCages.countOfTraps +
          liveTraps.countOfTraps +
          baitStations.countOfTraps) *
          travelCosts.numberOfTrips *
          avgServiceTime) /
        60
      ).toFixed(2),

      documentationHandlingTime: (
        (((liveCages.countOfTraps +
          liveTraps.countOfTraps +
          baitStations.countOfTraps) *
          travelCosts.numberOfTrips *
          avgServiceTime) /
          60) *
        0.5
      ).toFixed(2),

      employeesSupervision: (
        (((liveCages.countOfTraps +
          liveTraps.countOfTraps +
          baitStations.countOfTraps) *
          travelCosts.numberOfTrips *
          avgServiceTime) /
          60) *
        0.5
      ).toFixed(2),

      // With Owl Sentry system
      timeOfServicingAllTrapsTimeWithOwl: (
        ((liveCages.countOfTraps * liveCages.numberOfCatches +
          liveTraps.countOfTraps * liveTraps.numberOfCatches +
          baitStations.countOfTraps * baitStations.numberOfCatches) *
          travelCosts.numberOfTrips *
          (avgServiceTime * 0.9)) /
        60
      ).toFixed(2),

      routePlanningTimeWithOwl: (
        (((liveCages.countOfTraps * liveCages.numberOfCatches +
          liveTraps.countOfTraps * liveTraps.numberOfCatches +
          baitStations.countOfTraps * baitStations.numberOfCatches) *
          avgServiceTime *
          0.9 *
          travelCosts.numberOfTrips) /
          60) *
        0.5
      ).toFixed(2),

      documentationHandlingTimeWithOwl: (
        (((liveCages.countOfTraps * liveCages.numberOfCatches +
          liveTraps.countOfTraps * liveTraps.numberOfCatches +
          baitStations.countOfTraps * baitStations.numberOfCatches) *
          travelCosts.numberOfTrips *
          avgServiceTime *
          0.9) /
          60) *
        0.5
      ).toFixed(2),

      employeesSupervisionWithOwl: (
        (((liveCages.countOfTraps * liveCages.numberOfCatches +
          liveTraps.countOfTraps * liveTraps.numberOfCatches +
          baitStations.countOfTraps * baitStations.numberOfCatches) *
          travelCosts.numberOfTrips) /
          60) *
        avgServiceTime *
        0.9 *
        0.5
      ).toFixed(2),
    };

    setTotalHandlingTimeOfAllTraps(totalHandlingTime);

    const profitHours =
      Number(totalHandlingTime.documentationHandlingTime) -
      Number(totalHandlingTime.employeesSupervisionWithOwl) +
      Number(totalHandlingTime.employeesSupervision) -
      Number(totalHandlingTime.timeOfServicingAllTrapsTimeWithOwl) +
      Number(totalHandlingTime.timeOfServicingAllTrapsTime) -
      Number(totalHandlingTime.routePlanningTimeWithOwl) +
      Number(totalHandlingTime.routePlanningTime) -
      Number(totalHandlingTime.documentationHandlingTimeWithOwl);

    setProfitOfHours(profitHours);
  };

  useEffect(() => {
    // Calculate the maximum number of trips
    const maxTrips = Math.max(
      liveCages.numberOfTrips,
      liveTraps.numberOfTrips,
      baitStations.numberOfTrips,
      travelCosts.numberOfTrips
    );

    // If the maxTrips is greater than travelCosts.numberOfTrips, update travelCosts
    if (maxTrips > travelCosts.numberOfTrips) {
      // Assuming you have a way to update travelCosts, e.g., through a setter function
      setTravelCosts((prev) => ({
        ...prev,
        numberOfTrips: maxTrips,
      }));
    }
    console.log("pozdro");
  }, [
    liveCages.numberOfTrips,
    liveTraps.numberOfTrips,
    baitStations.numberOfTrips,
    travelCosts.numberOfTrips,
  ]);

  useEffect(() => {
    setProfit({
      extraProfitWithOwlSentry:
        // profitOfHours * others.avgTechnicianOtherProfit +
        Number(technicianCost.summary) -
        Number(technicianCost.summaryWithOwl) +
        (Number(constants.higherPriceForBetterService) +
          Number(constants.lowerRisk1) +
          Number(constants.lowerRisk2) +
          Number(constants.lowerRisk3) +
          Number(constants.earlierDetection)) *
          (liveCages.numberOfTrips +
            liveTraps.numberOfTrips +
            baitStations.numberOfTrips),
    });
  }, [
    others.avgTechnicianOtherProfit,
    profitOfHours,
    technicianCost.summary,
    technicianCost.summaryWithOwl,
    constants.lowerRisk1,
    constants.lowerRisk2,
    constants.lowerRisk3,
    constants.higherPriceForBetterService,
    constants.earlierDetection,
    liveCages.numberOfTrips,
    liveTraps.numberOfTrips,
    baitStations.numberOfTrips,
  ]);

  useEffect(() => {
    console.log(travelCosts);
  }, [travelCosts]);
  // Recalculate on specific state changes
  useEffect(() => {
    calculateAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    liveCages.countOfTraps,
    liveCages.cost,
    liveCages.numberOfCatches,
    liveTraps.countOfTraps,
    liveTraps.cost,
    liveTraps.numberOfCatches,
    baitStations.countOfTraps,
    baitStations.cost,
    baitStations.numberOfCatches,
    travelCosts.timeOfTrip,
    travelCosts.numberOfTrips,
    travelCosts.costOfOneTrip,
    avgServiceTime,
    technicianCost.numberOfTechinicians,
    technicianCost.cost,
    others.avgTechnicianOtherProfit,
  ]);

  const handleInputChange =
    (setter, maxValue = 10000) =>
    (e) => {
      const value = Math.max(0, Math.min(maxValue, e.target.value)); // Restrict value between 0 and maxValue
      setter(value);
    };

  return (
    <div className="mt-32">
      <div className="max-w-7xl mx-auto p-8 mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          How to triple your profits with Owl Sentry
        </h1>
        <div className="mb-10">
          <p>
            This calculator is designed to give you a rough estimate of how much
            your <strong>profit</strong> could increase by using the{" "}
            <strong>Owl Sentry </strong>
            system for pest control. Input your current setup details, and
            you&apos;ll get an estimated <strong>monthly profit boost</strong>.
            Keep in mind, this is just an estimate, and your inputs should be
            treated the same way. It&apos;s meant for whole company or a single
            client setup—like <strong>one warehouse </strong> use it as a
            directional tool, not a precise prediction.
          </p>
          <br />
          <p>
            We store this data for telemetry and error handling purposes. Other
            users do not have access to the provided information. The data is
            saved on your client and is accessible through the local storage of
            your browser, and sent to us anonymously for telemetry and error
            handling.
          </p>
          <br />
          <p>
            <b>Note:</b> This is only <b>ESTIMATION</b>.
          </p>
        </div>
        {currentSection == "calculator" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-6">
              {/* Live Cages */}
              <div className="mb-32">
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
                    value={liveCages.countOfTraps}
                    onChange={handleInputChange((value) =>
                      setLiveCages({ ...liveCages, countOfTraps: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the number of wild life removal in use.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Percentage of Catches per visit
                  </label>

                  <input
                    type="number"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={liveCages.numberOfCatches}
                    onChange={handleInputChange(
                      (value) =>
                        setLiveCages({ ...liveCages, numberOfCatches: value }),
                      100
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the catch rate for your wild live removal as a
                    percentage. The value should be between 0 and 100.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Required Number of Trips per month
                  </label>

                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={liveCages.numberOfTrips}
                    onChange={handleInputChange((value) =>
                      setLiveCages({ ...liveCages, numberOfTrips: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the required number of trips to this kind of traps.
                  </p>
                </div>
              </div>

              {/* Live Traps */}
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Live Traps and Snap Traps
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Traps
                  </label>

                  <input
                    type="number"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={liveTraps.countOfTraps}
                    onChange={handleInputChange((value) =>
                      setLiveTraps({ ...liveTraps, countOfTraps: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the number of live traps in use.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Catches (%)
                  </label>

                  <input
                    type="number"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={liveTraps.numberOfCatches}
                    onChange={handleInputChange(
                      (value) =>
                        setLiveTraps({ ...liveTraps, numberOfCatches: value }),
                      100
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the catch rate for your live traps as a percentage.
                    The value should be between 0 and 100.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Required Number of Trips
                  </label>

                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={liveTraps.numberOfTrips}
                    onChange={handleInputChange((value) =>
                      setLiveTraps({ ...liveTraps, numberOfTrips: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the required number of trips to this kind of traps.
                  </p>
                </div>
              </div>

              {/* bait stations */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Bait Stations</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Traps
                  </label>

                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={baitStations.countOfTraps}
                    onChange={handleInputChange((value) =>
                      setBaitStations({
                        ...baitStations,
                        countOfTraps: value,
                      })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the number of bait stations in use.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Catches (%)
                  </label>

                  <input
                    type="number"
                    step="1"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={baitStations.numberOfCatches}
                    onChange={handleInputChange(
                      (value) =>
                        setBaitStations({
                          ...baitStations,
                          numberOfCatches: value,
                        }),
                      100
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the catch rate for your bait stations as a percentage.
                    The value should be between 0 and 100.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Required Number of Trips
                  </label>

                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={baitStations.numberOfTrips}
                    onChange={handleInputChange((value) =>
                      setBaitStations({ ...baitStations, numberOfTrips: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the required number of trips to this kind of traps.
                  </p>
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
                    value={travelCosts.timeOfTrip}
                    onChange={handleInputChange((value) =>
                      setTravelCosts({ ...travelCosts, timeOfTrip: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the average time it takes to complete one trip to
                    check traps, in minutes.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Number of Trips
                  </label>

                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={travelCosts.numberOfTrips}
                    onChange={handleInputChange((value) =>
                      setTravelCosts({
                        ...travelCosts,
                        numberOfTrips: value,
                      })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the number of trips made per month to check and
                    service traps. The number of trips must be at least equal to
                    the required number of trips for each type of trap.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Cost of One Trip ($)
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={travelCosts.costOfOneTrip}
                    onChange={handleInputChange((value) =>
                      setTravelCosts({
                        ...travelCosts,
                        costOfOneTrip: value,
                      })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the cost of one trip (excluding technician wages),
                    such as fuel and vehicle depreciation.
                  </p>
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
                    value={technicianCost.numberOfTechinicians}
                    onChange={handleInputChange((value) =>
                      setTechnicianCost({
                        ...technicianCost,
                        numberOfTechinicians: value,
                      })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the number of technicians assigned to each trip.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Cost per Hour ($)
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={technicianCost.cost}
                    onChange={handleInputChange((value) =>
                      setTechnicianCost({ ...technicianCost, cost: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the hourly wage cost per technician.
                  </p>
                </div>
              </div>

              {/* Others */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Other Parameters</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Average Technician Other Profit ($)
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={others.avgTechnicianOtherProfit}
                    onChange={handleInputChange((value) =>
                      setOthers({
                        ...others,
                        avgTechnicianOtherProfit: value,
                      })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the average monthly profit generated by technicians
                    when they are not servicing traps.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Average Service Time of One Trap (min.)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={avgServiceTime}
                    onChange={handleInputChange((value) =>
                      setAvgServiceTime(value)
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the average time taken to service one trap, in
                    minutes.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        {currentSection == "constants" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-6">
              {/* Higher Price For Better Service */}
              <div className="mb-32">
                <h2 className="text-xl font-semibold mb-2">
                  Higher Price For Better Service (in $ per device)
                </h2>
                <div className="mb-4">
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={constants.higherPriceForBetterService}
                    onChange={handleInputChange((value) =>
                      setConstants({
                        ...constants,
                        higherPriceForBetterService: value,
                      })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter estimated profit for your better service.
                  </p>
                </div>
              </div>

              {/* Reduced risk of */}
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Reduced risk of per device (in $ per device):
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Liabilities and damage repair costs if your client closes
                    the facility or damages occur.
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={constants.lowerRisk1}
                    onChange={handleInputChange((value) =>
                      setConstants({ ...constants, lowerRisk1: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the estimated extra profit which you would like to
                    check.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Liability for damages if the client suffers losses, closes
                    the plant, or interrupts production due to late infestation
                    detection
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={constants.lowerRisk2}
                    onChange={handleInputChange((value) =>
                      setConstants({ ...constants, lowerRisk2: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the estimated extra profit which you would like to
                    check.
                  </p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Losing a client due to a late-detected infestation,
                    dishonest employee, or insufficient service quality control
                  </label>

                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={constants.lowerRisk3}
                    onChange={handleInputChange((value) =>
                      setConstants({ ...constants, lowerRisk3: value })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the estimated extra profit which you would like to
                    check.
                  </p>
                </div>
              </div>

              {/* Extra pay for early detection system */}
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Extra pay for early detection system (in $ per device){" "}
                </h2>
                <div className="mb-4">
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={constants.earlierDetection}
                    onChange={handleInputChange((value) =>
                      setConstants({
                        ...constants,
                        earlierDetection: value,
                      })
                    )}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the estimated extra profit which you would like to
                    check.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="w-full flex justify-between">
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
        </div>
        {/* Displaying calculated results */}
        <div className="mt-10 p-4 border-t border-gray-300 sticky bottom-0 bg-white">
          <div className="flex">
            <div className="w-1/2">
              <h2 className="text-2xl font-semibold m-0 mb-4">
                Calculated Results
              </h2>
              <h3 className="font-medium mb-2">
                Est. extra profit with Owl Sentry:
                <br />{" "}
                <strong className="text-2xl underline underline-offset-2">
                  {"  "}${profit.extraProfitWithOwlSentry.toFixed(2)}
                </strong>
                <span className="font-medium mb-2 text-base no-underline">
                  {" "}
                  per month
                </span>
              </h3>
              <h3 className="font-medium">
                <strong className="text-xl underline underline-offset-2">
                  {"  "}$
                  {(
                    profit.extraProfitWithOwlSentry / liveTraps.countOfTraps +
                    liveCages.countOfTraps +
                    baitStations.countOfTraps
                  ).toFixed(2)}
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
