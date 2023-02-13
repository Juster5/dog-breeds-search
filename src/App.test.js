import {
  render,
  screen,
  act,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// mock result
const mockResult = [
  {
    height: {
      metric: "23 - 29",
    },
    id: 1,
    name: "Affenpinscher",
    life_span: "10 - 12 years",
    image: {
      url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
    },
  },
  {
    height: {
      metric: "64 - 69",
    },
    id: 2,
    name: "Afghan Hound",
    life_span: "8 - 13 years",
    image: {
      url: "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
    },
  },
  {
    height: {
      metric: "76",
    },
    id: 3,
    name: "African Hunting Dog",
    life_span: "11 years",
    image: {
      url: "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
    },
  },
];

const setup = async () => {
  jest.useFakeTimers();
  render(<App />);
};

const fetchMockDataAndRender = async () => {
  jest.useFakeTimers();

  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockResult),
    })
  );

  render(<App />);

  // because debounce, request will be sent after 1s
  await act(() => {
    jest.runAllTimers();
  });
};

// beforeEach(() => {
//   jest.useFakeTimers();
// });

afterEach(() => {
  cleanup();
});

describe("ui renders correctly", () => {
  test("render title", async () => {
    await setup();
    const title = screen.getByText("Dog Breeds Search");
    expect(title).toBeInTheDocument();
  });

  test("render search button", async () => {
    await setup();
    const button = screen.getByText("Search");
    expect(button).toBeInTheDocument();
  });

  test("render sort selector", async () => {
    await setup();
    const selector = screen.getByTestId("s-selector");
    expect(selector).toBeInTheDocument();
  });

  test("render table successfully", async () => {
    await fetchMockDataAndRender();

    const AfricanHuntingDog = screen.getByText("African Hunting Dog");
    expect(AfricanHuntingDog).toBeInTheDocument();

    const heightInfo = screen.getByText("64 - 69");
    expect(heightInfo).toBeInTheDocument();

    global.fetch.mockClear();
  });

  test("render table unsuccefully, then shows error and reload button", async () => {
    jest.useFakeTimers();

    // fetch reject
    global.fetch = jest.fn(() => Promise.reject());

    render(<App />);

    // because debounce, request will be sent after 1s
    await act(() => {
      jest.runAllTimers();
    });

    const reloadButton = screen.getByText(
      "somethings error, click reload again"
    );

    expect(reloadButton).toBeInTheDocument();

    global.fetch.mockClear();
  });
});

describe("interact correctly", () => {
  test("search button should be debounce", async () => {
    let callbackCount = 0;

    global.fetch = jest.fn(() => callbackCount++);

    setup();

    const searchButton = screen.getByText("Search");

    await act(() => {
      // click 5 times
      for (let i = 0; i < 5; i++) {
        fireEvent.click(searchButton);
      }
    });

    await act(() => {
      jest.runAllTimers();
    });

    // after bounced, callbackCount should be 1
    expect(callbackCount).toEqual(1);
  });

  test("data can be sorted by life span desc correctly", async () => {
    await fetchMockDataAndRender();

    // click sort by selector
    const selector = screen.getByTestId("s-selector");
    expect(selector).toBeInTheDocument();
    userEvent.click(selector);

    // click Life Span Desc option
    const selectLifeSpanDesc = screen.getByText("Life Span Desc");
    expect(selectLifeSpanDesc).toBeInTheDocument();
    userEvent.click(selectLifeSpanDesc);

    const LifeSpans = screen.getAllByTitle("Life Span");
    const sortedLifeSpans = [];

    for (let i = 0; i < LifeSpans.length; i++) {
      sortedLifeSpans.push(LifeSpans[i].innerHTML);
    }

    // base on the mock result to compare
    expect(sortedLifeSpans).toEqual([
      "8 - 13 years",
      "10 - 12 years",
      "11 years",
    ]);

    global.fetch.mockClear();
  });
});
