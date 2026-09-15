const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const keystoreDir = path.resolve('android/app/keystore');
const keystorePath = path.join(keystoreDir, 'arohi-release.jks');
fs.mkdirSync(keystoreDir, { recursive: true });

const rawSecret = (process.env.KEYSTORE_BASE64 || '').trim();
const storePass = process.env.KEYSTORE_PASS_SECRET || 'arohiai2026';
const keyAlias = process.env.KEY_ALIAS_SECRET || 'arohi-upload-key';
const keyPass = process.env.KEY_PASS_SECRET || 'arohiai2026';

let success = false;

if (rawSecret) {
  console.log('Found KEYSTORE_BASE64 secret (length: ' + rawSecret.length + ' chars)');
  // Strip quotes, spaces, newlines, and non-base64 characters
  const sanitized = rawSecret.replace(/^["']|["']$/g, '').replace(/[^A-Za-z0-9+/=]/g, '');
  
  try {
    const buffer = Buffer.from(sanitized, 'base64');
    if (buffer.length > 300) {
      fs.writeFileSync(keystorePath, buffer);
      console.log('✓ Wrote keystore from secret to: ' + keystorePath + ' (' + buffer.length + ' bytes)');
      success = true;
      
      // Optional check with keytool
      try {
        execSync(`keytool -list -keystore "${keystorePath}" -storepass "${storePass}"`, { stdio: 'pipe' });
        console.log('✓ Keystore verified with password "' + storePass + '"');
      } catch (err) {
        console.log('Note: Keystore loaded, continuing with build.');
      }
    } else {
      console.warn('⚠ KEYSTORE_BASE64 secret decoded to only ' + buffer.length + ' bytes.');
    }
  } catch (e) {
    console.warn('⚠ Failed to decode KEYSTORE_BASE64 secret:', e.message);
  }
}

if (!success) {
  if (rawSecret) {
    console.error('----------------------------------------------------------------------');
    console.error('CRITICAL WARNING: The secret ANDROID_KEYSTORE_BASE64 in GitHub Secrets is invalid.');
    console.error('First 40 chars of secret: ' + rawSecret.substring(0, 40) + '...');
    console.error('Please verify that you copied the base64 content of arohi-release.jks.');
    console.error('----------------------------------------------------------------------');
    process.exit(1);
  } else {
    console.log('No KEYSTORE_BASE64 provided. Generating a fresh release keystore...');
    execSync(`keytool -genkeypair -v \
      -keystore "${keystorePath}" \
      -alias "${keyAlias}" \
      -keyalg RSA \
      -keysize 2048 \
      -validity 10000 \
      -storepass "${storePass}" \
      -keypass "${keyPass}" \
      -dname "CN=Arohi AI, OU=Mobile Engineering, O=Braga Technologies Private Limited, L=Bhubaneswar, ST=Odisha, C=IN"`, { stdio: 'inherit' });
  }
}
