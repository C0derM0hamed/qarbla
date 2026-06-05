// Content Verification Script
// Compares database content against the original source document expectations

const supabaseUrl = "https://caqluwvdkhymvrhxlyge.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcWx1d3Zka2h5bXZyaHhseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDY3NTUsImV4cCI6MjA5NjE4Mjc1NX0.lzjMn2hN1gpDcKG-9y2rD1GmSBFGnsxSJ9N91AJJR54";

const expectedTitles = {
  1: "هل نمارس عاشوراء أم نعيشها؟",
  2: "التطرف العاطفي والوعي الرسالي",
  3: "اختزال المعرفة",
  4: "الأمان العاطفي",
  5: "الفهم السياقي",
  6: "الإنسانية عقيدة",
  7: "أنماط التعلق",
  8: "أبناءنا بين الحرية والضياع",
  9: "نبحث عن الله أم نهرب منه؟",
  10: "المقتل",
  11: "الكسل مقبرة الذات",
  12: "الوقف الخيري",
  13: "السؤال كقناع للنفس",
};

async function query(table, params = "") {
  const res = await fetch(`${supabaseUrl}/rest/v1/${table}?${params}`, {
    headers: { 
      "apikey": supabaseAnonKey, 
      "Authorization": `Bearer ${supabaseAnonKey}` 
    }
  });
  return res.json();
}

async function main() {
  console.log("=== CONTENT COMPLETENESS AUDIT ===\n");

  // 1. Check season
  const seasons = await query("seasons", "is_active=eq.true&select=*");
  console.log(`Active Seasons: ${seasons.length}`);
  if (seasons.length > 0) {
    console.log(`  Title: ${seasons[0].title}`);
    console.log(`  Intro: ${seasons[0].intro ? "✅ Present" : "❌ Missing"}`);
  } else {
    console.log("  ❌ No active season found!");
  }

  // 2. Check all nights
  const nights = await query("nights", "status=eq.published&order=number&select=id,number,title,slug,teaser,central_idea,why_important,quote,quote_author,reflection_question,practical_step,audio_file,pdf_file,short_description");
  console.log(`\nPublished Nights: ${nights.length}/13`);
  
  let totalIssues = 0;
  for (let i = 1; i <= 13; i++) {
    const night = nights.find(n => n.number === i);
    if (!night) {
      console.log(`  Night ${i}: ❌ MISSING`);
      totalIssues++;
      continue;
    }
    
    const issues = [];
    const expectedTitle = expectedTitles[i];
    if (night.title !== expectedTitle) {
      issues.push(`Title mismatch: "${night.title}" (expected: "${expectedTitle}")`);
    }
    if (!night.teaser) issues.push("Missing teaser");
    if (!night.central_idea) issues.push("Missing central_idea");
    if (!night.why_important && i !== 10) issues.push("Missing why_important");
    if (!night.quote && i !== 10) issues.push("Missing quote");
    if (!night.reflection_question && i !== 10) issues.push("Missing reflection_question");
    if (!night.practical_step && i !== 10) issues.push("Missing practical_step");
    
    // Check related data
    const topics = await query("topics", `night_id=eq.${night.id}&select=id`);
    const verses = await query("verses", `night_id=eq.${night.id}&select=id`);
    const narrations = await query("narrations", `night_id=eq.${night.id}&select=id`);
    const resources = await query("resources", `night_id=eq.${night.id}&select=id`);
    
    if (topics.length === 0 && i !== 10) issues.push("No topics");
    if (verses.length === 0 && i !== 10) issues.push("No verses");
    if (narrations.length === 0 && i !== 10) issues.push("No narrations");
    
    const status = issues.length === 0 ? "✅" : "⚠️";
    console.log(`  Night ${i}: ${status} "${night.title}" | Topics: ${topics.length} | Verses: ${verses.length} | Narrations: ${narrations.length} | Resources: ${resources.length}`);
    if (issues.length > 0) {
      issues.forEach(issue => console.log(`    → ${issue}`));
      totalIssues += issues.length;
    }
  }

  // 3. Check cards
  const cards = await query("cards", "status=eq.published&select=id,type,title,content");
  console.log(`\nPublished Cards: ${cards.length}`);
  cards.forEach(c => console.log(`  - [${c.type}] ${c.title}: ${c.content?.substring(0, 50)}...`));

  // 4. Summary
  console.log(`\n=== SUMMARY ===`);
  console.log(`Total Issues: ${totalIssues}`);
  console.log(`Published Nights: ${nights.length}/13`);
  console.log(`Published Cards: ${cards.length}`);
  console.log(`Active Seasons: ${seasons.length}`);
}

main().catch(console.error);
