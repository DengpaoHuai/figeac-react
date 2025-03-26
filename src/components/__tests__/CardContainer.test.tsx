/*import Toto from "./Toto";

const CardContainer = () => {
  return (
    <div>
      <h1>title</h1>
      <Toto></Toto>
    </div>
  );
};

export default CardContainer;
*/

import { render, screen } from "@testing-library/react";
import CardContainer from "../CardContainer";

describe("CardContainer", () => {
  beforeEach(() => {});

  it("should render with title", () => {
    render(<CardContainer />);
    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("should render with Toto", () => {
    //vi.mock("./Toto", () => ({ Toto: () => <p>autre chose</p> }));

    render(<CardContainer />);
    expect(screen.getByText("autre chose")).toBeInTheDocument();
  });
});
