import { getTotalPrice } from "../query/app.js";

export const totalPrice = (req, res) => {
  const {
    zone,
    organization_id,
    total_distance: totalDistance,
    item_type: itemType,
  } = req.headers;

  if (!zone || !organization_id || !totalDistance || !itemType) {
    res.json({ error: "Required values are not present in the header" });
    return;
  }

  (async () => {
    const {
      base_distance_in_km: baseDistance,
      fix_price: fixPrice,
      km_price: kmPrice,
    } = await getTotalPrice(zone, organization_id);

    let totalPrice = fixPrice;

    if (totalDistance > baseDistance) {
      const extraDistance = totalDistance - baseDistance;
      const extra = kmPrice.split("/");

      if (itemType === "perishable") {
        totalPrice += extraDistance * extra[0];
      } else {
        totalPrice += extraDistance * extra[1];
      }
    }

    res.json({ total_price: totalPrice });
  })();
};
