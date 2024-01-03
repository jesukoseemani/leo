import Navbar from "../../components/navbar/Navbar";
import { getTestLayout } from "../../utils/test.helpers";
import SearchInput from "../../components/searchInput/SearchInput";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

describe("navbar test", () => {
  describe("navbar ui", () => {
    let navbarElement;
    beforeEach(() => {
      navbarElement = getTestLayout(<Navbar />, "redux-react-router");
    });

    it("should render the navbar component", () => {
      render(navbarElement);
      expect(navbarElement).not.toBeNull();
    });

    it("should render the navbar logo", () => {
      render(navbarElement);

      const navbarLogo = screen.getByRole("banner");
      expect(navbarLogo).not.toBeNull();
    });

    it("should have the appropriate navbar logo name", () => {
      render(navbarElement);

      const navbarLogoName = screen.getByRole("banner");
      expect(navbarLogoName).toHaveTextContent("ML");
    });

    it("should have the correct number of nav links", () => {
      render(navbarElement);

      const navLinkContainer = screen.getByTestId("navbar-link-container");
      expect(navLinkContainer.childNodes.length).toBe(2);
    });

    it("should show the input field in the navbar", () => {
      render(navbarElement);
      const navbarInputField = screen.getByRole("searchbox");

      expect(navbarInputField).toBeInTheDocument();
      expect(navbarInputField).toBeVisible();
    });
  });

  describe("navbar functionality", () => {
    let navbarElement;
    beforeEach(() => {
      navbarElement = getTestLayout(<Navbar />, "redux-react-router");
    });

    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it("should navigate back to the homepage when the logo is clicked", () => {
      render(navbarElement);

      const navbarLogo = screen.getByRole("banner");
      fireEvent.click(navbarLogo);

      expect(window.location.pathname).toBe("/movies");
    });

    const itShouldNavigateToTheAppropriatePage = (linkName, pathname) =>
      it(`should navigate to the ${pathname} page when the ${linkName} link is clicked`, () => {
        render(navbarElement);

        const navbarLink = screen.getAllByRole("link", { name: linkName });

        /** Mobile and Desktop NavLink */
        for (let i = 0; i < navbarLink.length; i++) {
          fireEvent.click(navbarLink[i]);
          expect(window.location.pathname).toBe(pathname);
        }
      });

    itShouldNavigateToTheAppropriatePage("FAVOURITES", "/favourites");
    itShouldNavigateToTheAppropriatePage("WATCH LATER", "/watch-later");

    it("should onChange the search input field in the navbar", () => {
      render(navbarElement);
      const navbarInputField = screen.getByRole("searchbox");

      fireEvent.change(navbarInputField, { target: { value: "search" } });
      expect(navbarInputField.value).toBe("search");
    });

    it("should change the url query params when the search input field is changed", () => {
      render(navbarElement);
      const navbarInputField = screen.getByRole("searchbox");

      fireEvent.change(navbarInputField, { target: { value: "search" } });
      expect(window.location.search).toBe("?query=search");
    });

    it("should call the onSearch function when the search input field is in focus", () => {
      const onSearch = jest.fn();
      const searchElement = getTestLayout(
        <SearchInput onSearch={onSearch} />,
        "react-router"
      );

      render(searchElement);
      const searchInputField = screen.getByRole("searchbox");

      fireEvent.focus(searchInputField);

      expect(onSearch).toHaveBeenCalled();
      expect(onSearch).toHaveBeenCalledTimes(1);
    });
  });
});
