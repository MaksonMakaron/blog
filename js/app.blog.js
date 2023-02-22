(async () => {
  const blog = document.querySelector('#app-blog-list');
  const articlesEl = document.querySelector('#list-articles');
  const paginationEl = document.querySelector('#pagination');
  const articles = await getArticles(getNumberPageURLSearch());
  const pagination = await getMetaPagination();
  if (articles === false) {
    return;
  }

  createItemsList();
  createPagination();

  async function getMetaPagination() {
    let url = 'https://gorest.co.in/public-api/posts';
    const response = await fetch(url);
    const infoResposne = await response.json();
    return infoResposne.meta.pagination;
  }

  async function getArticles(numberPage) {
    let numberParam = '?page=' + numberPage;
    let url = 'https://gorest.co.in/public-api/posts' + numberParam;
    const response = await fetch(url);
    const infoResposne = await response.json();
    if (infoResposne.data.length == 0) {
      createNotFound();
      return false;
    }
    return infoResposne.data;
  }

  function getNumberPageURLSearch() {
    const pageParams = new URLSearchParams(window.location.search);
    let numberPage = 1;
    if (pageParams.get('page') != null) {
      numberPage = pageParams.get('page');
    }
    return numberPage;
  }

  async function createPagination() {
    const pages = pagination.pages; //нет ограничения на макс. стр.
    let currentPage = Number(getNumberPageURLSearch());
    let startPage = 0;
    let endPage = 5;
    if (currentPage >= 4) {
      startPage = currentPage - 3;
      endPage = currentPage + 2;
      const inStartEl = document.createElement('a');
      inStartEl.classList.add('pagination-item-text');
      inStartEl.textContent = 'В начало';
      inStartEl.href = '?';
      paginationEl.append(inStartEl);
    }
    for (let i = startPage; i < endPage; i++) {
      const linkPagEl = document.createElement('a');
      linkPagEl.classList.add('pagination-item');
      let page = i + 1;
      linkPagEl.textContent = page;
      linkPagEl.href = '?page=' + page;
      if (currentPage == page) {
        addClassPagination(linkPagEl);
      }
      paginationEl.append(linkPagEl);
    }
    const nestPageEl = document.createElement('a');
    nestPageEl.textContent = 'дальше';
    nestPageEl.classList.add('pagination-item-text');
    nestPageEl.href = '?page=' + (currentPage + 1);
    paginationEl.append(nestPageEl);
  }

  function addClassPagination(item) {
    item.classList.add('pagination-item-active');
  }

  function createItemsList() {
    articles.forEach((article) => {
      const itemEl = document.createElement('li');
      itemEl.classList.add('item-article');
      const iconEl = document.createElement('span');
      iconEl.classList.add('icon-article');
      const linkEl = document.createElement('a');
      linkEl.classList.add('link-article');
      linkEl.textContent = article.title;
      linkEl.href = 'post.html?id=' + article.id;
      itemEl.append(iconEl);
      itemEl.append(linkEl);
      articlesEl.append(itemEl);
    });
  }

  function createNotFound() {
    const titleNotFoundEl = document.createElement('h2');
    titleNotFoundEl.classList.add('heading-not-found');
    titleNotFoundEl.textContent = 'Ошибка 404';
    const descNotFoundEl = document.createElement('p');
    descNotFoundEl.classList.add('desc-not-found');
    descNotFoundEl.textContent = 'Отсутствуют статьи';
    blog.append(titleNotFoundEl);
    blog.append(descNotFoundEl);
  }
})();
