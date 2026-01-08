const products = require("./_data/products");

module.exports = (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { id, category } = req.query || {};

  if (id) {
    const item = products.find((p) => String(p.id) === String(id));
    if (!item) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(item);
    return;
  }

  if (category) {
    res.status(200).json(products.filter((p) => p.category === category));
    return;
  }

  res.status(200).json(products);
};
