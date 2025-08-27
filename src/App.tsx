import { APITester } from "./APITester";
import ClassList from "./component/ClassList";
import "./index.css";

export function App() {
  return (
    <div className="app">
      <div className="logo-container">
        <svg
          className="logo bun-logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="96"
          height="96"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Computer Logo"
          role="img"
        >
          <rect x="8" y="12" width="48" height="32" rx="4" ry="4" fill="#f0f0f0" />
          <rect x="20" y="48" width="24" height="6" rx="1" ry="1" fill="#333" />
          <rect x="16" y="44" width="32" height="4" fill="#ccc" />
          <circle cx="32" cy="28" r="6" fill="#333" />
        </svg>
      </div>

      {/* <APITester /> */}
      <ClassList />
    </div>
  );
}

export default App;
