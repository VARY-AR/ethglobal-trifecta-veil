// @ts-ignore
import crypto from "crypto";
// @ts-ignore
import jsonwebtoken from "jsonwebtoken";
import { generateInputs } from "noir-jwt";

const privateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCjm55on1OLp1Ur
4B/N4+OKz6YL22jpjUmJzC81ghS4YQg8pb+DjUR734F6LGXLHqBuLvP5cjq5zRv3
uLWfrhj/FGDKdkk5QGRcHbF6bbwlFnfv4BpojF5Dg7SiPBa+12pva3gB99nvoT/r
q1nTGGP57DaAO7EtiFIOl+hGzPK3B3byk1xek8m4BQ9mEC/ZDrCHlDyn9wcWEsNu
vV8qlFeLbKmcWSDScKJHEFeYlyWAZGxr56hvEgA9hqomJ61VDHzqBG7kI4PYolzO
vORKnhsYTFminBnndABfnifxSFVCg+FFhLioBaAyZ452hIRX7ASQXV4L9w7ayZpI
4uNJ508fAgMBAAECggEAEc842S6uy371mIcXLzRlapDcBGJn8zR8EtH1OZ/lXYTC
fseUJ1/TWqCj2YbHteqpkBTwXfD/T4ZySu8CZlVvRyUSvDdQFTlbM2PQFAGp/2eI
usXsWgEdqb/Gg/qCh1evsF1EfQJb6Ofmq2LFrmLzTxtVe3QD/27db9U9ZaedrCqp
S6Ar7abI3Zo3bc+N6PKJEnN9Du+kj9nofi2dVjrlr/RFE+zx+7yq0aO+IpmRIP34
WOvRzTGOWtvBYAWmy4F8E4RsDJuV/coQJZ67udu9uhbzedIlZpnpjEdGdLSFwiO0
LPKr3BW/iNmE4kBfnWPO2XeKrz+tld7a4Q2hrvEDEQKBgQDNp3wJB+KrEb5G3io5
mpZfLBaf1R4NE9c2QfstdiBJ3DdqjhBgpSaAQ5mKcspnqy0G1chk8UYaP++nIrZT
8+6iPDHBd8vBwW4xjsWsQ+mjJ0oxPqTLjw7YRf3vPpHK99IzROG/t7/Yb99SMnNt
9oabx1UYsUqJo/9I72H2DsRQLQKBgQDLqQ5MdIWuUTEAFD4/bi4uAvq5OpmxwWiJ
zHDTVZD6tPN4CIq1rJWdKHoJ/tcDpOBdX22cBJoI/70vOyuh0xNkFKZpWWislRWr
Xm+ZUt74fFwHNJywkfqAp/xrFKSCcfiTfxAtBAXraFo9taHHTKz0VImFfMBMdgDD
dzKZq9xf+wKBgQC/1aSZE/b3loSEvMZsl2v/eTPdgkIW9tQA88lmndL+suIqjjxu
un9QlD5MbEmsLHvC7XaR2pKG9+8IXBPx+hA226maC7JQmau9pK11xJ/TJlpJ12KH
03mIermmCxqaV1OHqZBfcvsM3UZW+WK9R4JHG8igUPjzrbv7f/lEOoAbPQKBgDw3
GtwuI4xbwyIj2hfFCvBdvyXfFqxA5BjCEqXZickmkUnvNJvskDvsSNEFwSr5p8DT
w0O69JQukRAS7Z6mGvifRmiln9ZPKh4GCPcLUpOjqU4UFzP5pVg+0toSO2W6LuXl
TrIQm3Nz4iKWvmN/3y9Kg3KtZOn2hdlFN/fJoZnbAoGBAJaTIliqJIvO5+L3auyZ
abJ8id/nLZxAYpdCvzj1OaBHHjdrnwICTes8QNvcgcNIKdOkNjPVoGjTKXTdyBZJ
g220hxOl6PTarDEwxCAxkWEZkN/mGITN4SkLyAQe5CMKGQWczx9rsnhlcj37YLJX
KkhEi0T+msAtTMLLYFeKaEGD
-----END PRIVATE KEY-----`;

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo5ueaJ9Ti6dVK+AfzePj
is+mC9to6Y1JicwvNYIUuGEIPKW/g41Ee9+Beixlyx6gbi7z+XI6uc0b97i1n64Y
/xRgynZJOUBkXB2xem28JRZ37+AaaIxeQ4O0ojwWvtdqb2t4AffZ76E/66tZ0xhj
+ew2gDuxLYhSDpfoRszytwd28pNcXpPJuAUPZhAv2Q6wh5Q8p/cHFhLDbr1fKpRX
i2ypnFkg0nCiRxBXmJclgGRsa+eobxIAPYaqJietVQx86gRu5COD2KJczrzkSp4b
GExZopwZ53QAX54n8UhVQoPhRYS4qAWgMmeOdoSEV+wEkF1eC/cO2smaSOLjSedP
HwIDAQAB
-----END PUBLIC KEY-----`;

export async function createKeyAndSignData() {
  // Generate a key pair using RSASSA-PKCS1-v1_5
  const privateKey = crypto.createPrivateKey({
    key: privateKeyPem,
    type: "pkcs8",
    format: "pem",
  });

  const publicKey = crypto.createPublicKey({
    key: publicKeyPem,
    type: "spki",
    format: "pem",
  });

  // Sample payload
  const payload = {
      "iss": "https://example.com",
      "sub": "dpp-123456789",
      "iat": 1710975000,
      "exp": 1890384000,
      "product": {
          "name": "Smartphone Model X",
          "serialNumber": "SN-987654321",
          "productionDate": "2024-03-21T10:30:00Z",
          "recyclabilityPercentage": 85
      }
  };

  // Sign the payload
  const jwt = jsonwebtoken.sign(payload, privateKey, {
    algorithm: "RS256",
  });

  // Verify the jwt
  jsonwebtoken.verify(jwt, publicKey);

  // Convert public key to JWK
  const pubkeyJwk = publicKey.export({ format: "jwk" });

  return {
    pubkeyJwk,
    jwt,
    payload,
  };
}

async function generateNoirTestData() {
  const { pubkeyJwk, jwt } = await createKeyAndSignData();

  // Prepare inputs
  const inputs = await generateInputs({
    jwt: jwt,
    pubkey: pubkeyJwk as JsonWebKey,
    maxSignedDataLength: 512,
  });

  const x= `
      let pubkey_modulus_limbs = [${inputs.pubkey_modulus_limbs.join(", ")}];
      let redc_params_limbs = [${inputs.redc_params_limbs.join(", ")}];
      let signature_limbs = [${inputs.signature_limbs.join(", ")}];
      let data: BoundedVec<u8, 512> = BoundedVec::from_array([${inputs.data!.storage.filter(s => s !== 0).join(", ")}]);
      let base64_decode_offset = ${inputs.base64_decode_offset};

      let jwt = JWT::init(
        data,
        base64_decode_offset,
        pubkey_modulus_limbs,
        redc_params_limbs,
        signature_limbs,
      );

      jwt.verify();
    `
    console.log(x);
    return x;
}

generateNoirTestData();
