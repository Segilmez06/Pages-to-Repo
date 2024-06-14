chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  
  // Check if the hostname ends with 'github.io'
  if (url.hostname.endsWith('github.io')) {
    let username = '';
    let repoName = '';

    // Split the hostname by '.' to handle varying hostnames
    const hostnameParts = url.hostname.split('.');
    
    // Find the segment before 'github.io' which should be the GitHub username
    const idx = hostnameParts.indexOf('github');
    if (idx > 0) {
      username = hostnameParts[idx - 1].toLowerCase();
    } else {
      console.error('Invalid GitHub Pages URL structure.');
      return;
    }

    // Split the pathname by '/' to get the repository name
    const pathParts = url.pathname.split('/').filter(part => part !== '');
    if (pathParts.length > 0) {
      repoName = pathParts[0].toLowerCase();
    } else {
      console.error('Invalid GitHub Pages URL structure.');
      return;
    }

    // Construct the GitHub repository URL
    const githubRepoUrl = `https://github.com/${username}/${repoName}`;
    chrome.tabs.create({ url: githubRepoUrl });
  }
});
