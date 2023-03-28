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
  handle: "bridge:qikv2b1",
  schema: "rest",
  config: {
    server: "https://476f-2806-2f0-a4a1-ba2c-3041-a9f8-860c-1865.ngrok.io",
      signer: {
          format: "ed25519-raw",
          public: publicRaw
      }
  },
  secure: [],
  custom: {
      "description": "Qik Bridge v2 banco 1"
  },
  access: [
      {
          action: "any",
          signer: {
              public: publicRaw
          }
      },
      {
          action: "read",
          bearer: {
              $signer: {
                  public: publicRaw
              }
          }
      }
  ]
};

const serializeRequest = (request) =>  stringify(request);
console.log("request", request)
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
