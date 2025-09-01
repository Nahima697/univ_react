/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./view/Form";
import ClassroomDetail from "./view/ClassroomDetail";
import ClassList from "./view/ClassList";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register/:id" element={<Form />} />
          <Route path="/classList" element={<ClassList/>}/>
          <Route path="/classroom/:id" element={<ClassroomDetail/>}/>
        </Routes>
      </BrowserRouter>
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
