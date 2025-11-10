// Cookie Saver extension popup script
// Saves all cookies from the current website to a JSON file

document.getElementById('saveCookies').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');

  try {
    // Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    if (!tab || !tab.url) {
      statusDiv.textContent = 'Error: No active tab found';
      return;
    }

    // Get all cookies for the current tab's URL
    const cookies = await chrome.cookies.getAll({ url: tab.url });

    if (cookies.length === 0) {
      statusDiv.textContent = 'No cookies found';
      return;
    }

    // Convert cookies to JSON with pretty printing
    const jsonData = JSON.stringify(cookies, null, 2);

    // Create a blob from the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Extract domain from URL for filename
    const domain = tab.url.split('/')[2];
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const filename = `${domain}_cookies-${timestamp}.json`;

    // Create download link and trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    statusDiv.textContent = `Saved ${cookies.length} cookies`;

    // Clear status after 2 seconds
    setTimeout(() => {
      statusDiv.textContent = '';
    }, 2000);

  } catch (error) {
    console.error('Error saving cookies:', error);
    statusDiv.textContent = 'Error saving cookies';
  }
});
