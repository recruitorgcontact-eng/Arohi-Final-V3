import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.arohiai.app',
  appName: 'Arohi AI - Ask me Anything!',
  webDir: 'dist',
  server: {
    // Points directly to your live production website on Railway
    url: 'https://arohiai.com',
    cleartext: true,
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f172a',
      showSpinner: false
    }
  }
};

export default config;
