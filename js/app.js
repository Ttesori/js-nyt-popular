const els = {
  viewedEl: document.querySelector('.nyt-viewed'),
  emailedEl: document.querySelector('.nyt-emailed'),
  facebookEl: document.querySelector('.nyt-facebook')
}

const init = async () => {
  try {
    //addList(await getMostViewed(), els.viewedEl);
    console.log(await getMostViewed());

    // addList(await getMostEmailed(), els.emailedEl);
    // addList(await getFacebook(), els.facebookEl);
  } catch (err) {
    console.log('error', err);
  }

}

const getMostViewed = async () => {
  let resp = await fetch('/netlify/functions/getMostViewed');
  console.log(resp);
  console.log(await resp.json());

  //return data.results.slice(0, 10).map(article => article.title);
}

const getMostEmailed = async () => {
  let resp = await fetch('https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=');
  let data = await resp.json();

  return data.results.slice(0, 10).map(article => article.title);
}

const getFacebook = async () => {
  let resp = await fetch('https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=');
  let data = await resp.json();

  return data.results.slice(0, 10).map(article => article.title);
}

const parseList = (list) => {
  return list.map(item => {
    const li = document.createElement('li');
    li.textContent = item;
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