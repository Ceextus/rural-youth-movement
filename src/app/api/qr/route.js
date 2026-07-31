// Same-origin QR proxy. Fetching the QR through our own domain means the
// membership-card <img> is same-origin, so it won't taint the canvas when the
// card is exported to PNG for download.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");
  if (!data) {
    return new Response("Missing data", { status: 400 });
  }

  const upstream = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=0&color=005f2c&bgcolor=ffffff&data=${encodeURIComponent(
    data
  )}`;

  try {
    const res = await fetch(upstream, { cache: "no-store" });
    if (!res.ok) throw new Error(`QR upstream ${res.status}`);
    const buf = await res.arrayBuffer();
    return new Response(buf, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("QR unavailable", { status: 502 });
  }
}
