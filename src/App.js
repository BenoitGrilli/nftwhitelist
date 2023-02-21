import { useState, useEffect } from 'react';
import { ethers} from 'ethers';
import './App.css';

// problème à résoudre : MetaMask demande de se connecter même lorsqu'on est connecté.


// Connecter MetaMask en LocalHost
function App() {

  const [loader, setLoader] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState();
  const [succes, setSucces] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAccounts();
    setLoader(false);
  }, [])

  window.ethereum.addListener('connect', async(response) => {
    getAccounts();
    console.log('ok');
  })

// utilisateur change de compte => reload
  window.ethereum.on('accountsChanged', () => {
    window.location.reload();
  })
// utilisateur change de network => reload
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  })
// utilisateur se déconnecte de MetaMask => reload
  window.ethereum.on('disconnect', () => {
    window.location.reload();
  })

  async function getAccounts() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(accounts);

    }
  }

  return (
    <div className="App">
        {!loader && 
          accounts.length > 0 ?
          <p>You are connected with this account : {accounts[0]}</p>
          :
          <p>You are not connected with Metamask on this website.</p>
        }
    </div>
  );
}

export default App;
