async function testRoute(route) {
  const url = `http://localhost:3000${route}`;
  try {
    const res = await fetch(url, { method: "GET", redirect: "manual" });
    const status = res.status;
    let info = "";
    if (status >= 300 && status < 400) {
      info = `→ ${res.headers.get("location")}`;
    } else if (status === 200) {
      const text = await res.text();
      const hasError = text.includes("Application Error") || text.includes("حدث خطأ");
      info = hasError ? "⚠️  HAS ERROR CONTENT" : "✅ OK";
    }
    console.log(`${status} ${route} ${info}`);
  } catch (err) {
    console.log(`ERR ${route} ${err.message}`);
  }
}

async function main() {
  const routes = [
    // Public
    "/", "/karbala", "/karbala/cards",
    "/karbala/night/night-1", "/karbala/night/night-5", "/karbala/night/night-9",
    // Admin (should redirect to login since not authenticated)
    "/admin", "/admin/nights", "/admin/cards", "/admin/resources", "/admin/attachments", "/admin/season",
    // Admin login (should render)
    "/admin/login",
    // SEO
    "/sitemap.xml", "/robots.txt",
  ];
  
  for (const route of routes) {
    await testRoute(route);
  }
}

main();
