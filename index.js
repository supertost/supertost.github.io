const routes = {
  
  '#/': { content: 'homepagecontent.html', css: 'index.css' },
  '#/projects': { content: 'projectscontent.html', css: 'projects.css' },
  '#/otherlinks': { content: 'otherlinks.html', css: 'projects.css' }
};

function render() {

  const path = window.location.hash || '#/';
  const route = routes[path] || routes['#/'];

  document.getElementById('incss').setAttribute('href', route.css);

  fetch(route.content)

    .then(res => {

      if (!res.ok) throw new Error('404');
      return res.text();
    })
    .then(html => {

      document.querySelector('.content').innerHTML = html;
    })
    .catch(() => {

      document.querySelector('.content').innerHTML = '<h2>404 Not Found</h2>';
    });
}


window.addEventListener('hashchange', render);

document.addEventListener('DOMContentLoaded', render);

document.body.addEventListener('click', function (e) {

  if (e.target.matches('[data-link]')) {

    e.preventDefault();
    window.location.hash = e.target.getAttribute('href');
  }
});
