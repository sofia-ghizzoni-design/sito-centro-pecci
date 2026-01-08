// Dropdown header functionality for .voci-header with transition and fade between nav-* menus

document.addEventListener('DOMContentLoaded', function () {
  const vociHeader = document.querySelector('.voci-header');
  const header = document.querySelector('.header');
  const menuItems = document.querySelectorAll('.menu li[class*="nav-"]');
  const navLists = document.querySelectorAll('.voci-header ul[class^="nav-"]');

  // Collapse .voci-header by default
  if (vociHeader) {
    vociHeader.classList.remove('expanded');
    vociHeader.classList.add('collapsed');
  }
  if (header) {
    header.classList.remove('open');
    header.classList.add('closed');
  }

  // Show .voci-header and correct menu on menu item click
  menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
      const navClass = Array.from(item.classList).find(cls => cls.startsWith('nav-'));
      if (!navClass || !vociHeader) return;

      // Expand header
      vociHeader.classList.add('expanded');
      vociHeader.classList.remove('collapsed');
      if (header) {
        header.classList.add('open');
        header.classList.remove('closed');
      }

      // Toggle .selected class on menu items
      menuItems.forEach(nav => nav.classList.remove('selected'));
      item.classList.add('selected');

      // Fade out currently visible menu
      const visibleUl = Array.from(navLists).find(ul => ul.classList.contains('d-flex') && !ul.classList.contains('d-none'));
      const targetUl = vociHeader.querySelector('ul.' + navClass);

      if (visibleUl && visibleUl !== targetUl) {
        visibleUl.classList.remove('fade-in');
        visibleUl.classList.add('fade-out');
        setTimeout(() => {
          visibleUl.classList.add('d-none');
          visibleUl.classList.remove('d-flex', 'fade-out');
          // Fade in the target menu after fade out
          if (targetUl) {
            targetUl.classList.remove('d-none');
            targetUl.classList.add('d-flex');
            targetUl.classList.remove('fade-in', 'fade-out');
            targetUl.style.opacity = '0';
            // Force reflow to trigger transition
            void targetUl.offsetWidth;
            targetUl.classList.add('fade-in');
            setTimeout(() => {
              targetUl.classList.remove('fade-in');
              targetUl.style.opacity = '';
            }, 150);
          }
        }, 150);
      } else if (targetUl && targetUl.classList.contains('d-none')) {
        // If no visible menu or switching to the same, just fade in
        targetUl.classList.remove('d-none');
        targetUl.classList.add('d-flex', 'fade-in');
        setTimeout(() => {
          targetUl.classList.remove('fade-in');
        }, 150);
      }

      // Hide all other nav-* ul (except the target)
      navLists.forEach(ul => {
        if (ul !== targetUl && (!visibleUl || ul !== visibleUl)) {
          ul.classList.add('d-none');
          ul.classList.remove('d-flex', 'fade-in', 'fade-out');
        }
      });

      // Prevent event bubbling to document
      e.stopPropagation();
    });
  });

  // Collapse .voci-header when clicking outside
  document.addEventListener('click', function (e) {
    if (vociHeader && !vociHeader.contains(e.target)) {
      vociHeader.classList.remove('expanded');
      vociHeader.classList.add('collapsed');
      if (header) {
        header.classList.add('closed');
        header.classList.remove('open');
      }
      // Hide all nav-* ul
      navLists.forEach(ul => {
        ul.classList.add('d-none');
        ul.classList.remove('d-flex', 'fade-in', 'fade-out');
      });
      // Remove .selected from all menu items
      menuItems.forEach(nav => nav.classList.remove('selected'));
    }
  });

  // Prevent collapse when clicking inside .voci-header
  if (vociHeader) {
    vociHeader.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
});
