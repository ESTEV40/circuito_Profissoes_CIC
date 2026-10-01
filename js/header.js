document.addEventListener('click', event => {
  const menuToggle = event.target.closest('.menu-toggle')

  if (!menuToggle) {
    return
  }

  const mainNav = document.querySelector('.main-nav')

  if (mainNav) {
    mainNav.classList.toggle('ativo')
  }
})
