var axios = require("axios").default;
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
}

var options = {
  method: 'POST',
  url: 'https://cardnet.ldg-stg.one/api/v2/bridges',
  headers: {'Content-Type': 'application/json', Authorization: 'Bearer undefined'},
  data: {
    hash: '16fbd7a162b888228f6cfc544291dc7aa360ce106041b0a80e2db1f67392d370',
    meta: {
      proofs: [
        {
          method: 'ed25519-v2',
          public: 'h/dWTnZ51Qq40VTPwF2UaK5L4xeti2LrR3j7rXoHr+w=',
          digest: '16fbd7a162b888228f6cfc544291dc7aa360ce106041b0a80e2db1f67392d370',
          result: 'psyqMicz2Fsa5oDG4t8HvXQFf5aTJkct4mi46O9F2VGgUoeBGr0ZZeDpqcPpfThDPMGHALAK+H3U8HlaTTaFBQ==',
          custom: {moment: '2019-01-01T00:00:00.000Z'}
        }
      ],
      moment: '2019-08-24T14:15:22Z'
    },
    data: {
        parent: "16fbd7a162b888228f6cfc544291dc7aa360ce106041b0a80e2db1f67392d370",
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
    }
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});