import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];
  render(<UserList users={users} />);

  return { users };
}

test("render one row per user", () => {
  // Render the component
  // const { container } = render(<UserList users={users} />);
  renderComponent();

  // Find all the rows in the table
  // screen.logTestingPlaygroundURL();
  // https://testing-playground.com/#markup=DwEwlgbgfMAuCGAjANgUxrAFq+IOagDl4BbVYAei3ygFET4xlLqXtcNEB7EATwwBOGPACt4AO3JU8cURNQABMZIB0AYy4kWMqkLh7YeAM6ltwqCZILL6zWZZ6q3PjCpI0r8NCA
  // const rows = screen.getAllByRole("row");
  // Fallback#1
  const rows = within(screen.getByTestId("data-users")).getAllByRole("row");

  // Fallback#2
  // eslint-disable-next-line
  // const rows = container.querySelectorAll("tbody tr");

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
