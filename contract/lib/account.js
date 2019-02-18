/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
/**
 struct Account {
    string accountRef;
    string currency;
    bool active;
 } 
 */
class Account extends Contract {

    constructor(){
        super();
    }


    // careful for update. comment this or add check if accountNumber is defined???
    async instantiate(ctx) {
        await ctx.stub.putState('accountNumber', Buffer.from('0'));
    }

    // useful?
    async afterTransaction(ctx,result){
        // emit events etc...
    }

    async getAccount(ctx, accountNumber) {
        const accountAsBytes = await ctx.stub.getState(accountNumber); 
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${accountNumber} does not exist`);
        }
        console.log(accountAsBytes.toString());
        return accountAsBytes.toString(); 
    }

    async addAccount(ctx, accountRef, currency) {
        console.info('============= START : Create Account ===========');
        const accountNumberAsBytes = await ctx.stub.getState("accountNumber");
        let accountNumber = 0;
        if (accountNumberAsBytes && accountNumberAsBytes.length > 0) {
            accountNumber = parseInt(accountNumberAsBytes.toString());
        } 
        const account = {
            accountRef,
            currency,
            active : true
        };
        accountNumber++;
        await ctx.stub.putState(`ACCOUNT${accountNumber}`, Buffer.from(JSON.stringify(account)));
        await ctx.stub.putState('accountNumber', Buffer.from(accountNumber.toString()));

        console.info('============= END : Create Account ===========');

        // needed if no replication?? 
        ctx.stub.setEvent("ACCOUND_ADDED", Buffer.from(JSON.stringify(account)));
        return accountNumber;

    }

    async revoke(ctx, accountNumber) {
        console.info('============= START : revoke Account ===========');

        const accountAsBytes = await ctx.stub.getState(accountNumber); 
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${accountNumber} does not exist`);
        }
        const account = JSON.parse(accountAsBytes.toString());
        account.active = false;

        await ctx.stub.putState(accountNumber, Buffer.from(JSON.stringify(account)));
        console.info('============= END : changeCarOwner ===========');
    }
    
    async getAccountNumber(ctx) {
        const accountAsBytes = await ctx.stub.getState('accountNumber'); 
        if (!accountAsBytes || accountAsBytes.length === 0) {
            throw new Error(`${accountNumber} does not exist`);
        }
        console.log(accountAsBytes.toString());
        return accountAsBytes.toString();
    }

}

module.exports = Account;
