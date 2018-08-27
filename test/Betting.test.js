
const assertRevert = require('./helpers/assertRevert')
const Betting = artifacts.require("./Betting.sol")

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract("Betting", accounts => {
    const _better1 = accounts[0];
    const _better2 = accounts[1];
    const _attacker = accounts[2];
    const _teamName1 = "Liverpool";
    const _teamName2 = "Manchester City";    
    
    beforeEach(async () => {
        betting = await Betting.new(_better2, _teamName1, _teamName2, { from: _better1, value: web3.toWei(1, 'ether') })
    })

    describe('Setup', () => {
        it('should deploy the contract correctly and set addresses and values as expected', async () => {          
            const better1 = await betting.better1()
            better1.should.be.equal(_better1)
            const better2 = await betting.better2()
            better2.should.be.equal(_better2) 
            const teamName1 = await betting.teamName1()
            teamName1.should.be.equal(_teamName1)
            const teamName2 = await betting.teamName2()
            teamName2.should.be.equal(_teamName2)
        })
    })

    describe('Accept Bet', () => {
        it('The desired other better should be allowed to accept the bet', async () => {          
            await betting.acceptBet({ from: _better2, value: web3.toWei(1, 'ether') })
            const betAmount1 = await betting.betAmount1();
            betAmount1.toNumber().toString().should.be.equal(web3.toWei(1, 'ether'))
            const betAmount2 = await betting.betAmount2();
            betAmount2.toNumber().toString().should.be.equal(web3.toWei(1, 'ether'))
            const totalAmount = await betting.totalPot();
            totalAmount.toNumber().toString().should.be.equal(web3.toWei(2, 'ether'))
            const isAccepted = await betting.isAccepted();
            isAccepted.should.be.equal(true);
            const isActive = await betting.isActive();
            isActive.should.be.equal(true);
        })
    })

    describe('Set Winner', () => {
        it('Ether should be paid out correctly', async () => {          
            await betting.getWinner(1, { from: _better1 })
            const winner = await betting.winner();
            winner.should.be.equal(_better1);
        })
    })

    describe('Emergency Stop', () => {
        it('The creator of the contract should be able to  call emergency stop ', async () => {    
            betting.stopContract({from: _better1})
            const isStopped = await betting.isStopped()
            isStopped.should.be.equal(true)
        })
    })

    describe('Emergency Brake', () => {
        it('The creator of the contract should be able to  call resume on emergency stop ', async () => {    
            betting.resumeContract({from: _better1})
            const isStopped = await betting.isStopped()
            isStopped.should.be.equal(false)
        })
    })


    describe('Attacker accepting bet', () => {
        it('An attacker should not be allowed to accept bet', async () => {          
            await assertRevert(betting.acceptBet({ from: _attacker, value: web3.toWei(1, 'ether') }))
        })
    })

    describe('Attacker emergency stop ', () => {
        it('The attacker should not be able to call the stop contract function', async () => {          
            await assertRevert(betting.stopContract({ from: _attacker}))
        })
    })
    describe('Atteack emergency stop resume  ', () => {
        it('The attacker should not be able to call the resume function', async () => {          
            await assertRevert(betting.resumeContract({ from: _attacker}))
        })
    })
    describe('Emergency withdraw', () => {
        it('Emergency withdraw should not be callable by the attacker', async () => {          
            await assertRevert(betting.emergencyWithdraw({ from: _attacker}))
        })
    })
    
    

})

