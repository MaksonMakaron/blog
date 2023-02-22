(async () => {
  const post = document.querySelector('#app-post');
  const article = await getArticle(getIdURLSearch());
  const comments = await getComments(getIdURLSearch());

  if (article === false) {
    return;
  }
  createTitle();
  createContent();
  createComments();

  function getIdURLSearch() {
    const pageParams = new URLSearchParams(window.location.search);
    let id = pageParams.get('id');
    return id;
  }

  async function getArticle(idArticle) {
    let url = 'https://gorest.co.in/public-api/posts/' + idArticle;
    const response = await fetch(url);
    const infoResposne = await response.json();
    if (infoResposne.code == 404) {
      createNotFound();
      return false;
    }
    return infoResposne.data;
  }

  async function getComments(idArticle) {
    let url = 'https://gorest.co.in/public-api/comments?post_id=' + idArticle;
    const response = await fetch(url);
    const infoResposne = await response.json();
    return infoResposne.data;
  }

  function createTitle() {
    const titleEl = document.createElement('h2');
    titleEl.classList.add('heading-article');
    titleEl.textContent = article.title;
    post.append(titleEl);
  }

  function createContent() {
    const contentEl = document.createElement('p');
    contentEl.textContent = article.body;
    contentEl.classList.add('text-article');
    post.append(contentEl);
  }

  function createComments() {
    const titleCommentEl = document.createElement('h3');
    titleCommentEl.textContent = 'КОММЕНТАРИИ';
    titleCommentEl.classList.add('heading');
    post.append(titleCommentEl);
    if (comments.length > 0) {
      const commentsEl = document.createElement('ul');
      commentsEl.classList.add('list-comments');
      comments.forEach((comment) => {
        const commentItemEl = document.createElement('li');
        commentItemEl.classList.add('item-comment');

        const usernameEl = document.createElement('span');
        usernameEl.textContent = comment.name + '  |  ';
        usernameEl.classList.add('username-text');

        const emailEl = document.createElement('span');
        emailEl.textContent = comment.email;
        emailEl.classList.add('email-text');

        const commentEl = document.createElement('p');
        commentEl.textContent = comment.body;
        commentEl.classList.add('comment-text');

        commentItemEl.append(usernameEl);
        commentItemEl.append(emailEl);
        commentItemEl.append(commentEl);
        commentsEl.append(commentItemEl);
      });

      post.append(commentsEl);
    } else {
      const noCommentsEl = document.createElement('p');
      noCommentsEl.textContent = 'Комментарии отсутсвуют';
      post.append(noCommentsEl);
    }
  }

  function createNotFound() {
    const titleNotFoundEl = document.createElement('h2');
    titleNotFoundEl.classList.add('heading-not-found');
    titleNotFoundEl.textContent = 'Ошибка 404';
    const descNotFoundEl = document.createElement('p');
    descNotFoundEl.classList.add('desc-not-found');
    descNotFoundEl.textContent = 'Статья не найдена';
    post.append(titleNotFoundEl);
    post.append(descNotFoundEl);
  }
})();
