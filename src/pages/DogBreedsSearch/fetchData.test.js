import fetchData from './fetchData';

describe('test fetch data',() => {

  test('fetch data successfully',async () => {

    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      statusText: '',
      json: () => Promise.resolve([{},{},{}]),
    })
    );

    const res = await fetchData()
    expect(global.fetch).toBeCalledTimes(1)
    expect(res.length).toEqual(3)

    global.fetch.mockClear()
  })


  test('fetch data unsuccessfully',async () => {
    try {
      global.fetch = jest.fn(() => Promise.reject({
        status: 500,
        statusText: 'error message',
        json: () => Promise.reject(),
      })
      );
      await fetchData()
      expect(global.fetch).toBeCalledTimes(1)
      global.fetch.mockClear()

    } catch (e) {
      expect(e).toEqual('error message')
    }
  })
})
