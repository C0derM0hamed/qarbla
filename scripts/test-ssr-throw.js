const { createBrowserClient } = require("@supabase/ssr");

async function test() {
  const supabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

  // Mock cookies for SSR client
  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name) { return null; },
      set(name, value, options) {},
      remove(name, options) {}
    }
  });

  console.log("Attempting sign in with bad credentials to see if it throws...");
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "admin@qarbla.com",
      password: "WrongPassword123!" // Deliberately wrong to trigger 400
    });
    console.log("Returned properly. Error:", error);
  } catch (err) {
    console.error("IT THREW AN EXCEPTION!", err);
  }
}

test();
