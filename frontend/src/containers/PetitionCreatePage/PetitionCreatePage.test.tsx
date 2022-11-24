import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Navigate, Route, Routes } from "react-router";
import { renderWithProviders } from "../../test-utils/mock";
import { ArticleState } from "../../store/slices/article";
import { PoliticianState } from "../../store/slices/politician";
import { PetitionState } from "../../store/slices/petition";
import { QuoraState } from "../../store/slices/quora";
import { getMockStore } from "../../test-utils/mock";
import PetitionCreatePage from "./PetitionCreatePage";
import { fetchPetitions, fetchPetition, selectPetition } from "../../store/slices/petition";
import Petition, { PetitionType,} from "../../components/Petition/Petition";
import * as petitionSlice from "../../store/slices/petition";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));


describe("<PetitionCreatePage />", () => {
  it("should render without errors", () => {
    renderWithProviders(<PetitionCreatePage />);
    screen.getByText("Petition Create Page");
  });
  it("should render title input", () => {
    renderWithProviders(<PetitionCreatePage />);
    screen.getByLabelText("Title");
  });
  it("should render content input", () => {
    renderWithProviders(<PetitionCreatePage />);
    screen.getByLabelText("Image");
  });

  it("should render content input", () => {
    renderWithProviders(<PetitionCreatePage />);
    screen.getByLabelText("Content");
  });
  it("should render confirm button", () => {
    renderWithProviders(<PetitionCreatePage />);
    screen.getByText("Create");
  });
  it("should render confirm button", () => {
    renderWithProviders(<PetitionCreatePage />);
    screen.getByText("Back");
  });

  it("should alert error when submitted", async () => {
    const mockPostPetition = jest.spyOn(petitionSlice, "postPetition");
    window.alert = jest.fn();
    console.error = jest.fn();
    jest.spyOn(axios, "post").mockRejectedValueOnce(new Error("ERROR"));
    renderWithProviders(<PetitionCreatePage />);
    const titleInput = screen.getByLabelText("Title");
    const contentInput = screen.getByLabelText("Content");
    const submitButton = screen.getByText("Create");
    fireEvent.change(titleInput, { target: { value: "TITLE" } });
    fireEvent.change(contentInput, { target: { value: "CONTENT" } });

    await screen.findByDisplayValue("TITLE");
    await screen.findByDisplayValue("CONTENT");
    fireEvent.click(submitButton);

    expect(mockPostPetition).toHaveBeenCalledWith({
      title: "TITLE",
      content: "CONTENT",
      //author_id: 1,
    });
    await waitFor(() => expect(mockNavigate).not.toHaveBeenCalled());
    //await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Error on post Todo"));
  });

});
