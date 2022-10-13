import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import JobItem from "../JobItem";

const dummyDetails = {
  id: "1234",
  title: "My Title",
  rating: 3.6,
  location: "hyderabad",
  employmentType: "full time",
  packagePerAnnum: "6 LPA",
  jobDescription: "My job description",
};

it("should check whether all the elements are present", () => {
  render(<JobItem details={dummyDetails} />);

  const ratingEl = screen.getByText("3.6");
  expect(ratingEl).toBeInTheDocument();
  screen.getByText(dummyDetails.jobDescription);
  const packageEl = screen.getByTestId("packageEl");
  expect(packageEl).toHaveTextContent(dummyDetails.packagePerAnnum);
  expect(screen.getByTestId("horizontal-rule")).toBeInTheDocument();
});

it("should render correctly", () => {
  const tree = renderer.create(<JobItem details={dummyDetails} />).toJSON();
  expect(tree).toMatchSnapshot();
});
