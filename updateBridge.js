const cryptos = require("crypto");
const stringify = require("safe-stable-stringify");

const {secretRaw, publicRaw} = {
    schema: "ed25519",
    secretRaw: "2hWpqH2icX3EXPPpDsb3Y8UHiHRu4d9pLdnPhaV3PUg=",
    publicRaw: "h/dWTnZ51Qq40VTPwF2UaK5L4xeti2LrR3j7rXoHr+w=",
    secretDer: "302e020100300506032b657004220420da15a9a87da2717dc45cf3e90ec6f763c50788746ee1df692dd9cf85a5773d48",
    publicDer: "302a300506032b657003210087f7564e7679d50ab8d154cfc05d9468ae4be317ad8b62eb4778fbad7a07afec"
}

const request = {
    handle: "bog",
    parent: "4969e3c012b66d88cec597bf337fc01eab8d651e6ed2d5c40236cc1f7d93435a",
    access: {
      owners: [
        "WAweF9PHlboQoW0z8NqhZXFmzUTaV74NRFAd/aILprE="
      ]
    },
    custom: {
      type: "PERSON",
      reference: 3284759238475
    },
    schema: "rest",
    config: {
      server: "string",
      signer: {
        public: "WAweF9PHlboQoW0z8NqhZXFmzUTaV74NRFAd/aILprE=",
        schema: "ed25519"
      }
    },
    secure: [
      {
        schema: "oauth2",
        client: "6731de76-14a6-49ae-97bc-6eba6914391e",
        secret: "qWgdYAmab0YSkuL1qKv5bPX"
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
