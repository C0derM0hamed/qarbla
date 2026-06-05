const supabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

async function main() {
  const email = "admin.karbala@gmail.com";
  const password = "AdminPassword123!";
  const url = `${supabaseUrl}/auth/v1/signup`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "apikey": supabaseAnonKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  
  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Response Data:", JSON.stringify(data, null, 2));
}

main();
