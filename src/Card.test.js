import React from 'react' 
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

// smoke test -> tests for rendering Component 
it('should render without crashing', () => {
    // render Component 
    render(<Card />) 
})

// snapshot test -> tests for snapshot of DOM 
it('should match snapshot', () => {
    // destructure {asFragment} from Object 
    // return snapshot
    const { asFragment } = render(<Card />)
    expect(asFragment()).toMatchSnapshot(); 
})