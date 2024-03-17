import { getTotalPrice } from "../query/app.js";

export const totalPrice = (req, res) => {
  const {
    zone,
    organization_id,
    total_distance: totalDistance,
    item_type: itemType,
  } = req.headers;

  (async () => {
    const data = await getTotalPrice(zone, organization_id);

    if (!data) {
      res.json({ error: "Required values are not present in the header" });
      return;
    }

    const {
      base_distance_in_km: baseDistance,
      fix_price: fixPrice,
      km_price: kmPrice,
    } = data;

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
