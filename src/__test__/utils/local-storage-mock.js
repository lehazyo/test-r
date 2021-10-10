let localStorageMockPre = () => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => store[key] = value.toString(),
    clear: () => store = {},
    removeItem: key => delete store[key],
  };
};

export const localStorageMock = localStorageMockPre();

// add this to your test:
// Object.defineProperty(window, 'localStorage', { value: localStorageMock });