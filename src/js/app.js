const els = {
  viewedEl: document.querySelector('.nyt-viewed'),
  emailedEl: document.querySelector('.nyt-emailed'),
  facebookEl: document.querySelector('.nyt-facebook')
}

const init = async () => {
  try {
    addList(await getMostViewed(), els.viewedEl);
    addList(await getMostEmailed(), els.emailedEl);
    addList(await getFacebook(), els.facebookEl);
  } catch (err) {
    console.log('error', err);
  }

}

const getMostViewed = async () => {
  let resp = await fetch('/.netlify/functions/getMostViewed');
  const data = await resp.json();
  return getData(data.results);
}

const getMostEmailed = async () => {
  let resp = await fetch('/.netlify/functions/getMostEmailed');
  let data = await resp.json();

  return getData(data.results);
}

const getFacebook = async () => {
  let resp = await fetch('/.netlify/functions/getFacebook');
  let data = await resp.json();

  return getData(data.results);
}

const getData = results => {
  console.log(results);
  return results.slice(0, 10).map(article => ({
    title: article.title,
    abstract: article.abstract,
    url: article.url
  }));
}

const parseList = (list) => {
  return list.map(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.url;
    a.textContent = item.title;
    li.appendChild(a);
    return li;
  });
}

const addList = (list, el) => {
  const ul = document.createElement('ul');
  const lis = parseList(list);
  lis.forEach(li => ul.appendChild(li));
  el.appendChild(ul);
}

init();