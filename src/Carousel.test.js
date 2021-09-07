import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test -> tests for rendering Component 
it('should render without crashing', () => {
  // render Component 
  render(<Carousel />) 
})

// snapshot test -> tests for snapshot of DOM 
it('should match snapshot', () => {
  // destructure {asFragment} from Object 
  // return snapshot
  const { asFragment } = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot(); 
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// left arrow - specialized test 
it('does not work when you click the left arrow', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />)
  // move back in the carousel 
  const leftArrow = queryByTestId('left-arrow') 
  const rightArrow = queryByTestId('right-arrow') 
  
  // move to the right
  fireEvent.click(rightArrow) 

  // when clicking left arrow on 2nd image expect to move to first image
  fireEvent.click(leftArrow)
  expect(queryByAltText('Photo by Patrik Patel on Unsplash')).not.toBeInTheDocument()
  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument() 
})

// exhaust image array - specialized test
it('arrow is not showing on far left and far right', () => {
  const { getByTestId } = render(<Carousel />) 
  const leftArrow = getByTestId('left-arrow')
  const rightArrow = getByTestId('right-arrow')

  // 1st image
  expect(leftArrow).toHaveClass('fas fa-chevron-circle-left fa-2x hidden')
  expect(rightArrow).not.toHaveClass('fas fa-chevron-circle-right fa-2x hidden')

  // 2nd image
  fireEvent.click(rightArrow) 
  expect(leftArrow).not.toHaveClass('fas fa-chevron-circle-left fa-2x hidden') 
  expect(rightArrow).not.toHaveClass('fas fa-chevron-circle-right fa-2x hidden') 

  // 3rd image
  fireEvent.click(rightArrow) 
  expect(leftArrow).not.toHaveClass('fas fa-chevron-circle-left fa-2x hidden') 
  expect(rightArrow).toHaveClass('fas fa-chevron-circle-right fa-2x hidden')
})