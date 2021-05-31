let deferredPrompt;
const installBtn = document.querySelector('.install-btn');
const cameraBtn = document.querySelector('.camera-btn');

window.addEventListener('beforeinstallprompt', (e) => { deferredPrompt = e });

installBtn.addEventListener('click', async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    console.log('PWA was installed');
});

if (window.matchMedia('(display-mode: standalone)').matches) {
  // console.log("This is running as standalone.");
  installBtn.style.display = 'none';
  cameraBtn.style.display = 'inline-block';
}
else {
  installBtn.style.display = 'inline-block';
  cameraBtn.style.display = 'none';
}