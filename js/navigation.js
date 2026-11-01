(() => {
  const scrollToHashSection = () => {
    const sectionId = window.location.hash.slice(1);
    const section = document.getElementById(sectionId);
    if (!section) return;

    const top = window.scrollY + section.getBoundingClientRect().top - 24;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'instant'
    });
  };

  if (window.location.hash) {
    if (document.readyState === 'complete') {
      requestAnimationFrame(scrollToHashSection);
    } else {
      window.addEventListener('load', scrollToHashSection, { once: true });
    }
  }

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = navToggle
    ? document.getElementById(navToggle.getAttribute('aria-controls'))
    : null;

  if (!navToggle || !siteNav) return;

  const menuLinks = [...siteNav.querySelectorAll('a')];
  const mobileViewport = window.matchMedia('(max-width: 1023px)');

  const setMenuOpen = (isOpen, restoreFocus = false) => {
    const shouldOpen = isOpen && mobileViewport.matches;
    siteNav.classList.toggle('is-open', shouldOpen);
    navToggle.setAttribute('aria-expanded', String(shouldOpen));
    navToggle.setAttribute(
      'aria-label',
      shouldOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
    document.body.classList.toggle('mobile-nav-open', shouldOpen);

    if (shouldOpen) {
      menuLinks[0]?.focus();
    } else if (restoreFocus) {
      navToggle.focus();
    }
  };

  navToggle.addEventListener('click', () => {
    setMenuOpen(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', event => {
      const destination = new URL(link.href, window.location.href);
      let sectionScrollTop = null;

      if (destination.hash && destination.pathname === window.location.pathname) {
        const section = document.getElementById(destination.hash.slice(1));
        if (section) {
          event.preventDefault();
          window.history.pushState(null, '', destination.hash);
          sectionScrollTop = Math.max(
            0,
            window.scrollY + section.getBoundingClientRect().top - 24
          );
        }
      }

      setMenuOpen(false);

      if (sectionScrollTop !== null) {
        window.scrollTo({
          top: sectionScrollTop,
          behavior: 'instant'
        });
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (navToggle.getAttribute('aria-expanded') !== 'true') return;

    if (event.key === 'Escape') {
      setMenuOpen(false, true);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableItems = [navToggle, ...menuLinks];
    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  });

  mobileViewport.addEventListener('change', event => {
    if (!event.matches) setMenuOpen(false);
  });
})();
