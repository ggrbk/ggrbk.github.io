document.querySelectorAll('li > a').forEach((a) => {
  if (!a.href.startsWith(location.origin)) return;
  const button = document.createElement('button');
  button.textContent = 'Copy';
  button.onclick = () => {
    navigator.clipboard.writeText(a.href);
    button.textContent = 'Copied!';
    setTimeout(() => { button.textContent = 'Copy'; }, 1000);
  };
  a.insertAdjacentElement('afterend', button);
});
