# CrMS Tracker - Deployment Guide

This guide will help you deploy the CrMS Tracker app to GitHub Pages so it can be accessed publicly and installed on Android devices.

## Quick Deployment Steps

### 1. Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., "crms-tracker")
4. Make it public (required for GitHub Pages)
5. Click "Create repository"

### 2. Upload Your Code
You have two options:

#### Option A: Upload via GitHub Web Interface
1. In your new repository, click "uploading an existing file"
2. Drag and drop all the files from the `crms-tracker` folder
3. Write a commit message like "Initial commit"
4. Click "Commit changes"

#### Option B: Use Git Commands (if you have Git installed)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The deployment workflow will automatically run

### 4. Access Your App
1. After the workflow completes (usually 2-3 minutes), your app will be available at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
2. You can find the exact URL in the Pages settings

## Installing on Android

### For Users
1. Open the deployed app URL in Chrome on Android
2. Tap the Chrome menu (three dots)
3. Look for "Add to Home screen" or "Install app"
4. Tap it and confirm the installation
5. The app will appear on your home screen like a native app

### PWA Features
- **Offline Access**: Works without internet after first load
- **Native Feel**: Looks and feels like a native Android app
- **Home Screen Icon**: Custom icon appears on home screen
- **Full Screen**: Runs in full screen mode without browser UI

## Updating the App

### Making Changes
1. Edit the code files as needed
2. Commit and push changes to GitHub
3. The app will automatically rebuild and deploy
4. Users will get updates when they refresh the app

### Common Updates
- **Adding Features**: Modify React components
- **Styling Changes**: Update CSS/Tailwind classes
- **Content Updates**: Edit educational content in components

## Troubleshooting

### Build Fails
- Check the Actions tab in GitHub for error details
- Ensure all dependencies are properly listed in package.json
- Verify file paths are correct

### PWA Not Installing
- Ensure HTTPS is enabled (GitHub Pages provides this automatically)
- Check that manifest.json and service worker are accessible
- Verify icons are the correct sizes and formats

### App Not Loading
- Check browser console for JavaScript errors
- Ensure all assets are properly copied to dist folder
- Verify the base URL is correct for GitHub Pages

## Customization Options

### Branding
- Replace icons in `public/` folder with your own
- Update app name in `manifest.json`
- Modify colors in `src/App.css`

### Content
- Edit educational content in `src/components/EducationHub.jsx`
- Update tips and information throughout the app
- Add new observation types if needed

### Features
- Add data export/import functionality
- Implement cycle predictions
- Add reminder notifications
- Create charts and analytics

## Security & Privacy

### Data Storage
- All user data is stored locally in browser storage
- No data is sent to external servers
- Users maintain complete control over their data

### HTTPS
- GitHub Pages automatically provides HTTPS
- Required for PWA installation
- Ensures secure data transmission

## Support

### For Developers
- React documentation: [react.dev](https://react.dev)
- Tailwind CSS: [tailwindcss.com](https://tailwindcss.com)
- PWA guide: [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps/)

### For Users
- Include contact information or support resources
- Link to Creighton Model official resources
- Provide troubleshooting tips

## Legal Considerations

### Disclaimers
- Include medical disclaimers
- Clarify educational purpose
- Reference official Creighton Model resources

### Licensing
- Consider open source licensing
- Respect Creighton Model trademarks
- Include attribution for libraries used

---

**Congratulations!** Your CrMS Tracker app is now deployed and ready for users to install on their Android devices. The app provides a modern, accessible way to learn about and practice the Creighton Model FertilityCare System.

