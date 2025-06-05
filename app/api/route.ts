import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Extract input data from the request body
  const {
    liveCages,
    liveTraps,
    baitStations,
    travelCosts,
    avgServiceTime,
    technicianCost,
    others,
    constants,
  } = data;

  // Perform calculations
  const allTravelCosts = travelCosts.numberOfTrips * travelCosts.costOfOneTrip;

  const hoursSpentByTechnicians =
    ((liveTraps.countOfTraps +
      baitStations.countOfTraps +
      liveCages.countOfTraps) *
      avgServiceTime) /
    60;

  const costOfOnTheGo =
    (technicianCost.cost *
      travelCosts.timeOfTrip *
      technicianCost.numberOfTechnicians *
      travelCosts.numberOfTrips) /
    60;

  const costOfOperating =
    hoursSpentByTechnicians *
    technicianCost.cost *
    technicianCost.numberOfTechnicians *
    travelCosts.numberOfTrips;

  const summary = costOfOnTheGo + costOfOperating;
  const summaryWithOwl = costOfOnTheGo + costOfOperating * avgServiceTime * 0.9;

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

  const profitHours =
    Number(totalHandlingTime.documentationHandlingTime) -
    Number(totalHandlingTime.employeesSupervisionWithOwl) +
    Number(totalHandlingTime.employeesSupervision) -
    Number(totalHandlingTime.timeOfServicingAllTrapsTimeWithOwl) +
    Number(totalHandlingTime.timeOfServicingAllTrapsTime) -
    Number(totalHandlingTime.routePlanningTimeWithOwl) +
    Number(totalHandlingTime.routePlanningTime) -
    Number(totalHandlingTime.documentationHandlingTimeWithOwl);

  const extraProfitWithOwlSentry =
    Number(summary) -
    Number(summaryWithOwl) +
    (Number(constants.higherPriceForBetterService) +
      Number(constants.lowerRisk1) +
      Number(constants.lowerRisk2) +
      Number(constants.lowerRisk3) +
      Number(constants.earlierDetection)) *
      (liveCages.numberOfTrips +
        liveTraps.numberOfTrips +
        baitStations.numberOfTrips);

  // Send back the calculated results
  NextResponse.json({
    allTravelCosts,
    technicianCost: {
      costOfOnTheGo: costOfOnTheGo.toFixed(2),
      costOfOperating: costOfOperating.toFixed(2),
      summary: summary.toFixed(2),
      summaryWithOwl: summaryWithOwl.toFixed(2),
    },
    totalHandlingTime,
    profitOfHours: profitHours,
    profit: {
      extraProfitWithOwlSentry,
    },
  });
}
