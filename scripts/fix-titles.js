const supabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

async function main() {
  console.log("Attempting to update Night 10 status from draft to published...");

  // First get night-10 id  
  const getRes = await fetch(`${supabaseUrl}/rest/v1/nights?slug=eq.night-10&select=id,title,status`, {
    headers: {
      "apikey": supabaseAnonKey,
      "Authorization": `Bearer ${supabaseAnonKey}`
    }
  });
  const nights = await getRes.json();
  console.log("Night 10 query result:", nights);
  // Note: RLS may hide draft nights from anon reads too
  
  // Try to update Night 11 title (published, so we can see it)
  const getRes11 = await fetch(`${supabaseUrl}/rest/v1/nights?slug=eq.night-11&select=id,title`, {
    headers: {
      "apikey": supabaseAnonKey,
      "Authorization": `Bearer ${supabaseAnonKey}`
    }
  });
  const nights11 = await getRes11.json();
  console.log("Night 11:", nights11);

  if (nights11.length > 0) {
    const updateRes = await fetch(`${supabaseUrl}/rest/v1/nights?id=eq.${nights11[0].id}`, {
      method: "PATCH",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify({ title: "الكسل مقبرة الذات" })
    });
    const updateData = await updateRes.json();
    console.log("Update Night 11 result:", updateRes.status, updateData);
  }
}

main();
