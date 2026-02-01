import { render, screen } from "@testing-library/react";
import Current from "@/app/components/Current";

describe("Current", () => {
  it("renders current weather details", () => {
    render(
      <Current
        weather={{ name: "Paris" }}
        current={{
          temp: { day: 18, min: 12, max: 21 },
          weather: [
            {
              main: "Clouds",
              description: "broken clouds",
              icon: "04d",
            },
          ],
        }}
      />,
    );

    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Clouds")).toBeInTheDocument();
    expect(screen.getByText("broken clouds")).toBeInTheDocument();
    expect(screen.getByText(/18/)).toBeInTheDocument();
  });
});
