const encodeHash = (hash) => hash.replace(/&/g, "%26").replace(/#/, "%23").replace(/ /g, "+");
const applyHash = (hash) => {
  hash = encodeHash(hash);
  const urls = {
    "Google": ["https://www.google.com/", "search?q="],
    "Bing": ["https://www.bing.com/", "search?q="],
    "DuckDuckGo": ["https://duckduckgo.com/", "?q="],
    "Yahoo": ["https://search.yahoo.com/", "search?p="],
    "Brave": ["https://search.brave.com/", "search?q="],
    "Ecosia": ["https://www.ecosia.org/", "search?q="],
  };
  Array.from(document.body.querySelectorAll("li > a")).forEach((element) => {
    const href = element.attributes.getNamedItem("href");
    href.value = hash ? urls[element.textContent].join("") + hash : urls[element.textContent][0];
  });
};
const ggr = () => {
  const hash = location.hash.substring(1);
  if (!hash) return;
  applyHash(hash);
  const search = document.getElementById("search");
  search.value = decodeURI(hash.replace("+", " ")).replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};
document.getElementById("search").addEventListener("input", (event) => {
  location.hash = event.target.value ? "#" + event.target.value.replaceAll(" ", "+") : "";
  applyHash(event.target.value);
});
