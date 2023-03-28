const cryptos = require("crypto");
const stringify = require("safe-stable-stringify");

const {secretRaw, publicRaw, hashInterno, resultInterno} = {
  schema: "ed25519",
  secretRaw: "2hWpqH2icX3EXPPpDsb3Y8UHiHRu4d9pLdnPhaV3PUg=",
  publicRaw: "h/dWTnZ51Qq40VTPwF2UaK5L4xeti2LrR3j7rXoHr+w=",
  secretDer: "302e020100300506032b657004220420da15a9a87da2717dc45cf3e90ec6f763c50788746ee1df692dd9cf85a5773d48",
  publicDer: "302a300506032b657003210087f7564e7679d50ab8d154cfc05d9468ae4be317ad8b62eb4778fbad7a07afec", 
  hashInterno: "4f2cf8a041c056fae71ca6b1e88bb5a10ce4bba29aaea1ba73ff77450df42e70",
  resultInterno: "Ds0y0RCKn6g8RbGC1+DvDOJiiwzEqH9VTOwZDiij3xRcecALimavSOoKGOmgDL46M41HTbq+d9bnR8wAQC2PDA=="
}

const request = {
    handle: "cre_p1_qwerty",
    symbol: "usd",
    target: "bank:qikWltDosBdgDos",
    action: "prepare-credit",
    amount: 100,
    intent: {
      hash: hashInterno,
      data: {
        handle: "PC_bankUno_bankDos_p1",
        claims: [
            {
            action: "transfer",
            amount: 100,
            source: "bank:qikWltUnoBdgUno",
            symbol: "usd",
            target: "bank:qikWltDosBdgDos"
            }
        ],
        access: [
            {
            action: "any",
            signer: publicRaw
            },
            {
            action: "any",
            bearer: {
                sub: publicRaw
            }
            }
        ]
      },
      meta: {
        status: "pending",
        thread: "iX_LHlPAWJCgCR9b0",
        signatures: [
          {
            digest: hashInterno,
            public: publicRaw,
            result: resultInterno,
            schema: "ed25519"
          }
        ],
        moment: "2023-02-24T05:05:05.852Z"
      }
    },
    "select": [
      0
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
