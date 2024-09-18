// src/utils/assignClosestCenter.js
import { calculateDistance } from "./calculateDistance";

// This function assigns the closest therapy center to a client based on coordinates
export const assignClosestTherapyCenter = (client, therapyCenters) => {
  let closestCenter = null;
  let minDistance = Infinity;

  therapyCenters.forEach((center) => {
    // Calculate distance between the client and each therapy center
    const distance = calculateDistance(client.coords.lat, client.coords.lng, center.coords.lat, center.coords.lng);

    if (distance < minDistance) {
      minDistance = distance;
      closestCenter = center;
    }
  });

  return closestCenter; // Return the closest therapy center object
};
