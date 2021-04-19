export default {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  };