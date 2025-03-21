import { UltraHonkBackend } from '@aztec/bb.js'
import { Noir } from '@noir-lang/noir_js'
import circuit from './circuit.json' assert { type: 'json' }

export const initialize = async () => {
	const initializeFunction = circuit.functions.find(_ => _.name === 'initialize')

	if(!initializeFunction)
		return

	const noir = new Noir({
		bytecode: initializeFunction.bytecode,
		abi: initializeFunction.abi
	})

	console.log({ noir })

	const backend = new UltraHonkBackend(
		circuit.bytecode
	)

	console.log({ backend })

	const { witness } = await noir.execute({})

	console.log({ witness })

	const proof = await backend.generateProof(witness)

	console.log({ proof })

	return proof
}
