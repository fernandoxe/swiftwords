export const serviceWorkerRegister = () => {
  if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker.register(swUrl)
        .then(_registration => {
          console.log('Service worker successfully registered');
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
    });
  }
};
