import debounce from "./debounce";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("debounce",() => {
  test("debounce should be a function",() => {
    let callCount = 0;

    let debounced = debounce(function () {
      ++callCount;
      return callCount;
    },32);

    debounced();

    jest.runAllTimers();

    expect(callCount).toEqual(1);
  });

  test("debounce should throw an error when first params is not a function",() => {
    try {
      let debounced = debounce("not a function",32);
      debounced();
    } catch (e) {
      expect(e.message).toEqual("first param should be a function!");
    }
  });

  test("don't pass delay value, debounce should be excuted after 1 second",() => {
    let callCount = 0;

    let debounced = debounce(function () {
      ++callCount;
      return callCount;
    });

    debounced();

    // after 0.5 second
    jest.advanceTimersByTime(500);

    expect(callCount).not.toEqual(1);

    // after 1 second
    jest.advanceTimersByTime(500);

    expect(callCount).toEqual(1);
  });

  test("delay 5 sceond, debounce should be excuted after 5 second",() => {
    let callCount = 0;

    let debounced = debounce(function () {
      ++callCount;
      return callCount;
    },5000);

    debounced();

    // after 1 second
    jest.advanceTimersByTime(1000);
    expect(callCount).not.toEqual(1);

    // after 3 second
    jest.advanceTimersByTime(3000);
    expect(callCount).not.toEqual(1);

    // after 5 second
    jest.advanceTimersByTime(5000);
    expect(callCount).toEqual(1);
  });

  test("debounce should be excuted one time within 1 second",() => {
    let callCount = 0;

    // before debounce
    let fn = () => {
      ++callCount;
      return callCount;
    };

    for (let i = 0; i < 5; i++) {
      fn();
    }
    expect(callCount).toEqual(5);

    // after debounce
    callCount = 0; // reset callCount
    let debounced = debounce(fn,1000);
    for (let i = 0; i < 5; i++) {
      debounced();
    }

    jest.runAllTimers();

    expect(callCount).toEqual(1);
  });
});
