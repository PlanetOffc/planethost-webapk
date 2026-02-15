export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Masukkan parameter url file"
    });
  }

  try {
    // kirim ke API Catbox
    const form = new FormData();
    form.append("reqtype", "urlupload");
    form.append("url", url);

    const response = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: form
    });

    const text = await response.text();

    // jika gagal biasanya Catbox kirim error text
    if (!text.startsWith("https://")) {
      return res.status(500).json({
        status: false,
        message: text
      });
    }

    res.status(200).json({
      status: true,
      creator: "PlanetOffc",
      result: {
        original: url,
        catbox: text
      }
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Upload gagal",
      error: err.message
    });
  }
}
