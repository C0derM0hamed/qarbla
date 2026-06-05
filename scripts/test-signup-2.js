const supabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

async function main() {
  console.log("Attempting to sign up with a new email via fetch...");
  const email = "mohamed@qarbla.com";
  const password = "AdminPassword123!";
  
  const url = `${supabaseUrl}/auth/v1/signup`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "apikey": supabaseAnonKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (!res.ok) {
      console.error("Sign up error:", data.error_description || data.msg || data.message || JSON.stringify(data));
    } else {
      console.log("Sign up success! User ID:", data.user.id);
      if (data.session) {
        console.log("Session obtained! Email confirmation might be off.");
      } else {
        console.log("No session returned. Email confirmation is likely required.");
      }
    }
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

main();