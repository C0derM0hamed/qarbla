const supabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

async function testSignIn(email, password) {
  const url = `${supabaseUrl}/auth/v1/token?grant_type=password`;
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
      console.log(`Failed for ${email}:`, data.error_description || data.error || JSON.stringify(data));
      return false;
    } else {
      console.log(`Success for ${email}! User ID:`, data.user.id);
      return true;
    }
  } catch (err) {
    console.error("Fetch error:", err.message);
    return false;
  }
}

async function main() {
  const accounts = [
    { email: "admin.karbala@gmail.com", password: "AdminPassword123!" },
    { email: "admin@qarbla.com", password: "AdminPassword123!" },
    { email: "admin@email.com", password: "AdminPassword123!" },
    { email: "mohamed@qarbla.com", password: "AdminPassword123!" },
  ];
  
  for (const acc of accounts) {
    console.log(`Testing signin for ${acc.email}...`);
    const success = await testSignIn(acc.email, acc.password);
    if (success) break;
  }
}

main();
