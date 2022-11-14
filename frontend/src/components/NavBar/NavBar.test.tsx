import { render, screen } from '@testing-library/react'
import { RootState } from '../../store'
import UserInfoBtn, { UserInfoBtnType } from "../UserInfoBtn/UserInfoBtn"
import { renderWithProviders, rootInitialState } from '../../test-utils/mock'
import NavBar from './NavBar'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const preloadedState: RootState = rootInitialState

jest.mock('../UserInfoBtn/UserInfoBtn', () => spyUserInfoButton)
const spyUserInfoButton = () => (
  <div data-testid='spyUserInfoButton'>spyUserInfoButton</div>
)


describe('<NavBar />', () => {
    it("should render nav", () => {
        render(<NavBar />);
        screen.getByText("JungJung DangDang"); // Implicit assertion
        const button = screen.getByText("Home"); // Implicit assertion
        expect(button).toBeInTheDocument(); // Explicit assertion
      });
      it("should render nav", () => {
        render(<NavBar />);
        const button = screen.getByText("News List");
        expect(button).toBeInTheDocument();
      });

      it("should render nav", () => {
        render(<NavBar />);
        const button = screen.getByText("Politicians");
        expect(button).toBeInTheDocument();
      });

      it("should render nav", () => {
        render(<NavBar />);
        const button = screen.getByText("Petition");
        expect(button).toBeInTheDocument();
      });

      it("should render nav", () => {
        render(<NavBar />);
        const button = screen.getByText("Quora");
        expect(button).toBeInTheDocument();
      });

      it("should render done mark when done is true", () => {
        render(<NavBar />);
        const image = screen.getByTestId('spyUserInfoButton')
        expect(image.innerHTML).toEqual('spyUserInfoButton')
      });

      it("should render user info btn", () => {
        const { container } = render(<NavBar />);
        expect(container.getElementsByClassName('navBar-userIcon').length).toBe(1);
      });
    });