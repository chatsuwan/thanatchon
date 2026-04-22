export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxqyCodTjOsew3hrpI7uM5PHPhDZRw3_nv_nPdJ_jde9PuNliFhVwgz_3PJxyFnhIExPQ/exec";

  try {
    if (req.method === "GET") {
      const response = await fetch(GAS_URL);

      const text = await response.text();

      // ⭐ กันพังตรงนี้
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        return res.status(500).json({
          error: "Google Script ไม่ได้ส่ง JSON",
          raw: text
        });
      }

      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      await fetch(GAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      return res.status(200).json({ status: "saved" });
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
