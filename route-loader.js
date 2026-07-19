(() => {
  const source = document.documentElement.dataset.source;
  if (!source) return;

  fetch(source)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to load ${source}.`);
      return response.text();
    })
    .then((markup) => {
      const routedMarkup = markup.replace(/<head(\s[^>]*)?>/i, (head) => `${head}<base href="/">`);
      document.open();
      document.write(routedMarkup);
      document.close();
    })
    .catch((error) => {
      document.body.innerHTML = '<main class="route-loader-error">This page could not be loaded.</main>';
      console.warn(error);
    });
})();
