# 🇪🇺 EU Grant Finder

A modern, intelligent web application to discover and match EU funding opportunities tailored to your organization's needs.

## Features ✨

- **Smart Matching Algorithm**: AI-powered grant matching based on organization profile
- **10+ EU Grants**: Comprehensive database of major EU funding programs
- **Real Data**: Accurate budget, deadlines, and eligibility information
- **Interactive Quiz**: User-friendly 5-question quiz to identify best matches
- **Personalized Reports**: AI-generated analysis and application tips
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **EU Design System**: Professional styling with EU color scheme

## Supported EU Grants 💰

1. **Horizon Europe** - €95.5B for research & innovation
2. **Erasmus+** - €26.2B for education & training
3. **Digital Europe Programme** - €13.1B for digital capabilities
4. **Copernicus Programme** - €9.7B for earth observation
5. **LIFE Programme** - €5.4B for environment & climate
6. **Citizens, Equality, Rights and Values** - €1.5B
7. **Europe for Citizens Programme** - €376M
8. **Creative Europe Programme** - €2.4B
9. **InvestEU Programme** - €30B for investment
10. **Just Transition Mechanism** - €55B for energy transition

And more...

## Tech Stack 🛠️

- **Frontend**: React 18.2
- **Routing**: React Router v6
- **Bundler**: Vite
- **Styling**: Tailwind CSS 3 (utility-first, EU brand theme)
- **Storage**: LocalStorage for session persistence

## Getting Started 🚀

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/eu-grant-finder.git
cd eu-grant-finder
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

## Project Structure 📁

```
eu-grant-finder/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Router + layout
    ├── index.css             # Tailwind entry (@tailwind directives)
    ├── data/
    │   └── grants.js         # Grant data & quiz questions
    ├── hooks/
    │   ├── useGrantMatcher.js    # Matching algorithm
    │   └── useAiReport.js        # Claude API integration
    ├── utils/
    │   └── helpers.js        # Utilities & storage
    ├── components/
    │   ├── Background.jsx
    │   ├── Navbar.jsx
    │   ├── GrantCard.jsx
    │   ├── QuizStep.jsx
    │   └── LoadingScreen.jsx
    └── pages/
        ├── HomePage.jsx
        ├── QuizPage.jsx
        ├── ResultsPage.jsx
        ├── ReportPage.jsx
        └── PricingPage.jsx
```

## How It Works 🔄

1. **Home Page**: Learn about the platform and features
2. **Quiz**: Answer 5 questions about your organization
3. **Matching**: Algorithm scores grants based on eligibility
4. **Results**: Browse matched grants with filtering and sorting
5. **Report**: Generate AI-powered analysis and application tips
6. **Action**: Links to official grant pages and applications

## Key Features

### Smart Matching Algorithm

- Calculates match scores based on quiz responses
- Weights multiple eligibility criteria
- Sorts results by relevance

### Interactive Components

- Quiz with single/multiple choice questions
- Filterable grant cards with tags
- Real-time sorting options
- Selection system for report generation

### Responsive Design

- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes

### Design System

- CSS variables for consistent theming
- EU color palette (Blue & Gold)
- Smooth animations and transitions
- Accessibility considerations

## API Integration 🔌

The application supports integration with:

- **Claude API** for AI-powered grant analysis reports
- **European Commission APIs** for real-time grant data

To enable AI features:

1. Get a Claude API key
2. Set up backend endpoint for `/api/generate-report`
3. Update configuration in `useAiReport` hook

## Data Management 📊

User data is stored locally using localStorage:

- Quiz responses
- Search results
- Selected grants
- Timestamp tracking

No data is sent to external servers unless explicitly opted in for AI analysis.

## Customization 🎨

### Colors & Styling

Edit theme in `tailwind.config.js` under `theme.extend.colors` (brand, eu.blue, eu.gold). Shared button/card classes live in `src/index.css` under `@layer components`.

### Add New Grants

Update the `grants` array in `src/data/grants.js`:

```javascript
{
  id: 11,
  name: 'Grant Name',
  description: 'Description',
  budget: '€X billion',
  // ... other properties
}
```

### Modify Quiz Questions

Update `quizQuestions` array in `src/data/grants.js`

## Browser Support 🌐

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance 📈

- Lightweight: ~150KB gzipped
- Fast load times with Vite bundling
- Optimized CSS and images
- No external font downloads required

## Security 🔒

- GDPR compliant data handling
- No third-party tracking
- Secure local storage
- HTTPS recommended for production

## Contributing 🤝

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Share ideas on GitHub Discussions
- **Email**: support@eugrantfinder.com

## Roadmap 🗺️

- [ ] Advanced filtering and search
- [ ] Export reports as PDF
- [ ] User accounts and saved searches
- [ ] Grant application tracker
- [ ] Funding timeline visualization
- [ ] Integration with Horizon Europe PARTICIPANT portal
- [ ] Multi-language support
- [ ] Mobile app

## Acknowledgments 🙏

- European Commission for grant data
- EU flag emoji from Noto Color Emoji
- Inspired by EU funding seekers worldwide

## Disclaimer ⚠️

EU Grant Finder is an independent service providing information about EU funding programs. For official information and applications, always visit the [European Commission](https://ec.europa.eu/) website. We are not affiliated with or endorsed by the European Commission.

---

**Made with ❤️ by the EU Grant Finder Team**

Visit: [eugrantfinder.com](https://eugrantfinder.com)

---

## 📁 Project Structure

```
eu-grant-finder/
├── index.html                   # Entry HTML
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Router + Layout shell
    │
    ├── styles/
    │   └── globals.css          # Design tokens + global styles
    │
    ├── data/
    │   └── grants.js            # 10 real EU grants + quiz questions
    │
    ├── hooks/
    │   ├── useGrantMatcher.js   # Scoring algorithm (country/sector/stage)
    │   └── useAiReport.js       # Claude API integration
    │
    ├── utils/
    │   └── helpers.js           # Formatting, match colors, session storage
    │
    ├── components/
    │   ├── Background.jsx       # Animated grid + orb background
    │   ├── Navbar.jsx           # Fixed top navigation
    │   ├── GrantCard.jsx        # Grant result card with match ring
    │   ├── QuizStep.jsx         # Single quiz question component
    │   └── LoadingScreen.jsx    # Animated scanning loader
    │
    └── pages/
        ├── HomePage.jsx         # Hero + features + CTA
        ├── QuizPage.jsx         # 3-step quiz flow
        ├── ResultsPage.jsx      # Matched grants list
        ├── ReportPage.jsx       # AI-generated application guide
        └── PricingPage.jsx      # 3-tier pricing plans
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
http://localhost:3000
```

---

## 💰 Revenue Model

| Product        | Price   | Description                                |
| -------------- | ------- | ------------------------------------------ |
| Free Search    | €0      | 3-question quiz + grant matches            |
| AI Report      | €49     | Full AI application guide per grant        |
| Full Bundle    | €499    | Complete application drafted by experts    |
| Monthly Alerts | €29/mo  | (future) new grant alerts for your profile |
| White-label    | €299/mo | (future) sell to accountants / consultants |

---

## 🔮 Next Features to Build

- [ ] Stripe payment integration for AI Reports (€49)
- [ ] Email capture before showing results (Mailchimp/Resend)
- [ ] Expand grant database to 50+ entries
- [ ] PDF export of AI report (jsPDF)
- [ ] User accounts to save searches
- [ ] Monthly grant alert email system
- [ ] Admin dashboard to manage grants

---

## 🛠 Tech Stack

- **Frontend**: React 18 + React Router 6
- **Build**: Vite 5
- **AI**: Claude Sonnet (Anthropic API)
- **Fonts**: Playfair Display + DM Mono + Lora (Google Fonts)
- **Styling**: Tailwind CSS 3

---

## 📞 Target Markets

**Primary**: Germany, Netherlands, Poland, Ireland, France
**Secondary**: All EU27 + UK

**Ideal customers**:

- Tech startups seeking first funding
- Manufacturing SMEs investing in green tech
- Health & biotech founders
- Small businesses needing grant navigation help
#   e u - g r a n t - f i n d e r  
 #   e u - g r a n t - f i n d e r  
 #   e u - g r a n t - f i n d e r  
 