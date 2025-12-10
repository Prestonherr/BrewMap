# BrewMap ☕

A React application that helps users discover coffee shops in any city. Simply enter a city name and select your search radius to find local cafes, roasteries, and coffee spots near you.

![BrewMap](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.3-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Purpose

BrewMap is a coffee shop finder application designed to help users explore local coffee culture. The app allows users to search for coffee shops by city name and displays results within a customizable radius (1-25 miles). Built as a frontend-focused project with architecture designed for future full-stack expansion, including user authentication, saved favorites, and reviews.

## ✨ Features

- **City-based Search**: Enter any city name to find coffee shops
- **Customizable Radius**: Search within 1 to 25 miles
- **Real-time Results**: Fetches live data from OpenStreetMap
- **Distance Display**: Shows distance from city center for each coffee shop
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Multi-page Navigation**: Home page with search functionality and About page
- **Error Handling**: User-friendly error messages and loading states

## 🛠️ Technologies & Languages

### Core Technologies

- **React 18.3** - Modern UI library for building interactive user interfaces
- **Vite 5.3** - Next-generation frontend build tool for fast development
- **React Router DOM 7.10** - Client-side routing for single-page applications

### Styling

- **CSS3** - Custom styling with modern features (Grid, Flexbox, CSS Variables)
- **Normalize.css 8.0** - CSS reset for consistent cross-browser styling
- **BEM Methodology** - Block Element Modifier naming convention for maintainable CSS

### Development Tools

- **ESLint 8.57** - JavaScript/React linting with recommended rules
- **Prettier 3.2** - Code formatting for consistent style
- **React Hooks** - Modern React state and lifecycle management

### APIs

- **Nominatim API** - OpenStreetMap geocoding service for city-to-coordinates conversion
- **Overpass API** - OpenStreetMap query service for finding coffee shops and cafes

## 📐 Development Methods & Architecture

### Component Architecture

- **Component-based Design**: Modular, reusable React components
- **Grouped File Structure**: JSX and CSS files co-located in component folders
- **Separation of Concerns**: Clear separation between UI components, utilities, and API logic

### Code Organization

```
src/
├── components/          # React components (grouped JSX + CSS)
│   ├── Header/         # Navigation component
│   ├── SearchForm/     # Search input and radius selector
│   ├── CoffeeShopCard/ # Individual coffee shop display
│   ├── CoffeeShopList/ # Results grid container
│   ├── Home/           # Main page component
│   └── About/          # About page component
├── utils/              # Utility functions
│   └── api.js         # API integration functions
├── vendor/            # Third-party CSS
│   └── normalize.css  # CSS reset
└── index.css          # Global styles
```

### Styling Approach

- **BEM Naming Convention**: Consistent, maintainable CSS class naming
- **Mobile-first Design**: Responsive layouts that work on all screen sizes
- **CSS Custom Properties**: Theme colors defined for easy customization
- **Smooth Transitions**: Enhanced UX with hover effects and animations

### State Management

- **React Hooks**: `useState` for local component state
- **Props Drilling**: Data flow from parent to child components
- **Event Handling**: Form submission and user interaction management

### API Integration

- **Async/Await**: Modern asynchronous JavaScript for API calls
- **Error Handling**: Try-catch blocks with user-friendly error messages
- **Data Transformation**: Processing and formatting API responses
- **Distance Calculation**: Haversine formula for accurate distance measurements

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd BrewMap
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check code formatting without making changes

## 📡 API Information

### OpenStreetMap APIs

BrewMap uses two free, open-source APIs from OpenStreetMap:

1. **Nominatim API** (Geocoding)
   - Converts city names to latitude/longitude coordinates
   - No API key required
   - Rate limit: 1 request per second (recommended)

2. **Overpass API** (Data Query)
   - Queries OpenStreetMap database for coffee shops and cafes
   - Searches for nodes and ways tagged with `shop=coffee` or `amenity=cafe`
   - No API key required
   - Public instance: `https://overpass-api.de/api/interpreter`

### API Usage Notes

- Both APIs are free and open-source
- No authentication required
- Respect rate limits for optimal performance
- Data is community-maintained and may vary by location

## 🏗️ Project Structure

```
BrewMap/
├── public/              # Static assets
├── src/
│   ├── components/     # React components
│   ├── images/         # Image assets
│   ├── utils/          # Utility functions
│   ├── vendor/         # Third-party CSS
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── .eslintrc.cjs       # ESLint configuration
├── .gitignore          # Git ignore rules
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

## 🎨 Design Philosophy

- **Coffee-themed Color Palette**: Warm browns and creams (#2c1810, #8b6f47, #d4a574)
- **Clean, Modern UI**: Minimalist design with focus on usability
- **Accessibility**: Semantic HTML, keyboard navigation, focus indicators
- **User Experience**: Loading states, error handling, and clear feedback

## 🔮 Future Enhancements

This project is architected for full-stack expansion. Planned features include:

- **User Authentication**: Registration and login functionality
- **Saved Favorites**: Save and manage favorite coffee shops
- **User Reviews**: Rate and review coffee shops
- **Personal Lists**: Create custom coffee shop collections
- **Map Integration**: Visual map display of coffee shop locations
- **Backend API**: Custom REST API for user data and preferences
- **Database Integration**: Store user data and saved locations

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Built as a final project for TripleTen's Software Engineering program.

## 🙏 Acknowledgments

- OpenStreetMap community for providing free, open geospatial data
- Nominatim and Overpass API services
- React and Vite communities for excellent documentation and tooling

---

**Note**: This is a frontend-focused project. Backend functionality is planned for future development phases.
