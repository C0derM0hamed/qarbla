constgsupabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

async function main() {
  console.log("Testing insert into resources with fetch and anon key...");
  
  // Get a night_id first
  const getUrl = `${supabaseUrl}/rest/v1/nights?select=id&limit=1`;
  const getRes = await fetch(getUrl, {
    method: "GET",
    headers: {
      "apikey": supabaseAnonKey,
      "Authorization": `Bearer ${supabaseAnonKey}`
    }
  });
  const nights = await getRes.json();
  if (!nights || nights.length === 0) {
    console.log("No nights found.");
    return;
  }
  const night_id = nights[0].id;
  
  // Try insert
  const postUrl = `${supabaseUrl}/rest/v1/resources`;
  const postRes = await fetch(postUrl, {
    method: "POST",
    headers: {
      "apikey": supabaseAnonKey,
      "Authorization": `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify({
      title: "Test Resource",
      category: "article",
      url: "https://example.com",
      night_id: night_id
    })
  });
  
  const postData = await postRes.json();
  if (!postRes.ok) {
    console.error("Insert error:", postData);
  } else {
    console.log("Insert success! Data:", postData);
  }
}

main();
