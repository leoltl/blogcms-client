export default function Cache() {
  let _cache = {}
  let _fullFetch = false;
  
  function get(id=null) {
    if (id === null) {
      return Object.values(_cache);
    }

    return _cache[id];
  }
  
  function set(key, value=undefined) {
    if (!!key && !!value) {
      _cache[key] = value;
      return
    }
  }

  function setArray(items, { getKey=(i) => i._id, fullFetch=false }) {
    let _getkey;
    if (typeof getKey === 'function') {
      _getkey=getKey
    } else {
      throw Error('Argument for getKey should be a function')
    }

    if (fullFetch) {
      _fullFetch = true;
    }

    for (let item of items) {
      _cache[_getkey(item)] = item
    }
  }

  function has(key) {
    return key in _cache;
  }
  
  function needFullFetch() {
    return !_fullFetch || Object.keys(_cache).length === 0;
  }

  return {
    get,
    set,
    setArray,
    has,
    needFullFetch,
  }
}
