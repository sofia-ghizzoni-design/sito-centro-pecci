// Dropdown header functionality for .voci-header

document.addEventListener('DOMContentLoaded', function () {
  const vociHeader = document.querySelector('.voci-header');
  const menuItems = document.querySelectorAll('.menu li[class*="nav-"]');
  const navLists = document.querySelectorAll('.voci-header ul[class^="nav-"]');

  // Collapse .voci-header by default
  if (vociHeader) {
    vociHeader.classList.add('collapsed');
    vociHeader.style.display = 'none';
  }

  // Show .voci-header and correct menu on menu item click
  menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
      const navClass = Array.from(item.classList).find(cls => cls.startsWith('nav-'));
      if (!navClass || !vociHeader) return;

      // Show header
      vociHeader.classList.remove('collapsed');
      vociHeader.style.display = '';

      // Hide all nav-* ul
      navLists.forEach(ul => {
        ul.classList.add('d-none');
        ul.classList.remove('d-flex');
      });

      // Show the selected nav-* ul
      const targetUl = vociHeader.querySelector('ul.' + navClass);
      if (targetUl) {
        targetUl.classList.remove('d-none');
        targetUl.classList.add('d-flex');
      }

      // Prevent event bubbling to document
      e.stopPropagation();
    });
  });

  // Collapse .voci-header when clicking outside
  document.addEventListener('click', function (e) {
    if (vociHeader && !vociHeader.contains(e.target)) {
      vociHeader.classList.add('collapsed');
      vociHeader.style.display = 'none';
    }
  });

  // Prevent collapse when clicking inside .voci-header
  if (vociHeader) {
    vociHeader.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
});
