const supabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

async function main() {
  const url = `${supabaseUrl}/rest/v1/nights?select=number,title,slug,status&order=number.asc`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`
      }
    });
    const data = await res.json();
    console.log(`Found ${data.length} nights in database:`);
    data.forEach(n => {
      console.log(`Night ${n.number}: "${n.title}" (${n.slug}) - Status: ${n.status}`);
    });
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();
