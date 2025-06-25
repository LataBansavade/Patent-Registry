import { ethers } from "hardhat";
import { expect } from "chai";
import { PatentRegistry } from "../typechain-types"; 
import { Signer } from "ethers";

describe("PatentRegistry", function () {
  let patentRegistry: PatentRegistry;
  let owner: Signer;
  let addr1: Signer;
  let ownerAddress: string;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();

    const PatentRegistryFactory = await ethers.getContractFactory("PatentRegistry", owner);
    patentRegistry = await PatentRegistryFactory.deploy() as PatentRegistry;

    await patentRegistry.waitForDeployment();
  });

  it("should create a patent", async () => {
    const title = "Patent 1";
    const description = "Patent Description";
    const ipfsHashes = ["Qm123abc"];

    await expect(
      patentRegistry.createPatent(title, description, ipfsHashes)
    ).to.emit(patentRegistry, "PatentCreated")
     .withArgs(0, ownerAddress);

    const storedPatent = await patentRegistry.getPatent(0);
    expect(storedPatent.title).to.equal(title);
    expect(storedPatent.description).to.equal(description);
    expect(storedPatent.ipfsHashes[0]).to.equal("Qm123abc");
  });

  it("should add an IPFS hash to a patent", async () => {
    await patentRegistry.createPatent("Title", "Desc", ["Qm123"]);
    await patentRegistry.addIPFSHash(0, "Qm456");
  
    const patent = await patentRegistry.getPatent(0);
    expect(patent.ipfsHashes.length).to.equal(2);
    expect(patent.ipfsHashes[1]).to.equal("Qm456");
  });
  
  it("should update the patent description", async () => {
    await patentRegistry.createPatent("Title", "Desc", []);
    await patentRegistry.updateDescription(0, "Updated Desc");
  
    const patent = await patentRegistry.getPatent(0);
    expect(patent.description).to.equal("Updated Desc");
  });

  it("should delete a patent", async () => {
    await patentRegistry.createPatent("Title", "Desc", []);
    await patentRegistry.deletePatent(0);
  
    await expect(patentRegistry.getPatent(0)).to.be.revertedWith("Patent is deleted");
  });
  
  it("should return active patent count", async function () {
    await patentRegistry.createPatent("Patent 1", "Desc 1", []);
    await patentRegistry.createPatent("Patent 2", "Desc 2", []);
    await patentRegistry.deletePatent(1);

    const count = await patentRegistry.getActivePatentCount();
    expect(count).to.equal(1);
  });

  it("should return all undeleted patents", async function () {
    await patentRegistry.createPatent("Patent 1", "Desc 1", []);
    await patentRegistry.createPatent("Patent 2", "Desc 2", []);
    await patentRegistry.deletePatent(1);

    const all = await patentRegistry.getAllPatents();
    expect(all.length).to.equal(1);
    expect(all[0].title).to.equal("Patent 1");
  });

  it("should return my patents", async function () {
    await patentRegistry.connect(owner).createPatent("Owner Patent", "Desc", []);
    await patentRegistry.connect(addr1).createPatent("Addr1 Patent", "Desc", []);
    await patentRegistry.connect(addr1).deletePatent(1);

    const ownerPatents = await patentRegistry.connect(owner).getMyPatents();
    const addr1Patents = await patentRegistry.connect(addr1).getMyPatents();

    expect(ownerPatents.length).to.equal(1);
    expect(ownerPatents[0]).to.equal(0);

    expect(addr1Patents.length).to.equal(0); // because it's deleted
  });

  it("should revert unauthorized addIPFSHash", async function () {
    await patentRegistry.createPatent("Title", "Description", ["Qm123"]);

    await expect(
      patentRegistry.connect(addr1).addIPFSHash(0, "Qm456")
    ).to.be.revertedWith("Not the owner");
  });

  it("should revert updateDescription on deleted patent", async function () {
    await patentRegistry.createPatent("Title", "Description", []);
    await patentRegistry.deletePatent(0);

    await expect(
      patentRegistry.updateDescription(0, "New Desc")
    ).to.be.revertedWith("Patent is deleted");
  });
  
});
