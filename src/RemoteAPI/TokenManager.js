import axios from 'axios';

export default function TokenManager(mainAxiosInstance) {
  let _token;
  let _tokenExpiresAt;

  // load token from localstorage on fresh app load
  let savedToken = localStorage.getItem('token')
  if (savedToken !== null && rememberTokenPreference()) {
    _tokenExpiresAt = JSON.parse(atob(savedToken.split('.')[1])).exp;
    const expired = (_tokenExpiresAt - Date.now() / 1000) <= 0;
    
    if (expired) {
      localStorage.removeItem('token');
    } else {
      set(savedToken, rememberTokenPreference());
    }
  }

  function rememberTokenPreference() {
    const string = localStorage.getItem('remember-token');
    return string.toLowerCase() === 'true';
  }

  function set(token, remember=false) {
    /* save token in memory and set auth header with token to the axios instance
    which is used across the app */
    _token = token;
    _tokenExpiresAt = JSON.parse(atob(token.split('.')[1])).exp;
    mainAxiosInstance.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('remember-token', remember)
    if (remember) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }

  async function autoRefresh(refreshUrl) {
    if (!_token) return;

    const expiresInLessThanFiveMinutes = (_tokenExpiresAt - Date.now() / 1000) < 5 * 60;
    if (expiresInLessThanFiveMinutes) {
      /* use another axios instance to refresh token in background (avoid triggering cyclical 
      token refresh from axios instance request interceptor) */
      axios.post(refreshUrl, null, { headers : { 'Authorization': _token }})
        .then(res => {
          set(res.data.token, rememberTokenPreference());
        }).catch(error => {
          console.log('refresh error', error)
        })
    }
  }

  function clear() {
    _token = undefined;
    localStorage.removeItem('token')
    localStorage.removeItem('remember-token')
  }

  return {
    autoRefresh,
    set,
    clear,
    get isAuthenticated() {
      // if (process.env.REACT_APP_ENV === 'development') {
      //   return true;
      // }
      return Boolean(_token);
    }
  };
}
