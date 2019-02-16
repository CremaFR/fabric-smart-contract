/*
* Use this file for functional testing of your smart contract. 
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here 
* to generate tests, including those functions that would 
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building 
* further functional tests to run as part of a continuous 
* integration pipeline, or for debugging locally deployed smart 
* contracts by invoking/submitting individual transactions. 
*/
/*
* Generating this test file will also trigger an npm install 
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are 
* required for this test file to be run locally. 
*/

const assert = require('assert');
const fabricNetwork = require('fabric-network');
const yaml = require('js-yaml');
const fs = require('fs-extra');

describe('Account-account@1.2.0' , () => {

    const gateway = new fabricNetwork.Gateway();
    const wallet = new fabricNetwork.FileSystemWallet('/Users/thomasbrillard/.fabric-vscode/local_fabric/wallet');
    let connectionProfile;
    let identityName;
    
    before(async () => {
        const connectionProfilePath = '/Users/thomasbrillard/.fabric-vscode/local_fabric/connection.json';

        const connectionProfileContents = await fs.readFile(connectionProfilePath, 'utf8');
        if (connectionProfilePath.endsWith('.json')) {
            connectionProfile = JSON.parse(connectionProfileContents);
        } else if (connectionProfilePath.endsWith('.yaml') || connectionProfilePath.endsWith('.yml')) {
            connectionProfile = yaml.safeLoad(connectionProfileContents);
        };
        const identities = await wallet.list();
        // TODO: edit to use different identities in wallet
        identityName = identities[0].label;

    });

    beforeEach(async () => {
        await gateway.connect(connectionProfile, {
            wallet: wallet,
            identity: identityName,
            discovery: {
                asLocalhost: true
            }
        });
    });

    afterEach(async () => {
        gateway.disconnect();
    });
    it('addAccount', async () => {
        // TODO: Update with parameters of transaction
        const args = ['TEST001', 'EUR'];

        const response = await submitTransaction('addAccount', args); // Returns buffer of transaction return value
        // TODO: Update with return value of transaction
        // assert.equal(JSON.parse(response.toString()), undefined);
        console.log("response");
        console.log(response.toString());

        const response2 = await submitTransaction('getAccount', ['ACCOUNT1']); // Returns buffer of transaction return value
        console.log("JSON.parse(response2.toString())");
        console.log(typeof { lol : 'lol'} );
        console.log(JSON.parse(response2));
        console.log(typeof response2.toString());
        console.log(typeof JSON.parse(response2));
        console.log(JSON.parse(response2).accountRef);
        console.log(JSON.parse(response2.toString()).active);
        
        assert.equal(JSON.parse(response2).active, true);


    }).timeout(10000);

    it('revoke', async () => {
        // TODO: Update with parameters of transaction
        const args = ['ACCOUNT1'];

        const response = await submitTransaction('revoke', args); // Returns buffer of transaction return value
        // TODO: Update with return value of transaction


        const response2 = await submitTransaction('getAccount', ['ACCOUNT1']); // Returns buffer of transaction return value

        
        console.log("response revoke");
        // console.log(JSON.parse(response.toString()));
        console.log(response2.toString());
        
        // assert.equal(response2.toString(), "1");
        // assert.equal(JSON.parse(response.toString()), undefined);

    }).timeout(10000);

    async function submitTransaction(functionName, args) {
        // Submit transaction
        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('account', 'Account');
        const responseBuffer = await contract.submitTransaction(functionName, ...args);
        return responseBuffer;
    }

});