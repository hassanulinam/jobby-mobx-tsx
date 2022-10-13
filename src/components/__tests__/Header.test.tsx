import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";
import * as stores from "../../stores";
import Header from "../Header";

describe("tests Header component", () => {
  afterEach(cleanup);
  const mockedOnLogout = jest.fn(() => {
    console.log("signing out..");
  });

  it("should trigger onLogout method", () => {
    render(
      <BrowserRouter>
        <Provider {...stores}>
          <Header onLogout={mockedOnLogout} />
        </Provider>
      </BrowserRouter>
    );

    userEvent.click(screen.getByText("Logout"));
    expect(mockedOnLogout).toHaveBeenCalled();
  });

  it("should have three link elements", () => {
    render(
      <BrowserRouter>
        <Provider {...stores}>
          <Header onLogout={mockedOnLogout} />
        </Provider>
      </BrowserRouter>
    );
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
  });
});
