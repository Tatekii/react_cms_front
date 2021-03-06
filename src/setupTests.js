const localStorageMock = {
  data: {},
  getItem(key) {
    return Reflect.get(this.data, key);
  },
  setItem(key, val) {
    return Reflect.set(this.data, key, val);
  },
  removeItem(key) {
    return Reflect.deleteProperty(this.data, key);
  },
  clear() {
    this.data = {};
  },
};
global.localStorage = localStorageMock;

delete window.matchMedia;
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// MockWorker
class MockWorker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
}
global.Worker = MockWorker;
global.URL.createObjectURL = jest.fn();

// Mock Navigator
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;
