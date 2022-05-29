import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../providers/Web3Provider";
import { defaultAbi } from "../services/abi";
import api from "../services/api";

import "./Home.css";

interface HomeProps {
  account: string;
  contractAddress: any;
}

const Home: React.FC<HomeProps> = ({ account, contractAddress }) => {
  //MetaMaskChrome拡張機能がインストールされているかの変数を準備
  const [contract, setContract] = useState();
  const [nftDataArray, setNftDataArray] = useState<any>([]);
  const [nft, setNft] = useState<any>(null);
  const web3js: any = useContext(Web3Context);
  const [abi, setABI] = useState<any>();
  const [abiPending, setABIPending] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    async function getContractABI(address: any) {
      if (!abi && !abiPending) {
        setABIPending(true);
        setABI(defaultAbi);
      } else if (abi && web3js && account) {
        setABIPending(false);
        const contract = new web3js.eth.Contract(abi, address);
        setContract(contract);
        let tmpNftDataArray = [];

        const tokenUri2 = await contract.methods.tokenURI("2").call();
        const ts = Date.now();
        const res2: any = await api.get(tokenUri2 + "?ts=" + ts);
        const tokenUri1 = await contract.methods.tokenURI("1").call();
        const res1: any = await api.get(tokenUri1 + "?ts=" + ts);
        tmpNftDataArray.push(res2);
        tmpNftDataArray.push(res1);
        setNftDataArray(tmpNftDataArray);
      }
    }

    getContractABI(contractAddress);
  }, [contractAddress, web3js, abi, account]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ホーム</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {nftDataArray.map((nftData: any, index: number) => (
          <IonCard
            button={true}
            key={index}
            onClick={() => {
              setNft(nftData);
              setShowModal(true);
            }}
          >
            <div className="nft-image">
              <img src={nftData.image} />
            </div>
            <IonCardHeader>
              <IonCardSubtitle>MyNFT</IonCardSubtitle>
              <IonCardTitle>{nftData.name}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        ))}
        <div className="container">
          {!(nftDataArray.length > 0 && account) && <p>トークンがありません</p>}
        </div>
        <IonModal
          isOpen={showModal}
          breakpoints={[0.1, 0.5, 1]}
          initialBreakpoint={0.5}
          onDidDismiss={() => setShowModal(false)}
        >
          <IonContent>
            {nft && (
              <div>
                <IonHeader className="ion-no-border">
                  <IonToolbar>
                    <IonTitle>MyNFT</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <div className="ion-padding nft-background">
                  <img src={nft.image} />
                  <h2>{nft.name}</h2>
                </div>
                <div className="ion-padding nft-detail">
                  <p>{nft.description}</p>
                </div>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
