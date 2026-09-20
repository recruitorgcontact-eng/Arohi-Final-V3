// Arohi VetMitra - 50 Realistic Farmer <-> Arohi Dairy Scenarios
// In Authentic Colloquial Odia with Clinical Probing, Red Flags, and Lab Follow-ups

import { VetScenarioItem } from '../types';

export const ODIA_DAIRY_50_SCENARIOS: VetScenarioItem[] = [
  {
    id: 1,
    titleOdia: 'ଗାଈ ଖାଉନାହିଁ — ସାଧାରଣ ପ୍ରାରମ୍ଭିକ ମୂଲ୍ୟାଙ୍କନ',
    titleEnglish: 'Cow Not Eating — Initial Case Evaluation',
    category: 'early_lactation',
    clinicalFocus: 'Anorexia in early postpartum cow, temperature check, DIM & uterine discharge evaluation',
    probingQuestions: ['ଗାଈଟା କେତେ ବର୍ଷର?', 'ଶେଷ ଥର କେବେ ବାଛୁରୀ ଦେଇଥିଲା?', 'ଦୁଧ କମିଛି କି?', 'ଜାବର କାଟୁଛି କି?', 'ଶରୀର ତାପମାତ୍ରା କେତେ?'],
    redFlags: ['ଅସ୍ୱାଭାବିକ ତାପମାତ୍ରା (>39.5°C)', 'ଦୁର୍ଗନ୍ଧଯୁକ୍ତ ଯୋନି ସ୍ରାବ', 'ଉଠିପାରୁନଥିବା', 'ଶ୍ୱାସକଷ୍ଟ'],
    suggestedTests: ['Rectal temperature with digital thermometer', 'Ketone urine test', 'Uterine discharge swab'],
    dialogue: [
      { speaker: 'farmer', text: 'ଆରୋହୀ, ମୋ ଗାଈଟା ଆଜି ଠିକ୍ରେ ଖାଉନାହିଁ।' },
      { speaker: 'arohi', text: 'ଠିକ୍ ଅଛି। ମୁଁ ପ୍ରଥମେ କିଛି କଥା ପଚାରିବି। ଗାଈଟା କେତେ ବର୍ଷର? ଆଉ ଶେଷ ଥର କେବେ ବାଛୁରୀ ଦେଇଥିଲା?' },
      { speaker: 'farmer', text: 'ପ୍ରାୟ ୫ ବର୍ଷ। ୧୦ ଦିନ ହେଲା ବାଛୁରୀ ଦେଇଛି।' },
      { speaker: 'arohi', text: 'ବୁଝିଲି। ଦୁଧ ପୂର୍ବପେକ୍ଷା କମିଛି କି? ଗୋବର ସାଧାରଣ ଅଛି କି? ଜାବର କାଟୁଛି କି?' },
      { speaker: 'farmer', text: 'ଦୁଧ ଟିକେ କମିଛି। ଜାବର ମଧ୍ୟ କମ୍ କାଟୁଛି।' },
      { speaker: 'arohi', text: 'ନୂଆ ବାଛୁରୀ ଦେଇଥିବା ଗାଈରେ ଭୋକ କମିବା ସହିତ ଦୁଧ କମିବା ଅନେକ କାରଣରୁ ହୋଇପାରେ। ଏବେ ତାର ଶରୀର ତାପମାତ୍ରା ମାପିପାରିବେ କି?' },
      { speaker: 'farmer', text: 'ହଁ।' },
      { speaker: 'arohi', text: 'ତାପମାତ୍ରାଟି ମାପି ମୋତେ କୁହନ୍ତୁ। ଯଦି ଅସ୍ୱାଭାବିକ ତାପମାତ୍ରା, ବହୁତ ଦୁର୍ବଳତା, ଦୁର୍ଗନ୍ଧଯୁକ୍ତ ଯୋନି ସ୍ରାବ, ଉଠିପାରୁନଥିବା କିମ୍ବା ଶ୍ୱାସକଷ୍ଟ ଥାଏ, ତେବେ ଶୀଘ୍ର ପଶୁ ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।' }
    ]
  },
  {
    id: 2,
    titleOdia: 'ଦୁଧ ହଠାତ୍ କମିଗଲା',
    titleEnglish: 'Sudden Drop in Milk Production',
    category: 'mastitis',
    clinicalFocus: 'Acute drop from 10L to 6L, quarter heat assessment, clot checking, CMT',
    probingQuestions: ['କେତେ ଦିନରେ କେତେ କମିଲା?', 'ଥନ ଗରମ, ଫୁଲିଥିବା ଅଛି କି?', 'ଦୁଧରେ ଦାଣା ବା ଛେନା ଟୁକୁଡ଼ା ଅଛି କି?'],
    redFlags: ['ଗୋଟିଏ କ୍ୱାର୍ଟର ଅତ୍ୟଧିକ ଟାଣ ଓ ନାଲି ପଡ଼ିବା', 'ଶରୀର ଜ୍ୱର', 'ଦୁଧରେ ରକ୍ତ ବା ପୂଜ'],
    suggestedTests: ['California Mastitis Test (CMT)', 'Milk culture and antibiotic sensitivity'],
    dialogue: [
      { speaker: 'farmer', text: 'ଆରୋହୀ, ମୋ ଗାଈର ଦୁଧ ହଠାତ୍ କମିଗଲା।' },
      { speaker: 'arohi', text: 'କେତେ ଦିନରେ କେତେ କମିଲା?' },
      { speaker: 'farmer', text: '୧୦ ଲିଟରରୁ ୬ ଲିଟର ହୋଇଗଲା।' },
      { speaker: 'arohi', text: 'ଏହା ଉଲ୍ଲେଖନୀୟ ପରିବର୍ତ୍ତନ। ଗାଈଟି ଖାଦ୍ୟ ସାଧାରଣ ଭାବେ ଖାଉଛି କି? ପାଣି ପିଉଛି କି? ଜାବର କାଟୁଛି କି?' },
      { speaker: 'farmer', text: 'ଖାଉଛି, କିନ୍ତୁ ଟିକେ କମ୍।' },
      { speaker: 'arohi', text: 'ଥନର କୌଣସି ଭାଗ ଗରମ, ଫୁଲିଥିବା କିମ୍ବା ବ୍ୟଥା କରୁଛି କି? ଦୁଧରେ ଦାଣା, ଛେନାଭଳି ଟୁକୁଡ଼ା କିମ୍ବା ରଙ୍ଗ ପରିବର୍ତ୍ତନ ଅଛି କି?' },
      { speaker: 'farmer', text: 'ଡାହାଣ ପଟର ଥନଟା ଟିକେ ଗରମ ଲାଗୁଛି।' },
      { speaker: 'arohi', text: 'ମାଷ୍ଟାଇଟିସ୍ର ସମ୍ଭାବନା ଯାଞ୍ଚ କରିବା ଦରକାର। ଥନ ଓ ଦୁଧର ଫଟୋ ଦେଇପାରିବେ। CMT କିମ୍ବା ଅନ୍ୟ ପରୀକ୍ଷା କରିଥିଲେ ରିପୋର୍ଟଟି ମଧ୍ୟ upload କରନ୍ତୁ। ରିପୋର୍ଟ ମିଳିଲେ ମୁଁ ତାହା ବୁଝାଇଦେବି।' }
    ]
  },
  {
    id: 3,
    titleOdia: 'ଥନ ଗରମ ଓ ଫୁଲିଛି',
    titleEnglish: 'Udder Hot and Swollen',
    category: 'mastitis',
    clinicalFocus: 'Clinical mastitis with flakes, systemic fever screening',
    probingQuestions: ['ଦୁଧରେ କୌଣସି ପରିବର୍ତ୍ତନ ଦେଖୁଛନ୍ତି କି?', 'ଗାଈର ତାପମାତ୍ରା ମାପିଛନ୍ତି କି?'],
    redFlags: ['ଦୁଗ୍ଧ ବନ୍ଦ ହେବା', 'ଅତ୍ୟଧିକ ଜ୍ୱର', 'ଗାଈ ତଳେ ଶୋଇରହିବା'],
    suggestedTests: ['Strip cup test for flakes', 'CMT test'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈର ଥନ ଗରମ ଓ ଫୁଲିଯାଇଛି।' },
      { speaker: 'arohi', text: 'ଦୁଧରେ କୌଣସି ପରିବର୍ତ୍ତନ ଦେଖୁଛନ୍ତି କି?' },
      { speaker: 'farmer', text: 'ଦୁଧରେ ଛୋଟ ଛୋଟ ଦାଣା ଅଛି।' },
      { speaker: 'arohi', text: 'ଏହା ମାଷ୍ଟାଇଟିସ୍ର ଲକ୍ଷଣ ହୋଇପାରେ। ଗାଈର ତାପମାତ୍ରା ମାପିଛନ୍ତି କି?' },
      { speaker: 'farmer', text: 'ନାହିଁ।' },
      { speaker: 'arohi', text: 'ତାପମାତ୍ରା ମାପନ୍ତୁ। ଥନର ଫଟୋ ଏବଂ ଦୁଧର ଫଟୋ ମଧ୍ୟ ପଠାନ୍ତୁ। ଯଦି ଗାଈ ଜ୍ୱରରେ ଅଛି, ଖାଉନାହିଁ କିମ୍ବା ବହୁତ ଦୁର୍ବଳ ହେଉଛି, ଡାକ୍ତରଙ୍କୁ ତୁରନ୍ତ ଯୋଗାଯୋଗ କରନ୍ତୁ।' }
    ]
  },
  {
    id: 4,
    titleOdia: 'ବାଛୁରୀର ଝାଡ଼ା',
    titleEnglish: 'Calf Scours / Diarrhea',
    category: 'calf_health',
    clinicalFocus: 'Dehydration risk in 12-day-old calf, sunken eyes, skin elasticity, oral rehydration',
    probingQuestions: ['ବାଛୁରୀଟି କେତେ ଦିନର?', 'କ୍ଷୀର ପିଉଛି କି? ଠିଆ ହୋଇପାରୁଛି କି?', 'ଆଖି ଭିତରକୁ ଯାଇଛି କି?'],
    redFlags: ['ଉଠି ନ ପାରିବା', 'ଶରୀର ଅତି ଥଣ୍ଡା ଲାଗିବା', 'ଚର୍ମ ଟାଣିଲେ ୩ ସେକେଣ୍ଡରୁ ଅଧିକ ରହିଯିବା'],
    suggestedTests: ['Fecal smear for rotavirus/cryptosporidium/E. coli'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ବାଛୁରୀକୁ ଝାଡ଼ା ହୋଇଛି।' },
      { speaker: 'arohi', text: 'ବାଛୁରୀଟି କେତେ ଦିନର?' },
      { speaker: 'farmer', text: '୧୨ ଦିନ।' },
      { speaker: 'arohi', text: 'ଝାଡ଼ା କେତେ ଦିନ ହେଲା? ବାଛୁରୀ କ୍ଷୀର ପିଉଛି କି? ଠିଆ ହୋଇପାରୁଛି କି?' },
      { speaker: 'farmer', text: 'ଦୁଇ ଦିନ ହେଲା। କ୍ଷୀର ପିଉଛି।' },
      { speaker: 'arohi', text: 'ତାର ଆଖି ଭିତରକୁ ଯାଇଛି କି, ମୁହଁ ଶୁଖିଲା ଲାଗୁଛି କି, ଚର୍ମ ଟାଣିଲେ ଶୀଘ୍ର ପୂର୍ବ ଅବସ୍ଥାକୁ ଆସୁଛି କି?' },
      { speaker: 'farmer', text: 'ଆଖି ଟିକେ ଭିତରକୁ ଯାଇଛି।' },
      { speaker: 'arohi', text: 'ଏହା ଡିହାଇଡ୍ରେସନ୍ର ସଙ୍କେତ ହୋଇପାରେ। ଛୋଟ ବାଛୁରୀରେ ଡିହାଇଡ୍ରେସନ୍ ଶୀଘ୍ର ଗୁରୁତର ହୋଇପାରେ। ଓରାଲ୍ ଇଲେକ୍ଟ୍ରୋଲାଇଟ୍ର ଆବଶ୍ୟକତା ହୋଇପାରେ; ଅବସ୍ଥା ଗୁରୁତର ହେଲେ ଡାକ୍ତରୀ ଚିକିତ୍ସା ଆବଶ୍ୟକ। ବାଛୁରୀର ଗୋବରର ଫଟୋ ମଧ୍ୟ ପଠାଇପାରିବେ।' }
    ]
  },
  {
    id: 5,
    titleOdia: 'ବାଛୁରୀ କ୍ଷୀର ପିଉନାହିଁ',
    titleEnglish: 'Newborn Calf Not Nursing',
    category: 'calf_health',
    clinicalFocus: 'Colostrum intake failure in newborn, suckle reflex, hypoglycemia risk',
    probingQuestions: ['ବାଛୁରୀ କେତେ ଘଣ୍ଟା/ଦିନର?', 'ଜନ୍ମ ପରେ କେତେ ସମୟ ମଧ୍ୟରେ କଲୋଷ୍ଟ୍ରମ୍ ଦେଇଥିଲେ?'],
    redFlags: ['ଚୋଷିବାର ପ୍ରତିକ୍ରିୟା ନଥିବା (absent suckle reflex)', 'ବାଛୁରୀ ମୁଣ୍ଡ ଟେକି ନ ପାରିବା'],
    suggestedTests: ['Blood serum total protein / refractometer test for passive transfer failure'],
    dialogue: [
      { speaker: 'farmer', text: 'ବାଛୁରୀ କ୍ଷୀର ପିଉନାହିଁ।' },
      { speaker: 'arohi', text: 'ବାଛୁରୀ କେତେ ଘଣ୍ଟା/ଦିନର?' },
      { speaker: 'farmer', text: 'ଆଜି ଜନ୍ମ ହୋଇଛି।' },
      { speaker: 'arohi', text: 'ଜନ୍ମ ପରେ କେତେ ସମୟ ମଧ୍ୟରେ କଲୋଷ୍ଟ୍ରମ୍ ଦେଇଥିଲେ?' },
      { speaker: 'farmer', text: 'ଏପର୍ଯ୍ୟନ୍ତ ଭଲଭାବରେ ପିଇନାହିଁ।' },
      { speaker: 'arohi', text: 'ନବଜାତ ବାଛୁରୀ ପାଇଁ କଲୋଷ୍ଟ୍ରମ୍ ବହୁତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ବାଛୁରୀ ଦୁର୍ବଳ, ଠିଆ ହୋଇପାରୁନଥିବା କିମ୍ବା ଚୋଷିବାର ପ୍ରତିକ୍ରିୟା ନଥିଲେ ଅପେକ୍ଷା କରନ୍ତୁ ନାହିଁ—ପଶୁ ଡାକ୍ତରଙ୍କ ସହ ତୁରନ୍ତ କଥା ହୁଅନ୍ତୁ।' }
    ]
  },
  {
    id: 6,
    titleOdia: 'ବାଛୁରୀର ନାଭି',
    titleEnglish: 'Swollen Navel / Omphalophlebitis',
    category: 'calf_health',
    clinicalFocus: 'Navel infection, septicemia risk, hygiene',
    probingQuestions: ['ନାଭିରୁ ପାଣି/ପୁଜ ବାହାରୁଛି କି?', 'ଗରମ ଲାଗୁଛି କି?'],
    redFlags: ['ଉଚ୍ଚ ତାପମାତ୍ରା', 'ଗଣ୍ଠି ଫୁଲିବା (joint ill)', 'କ୍ଷୀର ପିଇବା ବନ୍ଦ'],
    suggestedTests: ['Physical palpation by vet', 'Navel ultrasound'],
    dialogue: [
      { speaker: 'farmer', text: 'ବାଛୁରୀର ନାଭି ଫୁଲିଛି।' },
      { speaker: 'arohi', text: 'ନାଭିରୁ ପାଣି/ପୁଜ ବାହାରୁଛି କି? ଗରମ ଲାଗୁଛି କି?' },
      { speaker: 'farmer', text: 'ଟିକେ ଫୁଲିଛି, ଗରମ ମଧ୍ୟ ଲାଗୁଛି।' },
      { speaker: 'arohi', text: 'ନାଭିରେ ସଂକ୍ରମଣ ହୋଇପାରେ। ନାଭିର ନିକଟର ଫଟୋ ପଠାନ୍ତୁ। ଯଦି ପୁଜ, ଜ୍ୱର, ଭୋକ କମିବା କିମ୍ବା ଅତ୍ୟଧିକ ଦୁର୍ବଳତା ଅଛି, ଡାକ୍ତରଙ୍କୁ ଦେଖାନ୍ତୁ।' }
    ]
  },
  {
    id: 7,
    titleOdia: 'ଗାଈ ଜାବର କାଟୁନାହିଁ',
    titleEnglish: 'Cow Stopped Chewing Cud (Rumination)',
    category: 'rumen_health',
    clinicalFocus: 'Rumen hypomotility, feed changes, indigestion',
    probingQuestions: ['ଖାଦ୍ୟ ଖାଉଛି କି?', 'ଗୋବର ହେଉଛି କି?', 'ପେଟ ଫୁଲିଛି କି?'],
    redFlags: ['ବାମ ପଟ କୋଣ ଫୁଲିବା (left paralumbar distension)', 'ଶବ୍ଦ କରୁଥିବା ଶ୍ୱାସ'],
    suggestedTests: ['Rumen fluid analysis / pH test'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଗାଈ ଜାବର କାଟୁନାହିଁ।' },
      { speaker: 'arohi', text: 'ଖାଦ୍ୟ ଖାଉଛି କି? ଗୋବର ହେଉଛି କି? ପେଟ ଫୁଲିଛି କି?' },
      { speaker: 'farmer', text: 'ଖାଉଛି କିନ୍ତୁ କମ୍। ଗୋବର ମଧ୍ୟ କମିଛି।' },
      { speaker: 'arohi', text: 'ଜାବର କମିବା ଅନେକ ପାଚନ ସମସ୍ୟାର ସଙ୍କେତ ହୋଇପାରେ। ଗାଈର ପେଟ ଅସାଧାରଣ ଭାବରେ ଫୁଲିଛି କି?' },
      { speaker: 'farmer', text: 'ନାହିଁ।' },
      { speaker: 'arohi', text: 'ଆଜି କଣ କଣ ଖାଇଛି ଏବଂ ଗତ ୨–୩ ଦିନରେ ଖାଦ୍ୟରେ କୌଣସି ପରିବର୍ତ୍ତନ କରିଥିଲେ କି ମୋତେ କୁହନ୍ତୁ।' }
    ]
  },
  {
    id: 8,
    titleOdia: 'ବହୁତ ପାଣି ପିଉଛି',
    titleEnglish: 'Excessive Water Consumption (Polydipsia)',
    category: 'systemic',
    clinicalFocus: 'Heat stress vs salt intake vs renal/metabolic conditions',
    probingQuestions: ['ଦୁଧ ଉତ୍ପାଦନ ବଢ଼ିଛି କି?', 'ଗରମ ପାଗ କି?', 'ଲୁଣ ବଢ଼ାଇଛନ୍ତି କି?'],
    redFlags: ['ଦ୍ରୁତ ଓଜନ ହ୍ରାସ', 'ପିଶାବରେ ପରିବର୍ତ୍ତନ'],
    suggestedTests: ['Urinalysis for specific gravity & glucose', 'Kidney function panel'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈଟା ଆଜିକାଲି ବହୁତ ପାଣି ପିଉଛି।' },
      { speaker: 'arohi', text: 'ଦୁଧ ଉତ୍ପାଦନ ବଢ଼ିଛି କି? ଗରମ ପାଗ କି? ଖାଦ୍ୟରେ ଲୁଣ କିମ୍ବା ଅନ୍ୟ କୌଣସି ଜିନିଷ ବଢ଼ାଇଛନ୍ତି କି?' },
      { speaker: 'farmer', text: 'ଗରମ ବହୁତ।' },
      { speaker: 'arohi', text: 'ଗରମ ପାଗରେ ପାଣିର ଆବଶ୍ୟକତା ବଢ଼ିପାରେ। କିନ୍ତୁ ଅତ୍ୟଧିକ ପାଣି ପିଇବା ସହିତ ଅଧିକ ପିଶାବ, ଓଜନ କମିବା କିମ୍ବା ଅନ୍ୟ ଲକ୍ଷଣ ଥିଲେ ଯାଞ୍ଚ ଆବଶ୍ୟକ ହୋଇପାରେ।' }
    ]
  },
  {
    id: 9,
    titleOdia: 'ଗାଈ ବହୁତ ଦୁର୍ବଳ',
    titleEnglish: 'Chronic Weight Loss Despite Eating',
    category: 'nutrition',
    clinicalFocus: 'Negative energy balance, parasites, chronic disease',
    probingQuestions: ['ଦୁଧ କେତେ ଦେଉଛି?', 'ଓଜନ କେତେ ଦିନ ହେଲା କମୁଛି?', 'ଡିୱର୍ମିଂ କେବେ କରିଥିଲେ?'],
    redFlags: ['ତଳ ଚିବୁକ ଫୁଲିବା (bottle jaw)', 'ରକ୍ତହୀନତା'],
    suggestedTests: ['Fecal egg count (EPG)', 'CBC for anemia', 'Johne’s disease screening'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈ ଖାଉଛି, ତଥାପି ଦିନକୁ ଦିନ ଦୁର୍ବଳ ହେଉଛି।' },
      { speaker: 'arohi', text: 'ଦୁଧ କେତେ ଦେଉଛି? କେତେ ଦିନ ହେଲା ଓଜନ କମୁଛି?' },
      { speaker: 'farmer', text: '୩ ମାସ ହେଲା। ଦିନକୁ ୮ ଲିଟର।' },
      { speaker: 'arohi', text: 'ଗୋବର ସାଧାରଣ କି? କୀଟନାଶକ/ଡିୱର୍ମିଂ କେବେ କରିଥିଲେ? ଖାଦ୍ୟରେ ପ୍ରୋଟିନ୍ ଓ ଶକ୍ତି ପର୍ଯ୍ୟାପ୍ତ କି?' },
      { speaker: 'farmer', text: 'ଡିୱର୍ମିଂ କେବେ କରିଥିଲି ମନେ ନାହିଁ।' },
      { speaker: 'arohi', text: 'ଏହାର କାରଣ ପୋଷଣ, ପରଜୀବୀ କିମ୍ବା ଅନ୍ୟ ରୋଗ ହୋଇପାରେ। ମଳ ପରୀକ୍ଷା ଆବଶ୍ୟକ କି ନାହିଁ, ଡାକ୍ତରଙ୍କ ସହ ନିର୍ଣ୍ଣୟ କରନ୍ତୁ।' }
    ]
  },
  {
    id: 10,
    titleOdia: 'ଗୋବର ବହୁତ ପତଳା',
    titleEnglish: 'Acute Watery Dung / Diarrhea in Adult Cow',
    category: 'rumen_health',
    clinicalFocus: 'Sub-acute ruminal acidosis (SARA) from doubling concentrate',
    probingQuestions: ['କେତେ ଦିନ ହେଲା?', 'ନୂଆ concentrate ଦେଇଛନ୍ତି କି?', 'କେତେ ପରିମାଣ ବଢ଼ାଇଲେ?'],
    redFlags: ['ଗୋବରରେ ରକ୍ତ ବା କଫ', 'ପାଣି ଶୁଖିଯିବା'],
    suggestedTests: ['Fecal examination', 'Rumen fluid pH test'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈର ଗୋବର ବହୁତ ପତଳା ହୋଇଛି।' },
      { speaker: 'arohi', text: 'କେତେ ଦିନ ହେଲା? ନୂଆ ଖାଦ୍ୟ ଦେଇଛନ୍ତି କି?' },
      { speaker: 'farmer', text: 'ଦୁଇ ଦିନ। ନୂଆ concentrate ଦେବା ଆରମ୍ଭ କରିଛି।' },
      { speaker: 'arohi', text: 'କେତେ ପରିମାଣରେ ହଠାତ୍ ବଢ଼ାଇଲେ?' },
      { speaker: 'farmer', text: 'ପୁରୁଣାଠାରୁ ଦୁଇଗୁଣ।' },
      { speaker: 'arohi', text: 'ହଠାତ୍ concentrate ବଢ଼ାଇବାରେ ପାଚନ ବ୍ୟବସ୍ଥାରେ ସମସ୍ୟା ହୋଇପାରେ। ଖାଦ୍ୟ ପରିବର୍ତ୍ତନ ସାଧାରଣତଃ ଧୀରେ କରିବା ଉଚିତ। ଗାଈର ଭୋକ, ଜାବର ଏବଂ ଦୁଧ ଉପରେ ମଧ୍ୟ ନଜର ରଖନ୍ତୁ।' }
    ]
  },
  {
    id: 11,
    titleOdia: 'ପେଟ ଫୁଲିବା (ବ୍ଲୋଟ୍)',
    titleEnglish: 'Acute Bloat / Tympany (Emergency)',
    category: 'emergency',
    clinicalFocus: 'Severe left flank swelling with respiratory distress — emergency vet needed immediately',
    probingQuestions: ['ଶ୍ୱାସ ନେବାରେ କଷ୍ଟ ହେଉଛି କି?', 'ବାରମ୍ବାର ଉଠୁଛି-ବସୁଛି କି?'],
    redFlags: ['ମୁହଁ ଖୋଲି ଶ୍ୱାସ ନେବା', 'ନୀଳ ଜିଭ (cyanosis)', 'ବାମ କୋଣ ଡ୍ରମ୍ ଭଳି ବାଜିବା'],
    suggestedTests: ['Emergency stomach tube or trocharization by qualified vet only'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈର ବାମ ପଟ ପେଟ ବହୁତ ଫୁଲିଯାଇଛି।' },
      { speaker: 'arohi', text: 'ଶ୍ୱାସ ନେବାରେ କଷ୍ଟ ହେଉଛି କି? ବାରମ୍ବାର ଉଠୁଛି-ବସୁଛି କି?' },
      { speaker: 'farmer', text: 'ହଁ, ଶ୍ୱାସ ଟିକେ ଜୋରରେ ନେଉଛି।' },
      { speaker: 'arohi', text: 'ଏହା ବ୍ଲୋଟ୍ର ଜରୁରୀ ଅବସ୍ଥା ହୋଇପାରେ। ଘରେ ଅନୁମାନରେ ଔଷଧ ଦେଇ ସମୟ ନଷ୍ଟ କରନ୍ତୁ ନାହିଁ। ତୁରନ୍ତ ପଶୁ ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।' }
    ]
  },
  {
    id: 12,
    titleOdia: 'ଗାଈ ଉଠିପାରୁନାହିଁ (Downer Cow)',
    titleEnglish: 'Cow Down After Calving (Emergency)',
    category: 'emergency',
    clinicalFocus: 'Hypocalcemia / Milk Fever or nerve injury postpartum',
    probingQuestions: ['ବାଛୁରୀ କେତେ ସମୟ ପୂର୍ବରୁ ଦେଇଛି?'],
    redFlags: ['ମୁଣ୍ଡ ପାର୍ଶ୍ୱକୁ ମୋଡ଼ି ଶୋଇବା (S-curve posture)', 'ଶୀତଳ କାନ'],
    suggestedTests: ['Serum Calcium & Phosphorus panel'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈ ବାଛୁରୀ ଦେବା ପରେ ଉଠିପାରୁନାହିଁ।' },
      { speaker: 'arohi', text: 'ବାଛୁରୀ କେତେ ସମୟ ପୂର୍ବରୁ ଦେଇଛି?' },
      { speaker: 'farmer', text: 'ପ୍ରାୟ ୪ ଘଣ୍ଟା।' },
      { speaker: 'arohi', text: 'ଏହା ଜରୁରୀ ଅବସ୍ଥା ହୋଇପାରେ। ମିଲ୍କ ଫିଭର୍ ସହିତ ଅନେକ କାରଣ ଥାଇପାରେ ଏବଂ କେବଳ ଚାଟ୍ରୁ ନିଶ୍ଚିତ କରିହେବ ନାହିଁ। ତୁରନ୍ତ ପଶୁ ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।' }
    ]
  },
  {
    id: 13,
    titleOdia: 'ଦୁଧରେ ରକ୍ତ',
    titleEnglish: 'Blood in Milk (Hemolactia)',
    category: 'mastitis',
    clinicalFocus: 'Trauma to udder parenchymal vessels vs severe mastitis',
    probingQuestions: ['ଗୋଟିଏ ଥନରୁ ଏମିତି ହେଉଛି କି ସବୁ ଥନରୁ?', 'ସେହି ଥନ ଫୁଲିଛି କି?'],
    redFlags: ['ଜ୍ୱର ସହିତ ରକ୍ତସ୍ରାବ', 'କ୍ଲଟ୍ ଅତ୍ୟଧିକ ଆସିବା'],
    suggestedTests: ['Physical udder exam', 'CMT and milk microscopy'],
    dialogue: [
      { speaker: 'farmer', text: 'ଦୁଧ ଦୋହିଲେ ରକ୍ତ ଭଳି ଦେଖାଯାଉଛି।' },
      { speaker: 'arohi', text: 'କେବଳ ଗୋଟିଏ ଥନରୁ ଏମିତି ହେଉଛି କି ସବୁ ଥନରୁ?' },
      { speaker: 'farmer', text: 'ଗୋଟିଏ ଥନରୁ।' },
      { speaker: 'arohi', text: 'ସେହି ଥନ ଫୁଲିଛି କି କିମ୍ବା ବ୍ୟଥା କରୁଛି?' },
      { speaker: 'farmer', text: 'ଟିକେ ବ୍ୟଥା କରୁଛି।' },
      { speaker: 'arohi', text: 'ଥନର ଆଘାତ, ମାଷ୍ଟାଇଟିସ୍ କିମ୍ବା ଅନ୍ୟ କାରଣ ଥାଇପାରେ। ସେହି ଥନର ଫଟୋ ଏବଂ ଦୁଧର ଫଟୋ ପଠାନ୍ତୁ। ଗାଈର ତାପମାତ୍ରା ମଧ୍ୟ ମାପନ୍ତୁ।' }
    ]
  },
  {
    id: 14,
    titleOdia: 'ଦୁଧରେ ଦାଣା',
    titleEnglish: 'Flakes and Clots in Milk',
    category: 'mastitis',
    clinicalFocus: 'Subclinical to clinical mastitis progression',
    probingQuestions: ['ଥନର କୌଣସି ଭାଗ ଗରମ କିମ୍ବା ଫୁଲିଛି?'],
    redFlags: ['କ୍ୱାର୍ଟର କଠିନ ପାଲଟିବା (fibrosed quarter)'],
    suggestedTests: ['CMT kit screening', 'Somatic Cell Count (SCC)'],
    dialogue: [
      { speaker: 'farmer', text: 'ଦୁଧରେ ଛୋଟ ଛୋଟ ଦାଣା ଆସୁଛି।' },
      { speaker: 'arohi', text: 'ଥନର କୌଣସି ଭାଗ ଗରମ କିମ୍ବା ଫୁଲିଛି?' },
      { speaker: 'farmer', text: 'ହଁ।' },
      { speaker: 'arohi', text: 'ମାଷ୍ଟାଇଟିସ୍ ଯାଞ୍ଚ କରିବା ଦରକାର। CMT ହୋଇଥିଲେ ରିପୋର୍ଟ upload କରନ୍ତୁ। ନଥିଲେ ଡାକ୍ତର/ପଶୁ ସ୍ୱାସ୍ଥ୍ୟ କର୍ମୀଙ୍କ ସହ ପରୀକ୍ଷା ବିଷୟରେ କଥା ହୁଅନ୍ତୁ।' }
    ]
  },
  {
    id: 15,
    titleOdia: 'ଦୁଧର Fat କମ୍',
    titleEnglish: 'Low Milk Fat Percentage Screening',
    category: 'nutrition',
    clinicalFocus: 'Milk fat depression (MFD) caused by excessive concentrate and inadequate structural fiber (NDF < 28%)',
    probingQuestions: ['ପୂର୍ବରୁ କେତେ ଥିଲା ଏବଂ ଏବେ କେତେ?', 'Concentrate ବଢ଼ାଇଛନ୍ତି କି? ତନ୍ତୁଯୁକ୍ତ ଖାଦ୍ୟ କମିଛି କି?'],
    redFlags: ['ଗୋବରରେ ଅପାଚିତ ଶସ୍ୟ କଣିକା ଦେଖାଯିବା (mucus bubbles)'],
    suggestedTests: ['Milko-tester fat report upload', 'NASEM 2021 NDF ratio check'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଦୁଧର fat କମିଯାଇଛି।' },
      { speaker: 'arohi', text: 'ପୂର୍ବରୁ କେତେ ଥିଲା ଏବଂ ଏବେ କେତେ?' },
      { speaker: 'farmer', text: '୪.୫ରୁ ୩.୫ ହୋଇଛି।' },
      { speaker: 'arohi', text: 'ଏହି ସମୟରେ concentrate ବଢ଼ାଇଛନ୍ତି କି? ତନ୍ତୁଯୁକ୍ତ ଖାଦ୍ୟ କମିଛି କି?' },
      { speaker: 'farmer', text: 'Concentrate ବଢ଼ାଇଛି।' },
      { speaker: 'arohi', text: 'ରେସନ୍ର ଶକ୍ତି, fibre ଏବଂ concentrate ସମତୁଳନ ଯାଞ୍ଚ କରିବା ଦରକାର। ଆପଣଙ୍କ ଗାଈର ଓଜନ, ଦୁଧ, fat %, ଏବଂ ଦୈନିକ ଖାଦ୍ୟ ପରିମାଣ ଦିଅନ୍ତୁ। ମୁଁ ରେସନ୍ ବିଶ୍ଳେଷଣ ପାଇଁ ତଥ୍ୟ ଗଠନ କରିଦେବି।' }
    ]
  },
  {
    id: 16,
    titleOdia: '୧୦ ଲିଟର ଗାଈର Ration',
    titleEnglish: 'Ration Planning for 10 Litre Dairy Cow',
    category: 'nutrition',
    clinicalFocus: 'NASEM 2021 DMI, body weight, green fodder, dry fodder, concentrate balancing',
    probingQuestions: ['ଗାଈର ଓଜନ କେତେ?', 'Green fodder, dry fodder ଓ concentrate କେତେ ଦେଉଛନ୍ତି?'],
    redFlags: ['ଶୁଖିଲା ପଦାର୍ଥ (DM) ଅଭାବ'],
    suggestedTests: ['NASEM Ration Screening Calculator'],
    dialogue: [
      { speaker: 'farmer', text: '୧୦ ଲିଟର ଦୁଧ ଦେଉଥିବା ଗାଈକୁ କେତେ concentrate ଦେବି?' },
      { speaker: 'arohi', text: 'କେବଳ ଦୁଧ ଉତ୍ପାଦନ ଦେଖି concentrate ନିର୍ଦ୍ଧାରଣ କରିବା ଠିକ୍ ନୁହେଁ। ଗାଈର ଓଜନ, ଦୁଧର fat/protein, ବୟସ, lactation stage ଏବଂ ଆପଣ ଦେଉଥିବା ଘାସ/ନଡ଼ା/ଅନ୍ୟ feed ଜାଣିବା ଦରକାର।' },
      { speaker: 'farmer', text: 'ଓଜନ ପ୍ରାୟ ୪୫୦ କିଲୋ।' },
      { speaker: 'arohi', text: 'ଭଲ। ଦୈନିକ green fodder, dry fodder ଏବଂ concentrate କେତେ ଦେଉଛନ୍ତି ମୋତେ କୁହନ୍ତୁ। ତାହା ଆଧାରରେ ରେସନ୍ ଯାଞ୍ଚ କରିବା।' }
    ]
  },
  {
    id: 17,
    titleOdia: 'Mineral Mixture',
    titleEnglish: 'Role of Mineral Mixture in Dairy',
    category: 'nutrition',
    clinicalFocus: 'Chelated minerals, trace elements, reproductive health, milk yield',
    probingQuestions: ['କେଉଁ mineral mixture ନେବି?'],
    redFlags: ['ଅନିୟମିତ ଋତୁଚକ୍ର (anestrus)', 'ପୁନରାବୃତ୍ତି ପ୍ରଜନନ (repeat breeding)'],
    suggestedTests: ['Serum mineral profile', 'Feed mineral lab analysis'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈକୁ mineral mixture କାହିଁକି ଦେବି?' },
      { speaker: 'arohi', text: 'ଶରୀରର ବିଭିନ୍ନ କାର୍ଯ୍ୟ, ହାଡ଼, ଦୁଧ ଉତ୍ପାଦନ ଓ ପ୍ରଜନନ ପାଇଁ ବିଭିନ୍ନ minerals ଆବଶ୍ୟକ। କିନ୍ତୁ ପରିମାଣ ପଶୁର ଅବସ୍ଥା ଓ ରେସନ୍ ଉପରେ ନିର୍ଭର କରେ।' },
      { speaker: 'farmer', text: 'କେଉଁ mineral mixture ନେବି?' },
      { speaker: 'arohi', text: 'ଆପଣଙ୍କ ଗାଈର ରେସନ୍ ଓ ଆବଶ୍ୟକତା ଜାଣିବା ପରେ product label ର ingredients ତୁଳନା କରିପାରିବା। ମୁଁ ଆପଣଙ୍କୁ ingredient-wise comparison ମଧ୍ୟ ଦେଖାଇପାରିବି।' }
    ]
  },
  {
    id: 18,
    titleOdia: 'ମାଟି ଖାଉଛି (Pica)',
    titleEnglish: 'Licking Walls or Soil (Pica Behavior)',
    category: 'nutrition',
    clinicalFocus: 'Depraved appetite, phosphorus deficiency, sodium deficiency, worm infestation',
    probingQuestions: ['ମାଟି ସହିତ ଦିଵାଲ, କପଡ଼ା କିମ୍ବା ପ୍ଲାଷ୍ଟିକ୍ ମଧ୍ୟ ଖାଉଛି କି?'],
    redFlags: ['ଗୋବର ବନ୍ଦ ହେବା (foreign body obstruction)'],
    suggestedTests: ['Blood phosphorus level', 'Fecal exam for worms'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈଟା ମାଟି ଚାଟୁଛି।' },
      { speaker: 'arohi', text: 'ମାଟି ସହିତ ଦିଵାଲ, କପଡ଼ା କିମ୍ବା ପ୍ଲାଷ୍ଟିକ୍ ମଧ୍ୟ ଖାଉଛି କି?' },
      { speaker: 'farmer', text: 'ଦିଵାଲ ଚାଟେ।' },
      { speaker: 'arohi', text: 'ଏହା pica ଭଳି ବ୍ୟବହାର ହୋଇପାରେ। Mineral imbalance, ଖାଦ୍ୟର ଅଭାବ କିମ୍ବା ଅନ୍ୟ କାରଣ ଥାଇପାରେ। ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ration ଦିଅନ୍ତୁ। ଆବଶ୍ୟକ ହେଲେ mineral/nutrient assessment କରିବା।' }
    ]
  },
  {
    id: 19,
    titleOdia: 'ଗର୍ଭବତୀ ଗାଈ (୮ ମାସ)',
    titleEnglish: 'Transition Dry Cow Management (8th Month)',
    category: 'reproduction',
    clinicalFocus: 'Dry period nutrition, preventing milk fever, steaming up',
    probingQuestions: ['ଏବେ ତାର ଓଜନ, body condition ଏବଂ ଦୈନିକ feed କେତେ ଦେଉଛନ୍ତି?'],
    redFlags: ['ଅତ୍ୟଧିକ ମୋଟା (BCS > 4) ବା ଅତ୍ୟଧିକ କ୍ଷୀଣ (BCS < 2.5)'],
    suggestedTests: ['Body Condition Scoring (BCS)', 'Urine pH in close-up period'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଗାଈ ୮ ମାସର ଗର୍ଭବତୀ।' },
      { speaker: 'arohi', text: 'ଭଲ। ଏବେ ତାର ଓଜନ, body condition ଏବଂ ଦୈନିକ feed କେତେ ଦେଉଛନ୍ତି?' },
      { speaker: 'farmer', text: 'ଠିକ୍ ଜାଣିନାହିଁ।' },
      { speaker: 'arohi', text: 'ଶେଷ ୩ ସପ୍ତାହ ଗର୍ଭବତୀ ଗାଈ ପାଇଁ ବିଶେଷ ଯତ୍ନର ସମୟ। ଅତ୍ୟଧିକ ମୋଟା କିମ୍ବା ଅତ୍ୟଧିକ ଦୁର୍ବଳ ହେବା ଦୁଇଟି ମଧ୍ୟ ସମସ୍ୟା ଦେଇପାରେ। ଆପଣଙ୍କ feed list ପଠାନ୍ତୁ, ମୁଁ ଯାଞ୍ଚ କରିବି।' }
    ]
  },
  {
    id: 20,
    titleOdia: 'ଗାଈ ବାଛୁରୀ ଦେବାକୁ ଯାଉଛି',
    titleEnglish: 'Signs of Imminent Calving / Parturition',
    category: 'reproduction',
    clinicalFocus: 'Pelvic ligament relaxation, udder engorgement, restless behavior',
    probingQuestions: ['ଏବେ ବାରମ୍ବାର ଉଠୁଛି-ବସୁଛି କି?'],
    redFlags: ['Labor > 2 hours without progress (Dystocia)'],
    suggestedTests: ['Veterinary vaginal/pelvic assessment if labor stalls'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈ ବାଛୁରୀ ଦେବାକୁ ଯାଉଛି ବୋଲି କିପରି ଜାଣିବି?' },
      { speaker: 'arohi', text: 'ଥନ ଭରିବା, ଯୋନି ଅଞ୍ଚଳର ପରିବର୍ତ୍ତନ, ଅଶାନ୍ତ ହେବା, ଖାଦ୍ୟ ଆଚରଣର ପରିବର୍ତ୍ତନ ଭଳି ଲକ୍ଷଣ ଦେଖାଯାଇପାରେ।' },
      { speaker: 'farmer', text: 'ଏବେ ବାରମ୍ବାର ଉଠୁଛି-ବସୁଛି।' },
      { speaker: 'arohi', text: 'ତାକୁ ପରିଷ୍କାର, ଶାନ୍ତ ଓ ସୁରକ୍ଷିତ ସ୍ଥାନରେ ରଖନ୍ତୁ। ଯଦି labour ଆରମ୍ଭ ହୋଇ ଅସାଧାରଣ ଭାବେ ଦୀର୍ଘ ସମୟ ଧରି progress ନାହିଁ, ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।' }
    ]
  },
  {
    id: 21,
    titleOdia: 'Placenta ବାହାରିନାହିଁ (ROP)',
    titleEnglish: 'Retained Fetal Membranes (>12 Hours Postpartum)',
    category: 'reproduction',
    clinicalFocus: 'Never pull manually; check for systemic infection / metritis risk',
    probingQuestions: ['ବାଛୁରୀ ଦେଇ କେତେ ସମୟ ହେଲା?', 'ଦୁର୍ଗନ୍ଧ ଆସୁଛି କି?'],
    redFlags: ['ଜ୍ୱର', 'ଖାଇବା ବନ୍ଦ', 'ତୀବ୍ର ଦୁର୍ଗନ୍ଧଯୁକ୍ତ ସ୍ରାବ'],
    suggestedTests: ['Professional veterinary manual detachment if indicated'],
    dialogue: [
      { speaker: 'farmer', text: 'ବାଛୁରୀ ଦେବାର ୧୨ ଘଣ୍ଟା ହେଲା, placenta ବାହାରିନାହିଁ।' },
      { speaker: 'arohi', text: 'Placenta କୁ ନିଜେ ଟାଣି ବାହାର କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ ନାହିଁ। ଗାଈର ତାପମାତ୍ରା, ଭୋକ ଏବଂ ଅନ୍ୟ ଲକ୍ଷଣ ଦେଖନ୍ତୁ।' },
      { speaker: 'farmer', text: 'ଟିକେ ଦୁର୍ଗନ୍ଧ ଆସୁଛି।' },
      { speaker: 'arohi', text: 'ଏହା ସଂକ୍ରମଣର ଚିନ୍ତା ବଢ଼ାଏ। ଆଜିହିଁ ପଶୁ ଡାକ୍ତରଙ୍କୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।' }
    ]
  },
  {
    id: 22,
    titleOdia: 'ଦୁର୍ଗନ୍ଧଯୁକ୍ତ ସ୍ରାବ',
    titleEnglish: 'Foul Uterine Discharge (Acute Metritis)',
    category: 'reproduction',
    clinicalFocus: 'Puerperal metritis, fever, reduced appetite in fresh cow',
    probingQuestions: ['ବାଛୁରୀ ଦେଇ କେତେ ଦିନ ହେଲା?', 'ଗାଈ ଖାଉଛି କି?', 'ଜ୍ୱର ଅଛି କି?'],
    redFlags: ['ମାଟିଆ/ରକ୍ତମିଶ୍ରିତ ଦୁର୍ଗନ୍ଧ ପାଣି', 'ତାପମାତ୍ରା > 39.5°C'],
    suggestedTests: ['Rectal and vaginal speculum examination by vet'],
    dialogue: [
      { speaker: 'farmer', text: 'ବାଛୁରୀ ଦେବା ପରେ ଗାଈରୁ ଦୁର୍ଗନ୍ଧ ଥିବା ପାଣି ବାହାରୁଛି।' },
      { speaker: 'arohi', text: 'ବାଛୁରୀ ଦେଇ କେତେ ଦିନ ହେଲା? ଗାଈ ଖାଉଛି କି? ଜ୍ୱର ଅଛି କି?' },
      { speaker: 'farmer', text: '୫ ଦିନ। ଭୋକ କମିଛି।' },
      { speaker: 'arohi', text: 'ପ୍ରସବ ପରେ ଦୁର୍ଗନ୍ଧଯୁକ୍ତ ସ୍ରାବ ସହିତ ଭୋକ କମିବା ଗୁରୁତ୍ୱର ସଙ୍କେତ ହୋଇପାରେ। ତାପମାତ୍ରା ମାପନ୍ତୁ ଏବଂ ପଶୁ ଡାକ୍ତରଙ୍କୁ ଶୀଘ୍ର ଦେଖାନ୍ତୁ।' }
    ]
  },
  {
    id: 23,
    titleOdia: 'Ketosis ସନ୍ଦେହ',
    titleEnglish: 'Suspected Bovine Ketosis / Acetonemia',
    category: 'systemic',
    clinicalFocus: 'Rapid weight loss, drop in milk, selective appetite postpartum',
    probingQuestions: ['ବାଛୁରୀ ଦେଇ କେତେ ଦିନ?', 'ଭୋକ କମିଛି କି? ଓଜନ ଦ୍ରୁତ କମୁଛି କି?'],
    redFlags: ['ନିଶ୍ୱାସରୁ ମିଠା ଏସିଟୋନ୍ ଗନ୍ଧ', 'ସ୍ନାୟୁବିକ ଲକ୍ଷଣ (nervous ketosis)'],
    suggestedTests: ['Urine/milk dipstick test for acetoacetate/BHBA', 'Blood BHBA meter test'],
    dialogue: [
      { speaker: 'farmer', text: 'ବାଛୁରୀ ଦେବା ପରେ ଗାଈ ବହୁତ ପତଳା ହେଉଛି ଏବଂ ଦୁଧ କମିଛି।' },
      { speaker: 'arohi', text: 'ବାଛୁରୀ ଦେଇ କେତେ ଦିନ?' },
      { speaker: 'farmer', text: '୧୫ ଦିନ।' },
      { speaker: 'arohi', text: 'ଭୋକ କମିଛି କି? ଗାଈର ଶରୀର ଓଜନ ଦ୍ରୁତ କମୁଛି କି?' },
      { speaker: 'farmer', text: 'ହଁ।' },
      { speaker: 'arohi', text: 'ଏହା negative energy balance କିମ୍ବା ketosis ସହ ସମ୍ପର୍କିତ ହୋଇପାରେ, କିନ୍ତୁ କେବଳ ଲକ୍ଷଣ ଦେଖି ନିଶ୍ଚିତ କରିହେବ ନାହିଁ। Blood/milk/urine ketone testing ବିଷୟରେ ଡାକ୍ତରଙ୍କ ସହ କଥା ହୁଅନ୍ତୁ। ରିପୋର୍ଟ ମିଳିଲେ ଏଠାରେ upload କରନ୍ତୁ।' }
    ]
  },
  {
    id: 24,
    titleOdia: 'Milk Fever (ସୁତିକା ଜ୍ୱର)',
    titleEnglish: 'Clinical Hypocalcemia / Milk Fever',
    category: 'emergency',
    clinicalFocus: 'Cold extremities, recumbency, immediate calcium borogluconate IV needed',
    probingQuestions: ['ଉଠିପାରୁଛି କି?', 'କାନ/ପାଦ ଥଣ୍ଡା ଲାଗୁଛି କି?'],
    redFlags: ['ଗୋରୁ ବେକ ବଙ୍କା କରି ଶୋଇବା', 'ନାଡ଼ି ଦୁର୍ବଳ'],
    suggestedTests: ['Immediate emergency IV calcium infusion by licensed vet'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈ ବାଛୁରୀ ଦେବା ପରେ ଦୁର୍ବଳ ହୋଇ ପଡ଼ିଛି।' },
      { speaker: 'arohi', text: 'ଉଠିପାରୁଛି କି? କାନ/ପାଦ ଥଣ୍ଡା ଲାଗୁଛି କି?' },
      { speaker: 'farmer', text: 'ଉଠିପାରୁନାହିଁ।' },
      { speaker: 'arohi', text: 'ଏହା milk fever ସହିତ ଅନେକ ଗୁରୁତର ଅବସ୍ଥାର ସଙ୍କେତ ହୋଇପାରେ। ଏହା emergency। ତୁରନ୍ତ ପଶୁ ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।' }
    ]
  },
  {
    id: 25,
    titleOdia: 'ଗାଈର ତାପମାତ୍ରା (୪୦°C)',
    titleEnglish: 'High Rectal Temperature (Fever)',
    category: 'systemic',
    clinicalFocus: 'Systemic fever (>104°F) associated with acute mastitis or septicemia',
    probingQuestions: ['ଗାଈ ଖାଉଛି କି?', 'ଥନର ସମସ୍ୟା, କାଶ, ଦୁର୍ଗନ୍ଧଯୁକ୍ତ discharge ଅଛି କି?'],
    redFlags: ['ତାପମାତ୍ରା > 40.5°C', 'ଦ୍ରୁତ ଶ୍ୱାସକ୍ରିୟା'],
    suggestedTests: ['Blood smear for hemoprotozoa (Theileriosis, Babesiosis)', 'CMT test'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈର temperature ୪୦°C ଆସିଛି।' },
      { speaker: 'arohi', text: 'ଏହା ସାଧାରଣ ତାପମାତ୍ରାଠାରୁ ଅଧିକ ହୋଇପାରେ। ଗାଈ ଖାଉଛି କି? କାଶ, ନାକରୁ ପାଣି, ଥନର ସମସ୍ୟା, ଦୁର୍ଗନ୍ଧଯୁକ୍ତ discharge କିମ୍ବା ଅନ୍ୟ ଲକ୍ଷଣ ଅଛି କି?' },
      { speaker: 'farmer', text: 'ଖାଉନାହିଁ ଏବଂ ଥନ ମଧ୍ୟ ଫୁଲିଛି।' },
      { speaker: 'arohi', text: 'ଜ୍ୱର ସହିତ ଥନର ଲକ୍ଷଣ ଥିବାରୁ ମାଷ୍ଟାଇଟିସ୍ ଭଳି infection ଯାଞ୍ଚ କରିବା ଦରକାର। ଶୀଘ୍ର ପଶୁ ଡାକ୍ତରଙ୍କୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।' }
    ]
  },
  {
    id: 26,
    titleOdia: 'ଟିକାକରଣ (Vaccination)',
    titleEnglish: 'Vaccination Schedule for Dairy Cattle',
    category: 'preventive',
    clinicalFocus: 'FMD, HS, BQ, Theileriosis, Lumpy Skin Disease vaccination calendar',
    probingQuestions: ['ଗାଈର ବୟସ କେତେ?', 'କେଉଁ ଜିଲ୍ଲା?', 'ପୂର୍ବରୁ କୌଣସି ଟିକା ଦେଇଥିଲେ କି?'],
    redFlags: ['ଅସୁସ୍ଥ ପଶୁକୁ ଟିକା ନ ଦେବା (never vaccinate febrile animal)'],
    suggestedTests: ['Local veterinary hospital vaccination schedule verification'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈକୁ କେଉଁ କେଉଁ ଟିକା ଦେବା ଦରକାର?' },
      { speaker: 'arohi', text: 'ଏହା ଅଞ୍ଚଳ, ରୋଗ ଝୁମ୍ପ, ବୟସ ଏବଂ ପୂର୍ବ vaccination history ଉପରେ ନିର୍ଭର କରେ।' },
      { speaker: 'farmer', text: 'ପୁରୁଣା record ନାହିଁ।' },
      { speaker: 'arohi', text: 'ଠିକ୍ ଅଛି। ଗାଈର ବୟସ, ଜିଲ୍ଲା ଏବଂ ପୂର୍ବରୁ କୌଣସି ଟିକା ଦେଇଥିବା ମନେ ଅଛି କି ନାହିଁ କୁହନ୍ତୁ। ତାପରେ ସ୍ଥାନୀୟ ପଶୁଚିକିତ୍ସକଙ୍କ ସହ vaccination schedule ନିଶ୍ଚିତ କରନ୍ତୁ।' }
    ]
  },
  {
    id: 27,
    titleOdia: 'ଡିୱର୍ମିଂ (Deworming)',
    titleEnglish: 'Deworming Strategy & Fecal Screening',
    category: 'preventive',
    clinicalFocus: 'Targeted selective deworming based on fecal egg count rather than blind dosing',
    probingQuestions: ['ଓଜନ କମୁଛି କି?', 'ମଳରେ ପୋକ ଦେଖାଯାଇଛି କି?'],
    redFlags: ['କମ୍ଫ ଝାଡ଼ା (foul scouring)', 'ଚିବୁକ ଫୁଲିବା (submandibular edema)'],
    suggestedTests: ['Fecal floatation/sedimentation report upload'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈକୁ କେବେ deworming କରିବି?' },
      { speaker: 'arohi', text: 'ସବୁ ପଶୁକୁ ଏକେ schedule ରେ deworm କରିବା ଠିକ୍ ନୁହେଁ। ବୟସ, ଅଞ୍ଚଳ, ପରଜୀବୀ ଝୁମ୍ପ ଏବଂ ଆବଶ୍ୟକ ହେଲେ fecal examination ଉପରେ ନିର୍ଭର କରେ।' },
      { speaker: 'farmer', text: 'ମୋ ଗାଈର ଓଜନ କମୁଛି।' },
      { speaker: 'arohi', text: 'ମଳ ପରୀକ୍ଷା କଲେ ପରଜୀବୀ ବିଷୟରେ ଅଧିକ ସ୍ପଷ୍ଟତା ମିଳିପାରେ। ରିପୋର୍ଟ ଥିଲେ upload କରନ୍ତୁ।' }
    ]
  },
  {
    id: 28,
    titleOdia: 'କାଶ ଓ ନାକରୁ ପାଣି',
    titleEnglish: 'Cough and Respiratory Issues (Bovine Respiratory Disease)',
    category: 'systemic',
    clinicalFocus: 'Pneumonia / Bronchitis, rapid breathing, lung auscultation',
    probingQuestions: ['କେତେ ଦିନ ହେଲା?', 'ନାକରୁ ପାଣି ଆସୁଛି କି?', 'ଜ୍ୱର ଅଛି କି?', 'ଶ୍ୱାସକଷ୍ଟ ଅଛି କି?'],
    redFlags: ['ବେକ ଲମ୍ବାଇ ଶ୍ୱାସ ନେବା', 'ଘୁଡୁଘୁଡୁ ଶବ୍ଦ'],
    suggestedTests: ['Stethoscope lung sound auscultation', 'Nasal swab PCR'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଗାଈ ବାରମ୍ବାର କାଶୁଛି।' },
      { speaker: 'arohi', text: 'କେତେ ଦିନ ହେଲା? ନାକରୁ ପାଣି ଆସୁଛି କି? ଜ୍ୱର ଅଛି କି?' },
      { speaker: 'farmer', text: 'ଚାରି ଦିନ। ନାକରୁ ମଧ୍ୟ ପାଣି ଆସୁଛି।' },
      { speaker: 'arohi', text: 'ଶ୍ୱାସ ଦ୍ରୁତ କିମ୍ବା କଷ୍ଟକର ହେଉଛି କି?' },
      { speaker: 'farmer', text: 'ଟିକେ ଦ୍ରୁତ।' },
      { speaker: 'arohi', text: 'ଶ୍ୱାସକଷ୍ଟ ବଢ଼ିଲେ ଅପେକ୍ଷା କରନ୍ତୁ ନାହିଁ। ଡାକ୍ତରଙ୍କ ପରୀକ୍ଷା ଆବଶ୍ୟକ। ଭିଡିଓ ରେକର୍ଡ କରି ପଠାଇଲେ ମଧ୍ୟ ମୁଁ ଦେଖିପାରିବି, କିନ୍ତୁ ଭିଡିଓ ଦ୍ୱାରା diagnosis ନିଶ୍ଚିତ କରାଯିବ ନାହିଁ।' }
    ]
  },
  {
    id: 29,
    titleOdia: 'ଖୁର ସମସ୍ୟା ଓ ଛୋଟେଇବା',
    titleEnglish: 'Hoof Lesions and Lameness (Foot Rot / Sole Ulcer)',
    category: 'locomotor',
    clinicalFocus: 'Interdigital necrobacillosis, sole ulcer, wet flooring',
    probingQuestions: ['ଖୁରରେ ଘା, ଫାଟ, ସୋଜା କିମ୍ବା ଦୁର୍ଗନ୍ଧ ଅଛି କି?'],
    redFlags: ['ଗୋଡ଼ ଉପରେ ଆଦୌ ଭର ନ ଦେଇ ପାରିବା', 'ଶରୀର ଅତ୍ୟନ୍ତ କମ୍ପିବା'],
    suggestedTests: ['Hoof inspection and trimming by vet'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈଟା ଗୋଟିଏ ପାଦରେ ଭର ଦେଉନାହିଁ।' },
      { speaker: 'arohi', text: 'ଖୁରରେ ଘା, ଫାଟ, ସୋଜା କିମ୍ବା ଦୁର୍ଗନ୍ଧ ଅଛି କି?' },
      { speaker: 'farmer', text: 'ଖୁର ମଧ୍ୟରେ ଘା ଭଳି ଅଛି।' },
      { speaker: 'arohi', text: 'ଖୁରର ଦୁଇ ପଟୁରୁ ଭଲ ଆଲୋକରେ ଫଟୋ ପଠାନ୍ତୁ। ଯଦି ଗାଈ ଚାଲିପାରୁନାହିଁ କିମ୍ବା ବହୁତ ବ୍ୟଥା ଅଛି, ଡାକ୍ତରଙ୍କୁ ଦେଖାନ୍ତୁ।' }
    ]
  },
  {
    id: 30,
    titleOdia: 'ଚର୍ମରେ ଗୋଟିଏ ଗୋଟିଏ ଗାଠି (LSD ସନ୍ଦେହ)',
    titleEnglish: 'Skin Nodules / Lumpy Skin Disease (LSD) Screening',
    category: 'infectious',
    clinicalFocus: 'Nodular lesions with fever, vector control, isolation',
    probingQuestions: ['କେତେଟି ଗାଠି?', 'ଜ୍ୱର ଅଛି କି?', 'ନୂଆ ପଶୁ ଗୋଠକୁ ଆଣିଥିଲେ କି?'],
    redFlags: ['ଗୋଡ଼ ଓ ଗଳା ଫୁଲିବା (dewlap edema)', 'ନାକରୁ ରକ୍ତମିଶ୍ରିତ ପାଣି'],
    suggestedTests: ['Skin biopsy / PCR for Capripoxvirus'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈର ଚର୍ମରେ ଗୋଟିଏ ଗୋଟିଏ ଗାଠି ହୋଇଛି।' },
      { speaker: 'arohi', text: 'କେତେଟି ଗାଠି? ଜ୍ୱର ଅଛି କି? ନୂଆ ପଶୁ ଗୋଠକୁ ଆଣିଥିଲେ କି?' },
      { speaker: 'farmer', text: 'ଅନେକ ଅଛି। ଜ୍ୱର ମଧ୍ୟ ଅଛି।' },
      { speaker: 'arohi', text: 'ଫଟୋ ପଠାନ୍ତୁ। ଏପରି skin lesions ର ଅନେକ କାରଣ ଥାଇପାରେ। ଜ୍ୱର ସହିତ ଅନେକ ଗାଠି ଥିଲେ ପଶୁ ଡାକ୍ତରଙ୍କୁ ଦେଖାଇବା ଭଲ।' }
    ]
  },
  {
    id: 31,
    titleOdia: 'ପ୍ଲାଷ୍ଟିକ୍ ଖାଉଛି',
    titleEnglish: 'Plastic Ingestion / Rumen Foreign Body (TRP)',
    category: 'rumen_health',
    clinicalFocus: 'Risk of plastic impaction, reticuloperitonitis, appetite cessation',
    probingQuestions: ['କେବଳ ପ୍ଲାଷ୍ଟିକ୍ ଖାଉଛି କି ମାଟି/କପଡ଼ା ମଧ୍ୟ?'],
    redFlags: ['ପେଟ ଫୁଲି ରହିବା (chronic tympany)', 'ଗୋବର କଳା ହେବା'],
    suggestedTests: ['Rumen radiography / ultrasound', 'Rumenotomy assessment'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଗାଈ ପ୍ଲାଷ୍ଟିକ୍ ଖାଇଦେଉଛି।' },
      { speaker: 'arohi', text: 'କେବଳ ପ୍ଲାଷ୍ଟିକ୍ ଖାଉଛି କି ମାଟି/କପଡ଼ା ମଧ୍ୟ ଖାଉଛି?' },
      { speaker: 'farmer', text: 'ପ୍ଲାଷ୍ଟିକ୍ ମଧ୍ୟ ଖାଉଛି।' },
      { speaker: 'arohi', text: 'ପ୍ଲାଷ୍ଟିକ୍ ପଶୁ ପାଇଁ ଗୁରୁତର ସମସ୍ୟା କରିପାରେ। ଖାଦ୍ୟ ସ୍ଥାନରୁ ପ୍ଲାଷ୍ଟିକ୍ ତୁରନ୍ତ ହଟାନ୍ତୁ। ଯଦି ବହୁତ ପ୍ଲାଷ୍ଟିକ୍ ଖାଇଥାଏ, ଭୋକ କମିଛି, ଗୋବର କମିଛି କିମ୍ବା ପେଟ ଫୁଲୁଛି, ଡାକ୍ତରଙ୍କୁ ତୁରନ୍ତ ଦେଖାନ୍ତୁ।' }
    ]
  },
  {
    id: 32,
    titleOdia: 'ପାଣି କମ୍ ପିଉଛି',
    titleEnglish: 'Reduced Water Intake & Water Quality',
    category: 'management',
    clinicalFocus: 'Algal growth, dirty trough, dehydration, fever check',
    probingQuestions: ['ପାଣି ସଫା ଅଛି କି?', 'ପାଣି ପିଇବା ଜାଗା ସହଜରେ ପହଞ୍ଚିପାରୁଛି କି?', 'ଭୋକ କେମିତି?'],
    redFlags: ['ମୂତ୍ର ଅତ୍ୟନ୍ତ ଗାଢ଼ ହଳଦିଆ'],
    suggestedTests: ['Water TDS and bacterial testing'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈ ପାଣି କମ୍ ପିଉଛି।' },
      { speaker: 'arohi', text: 'ଗରମ ପାଗ କି? ପାଣି ସଫା ଅଛି କି? ପାଣି ପିଇବା ଜାଗା ସହଜରେ ପହଞ୍ଚିପାରୁଛି କି? ଭୋକ କେମିତି?' },
      { speaker: 'farmer', text: 'ପାଣି ଟାଙ୍କି ଟିକେ ମଇଳା ଥିଲା।' },
      { speaker: 'arohi', text: 'ପାଣିପାତ୍ର ଭଲଭାବରେ ସଫା କରନ୍ତୁ ଏବଂ ସବୁବେଳେ ସଫା ପାଣି ଉପଲବ୍ଧ ରଖନ୍ତୁ। ଭୋକ ମଧ୍ୟ କମିଲେ କିମ୍ବା ଡିହାଇଡ୍ରେସନ୍ ଲକ୍ଷଣ ଥିଲେ ଆଉ ଯାଞ୍ଚ ଆବଶ୍ୟକ।' }
    ]
  },
  {
    id: 33,
    titleOdia: 'ଗରମରେ ହାଫୁଛି (Heat Stress)',
    titleEnglish: 'Panting & Heat Stress in Crossbred Cows',
    category: 'management',
    clinicalFocus: 'Temperature-Humidity Index (THI) > 72, milk drop, fan/sprinklers',
    probingQuestions: ['ଛାଇ ଅଛି କି?', 'ବାୟୁ ଚଳାଚଳ କେମିତି?', 'ସବୁବେଳେ ପାଣି ମିଳୁଛି କି?'],
    redFlags: ['ଜିଭ ବାହାର କରି ଲାଳ ଝରାଇବା', 'ଶରୀର ତାପମାତ୍ରା > 40.5°C'],
    suggestedTests: ['Core rectal temperature monitoring'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗରମରେ ମୋ ଗାଈ ହାଫୁଛି।' },
      { speaker: 'arohi', text: 'ଛାଇ ଅଛି କି? ସବୁବେଳେ ପାଣି ମିଳୁଛି କି?' },
      { speaker: 'farmer', text: 'ପାଣି ଅଛି, କିନ୍ତୁ ଛାଇ କମ୍।' },
      { speaker: 'arohi', text: 'ଛାଇ ଓ ବାୟୁ ଚଳାଚଳ ବଢ଼ାନ୍ତୁ। ସଫା ପାଣି ସବୁବେଳେ ରଖନ୍ତୁ। ହାଫିବା ବହୁତ ବଢ଼ିଲେ କିମ୍ବା ଗାଈ ଦୁର୍ବଳ ହେଲେ ଶୀଘ୍ର ଚିକିତ୍ସା ସହାୟତା ନିଅନ୍ତୁ।' }
    ]
  },
  {
    id: 34,
    titleOdia: 'Heat ଆସୁନାହିଁ (Anestrus)',
    titleEnglish: 'Postpartum Anestrus / Failure to Show Estrus',
    category: 'reproduction',
    clinicalFocus: '7 months postpartum without heat, negative energy balance, silent heat',
    probingQuestions: ['ବାଛୁରୀ ଦେଇ କେତେ ଦିନ?', 'ଦୁଧ କେତେ?', 'Body condition score କେମିତି?'],
    redFlags: ['ଅତ୍ୟନ୍ତ କ୍ଷୀଣ ଅବସ୍ଥା (BCS < 2.0)'],
    suggestedTests: ['Veterinary per-rectal ovarian palpation / ultrasound for corpus luteum or cysts'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଗାଈକୁ heat ଆସୁନାହିଁ।' },
      { speaker: 'arohi', text: 'ଶେଷ ଥର ବାଛୁରୀ ଦେଇ କେତେ ଦିନ? ଦୁଧ କେତେ? body condition କେମିତି?' },
      { speaker: 'farmer', text: '୭ ମାସ ହେଲା।' },
      { speaker: 'arohi', text: 'ଏହାର ଅନେକ କାରଣ ଥାଇପାରେ—ପୋଷଣ, ovarian activity, ଗର୍ଭାବସ୍ଥା କିମ୍ବା reproductive disorders। ପ୍ରଥମେ pregnancy status ନିଶ୍ଚିତ କରିବା ଦରକାର ହୋଇପାରେ। Veterinary reproductive examination କରାନ୍ତୁ।' }
    ]
  },
  {
    id: 35,
    titleOdia: 'AI ପରେ ଗର୍ଭ ଧରୁନାହିଁ (Repeat Breeding)',
    titleEnglish: 'Repeat Breeding After Artificial Insemination',
    category: 'reproduction',
    clinicalFocus: 'Insemination timing (AM-PM rule), semen quality, subclinical uterine infection',
    probingQuestions: ['ପ୍ରତ୍ୟେକ AI କେବେ କରିଥିଲେ?', 'Heat କିପରି ଚିହ୍ନଟ କରିଥିଲେ?'],
    redFlags: ['ମଇଳା ବା କାଦୁଆ ସ୍ରାବ (white side test positive)'],
    suggestedTests: ['Endometrial cytology / uterine culture'],
    dialogue: [
      { speaker: 'farmer', text: 'ଦୁଇଥର AI କରିଛି, ତଥାପି ଗର୍ଭ ଧରୁନାହିଁ।' },
      { speaker: 'arohi', text: 'ପ୍ରତ୍ୟେକ AI କେବେ କରିଥିଲେ? Heat କିପରି ଚିହ୍ନଟ କରିଥିଲେ?' },
      { speaker: 'farmer', text: 'Heat ଆସିଲେ କରିଥିଲି।' },
      { speaker: 'arohi', text: 'Nutrition, heat detection, semen handling, timing ଏବଂ reproductive health—ସବୁ ଭୂମିକା ନେଇପାରେ। ଏବେ veterinary reproductive examination କରାଇବା ଭଲ।' }
    ]
  },
  {
    id: 36,
    titleOdia: 'Pregnancy Test କେବେ ଓ କିପରି',
    titleEnglish: 'Pregnancy Diagnosis (PD) Confirmation',
    category: 'reproduction',
    clinicalFocus: 'Safe per-rectal exam after 60-90 days or ultrasound at 30 days',
    probingQuestions: ['AI କରିବା ପରେ କେତେ ଦିନ ହେଲା?'],
    redFlags: ['ଅଜ୍ଞାତ ଲୋକଙ୍କ ଦ୍ୱାରା ଅସୁରକ୍ଷିତ ହାତ ଯାଞ୍ଚ କରି ଭୃଣ ନଷ୍ଟ ହେବା'],
    suggestedTests: ['Per-rectal examination by authorized vet', 'Blood PAG (Pregnancy-Associated Glycoproteins) test'],
    dialogue: [
      { speaker: 'farmer', text: 'AI କରିବା ପରେ ଗାଈ ଗର୍ଭବତୀ କି ନାହିଁ କିପରି ଜାଣିବି?' },
      { speaker: 'arohi', text: 'କେବଳ ବାହ୍ୟ ଲକ୍ଷଣ ଦେଖି ନିଶ୍ଚିତ କହିବା ଠିକ୍ ନୁହେଁ। ଯଥାସମୟରେ veterinary pregnancy examination କିମ୍ବା ଉପଯୁକ୍ତ test କରାଯାଇପାରେ।' },
      { speaker: 'farmer', text: 'ରିପୋର୍ଟ ମିଳିଲେ?' },
      { speaker: 'arohi', text: 'ଏଠାରେ report ର photo କିମ୍ବା PDF upload କରନ୍ତୁ। ମୁଁ report ର ମୁଖ୍ୟ ତଥ୍ୟ ବୁଝାଇଦେବି।' }
    ]
  },
  {
    id: 37,
    titleOdia: 'ବାଛୁରୀର ବୃଦ୍ଧି କମ୍ (Poor Growth)',
    titleEnglish: 'Stunted Calf Growth & Starter Ration',
    category: 'calf_health',
    clinicalFocus: '4-month-old calf, low calf starter, internal parasites, weaning weight',
    probingQuestions: ['ବାଛୁରୀ କେତେ ମାସର?', 'ଦୈନିକ କେତେ କ୍ଷୀର, calf starter ଏବଂ fodder ଦେଉଛନ୍ତି?'],
    redFlags: ['ରୁଖା ଚର୍ମ (rough coat), pot-bellied appearance'],
    suggestedTests: ['Fecal egg count', 'Weight tape measurement'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ବାଛୁରୀ ବୟସ ଅନୁସାରେ ବଢ଼ୁନାହିଁ।' },
      { speaker: 'arohi', text: 'ବାଛୁରୀ କେତେ ମାସର? ଦୈନିକ କେତେ କ୍ଷୀର, calf starter ଏବଂ fodder ଦେଉଛନ୍ତି?' },
      { speaker: 'farmer', text: '୪ ମାସ। Starter କମ୍ ଦେଉଛି।' },
      { speaker: 'arohi', text: 'ଖାଦ୍ୟ ପରିମାଣ ସହିତ ରୋଗ, ପରଜୀବୀ ଓ ପୂର୍ବରୁ ହୋଇଥିବା diarrhea ମଧ୍ୟ ବୃଦ୍ଧିକୁ ପ୍ରଭାବିତ କରିପାରେ। ଓଜନ କିମ୍ବା growth measurements ଥିଲେ ଦିଅନ୍ତୁ।' }
    ]
  },
  {
    id: 38,
    titleOdia: 'ଗାଈର ଆଖି ହଳଦିଆ (Jaundice)',
    titleEnglish: 'Jaundice / Yellow Mucosa (Icterus)',
    category: 'systemic',
    clinicalFocus: 'Hemoprotozoan parasites (Babesia, Anaplasma, Theileria) or liver dysfunction',
    probingQuestions: ['ଭୋକ କମିଛି କି?', 'ପିଶାବର ରଙ୍ଗ ବଦଳିଛି କି (କଫି ବା ନାଲି)?'],
    redFlags: ['କଫି ରଙ୍ଗର ପିଶାବ (Hemoglobinuria)', 'ଅତି ତୀବ୍ର ଜ୍ୱର'],
    suggestedTests: ['Blood smear examination for Babesia / Theileria', 'Liver function test'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈର ଆଖି ହଳଦିଆ ଲାଗୁଛି।' },
      { speaker: 'arohi', text: 'ଏହା ନୂଆ ପରିବର୍ତ୍ତନ କି? ଭୋକ କମିଛି କି? ପିଶାବର ରଙ୍ଗ ବଦଳିଛି କି?' },
      { speaker: 'farmer', text: 'ଭୋକ କମିଛି।' },
      { speaker: 'arohi', text: 'ଆଖିର ଭଲ ଆଲୋକରେ ଫଟୋ ପଠାନ୍ତୁ। ହଳଦିଆ ରଙ୍ଗର ଅନେକ କାରଣ ଥାଇପାରେ ଏବଂ କେବଳ ଫଟୋରୁ କାରଣ ନିଶ୍ଚିତ କରିହେବ ନାହିଁ। Blood/liver-related testing ଆବଶ୍ୟକ କି ନାହିଁ ଡାକ୍ତର ନିର୍ଣ୍ଣୟ କରନ୍ତୁ।' }
    ]
  },
  {
    id: 39,
    titleOdia: 'ରକ୍ତ ପରୀକ୍ଷା Report ବୁଝିବା',
    titleEnglish: 'Interpreting Veterinary Blood Test Report',
    category: 'diagnostics',
    clinicalFocus: 'Explaining CBC, Hb, PCV, TLC values without over-diagnosing',
    probingQuestions: ['ରିପୋର୍ଟଟି ଏଠାରେ upload କରନ୍ତୁ।'],
    redFlags: ['Hb < 6 g/dL', 'Platelets critically low'],
    suggestedTests: ['Veterinary clinical correlation'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଗାଈର blood test ହୋଇଛି, କିଛି ବୁଝିପାରୁନାହିଁ।' },
      { speaker: 'arohi', text: 'ରିପୋର୍ଟଟି ଏଠାରେ photo କିମ୍ବା PDF ଭାବରେ upload କରନ୍ତୁ।' },
      { speaker: 'farmer', text: 'Upload କଲି।' },
      { speaker: 'arohi', text: 'ମୁଁ report ର value, reference range ଏବଂ କେଉଁ value ଅସାଧାରଣ ଦେଖାଯାଉଛି ତାହା ସହଜ ଭାଷାରେ ବୁଝାଇଦେବି। କିନ୍ତୁ report ମାତ୍ର ଆଧାରରେ diagnosis କିମ୍ବା treatment ନିର୍ଦ୍ଧାରଣ କରିବି ନାହିଁ; ଲକ୍ଷଣ ଓ veterinarian assessment ମଧ୍ୟ ଆବଶ୍ୟକ ହୋଇପାରେ।' }
    ]
  },
  {
    id: 40,
    titleOdia: 'ଫଟୋ ଦେଖି ରୋଗ କହିବା',
    titleEnglish: 'Photo Diagnosis Safety Limits',
    category: 'diagnostics',
    clinicalFocus: 'Images are supportive screening tools, never definitive clinical replacements',
    probingQuestions: ['ଆଉ କେତେ ଦିନ ହେଲା?', 'ଜ୍ୱର ଅଛି କି?', 'ଭୋକ କେମିତି?'],
    redFlags: ['କେବଳ ଫଟୋରୁ ଆଣ୍ଟିବାୟୋଟିକ ନିର୍ଦ୍ଦେଶ ନ ଦେବା'],
    suggestedTests: ['Physical veterinary palpation and swab test'],
    dialogue: [
      { speaker: 'farmer', text: 'ଏହି ଫଟୋ ଦେଖି କୁହନ୍ତୁ ଗାଈର କଣ ହୋଇଛି।' },
      { speaker: 'arohi', text: 'ଫଟୋଟି upload କରନ୍ତୁ। ମୁଁ ଦେଖାଯାଉଥିବା ଲକ୍ଷଣ ବର୍ଣ୍ଣନା କରିପାରିବି ଏବଂ କେଉଁ ସମ୍ଭାବନାଗୁଡ଼ିକ ଯାଞ୍ଚ କରିବା ଦରକାର କହିପାରିବି।' },
      { speaker: 'farmer', text: 'ଫଟୋ ଦେଲି।' },
      { speaker: 'arohi', text: 'ଏହି ଫଟୋରେ ଦୃଶ୍ୟମାନ ଲକ୍ଷଣ ଦେଖାଯାଉଛି। କିନ୍ତୁ କେବଳ ଫଟୋ ଆଧାରରେ ନିଶ୍ଚିତ diagnosis କରିବା ସୁରକ୍ଷିତ ନୁହେଁ। ଆଉ କେତେ ଦିନ ହେଲା, ଜ୍ୱର ଅଛି କି, ଭୋକ କେମିତି—ଏଗୁଡ଼ିକ କୁହନ୍ତୁ।' }
    ]
  },
  {
    id: 41,
    titleOdia: 'Poisoning ସନ୍ଦେହ (Emergency)',
    titleEnglish: 'Suspected Pesticide or Chemical Toxicity (Emergency)',
    category: 'emergency',
    clinicalFocus: 'Organophosphate/carbamate toxicity, excessive salivation, keep label safe',
    probingQuestions: ['କଣ ଖାଇଥାଇପାରେ ଜାଣନ୍ତି କି?'],
    redFlags: ['ଅତ୍ୟଧିକ ଲାଳ (hypersalivation)', 'ମାଂସପେଶୀ କମ୍ପନ (tremors)', 'ପିତୁଳା ସଙ୍କୁଚିତ ହେବା'],
    suggestedTests: ['Immediate emergency administration of atropine by veterinary doctor'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈ ଅଜଣା କିଛି ଖାଇଦେଇଛି। ଏବେ ଲାଳ ବାହାରୁଛି।' },
      { speaker: 'arohi', text: 'କଣ ଖାଇଥାଇପାରେ ଜାଣନ୍ତି କି?' },
      { speaker: 'farmer', text: 'କ୍ଷେତରେ କିଛି ଔଷଧ ଛିଞ୍ଚା ଯାଇଥିଲା।' },
      { speaker: 'arohi', text: 'ବିଷାକ୍ତ ପଦାର୍ଥ ସନ୍ଦେହ ଥିଲେ ଏହା emergency ହୋଇପାରେ। ଯେଉଁ chemical/product ବ୍ୟବହାର ହୋଇଥିଲା ତାର label ର photo ନେଇ ରଖନ୍ତୁ ଏବଂ ତୁରନ୍ତ ପଶୁ ଡାକ୍ତରଙ୍କୁ ଯୋଗାଯୋଗ କରନ୍ତୁ। ନିଜେ ବାନ୍ତି କରାଇବା କିମ୍ବା ଅଜଣା ଔଷଧ ଦେବା ଚେଷ୍ଟା କରନ୍ତୁ ନାହିଁ।' }
    ]
  },
  {
    id: 42,
    titleOdia: 'ଦୁଧରେ ଅସାଧାରଣ ଗନ୍ଧ',
    titleEnglish: 'Off-Flavour and Abnormal Milk Odour',
    category: 'milk_quality',
    clinicalFocus: 'Silage feed taint, ketosis sweet odor, bacterial contamination',
    probingQuestions: ['ଦୁଧ ଦୋହିବା ପରେ ସଙ୍ଗେସଙ୍ଗେ ଗନ୍ଧ ଥିଲା କି ରଖିବା ପରେ?'],
    redFlags: ['ଦୁଧ ଜମାଟ ବାନ୍ଧିବା'],
    suggestedTests: ['Methylene Blue Reduction Test (MBRT)', 'Microbial milk test'],
    dialogue: [
      { speaker: 'farmer', text: 'ଦୁଧର ଗନ୍ଧ ବଦଳିଯାଇଛି।' },
      { speaker: 'arohi', text: 'ଦୁଧ ଦୋହିବା ପରେ ସଙ୍ଗେସଙ୍ଗେ ଗନ୍ଧ ଥିଲା କି ରଖିବା ପରେ?' },
      { speaker: 'farmer', text: 'ଦୋହିବା ସମୟରୁ।' },
      { speaker: 'arohi', text: 'ଗାଈର ଖାଦ୍ୟ, ଥନ ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ milking hygiene ଯାଞ୍ଚ କରିବା ଦରକାର। ଦୁଧର ଫଟୋ ଓ ଥନର ଫଟୋ ପଠାନ୍ତୁ। ଯଦି quality test ହୋଇଛି, report ମଧ୍ୟ upload କରନ୍ତୁ।' }
    ]
  },
  {
    id: 43,
    titleOdia: 'ଦୁଧର SNF କମ୍',
    titleEnglish: 'Low Solids-Not-Fat (SNF) Analysis',
    category: 'nutrition',
    clinicalFocus: 'Energy deficit in ration leading to low milk protein and SNF < 8.5%',
    probingQuestions: ['ଆପଣଙ୍କ test report ରେ fat, SNF, protein values ଅଛି କି?'],
    redFlags: ['ଗାଈର ଶରୀର ସ୍ଥିତି ଦ୍ରୁତ ଖରାପ ହେବା'],
    suggestedTests: ['Dairy cooperative auto-analyzer report upload'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଦୁଧର SNF କମ୍ ଆସୁଛି।' },
      { speaker: 'arohi', text: 'ଆପଣଙ୍କ test report ରେ fat, SNF, protein ଏବଂ total solids values ଅଛି କି?' },
      { speaker: 'farmer', text: 'ଅଛି।' },
      { speaker: 'arohi', text: 'Report upload କରନ୍ତୁ। ସେଥିରେ କେଉଁ parameter କମ୍ ଅଛି ଏବଂ feed/nutrition ଦୃଷ୍ଟିରୁ କଣ ଯାଞ୍ଚ କରିବା ଦରକାର, ମୁଁ ବୁଝାଇଦେବି।' }
    ]
  },
  {
    id: 44,
    titleOdia: 'ରେସନ୍ ବଦଳ ଓ ନୂଆ Feed',
    titleEnglish: 'Safe Feed Transitioning Strategy',
    category: 'nutrition',
    clinicalFocus: 'Transitioning to new concentrate over 7-10 days to adapt rumen microbes',
    probingQuestions: ['କେଉଁ feed? ଏବେ କଣ ଦେଉଛନ୍ତି?'],
    redFlags: ['ହଠାତ୍ ୧୦୦% ବଦଳ କରି ଡାଇରିଆ ଓ ଏସିଡୋସିସ ହେବା'],
    suggestedTests: ['NASEM Feed Composition Comparison'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୁଁ ଗାଈକୁ ନୂଆ feed ଦେବାକୁ ଚାହୁଁଛି।' },
      { speaker: 'arohi', text: 'କେଉଁ feed? ଏବେ କଣ ଦେଉଛନ୍ତି?' },
      { speaker: 'farmer', text: 'ପୁରୁଣା concentrate ବଦଳରେ maize-based feed ଦେବି।' },
      { speaker: 'arohi', text: 'ହଠାତ୍ ସମ୍ପୂର୍ଣ୍ଣ feed ବଦଳାଇବେ ନାହିଁ। ନୂଆ feed ଧୀରେ ଧୀରେ introduce କରିବା ଭଲ। ଆପଣଙ୍କ ପୁରୁଣା ଓ ନୂଆ feed ର ingredient composition ଦିଅନ୍ତୁ; ମୁଁ ତୁଳନା କରିପାରିବି।' }
    ]
  },
  {
    id: 45,
    titleOdia: 'ପାଣି + ଦୁଧ ଉତ୍ପାଦନ',
    titleEnglish: 'Daily Water Requirement Calculation',
    category: 'management',
    clinicalFocus: 'Dairy cows require 3-4 liters of water per liter of milk produced + 40-50L maintenance',
    probingQuestions: ['ମୋ ଗାଈ ୧୨ ଲିଟର ଦୁଧ ଦେଉଛି। କେତେ ପାଣି ଦରକାର?'],
    redFlags: ['ପାଣି କମିଲେ ଦୁଧ ତୁରନ୍ତ ୨୦-୩୦% କମିଯିବା'],
    suggestedTests: ['Free-choice ad-libitum clean water supply'],
    dialogue: [
      { speaker: 'farmer', text: 'ଦୁଧ ଦେଉଥିବା ଗାଈକୁ କେତେ ପାଣି ଦେବି?' },
      { speaker: 'arohi', text: 'ପାଣିର ଆବଶ୍ୟକତା ଗାଈର ଶରୀର ଓଜନ, ଦୁଧ ଉତ୍ପାଦନ, feed dry matter ଏବଂ ପାଗ ଉପରେ ବଦଳିଥାଏ। ତେଣୁ ଗୋଟିଏ fixed litre ସମସ୍ତ ଗାଈ ପାଇଁ ଠିକ୍ ନୁହେଁ।' },
      { speaker: 'farmer', text: 'ମୋ ଗାଈ ୧୨ ଲିଟର ଦୁଧ ଦେଉଛି।' },
      { speaker: 'arohi', text: 'ଗରମ ପାଗରେ ଆବଶ୍ୟକତା ଆହୁରି ବଢ଼ିପାରେ। ସଫା ପାଣି ସବୁବେଳେ ସହଜରେ ଉପଲବ୍ଧ ରଖନ୍ତୁ।' }
    ]
  },
  {
    id: 46,
    titleOdia: 'ମାଷ୍ଟାଇଟିସ୍ ପ୍ରତିରୋଧ (Mastitis Prevention)',
    titleEnglish: 'Milking Hygiene and Udder Health Protocol',
    category: 'preventive',
    clinicalFocus: 'Post-milking teat dipping, clean dry standing time for 30 minutes',
    probingQuestions: ['Milking ସମୟର hygiene କେମିତି ରଖୁଛନ୍ତି?'],
    redFlags: ['ବାରମ୍ବାର ମାଷ୍ଟାଇଟିସ ହୋଇ କ୍ୱାର୍ଟର ନଷ୍ଟ ହେବା'],
    suggestedTests: ['Milk culture and antibiotic susceptibility test'],
    dialogue: [
      { speaker: 'farmer', text: 'ମୋ ଗାଈକୁ ବାରମ୍ବାର mastitis ହେଉଛି। କଣ କରିବି?' },
      { speaker: 'arohi', text: 'Milking ସମୟର hygiene କେମିତି ରଖୁଛନ୍ତି?' },
      { speaker: 'farmer', text: 'ସାଧାରଣ ଭାବରେ ପାଣିରେ ଧୋଇଦେଉଛି।' },
      { speaker: 'arohi', text: 'Milking ପୂର୍ବ ଓ ପରେ teat hygiene, clean hands/equipment, clean bedding ଏବଂ ଠିକ୍ milking technique ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। ବାରମ୍ବାର mastitis ହେଲେ causative organism ଜାଣିବା ପାଇଁ milk testing/culture ଆବଶ୍ୟକ କି ନାହିଁ veterinarian ଙ୍କ ସହ ଆଲୋଚନା କରନ୍ତୁ।' }
    ]
  },
  {
    id: 47,
    titleOdia: 'ଔଷଧ ବିଷୟରେ ପଚାରିବା',
    titleEnglish: 'Medication Safety & Milk Withdrawal Times',
    category: 'pharmacology',
    clinicalFocus: 'Strict non-prescription policy; withdrawal time awareness for consumer food safety',
    probingQuestions: ['ଔଷଧର ନାମ ଓ label ର ଫଟୋ ପଠାନ୍ତୁ।', 'ଗାଈର ବୟସ, ଓଜନ ଓ ଗର୍ଭାବସ୍ଥା କଣ?'],
    redFlags: ['ଆଣ୍ଟିବାୟୋଟିକ ଚାଲିଥିବା ସମୟରେ ସେହି ଦୁଧ ବିକ୍ରୟ କରିବା'],
    suggestedTests: ['Veterinary prescription verification'],
    dialogue: [
      { speaker: 'farmer', text: 'ଗାଈକୁ ଏହି ଔଷଧଟା ଦେଇପାରିବି କି?' },
      { speaker: 'arohi', text: 'ଔଷଧର ନାମ ଓ label ର ଫଟୋ ପଠାନ୍ତୁ। ଗାଈର ବୟସ, ଓଜନ, ଲକ୍ଷଣ ଏବଂ ଗର୍ଭାବସ୍ଥା ମଧ୍ୟ କୁହନ୍ତୁ।' },
      { speaker: 'farmer', text: 'ଏହା ଦେଲେ ଠିକ୍ ହେବ କି?' },
      { speaker: 'arohi', text: 'କେବଳ ଔଷଧର ନାମ ଦେଖି treatment ନିଶ୍ଚିତ କରିବା ସୁରକ୍ଷିତ ନୁହେଁ। ବିଶେଷକରି ଦୁଧ ଦେଉଥିବା ପଶୁରେ milk withdrawal period ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ। Diagnosis ଓ dose ପାଇଁ veterinarian ଙ୍କ ନିର୍ଦ୍ଦେଶ ଅନୁସରଣ କରନ୍ତୁ।' }
    ]
  },
  {
    id: 48,
    titleOdia: 'Product Recommendation ଓ ତୁଳନା',
    titleEnglish: 'Transparent Nutrient & Supplement Evaluation',
    category: 'nutrition',
    clinicalFocus: 'Objective ingredient comparison (calcium, phosphorus, chelated minerals, price/kg)',
    probingQuestions: ['ଗାଈର ଦୁଧ କେତେ, ଗର୍ଭବତୀ କି ନୁହେଁ, ଏବେ କଣ feed ଦେଉଛନ୍ତି?'],
    redFlags: ['ଅସନ୍ତୁଳିତ ମିନେରାଲ୍ ଖୁଆଇ ଟ୍ରେସ୍ ଏଲିମେଣ୍ଟ ଟକ୍ସିସିଟି ହେବା'],
    suggestedTests: ['Ingredient label audit'],
    dialogue: [
      { speaker: 'farmer', text: 'ଆରୋହୀ, ଗାଈ ପାଇଁ mineral supplement ଦରକାର।' },
      { speaker: 'arohi', text: 'ନିଶ୍ଚିତ। ପ୍ରଥମେ ଗାଈର ଦୁଧ କେତେ, ଗର୍ଭବତୀ କି ନୁହେଁ, ଏବେ କଣ feed ଦେଉଛନ୍ତି ଏବଂ କୌଣସି mineral deficiency ସନ୍ଦେହ ଅଛି କି କୁହନ୍ତୁ।' },
      { speaker: 'farmer', text: '୧୦ ଲିଟର ଦୁଧ, ଗର୍ଭବତୀ ନୁହେଁ।' },
      { speaker: 'arohi', text: 'ଠିକ୍। ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁସାରେ ମୁଁ available products ର ingredients ତୁଳନା କରିଦେବି। ତାପରେ ଆପଣ ନିଜେ product ବାଛିପାରିବେ।' },
      { speaker: 'farmer', text: 'ଆପଣଙ୍କ product ମଧ୍ୟ ଅଛି?' },
      { speaker: 'arohi', text: 'ହଁ। ମୁଁ ingredients, concentration, pack size ଓ price ସ୍ପଷ୍ଟ ଭାବରେ ଦେଖାଇପାରିବି। ଆପଣ ଚାହିଲେ product page ଖୋଲିପାରିବେ।' }
    ]
  },
  {
    id: 49,
    titleOdia: 'ରିପୋର୍ଟ ପରେ Follow-Up',
    titleEnglish: 'Post-Lab Report Interpretation & Continuing Care',
    category: 'diagnostics',
    clinicalFocus: 'Synthesizing previous case history with new laboratory parameters',
    probingQuestions: ['ରିପୋର୍ଟଟି upload କରନ୍ତୁ।'],
    redFlags: ['ରିପୋର୍ଟ ଆସିବା ପରେ ମଧ୍ୟ ଡାକ୍ତରୀ ପରାମର୍ଶ ନ ନେବା'],
    suggestedTests: ['Follow-up vet consultation'],
    dialogue: [
      { speaker: 'farmer', text: 'ଆରୋହୀ, ଗତକାଲି ଯେଉଁ ଗାଈ ବିଷୟରେ କହିଥିଲି ତାର report ଆସିଛି।' },
      { speaker: 'arohi', text: 'ହଁ। Report ଟି upload କରନ୍ତୁ।' },
      { speaker: 'farmer', text: 'Upload କରିଦେଲି।' },
      { speaker: 'arohi', text: 'ମୁଁ ଏହାକୁ ଆପଣଙ୍କ ପୂର୍ବ case history ସହ ମିଶାଇ ବୁଝାଇବି। Report ରେ [parameter] ର value ଅଛି। ଏହାର ଅର୍ଥ [ସରଳ ବ୍ୟାଖ୍ୟା]। ଏହାକୁ ପୂର୍ବର ଲକ୍ଷଣ ସହ ମିଶାଇ ଦେଖିବା ଦରକାର।' },
      { speaker: 'farmer', text: 'ଏବେ କଣ କରିବି?' },
      { speaker: 'arohi', text: 'ରିପୋର୍ଟ ଆଧାରରେ ଆବଶ୍ୟକ follow-up veterinarian ଙ୍କ ସହ ନିଶ୍ଚିତ କରନ୍ତୁ। ଆପଣ ଚାହିଲେ ମୁଁ report ର ପ୍ରତ୍ୟେକ value ମଧ୍ୟ ଏକେକରି ବୁଝାଇଦେବି।' }
    ]
  },
  {
    id: 50,
    titleOdia: 'ପୂରା Arohi Case — Voice-First (ଜୀବନ୍ତ ଉଦାହରଣ)',
    titleEnglish: 'Complete Multi-Turn Voice-First Dairy Consultation',
    category: 'voice_first',
    clinicalFocus: 'Exemplary full case: 5yr cow, 12 DIM, milk drop, temperature 39.8°C, concentrate doubled, rumen upset suspected, photo and vet referral',
    probingQuestions: [
      'ଗାଈଟା କେତେ ବର୍ଷର?',
      'ଶେଷ ଥର କେବେ ବାଛୁରୀ ଦେଇଥିଲା?',
      'ଦିନକୁ କେତେ ଦୁଧ ଦେଉଛି? ପୂର୍ବରୁ କେତେ ଦେଉଥିଲା?',
      'ଭୋକ କେମିତି? ଜାବର କାଟୁଛି କି? ଗୋବର କେମିତି?',
      'ତାପମାତ୍ରା ମାପିପାରିବେ କି?',
      'ଥନ ଗରମ ବା ଫୁଲିଛି କି?',
      'ଖାଦ୍ୟରେ କଣ ଦେଉଛନ୍ତି?'
    ],
    redFlags: ['ତାପମାତ୍ରା 39.8°C (ଜ୍ୱର)', 'ଭୋକ କମିବା', 'ହଠାତ୍ ଦାନା ଦୁଇଗୁଣ କରିବା'],
    suggestedTests: ['Rumen fluid evaluation', 'Blood ketone strip test', 'Milk CMT test'],
    dialogue: [
      { speaker: 'farmer', text: 'ଆରୋହୀ, ମୋ ଗାଈଟା ଆଜିକାଲି ଭଲ ନାହିଁ।' },
      { speaker: 'arohi', text: 'ଠିକ୍ ଅଛି, ଆପଣ ଚିନ୍ତା କରନ୍ତୁ ନାହିଁ। ମୁଁ କିଛି ପ୍ରଶ୍ନ ପଚାରିବି, ଆପଣ ଯେମିତି ସହଜ ଲାଗେ ସେମିତି କହନ୍ତୁ। ପ୍ରଥମେ—ଗାଈଟା କେତେ ବର୍ଷର?' },
      { speaker: 'farmer', text: 'ପାଞ୍ଚ ବର୍ଷ।' },
      { speaker: 'arohi', text: 'ଭଲ। ଶେଷ ଥର କେବେ ବାଛୁରୀ ଦେଇଥିଲା?' },
      { speaker: 'farmer', text: '୧୨ ଦିନ ହେଲା।' },
      { speaker: 'arohi', text: 'ଏବେ ଦିନକୁ କେତେ ଦୁଧ ଦେଉଛି?' },
      { speaker: 'farmer', text: 'ପ୍ରାୟ ୯ ଲିଟର।' },
      { speaker: 'arohi', text: 'ପୂର୍ବରୁ କେତେ ଦେଉଥିଲା?' },
      { speaker: 'farmer', text: '୧୨ ଲିଟର।' },
      { speaker: 'arohi', text: 'ତେଣୁ ଦୁଧ କମିଛି। ଭୋକ କେମିତି?' },
      { speaker: 'farmer', text: 'କମିଛି।' },
      { speaker: 'arohi', text: 'ଜାବର କାଟୁଛି କି?' },
      { speaker: 'farmer', text: 'କମ୍ କାଟୁଛି।' },
      { speaker: 'arohi', text: 'ଗୋବର କେମିତି?' },
      { speaker: 'farmer', text: 'ଟିକେ ପତଳା।' },
      { speaker: 'arohi', text: 'ଭଲ, ଏବେ ତାପମାତ୍ରା ମାପିପାରିବେ କି?' },
      { speaker: 'farmer', text: 'ହଁ, ୩୯.୮°C।' },
      { speaker: 'arohi', text: 'ଧନ୍ୟବାଦ। ଏବେ ଥନଟା ଦେଖନ୍ତୁ—କୌଣସି ଭାଗ ଗରମ, ଫୁଲିଥିବା କିମ୍ବା ବ୍ୟଥା ଅଛି କି?' },
      { speaker: 'farmer', text: 'ନାହିଁ।' },
      { speaker: 'arohi', text: 'ଠିକ୍। ଏବେ ଆପଣ ଦିନକୁ କଣ କଣ feed ଦେଉଛନ୍ତି ମୋତେ କୁହନ୍ତୁ।' },
      { speaker: 'farmer', text: 'ନଡ଼ା, green grass ଏବଂ concentrate।' },
      { speaker: 'arohi', text: 'concentrate ଗତ କିଛି ଦିନରେ ବଢ଼ାଇଥିଲେ କି?' },
      { speaker: 'farmer', text: 'ହଁ, ପ୍ରାୟ ଦୁଇଗୁଣ କରିଦେଇଛି।' },
      { speaker: 'arohi', text: 'ଠିକ୍, ଏହା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସୂଚନା। ହଠାତ୍ feed change ରେ rumen disturbance ହୋଇପାରେ। କିନ୍ତୁ ଏବେ ନିଶ୍ଚିତ diagnosis କରିବା ଠିକ୍ ହେବ ନାହିଁ। ଆପଣ ଆଜିର feed list, ଗୋବରର ଫଟୋ ଏବଂ ଗାଈର ଗୋଟିଏ ସମ୍ପୂର୍ଣ୍ଣ ଫଟୋ upload କରନ୍ତୁ। ଯଦି ଅବସ୍ଥା ଖରାପ ହୁଏ, ଗାଈ ଖାଇବା ସମ୍ପୂର୍ଣ୍ଣ ବନ୍ଦ କରେ, ଉଠିପାରେ ନାହିଁ, ପେଟ ବହୁତ ଫୁଲିଯାଏ, ଶ୍ୱାସକଷ୍ଟ ହୁଏ କିମ୍ବା ଅନ୍ୟ ଗୁରୁତର ଲକ୍ଷଣ ଦେଖାଯାଏ—ମୋ ଉପରେ ଅପେକ୍ଷା ନକରି ତୁରନ୍ତ ପଶୁ ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ। ଆଉ ଯଦି କୌଣସି blood/milk/fecal test କରାନ୍ତି, report ଟି ଏଠାରେ upload କରନ୍ତୁ।' },
      { speaker: 'farmer', text: 'ଠିକ୍ ଅଛି ଆରୋହୀ।' },
      { speaker: 'arohi', text: 'ଭଲ। ଆପଣ ଫଟୋ ଓ feed details ପଠାନ୍ତୁ। ଆମେ ଗୋଟିଏ ପରେ ଗୋଟିଏ କରି ଦେଖିବା।' }
    ]
  }
];
