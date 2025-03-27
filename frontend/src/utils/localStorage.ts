const LocalStore = {
  set: (key: string, value: any) => {
    if (window.localStorage) {
      localStorage.setItem(key, value);
    }
  },

  get: (key: string) => {
    if (window.localStorage) {
      return localStorage.getItem(key);
    }
    return "";
  },

  remove: (key: string) => {
    if (window.localStorage) {
      localStorage.removeItem(key);
    }
  },
};

export default LocalStore;
