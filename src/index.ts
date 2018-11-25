import globalStyle from './css/index.css';
import './components';

const styleEl = document.createElement('style');
styleEl.textContent = globalStyle;
document.head!.appendChild(styleEl);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`/service-worker.js`);
  });
}
