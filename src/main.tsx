
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set the document title
document.title = "HoneyLearn - Teaching kids that skills they actually need";

createRoot(document.getElementById("root")!).render(<App />);
