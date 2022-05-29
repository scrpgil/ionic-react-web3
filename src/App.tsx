import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { logoBitcoin, person, triangle } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Web3Provider from "./providers/Web3Provider";
import { useState } from "react";
import STATUS from "./constants/status";
import Account from "./pages/Account";

setupIonicReact();

const defaultContractAddress = "0x70fc6b119f24fa14d517C86d334EBaE27E654121";

const App: React.FC = () => {
  const [status, setStatus] = useState(STATUS.loading);
  const [contractAddress, setContractAddress] = useState(
    defaultContractAddress
  );
  const [account, setAccount] = useState<string>("");

  return (
    <IonApp>
      <IonReactRouter>
        <Web3Provider setStatus={setStatus}>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home account={account} contractAddress={contractAddress} />
              </Route>
              <Route exact path="/account">
                <Account account={account} setAccount={setAccount} />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/home">
                <IonIcon icon={logoBitcoin} />
                <IonLabel>トークン</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/account">
                <IonIcon icon={person} />
                <IonLabel>アカウント</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Web3Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
