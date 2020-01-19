import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved
} from "test-utils";
import { RecommendedActionCard } from "components/cards";

test("renders correctly", () => {
  const props = {
    assignment: {
      _id: "",
      subject: "homework",
      date: "",
      urgency: "normal",
      description: "Extra hard homework",
      done: false,
      createdBy: {
        _id: "",
        name: "",
        picture: ""
      }
    }
  };

  const { asFragment } = render(<RecommendedActionCard {...props} />);
  expect(asFragment()).toMatchSnapshot();
});

test("will display homework modal with description", async () => {
  const props = {
    assignment: {
      _id: "",
      subject: "Really hard homework",
      date: new Date(),
      urgency: "normal",
      description: "Extra hard homework",
      done: false,
      createdBy: {
        _id: "",
        name: "",
        picture: ""
      }
    }
  };

  const { getByText } = render(<RecommendedActionCard {...props} />);

  fireEvent.click(getByText("View More"));

  await waitForElement(() => getByText(props.assignment.subject));
  getByText(`Description: ${props.assignment.description}`);

  fireEvent.click(getByText("OK"));
});

test("will display homework modal with no description", async () => {
  const props = {
    assignment: {
      _id: "",
      subject: "No description homework",
      date: new Date(),
      urgency: "normal",
      description: null,
      done: false,
      createdBy: {
        _id: "",
        name: "",
        picture: ""
      }
    }
  };

  const { getByText } = render(<RecommendedActionCard {...props} />);
  fireEvent.click(getByText("View More"));

  await waitForElement(() => getByText(props.assignment.subject));
  getByText("No Description");

  fireEvent.click(getByText("OK"));
});

test("will display evaluation modal with description", async () => {
  const props = {
    assignment: {
      _id: "",
      subject: "Hamlet",
      evaluationType: "quiz",
      date: "",
      urgency: "normal",
      description: "chapters",
      done: false,
      createdBy: {
        _id: "",
        name: "",
        picture: ""
      }
    }
  };

  const { getByText } = render(<RecommendedActionCard {...props} />);

  fireEvent.click(getByText("View More"));

  await waitForElement(() => getByText(props.assignment.evaluationType));
  getByText(`: ${props.assignment.subject}`);
  getByText(`Description: ${props.assignment.description}`);

  fireEvent.click(getByText("OK"));
});

test("marks as done", async () => {
  const props = {
    assignment: {
      _id: "",
      subject: "Hamlet",
      evaluationType: "quiz",
      date: "",
      urgency: "normal",
      description: "chapters",
      done: false,
      createdBy: {
        _id: "",
        name: "",
        picture: ""
      }
    }
  };

  const { getByText } = render(<RecommendedActionCard {...props} />);

  fireEvent.click(getByText("Done"));

  waitForElementToBeRemoved(() =>
    getByText(`Start studying for ${props.assignment.subject}`)
  );
});
