import { render, screen } from "@testing-library/react";
import { Posts } from ".";

const props = {
  posts: [
    {
      id: 1,
      title: "title 1",
      content: "content 1",
      cover: "img/img1.png",
    },
    {
      id: 2,
      title: "title 2",
      content: "content 2",
      cover: "img/img2.png",
    },
    {
      id: 3,
      title: "title 3",
      content: "content 3",
      cover: "img/img3.png",
    },
  ],
};

describe("<Posts />", () => {
  it("should render posts", () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole("heading", { name: /title/i })).toHaveLength(3);

    expect(screen.getAllByRole("img", { src: /img/i })).toHaveLength(3);

    expect(screen.getAllByText(/content/i)).toHaveLength(3);

    expect(screen.getByRole("img", { name: /title 3/i })).toHaveAttribute(
      "src",
      "img/img3.png"
    );
  });

  it("should match snapshot", () => {
    const { container } = render(<Posts {...props} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchSnapshot();
  });
});
