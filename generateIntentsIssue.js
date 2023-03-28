const cryptos = require("crypto");
const stringify = require("safe-stable-stringify");

const {secretRaw, publicRaw} = {
    schema: "ed25519",
    secretRaw: "LOJq1S/PLbEignnuYGItRXo/bF3bj9kGsk4cmjC0YfA=",
    publicRaw: "Hhd2pju/CmcTp0ECj8McguTl7Rtt7dTC+PLQSMU2B4M=",
    secretDer: "302e020100300506032b6570042204202ce26ad52fcf2db1228279ee60622d457a3f6c5ddb8fd906b24e1c9a30b461f0",
    publicDer: "302a300506032b65700321001e1776a63bbf0a6713a741028fc31c82e4e5ed1b6dedd4c2f8f2d048c5360783"
}

const request = {
  handle: "bank:qikFReddy_P1_bank:qikWltUnoBdgUno",
  access: {
    owners: [
      publicRaw
    ]
  },
  custom: {
    type: "CUENTA",
    reference: 3456466563536
  },
  claims: [
    {
      action: "issue",
      target: "bank:qikWltUnoBdgUno",
      symbol: "usd",
      amount: 20000
    }
  ]
};

const serializeRequest = (request) =>  stringify(request);
const hash = (data) => cryptos.createHash("sha256").update(data).digest("hex");
const hashedRequest = (request) =>{
  const serializedRequest = serializeRequest(request);
  const hashedRequest = hash(serializedRequest);
  return hash(hashedRequest + serializedRequest);
}

const hashHex = hashedRequest(request)
const hashBuffer = Buffer.from(hashHex, "hex");

const derkey = Buffer.concat([
  Buffer.from("302e020100300506032b657004220420", "hex"), // Static value
  Buffer.from(secretRaw, "base64"),
]);

const key = cryptos.createPrivateKey({
  format: "der",
  type: "pkcs8",
  key: derkey,
});

const result = cryptos.sign(undefined, hashBuffer, key).toString("base64");

console.log({result,hashHex});
