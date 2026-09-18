# Arohi AI Ecosystem - Dedicated Android Apps

This directory documents the 4 Android applications in the Arohi AI ecosystem. All 4 apps run seamlessly from the unified, sovereign codebase with zero conflict.

---

## The 4 Android Applications

| Application | Package ID | Dedicated Launch URL | Primary Google Play Category |
| :--- | :--- | :--- | :--- |
| **Arohi AI (Main)** | `com.arohiai.app` | `https://arohiai.com` | **Productivity / AI Assistant** |
| **Arohi Exams** | `com.arohiai.exams` | `https://arohiai.com/exams?app=exams&standalone=true` | **Education / Exam Prep** |
| **Arohi ONE Business OS** | `com.arohiai.businessos` | `https://arohiai.com/business-os?app=business&standalone=true` | **Business / Finance / Productivity** |
| **Arohi Calling Agents** | `com.arohiai.calling` | `https://arohiai.com/calling-agents?app=calling&standalone=true` | **Communication / Telephony Tools** |

---

## Method 1: Instant 1-Click Build via GitHub Actions (Recommended)

You can build and sign the `.aab` for any of the 4 apps directly in GitHub without opening Android Studio:

1. Go to your GitHub repository.
2. Click on the **Actions** tab.
3. In the left sidebar, click **"Build Google Play Store Bundle (.AAB)"**.
4. Click the **Run workflow** dropdown button on the right.
5. In the **"App to build"** selector, choose the app:
   - `main` ➔ Builds **Arohi AI** (`com.arohiai.app`)
   - `exams` ➔ Builds **Arohi Exams** (`com.arohiai.exams`)
   - `business` ➔ Builds **Arohi ONE Business OS** (`com.arohiai.businessos`)
   - `calling` ➔ Builds **Arohi Calling Agents** (`com.arohiai.calling`)
6. Enter the **Version Code** (e.g., `4`) and **Version Name** (e.g., `1.0.3`).
7. Click **Run workflow**.
8. Once finished, download the `.aab` artifact and upload directly to Google Play Console!

---

## Method 2: Local Command-Line Switch

To switch the local Android project configuration in your workspace:

```bash
# To switch to Arohi Exams:
node scripts/switch-android-app.cjs exams

# To switch to Business OS:
node scripts/switch-android-app.cjs business

# To switch to Calling Agents:
node scripts/switch-android-app.cjs calling

# To switch back to Main Arohi AI:
node scripts/switch-android-app.cjs main
```

After switching, sync and build:
```bash
npx cap sync android
cd android && ./gradlew bundleRelease
```
The signed `.aab` will be generated in `android/app/build/outputs/bundle/release/`.

---

## Play Store Verification & Asset Links
The server automatically serves all 4 apps in `/.well-known/assetlinks.json` and serves the independent PWA manifests:
- `https://arohiai.com/manifest-exams.json`
- `https://arohiai.com/manifest-business.json`
- `https://arohiai.com/manifest-calling.json`
- `https://arohiai.com/.well-known/assetlinks.json`
