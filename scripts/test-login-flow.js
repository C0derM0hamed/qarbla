const supabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

async function main() {
  console.log("1. Simulating client login via Supabase API...");
  const loginRes = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "apikey": supabaseAnonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: "admin@qarbla.com", password: "AdminPassword123!" })
  });
  
  if (!loginRes.ok) {
    console.error("Login failed:", await loginRes.text());
    return;
  }
  
  const authData = await loginRes.json();
  console.log("Login successful. Access Token acquired.");
  
  // The @supabase/ssr package creates chunked cookies. For a basic test, we'll construct the main cookie.
  // We need to send this to our Next.js localhost server to see if it allows access to /admin
  const sbCookieName = `sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`;
  const cookieValue = JSON.stringify([authData.access_token, authData.refresh_token, null, null, null]);
  const encodedCookie = encodeURIComponent(cookieValue);
  const cookieHeader = `${sbCookieName}=${encodedCookie}`;

  console.log("2. Attempting to access /admin with session cookies...");
  const adminRes = await fetch("http://localhost:3000/admin", {
    headers: {
      "Cookie": cookieHeader
    },
    redirect: "manual"
  });

  if (adminRes.status === 200) {
    console.log("SUCCESS: /admin returned 200 OK. Session is created and authenticated.");
  } else {
    console.error(`FAILURE: /admin returned ${adminRes.status}. Redirected to: ${adminRes.headers.get("location")}`);
  }

  console.log("3. Attempting to access /admin WITHOUT session cookies...");
  const adminResNoAuth = await fetch("http://localhost:3000/admin", {
    redirect: "manual"
  });

  if (adminResNoAuth.status === 307 && adminResNoAuth.headers.get("location").includes("/admin/login")) {
    console.log("SUCCESS: /admin redirects to /admin/login when logged out.");
  } else {
    console.error(`FAILURE: Unauthenticated access returned ${adminResNoAuth.status}.`);
  }
}

main();
