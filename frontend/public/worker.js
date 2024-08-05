self.addEventListener('push', e => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: './src/assets/images/daki.png'
    });
});