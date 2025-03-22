import { UltraHonkBackend } from '@aztec/bb.js';
import { Noir } from '@noir-lang/noir_js';
import circuit from "./circuit/target/circuit.json";
// import crypto from "crypto";
// import jsonwebtoken from "jsonwebtoken";
import { generateInputs } from "noir-jwt";

const show = (id, content) => {
 const container = document.getElementById(id);
 container.appendChild(document.createTextNode(content));
 container.appendChild(document.createElement("br"));
};

let pubkey;

document.getElementById("submit").addEventListener("click", async () => {
    console.log('pls work');
 try {
    console.log('pls work1');
     const noir = new Noir(circuit);
     const backend = new UltraHonkBackend(circuit.bytecode);

     const jwt = document.getElementById("jwt").value;
     console.log(pubkey);

     const inputs = await generateInputs({
         jwt: jwt,
         pubkey: pubkey,
         maxSignedDataLength: 512,
     });



    // data: BoundedVec<u8, 512>,
    // base64_decode_offset: u32,
    // pubkey_modulus_limbs: [Field; 18],
    // redc_params_limbs: [Field; 18],
    // signature_limbs: [Field; 18],

     console.log(inputs);
     // const age = document.getElementById("age").value;
     show("logs", "Generating witness... ⏳");
     const { witness } = await noir.execute({ 
         data: inputs.data,
         base64_decode_offset: inputs.base64_decode_offset,
         pubkey_modulus_limbs: inputs.pubkey_modulus_limbs,
         redc_params_limbs: inputs.redc_params_limbs, 
         signature_limbs: inputs.signature_limbs,
     });
     show("logs", "Generated witness... ✅");

     show("logs", "Generating proof... ⏳");
     const proof = await backend.generateProof(witness);
     show("logs", "Generated proof... ✅");
     show("results", proof.proof);

     show('logs', 'Verifying proof... ⌛');
     const isValid = await backend.verifyProof(proof);
     show("logs", `Proof is ${isValid ? "valid" : "invalid"}... ✅`);
 } catch(e) {
     console.log(e)
  show("logs", "Oh 💔");
 }
});

document.getElementById('pubkey').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const jsonData = JSON.parse(e.target.result);
          pubkey = jsonData;
        // Process the JSON data here
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  }
});
