# CrMS Tracker - Creighton Model Fertility Care System

A modern, responsive web application for tracking fertility signs using the Creighton Model FertilityCare™ System. This Progressive Web App (PWA) can be installed on Android devices and provides comprehensive fertility tracking with educational resources.

## Features

### 🔄 Fertility Tracking
- **Daily Observation Entry**: Record cervical mucus observations with detailed descriptions
- **Peak Day Identification**: Mark and track peak fertility days
- **Cycle Phase Detection**: Automatic phase identification (Menstrual/Post-Menstrual)
- **Data Persistence**: All data stored locally in browser storage

### 📅 Calendar View
- **Monthly Calendar**: Visual overview of your fertility cycle
- **Color-Coded Days**: Different colors for each observation type
- **Cycle Statistics**: Track total observations, fertile days, and peak days
- **Navigation**: Easy month-to-month navigation

### 📚 Education Hub
- **CrMS Basics**: Understanding the fundamentals of the Creighton Model
- **Making Observations**: How to accurately observe and record fertility signs
- **Peak Day Understanding**: Identifying and understanding Peak Day significance
- **Health Monitoring**: Using CrMS for reproductive health awareness
- **Effectiveness & Success**: Understanding the method's effectiveness
- **Lifestyle & Relationships**: How CrMS impacts daily life and relationships

### 📱 Progressive Web App (PWA)
- **Installable**: Can be installed on Android devices like a native app
- **Offline Capable**: Works without internet connection after initial load
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Touch-Friendly**: Designed for mobile interaction

## Technology Stack

- **Frontend**: React 19 with modern hooks
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for robust date operations
- **PWA**: Service Worker for offline functionality
- **Build Tool**: Vite for fast development and optimized builds

## Installation & Deployment

### Local Development
1. Clone or download the project
2. Install dependencies: `pnpm install`
3. Start development server: `pnpm run dev`
4. Open http://localhost:5173 in your browser

### Production Build
1. Build the app: `pnpm run build`
2. The built files will be in the `dist/` folder
3. Deploy the `dist/` folder to any static hosting service

### GitHub Pages Deployment
1. Push the project to a GitHub repository
2. Go to repository Settings > Pages
3. Set source to "GitHub Actions"
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Installing on Android
1. Open the deployed app in Chrome on Android
2. Tap the menu (three dots) in Chrome
3. Select "Add to Home screen" or "Install app"
4. The app will be installed like a native app

## Usage Guide

### Getting Started
1. **First Time Setup**: No account needed - data is stored locally
2. **Daily Tracking**: Use "Add Observation" to record daily fertility signs
3. **View Progress**: Check "View Calendar" for cycle overview
4. **Learn More**: Explore "Learn More" for educational content

### Making Observations
1. Select the current date (defaults to today)
2. Choose the appropriate observation type:
   - **Dry**: No mucus discharge observed
   - **Sticky**: Thick, tacky, or pasty mucus
   - **Creamy**: Smooth, lotion-like mucus
   - **Clear/Stretchy**: Clear, stretchy, or lubricative mucus
   - **Menstruation**: Menstrual bleeding
   - **Spotting**: Light bleeding or brown discharge
3. Mark as Peak Day if applicable (for Clear/Stretchy observations)
4. Add optional notes
5. Save the observation

### Understanding the Calendar
- **Red**: Menstruation days
- **Teal**: Peak days (most fertile)
- **Pink**: Clear/Stretchy mucus (fertile)
- **Yellow**: Creamy/Sticky mucus (developing fertility)
- **Green**: Dry days (infertile when in post-Peak phase)
- **Orange**: Spotting

## Data Privacy & Security

- **Local Storage**: All data is stored locally in your browser
- **No Cloud Sync**: Data never leaves your device
- **Privacy First**: No tracking, analytics, or data collection
- **Backup Recommended**: Export/backup data manually if needed

## Educational Disclaimer

This app is for educational purposes and fertility awareness. It is not intended as medical advice or as a substitute for professional healthcare. For proper instruction in the Creighton Model FertilityCare™ System, consult with a certified FertilityCare Practitioner.

## Support & Resources

- **Official CrMS Website**: [creightonmodel.com](https://creightonmodel.com)
- **Find a Practitioner**: Contact FertilityCare Centers of America
- **NaProTECHNOLOGY**: For reproductive health treatments

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please ensure any changes maintain the educational integrity and accuracy of the Creighton Model information.

---

*CrMS Tracker is an independent educational tool and is not officially affiliated with the Creighton Model FertilityCare™ System or FertilityCare Centers of America.*

