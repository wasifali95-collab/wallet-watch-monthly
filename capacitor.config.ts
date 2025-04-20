
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.69f7446703d9480dbebda23e8ffb4042',
  appName: 'wallet-watch-monthly',
  webDir: 'dist',
  server: {
    url: 'https://69f74467-03d9-480d-bebd-a23e8ffb4042.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;
