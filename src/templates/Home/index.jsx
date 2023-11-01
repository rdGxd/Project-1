// Compound Components
import { createContext, useContext, useState } from "react";

const TurnOnOffContext = createContext();

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return <TurnOnOffContext.Provider value={{ isOn, onTurn }}>{children}</TurnOnOffContext.Provider>;
};

const TurnedOn = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? children : null;
};

const TurnedOFF = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? null : children;
};

const TurnButton = () => {
  const { isOn, onTurn } = useContext(TurnOnOffContext);
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
