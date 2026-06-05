const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../public/وعي-يمر-من-كربلا.txt');
const content = fs.readFileSync(filePath, 'utf-8');

const nightsData = [];
let currentNight = null;

const lines = content.split('\n').map(l => l.trim());

let i = 0;

// Helper to get text until next known heading
function getTextUntilHeading(startIndex) {
  const headings = [
    'التشويق', 'لماذا هذه الليلة مهمة؟', 'الفكرة المركزية', 'المحاور الرئيسة',
    'اقتباس محوري', 'آيات وروايات الليلة', 'آيات للتأمل', 'روايات وكلمات',
    'مصادر معرفية للاستزادة', 'سؤال للتأمل', 'خطوة عملية بعد الليلة', 'التسجيل الصوتي'
  ];
  let text = [];
  let j = startIndex;
  while (j < lines.length) {
    if (lines[j].match(/^ا?لليلة /) || headings.includes(lines[j])) {
      break;
    }
    if (lines[j]) {
      text.push(lines[j]);
    }
    j++;
  }
  return { text: text.join('\n'), nextIndex: j };
}

function getListUntilHeading(startIndex) {
  const headings = [
    'التشويق', 'لماذا هذه الليلة مهمة؟', 'الفكرة المركزية', 'المحاور الرئيسة',
    'اقتباس محوري', 'آيات وروايات الليلة', 'آيات للتأمل', 'روايات وكلمات',
    'مصادر معرفية للاستزادة', 'سؤال للتأمل', 'خطوة عملية بعد الليلة', 'التسجيل الصوتي'
  ];
  let items = [];
  let currentItem = null;
  let j = startIndex;
  
  while (j < lines.length) {
    if (lines[j].match(/^ا?لليلة /) || headings.includes(lines[j])) {
      break;
    }
    if (lines[j]) {
      items.push(lines[j]);
    }
    j++;
  }
  return { items, nextIndex: j };
}

let seasonIntro = [];
// Skip to first night
while (i < lines.length && !lines[i].match(/^ا?لليلة /)) {
  if (lines[i] && !lines[i].includes('المقدمة في الصفحة الرئيسية') && lines[i] !== 'وعيٌ يمرّ من كربلاء') {
     seasonIntro.push(lines[i]);
  }
  i++;
}

while (i < lines.length) {
  const line = lines[i];
  
  if (line.match(/^ا?لليلة /)) {
    if (currentNight) {
      nightsData.push(currentNight);
    }
    
    // Parse title
    const match = line.match(/^الليلة (.*?) (.*)/);
    let title = line;
    let numberTitle = '';
    if (match) {
      numberTitle = match[1];
      title = match[2];
    } else {
      // Like "الليلة العاشرة المقتل"
      const parts = line.split(' ');
      numberTitle = parts[1];
      title = parts.slice(2).join(' ');
    }
    
    currentNight = {
      title: title,
      teaser: '',
      importance: '',
      central_idea: '',
      topics: [],
      quote: null,
      verses: [],
      narrations: [],
      resources: [],
      reflection: null,
      practical: null,
      status: 'draft',
      sort_order: nightsData.length + 1
    };
    i++;
    continue;
  }
  
  if (!currentNight) {
    i++;
    continue;
  }
  
  switch (line) {
    case 'التشويق': {
      const res = getTextUntilHeading(i + 1);
      currentNight.teaser = res.text;
      i = res.nextIndex;
      break;
    }
    case 'لماذا هذه الليلة مهمة؟': {
      const res = getTextUntilHeading(i + 1);
      currentNight.importance = res.text;
      i = res.nextIndex;
      break;
    }
    case 'الفكرة المركزية': {
      const res = getTextUntilHeading(i + 1);
      currentNight.central_idea = res.text;
      i = res.nextIndex;
      break;
    }
    case 'المحاور الرئيسة': {
      const res = getListUntilHeading(i + 1);
      // parse into title and bullet points
      let currentTopic = null;
      for (const item of res.items) {
        if (item.match(/^\d+\./)) {
          if (currentTopic) currentNight.topics.push(currentTopic);
          currentTopic = { title: item.replace(/^\d+\.\s*/, ''), points: [] };
        } else if (item.startsWith('•')) {
          if (currentTopic) currentTopic.points.push(item.replace(/^•\s*/, ''));
        }
      }
      if (currentTopic) currentNight.topics.push(currentTopic);
      i = res.nextIndex;
      break;
    }
    case 'اقتباس محوري': {
      const res = getListUntilHeading(i + 1);
      if (res.items.length > 0) {
         currentNight.quote = {
           content: res.items[0].replace(/[«»]/g, ''),
           source: res.items.length > 1 ? res.items[1].replace(/^—\s*/, '') : ''
         };
      }
      i = res.nextIndex;
      break;
    }
    case 'آيات وروايات الليلة':
      i++;
      break;
    case 'آيات للتأمل': {
      const res = getListUntilHeading(i + 1);
      currentNight.verses = res.items.map(v => v.replace(/^•\s*/, ''));
      i = res.nextIndex;
      break;
    }
    case 'روايات وكلمات': {
      const res = getListUntilHeading(i + 1);
      currentNight.narrations = res.items.map(v => v.replace(/^•\s*/, ''));
      i = res.nextIndex;
      break;
    }
    case 'مصادر معرفية للاستزادة': {
      const res = getListUntilHeading(i + 1);
      let currentCat = null;
      for (const item of res.items) {
        if (!item.startsWith('•') && !item.startsWith('(')) {
          currentCat = item;
        } else if (item.startsWith('•')) {
          currentNight.resources.push({
            title: item.replace(/^•\s*/, ''),
            category: currentCat
          });
        }
      }
      i = res.nextIndex;
      break;
    }
    case 'سؤال للتأمل': {
      const res = getTextUntilHeading(i + 1);
      currentNight.reflection = res.text;
      i = res.nextIndex;
      break;
    }
    case 'خطوة عملية بعد الليلة': {
      const res = getTextUntilHeading(i + 1);
      currentNight.practical = res.text;
      i = res.nextIndex;
      break;
    }
    case 'التسجيل الصوتي': {
       i++;
       while (i < lines.length && (lines[i] === '' || lines[i].includes('يُضاف بعد المحاضرة'))) {
         i++;
       }
       break;
    }
    default:
      i++;
      break;
  }
}

if (currentNight) {
  nightsData.push(currentNight);
}

// Mark completeness
nightsData.forEach(night => {
  if (night.teaser && night.importance && night.central_idea && night.topics.length > 0) {
    night.status = 'published';
  } else {
    night.status = 'draft';
  }
});

const output = {
  season: {
    title: "وعيٌ يمرّ من كربلاء",
    description: seasonIntro.join('\n')
  },
  nights: nightsData
};

fs.writeFileSync(path.join(__dirname, '../public/seed-data.json'), JSON.stringify(output, null, 2));
console.log("Successfully generated seed-data.json");
