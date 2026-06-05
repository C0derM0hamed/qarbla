const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/seed-data.json');
const seedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function escapeSql(str) {
  if (!str) return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

const SEASON_ID = '11111111-1111-1111-1111-111111111111';

let sql = `-- =========================================\n`;
sql += `-- Seed Data for وعي يمر من كربلاء\n`;
sql += `-- =========================================\n\n`;

sql += `TRUNCATE TABLE seasons CASCADE;\n\n`;

sql += `INSERT INTO seasons (id, title, intro, is_active)\n`;
sql += `VALUES ('${SEASON_ID}', ${escapeSql(seedData.season.title)}, ${escapeSql(seedData.season.description)}, true);\n\n`;

seedData.nights.forEach((night, i) => {
  const nightNumber = i + 1;
  const nightId = `22222222-2222-2222-2222-22222222${nightNumber.toString().padStart(4, '0')}`;
  
  const slug = `night-${nightNumber}`;
  const quote = night.quote ? night.quote.content : null;
  const quoteAuthor = night.quote ? night.quote.source : null;
  
  sql += `INSERT INTO nights (id, season_id, number, title, slug, teaser, why_important, central_idea, quote, quote_author, reflection_question, practical_step, status, sort_order)\n`;
  sql += `VALUES ('${nightId}', '${SEASON_ID}', ${nightNumber}, ${escapeSql(night.title)}, '${slug}', ${escapeSql(night.teaser)}, ${escapeSql(night.importance)}, ${escapeSql(night.central_idea)}, ${escapeSql(quote)}, ${escapeSql(quoteAuthor)}, ${escapeSql(night.reflection)}, ${escapeSql(night.practical)}, '${night.status}', ${night.sort_order});\n\n`;

  // Topics
  night.topics.forEach((topic, ti) => {
    const topicId = `33333333-3333-3333-3333-333300${nightNumber.toString().padStart(2, '0')}${ti.toString().padStart(4, '0')}`;
    const content = topic.points ? topic.points.map(p => '• ' + p).join('\\n') : '';
    sql += `INSERT INTO topics (id, night_id, title, content, sort_order) VALUES ('${topicId}', '${nightId}', ${escapeSql(topic.title)}, ${escapeSql(content)}, ${ti + 1});\n`;
  });
  if (night.topics.length > 0) sql += '\n';

  // Verses
  night.verses.forEach((verse, vi) => {
    const verseId = `44444444-4444-4444-4444-444400${nightNumber.toString().padStart(2, '0')}${vi.toString().padStart(4, '0')}`;
    sql += `INSERT INTO verses (id, night_id, content, sort_order) VALUES ('${verseId}', '${nightId}', ${escapeSql(verse)}, ${vi + 1});\n`;
  });
  if (night.verses.length > 0) sql += '\n';

  // Narrations
  night.narrations.forEach((narration, ni) => {
    const narId = `55555555-5555-5555-5555-555500${nightNumber.toString().padStart(2, '0')}${ni.toString().padStart(4, '0')}`;
    sql += `INSERT INTO narrations (id, night_id, content, sort_order) VALUES ('${narId}', '${nightId}', ${escapeSql(narration)}, ${ni + 1});\n`;
  });
  if (night.narrations.length > 0) sql += '\n';

  // Resources
  night.resources.forEach((res, ri) => {
    const resId = `66666666-6666-6666-6666-666600${nightNumber.toString().padStart(2, '0')}${ri.toString().padStart(4, '0')}`;
    // map category slightly if possible, or leave default 'article' and put category in title
    const fullTitle = res.category ? `[${res.category}] ${res.title}` : res.title;
    sql += `INSERT INTO resources (id, night_id, title, url, sort_order) VALUES ('${resId}', '${nightId}', ${escapeSql(fullTitle)}, '#', ${ri + 1});\n`;
  });
  if (night.resources.length > 0) sql += '\n';

  // Cards (we can optionally generate a card for the quote)
  if (night.quote && night.quote.content) {
    const cardId = `77777777-7777-7777-7777-777700${nightNumber.toString().padStart(2, '0')}0000`;
    const cardSlug = `quote-night-${nightNumber}`;
    sql += `INSERT INTO cards (id, night_id, slug, type, title, content, status) VALUES ('${cardId}', '${nightId}', '${cardSlug}', 'quote', ${escapeSql(night.quote.source || 'اقتباس')}, ${escapeSql(night.quote.content)}, 'published');\n`;
  }
  
  if (night.reflection) {
    const cardId = `77777777-7777-7777-7777-777700${nightNumber.toString().padStart(2, '0')}0001`;
    const cardSlug = `reflection-night-${nightNumber}`;
    sql += `INSERT INTO cards (id, night_id, slug, type, title, content, status) VALUES ('${cardId}', '${nightId}', '${cardSlug}', 'reflection', 'سؤال للتأمل', ${escapeSql(night.reflection)}, 'published');\n`;
  }
  sql += '\n';
});

fs.writeFileSync(path.join(__dirname, '../supabase/seed.sql'), sql);
console.log("Successfully generated supabase/seed.sql");
