(() => {
  const languageRoutes = {
    home: { en: '/', zh: '/zh/' },
    about: { en: '/about/', zh: '/zh/about/' },
    projects: { en: '/projects/', zh: '/zh/projects/' },
    photography: { en: '/photography/', zh: '/zh/photography/' },
    writing: { en: '/writing/', zh: '/zh/writing/' },
    contact: { en: '/contact/', zh: '/zh/contact/' },
    marcellus: { en: '/projects/marcellus/', zh: '/zh/projects/marcellus/' },
    bridges: { en: '/projects/bridges/', zh: '/zh/projects/bridges/' },
    reassembled: { en: '/projects/reassembled/', zh: '/zh/projects/reassembled/' },
    rhythms: { en: '/projects/rhythms-of-life/', zh: '/zh/projects/rhythms-of-life/' },
  };

  const aliases = {
    '/': 'home',
    '/index.html': 'home',
    '/about': 'about',
    '/about/': 'about',
    '/projects': 'projects',
    '/projects/': 'projects',
    '/projects.html': 'projects',
    '/photography': 'photography',
    '/photography/': 'photography',
    '/photography.html': 'photography',
    '/writing': 'writing',
    '/writing/': 'writing',
    '/thesis.html': 'writing',
    '/contact': 'contact',
    '/contact/': 'contact',
    '/contact.html': 'contact',
    '/projects/marcellus': 'marcellus',
    '/projects/marcellus/': 'marcellus',
    '/project-marcellus.html': 'marcellus',
    '/projects/bridges': 'bridges',
    '/projects/bridges/': 'bridges',
    '/project-bridges.html': 'bridges',
    '/projects/reassembled': 'reassembled',
    '/projects/reassembled/': 'reassembled',
    '/project-reassembled.html': 'reassembled',
    '/projects/rhythms-of-life': 'rhythms',
    '/projects/rhythms-of-life/': 'rhythms',
    '/project-rhythms-of-life.html': 'rhythms',
  };

  const isChineseRoute = /^\/zh(?:\/|$)/.test(window.location.pathname);
  const language = isChineseRoute ? 'zh' : 'en';
  const routePath = isChineseRoute
    ? window.location.pathname.replace(/^\/zh(?=\/|$)/, '') || '/'
    : window.location.pathname;
  const currentRoute = aliases[routePath] || 'home';

  const getValue = (dictionary, key) => key.split('.').reduce((value, part) => value && value[part], dictionary);
  const decodeText = (value) => {
    const template = document.createElement('template');
    template.innerHTML = value;
    return template.content.textContent || '';
  };

  const applyLanguage = (dictionary) => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.dataset.locale = language;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = getValue(dictionary, element.dataset.i18n);
      if (typeof value === 'string') element.textContent = decodeText(value);
    });

    document.querySelectorAll('[data-i18n-html]').forEach((element) => {
      const value = getValue(dictionary, element.dataset.i18nHtml);
      if (typeof value === 'string') element.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
      element.dataset.i18nAttr.split(',').forEach((entry) => {
        const [attribute, key] = entry.trim().split(':');
        const value = getValue(dictionary, key);
        if (attribute && typeof value === 'string') element.setAttribute(attribute, decodeText(value));
      });
    });

    document.querySelectorAll('[data-route]').forEach((link) => {
      const route = languageRoutes[link.dataset.route];
      if (route) link.setAttribute('href', route[language]);
    });

    const nav = document.querySelector('.nav');
    if (nav && !nav.querySelector('.language-switcher')) {
      const languageSwitcher = document.createElement('div');
      languageSwitcher.className = 'language-switcher';
      languageSwitcher.setAttribute('aria-label', getValue(dictionary, 'ui.languageSwitcher'));
      languageSwitcher.innerHTML = `
        <a class="language-switcher__link ${language === 'en' ? 'is-current' : ''}" href="${languageRoutes[currentRoute].en}"${language === 'en' ? ' aria-current="true"' : ''}>${getValue(dictionary, 'ui.englishLabel')}</a>
        <span aria-hidden="true">|</span>
        <a class="language-switcher__link ${language === 'zh' ? 'is-current' : ''}" href="${languageRoutes[currentRoute].zh}"${language === 'zh' ? ' aria-current="true"' : ''}>${getValue(dictionary, 'ui.chineseLabel')}</a>
      `;
      nav.append(languageSwitcher);
    }
  };

  if (window.location.protocol === 'file:') return;

  fetch(`locales/${language}.json`, { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to load ${language} translations.`);
      return response.json();
    })
    .then(applyLanguage)
    .catch((error) => console.warn(error));
})();
