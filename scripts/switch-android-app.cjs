const fs = require('fs');
const path = require('path');

const target = (process.argv[2] || process.env.TARGET_APP || 'main').toLowerCase().trim();

const APP_CONFIGS = {
  main: {
    id: 'com.arohiai.app',
    name: 'Arohi AI - Ask me Anything!',
    shortName: 'Arohi AI',
    url: 'https://arohiai.com',
    themeColor: '#7c3aed',
    splashColor: '#0f172a'
  },
  exams: {
    id: 'com.arohiai.exams',
    name: 'Arohi Exams',
    shortName: 'Arohi Exams',
    url: 'https://arohiai.com/exams?app=exams&standalone=true',
    themeColor: '#1e1b4b',
    splashColor: '#09071c'
  },
  business: {
    id: 'com.arohiai.businessos',
    name: 'Arohi ONE Business OS',
    shortName: 'Business OS',
    url: 'https://arohiai.com/business-os?app=business&standalone=true',
    themeColor: '#0f172a',
    splashColor: '#020617'
  },
  calling: {
    id: 'com.arohiai.calling',
    name: 'Arohi Calling Agents',
    shortName: 'Arohi Voice',
    url: 'https://arohiai.com/calling-agents?app=calling&standalone=true',
    themeColor: '#18181b',
    splashColor: '#09090b'
  }
};

const config = APP_CONFIGS[target];
if (!config) {
  console.error(`Invalid target app: "${target}". Valid options are: main, exams, business, calling`);
  process.exit(1);
}

console.log(`\n======================================================`);
console.log(`Switching Android Project Target to: ${config.name}`);
console.log(`Package ID: ${config.id}`);
console.log(`Launch URL: ${config.url}`);
console.log(`======================================================\n`);

// 1. Update capacitor.config.ts
const capConfigPath = path.resolve('capacitor.config.ts');
if (fs.existsSync(capConfigPath)) {
  const capContent = `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: '${config.id}',
  appName: '${config.name}',
  webDir: 'dist',
  server: {
    url: '${config.url}',
    cleartext: true,
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '${config.splashColor}',
      showSpinner: false
    }
  }
};

export default config;
`;
  fs.writeFileSync(capConfigPath, capContent, 'utf8');
  console.log('✓ Updated capacitor.config.ts');
}

// 2. Update android/app/build.gradle
const buildGradlePath = path.resolve('android/app/build.gradle');
if (fs.existsSync(buildGradlePath)) {
  let gradleContent = fs.readFileSync(buildGradlePath, 'utf8');
  gradleContent = gradleContent.replace(/namespace\s*=\s*"[^"]+"/g, `namespace = "${config.id}"`);
  gradleContent = gradleContent.replace(/applicationId\s*"[^"]+"/g, `applicationId "${config.id}"`);
  fs.writeFileSync(buildGradlePath, gradleContent, 'utf8');
  console.log('✓ Updated android/app/build.gradle (namespace & applicationId)');
}

// 3. Update android/app/src/main/res/values/strings.xml
const stringsPath = path.resolve('android/app/src/main/res/values/strings.xml');
if (fs.existsSync(stringsPath)) {
  const stringsContent = `<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">${config.name}</string>
    <string name="title_activity_main">${config.name}</string>
    <string name="package_name">${config.id}</string>
    <string name="custom_url_scheme">${config.id}</string>
</resources>
`;
  fs.writeFileSync(stringsPath, stringsContent, 'utf8');
  console.log('✓ Updated android/app/src/main/res/values/strings.xml');
}

console.log(`\n✓ Android Project successfully configured for "${config.name}" (${config.id})!\n`);
