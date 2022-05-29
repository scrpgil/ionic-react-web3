import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Account.css";

interface AccountProps {
  account: string;
  setAccount: any;
}

const Account: React.FC<AccountProps> = ({ account, setAccount }) => {
  const [metaMaskFlag, setMetaMaskFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let tmpFlag = window.ethereum && window.ethereum.isMetaMask;
    setMetaMaskFlag(tmpFlag);
  }, []);

  const connectWallet = () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result: any) => {
        console.log(result[0]);
        setAccount(result[0]);
      })
      .catch((error: any) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>アカウント</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {account && (
          <div className="container">
            <img src="assets/metamask.png" />
            <p>{account}</p>
            <IonButton onClick={connectWallet}>接続されました</IonButton>
          </div>
        )}
        {!account && (
          <div className="container">
            <img src="assets/metamask_disable.png" />
            <p>アカウントが接続されていません</p>
            <IonButton onClick={connectWallet}>接続する</IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Account;
