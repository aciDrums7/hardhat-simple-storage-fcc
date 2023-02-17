import { ethers } from "hardhat"
import { assert, expect } from "chai"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", () => {
    /* let simpleStorageFactory
  let simpleStorage */
    let simpleStorageFactory : SimpleStorage__factory
    let simpleStorage : SimpleStorage
    beforeEach(async () => {
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        //assert
        assert.equal(currentValue.toString(), expectedValue)
        //expect
        expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call store", async () => {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should push person into people array", async () => {
        const name = "Marco"
        const favoriteNumber = 7

        await simpleStorage.addPerson(name, favoriteNumber)

        let [personFavoriteNumber, personName] = await simpleStorage.people(0)

        let mappingPreferredNumber = await simpleStorage.nameToFavoriteNumber(
            name
        )

        // console.log(`Person added name: ${personName}`)
        // console.log(`Person added favorite number: ${personFavoriteNumber}`)

        assert.equal(personFavoriteNumber.toString(), favoriteNumber)
        assert.equal(personName, name)

        // console.log(mappingPreferredNumber.toString())
        assert.equal(mappingPreferredNumber.toString(), favoriteNumber)
    })
})
