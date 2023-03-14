import { Injectable } from '@angular/core';
import Web3 from "web3";
import {Transaction} from "../model/transaction";

declare let window: any;


@Injectable({
  providedIn: 'root'
})
export class EtherService {

  web3: any;
  account: string = "";
  startupAddress: string;

  constructor() {
    this.web3 = new Web3();
    this.startupAddress = "0x3A32c03E1F6F157399532Fd0f153A2EE8f8AD793"
  }

  async loadWeb3(price: string) {
    if (window.ethereum) {
      this.web3 = new Web3(window.web3.currentProvider);
      await window.ethereum.enable;
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      this.account = accounts[0];
      this.transferFound(price)
      return true;
    } else {

      window.alert('Non-Ethereum browser detected. You Should consider using MetaMask! \n Consider downloading this plugin: https://metamask.io/download/');
      return false;
    }
  }

  /**
   * Example of a ETH transaction between one address and the other.
   */
  transferFound(price: string) : void {
    let transaction: Transaction;
    transaction = {
      data: "",
      from: this.account,
      to: this.startupAddress,
      value: this.getWeb3().utils.toWei(price, "ether")
    }
    this.getWeb3().eth.sendTransaction(transaction, (err) => console.log("fail:" + err))
  }

  /**
   * Return our web3 instance
   * nb: Not useful for creating contract's access variable
   */
  getWeb3() : Web3 {
    return this.web3;
  }
}
