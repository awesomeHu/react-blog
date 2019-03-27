export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('user'));
  let admin = JSON.parse(localStorage.getItem('admin'))
  let isAdminLogged = window.location.href.split('/').includes('admin')
  console.log('user in auth', user && user.type, isAdminLogged)

  if (!isAdminLogged && user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  }
  if (isAdminLogged && admin && admin.token) {
    return { 'Authorization': 'Bearer ' + admin.token };
  }
  else {
    return {};
  }
}

export function timestampToTime(timestamp, dayMinSecFlag) {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-';
  const D =
    date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  const h =
    date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  const m =
    date.getMinutes() < 10
      ? '0' + date.getMinutes() + ':'
      : date.getMinutes() + ':';
  const s =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  if (!dayMinSecFlag) {
    return Y + M + D;
  }
  return Y + M + D + h + m + s;
}

export function getQueryStringByName(name) {
  let result = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i'),
  );
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}