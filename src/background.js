chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  if (url.hostname.endsWith('github.io')) {
    const pathParts = url.pathname.split('/').filter(part => part !== '');
    if (pathParts.length >= 2) {
      const githubUsername = url.hostname.split('.')[0].toLowerCase(); // Extract GitHub username from the subdomain
      const githubRepoName = pathParts[0].toLowerCase(); // Assuming GitHub repository name is the first segment after the domain
      const githubRepoUrl = `https://github.com/${githubUsername}/${githubRepoName}`;
      chrome.tabs.create({ url: githubRepoUrl });
    } else {
      console.error('Invalid GitHub Pages URL structure.');
    }
  }
});
