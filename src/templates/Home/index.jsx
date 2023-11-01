// Compound Components
import { Children, cloneElement, useState } from "react";

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return Children.map(children, (child) => {
    const newChild = cloneElement(child, {
      isOn,
      onTurn,
    });
    return newChild;
  });
};

const TurnedOn = ({ isOn, children }) => (isOn ? children : null);

const TurnedOFF = ({ isOn, children }) => (isOn ? null : children);

const TurnButton = ({ isOn, onTurn }) => {
  return <button onClick={onTurn}>Turn {isOn ? "OFF" : "ON"}</button>;
};

const P = ({ children }) => <p>{children}</p>;

export const Home = () => {
  return (
    <TurnOnOff>
      <TurnedOn>
        <P>ONLINE</P>
      </TurnedOn>
      <TurnedOFF>
        <P>OFFLINE</P>
      </TurnedOFF>
      <TurnButton />
    </TurnOnOff>
  );
};
