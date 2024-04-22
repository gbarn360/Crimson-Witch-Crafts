import {render,screen} from "@testing-library/react"
import Home from "../app/page"
import { it } from "node:test"

it("should have test text",()=>{
    render(<Home />)
    const elem = screen.getByText("test");
    expect(elem).toBeInTheDocument();
})