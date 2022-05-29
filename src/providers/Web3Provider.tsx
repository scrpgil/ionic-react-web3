import React, { FC, useEffect, useState } from "react";
import Web3 from "web3";
import STATUS from "../constants/status";

export const Web3Context = React.createContext("light");

interface Props {
  setStatus: any;
}

const Web3Provider: FC<Props> = ({ children, setStatus }) => {
  const [web3Instance, setWeb3Instance] = useState<any>();

  useEffect(() => {
    if (window.web3) {
      const web3js = new Web3(window.web3.currentProvider);
      setStatus(STATUS.connected);
      setWeb3Instance(web3js);
    } else {
      setStatus(STATUS.unsupported);
    }
  }, []);

  return (
    <Web3Context.Provider value={web3Instance}>{children}</Web3Context.Provider>
  );
};

export default Web3Provider;
