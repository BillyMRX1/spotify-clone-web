import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import LandingComponent from "..";
import store from "../../redux/store/store";

test("Check components render correctly", () => {
  render(
    <Provider store={store}>
      <LandingComponent />
    </Provider>
  );

  const search = screen.getByTestId("search-bar");
  expect(search).toBeInTheDocument();
});

const getTrackList = async (query, token) => {
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
  if (query !== "") {
    const trackData = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token.access_token,
      },
    }).then((res) => res.json());
    return trackData.tracks.items[0].name;
  }
};

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          tracks: { items: { 0: { name: "into the night" } } },
        }),
    }),
  Promise.reject("rejected")
);

test("Mocking search API", async () => {
  const token = {
    access_token:
      "BQABHOB_GVHxBkxJOETW55B6x1MxPBi9oeqtru2Gz6fFHA5Hd-6T4GTogMlzTh0EGzZ_cvKBHnICksLdPpy5rf1LGUFrtOUt84UvgbfsriIeVBKNIdwc6nkHcw_rSOO-fvjy0GFm7daqDBKxiQAicj61CGq0HVKTicAOLHt9l_IuMw",
    token_type: "Bearer",
    expires_in: "3600",
  };
  const data = getTrackList("YOASOBI", token);
  expect(data).toBeDefined();
  expect(fetch).toHaveBeenCalledTimes(1);
});
