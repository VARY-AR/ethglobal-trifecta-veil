use jwt::JWT;

fn main(
    data: BoundedVec<u8, 512>,
    base64_decode_offset: u32,
    pubkey_modulus_limbs: [Field; 18],
    redc_params_limbs: [Field; 18],
    signature_limbs: [Field; 18],
) -> pub bool {
    let jwt = JWT::init(
        data,
        base64_decode_offset,
        pubkey_modulus_limbs,
        redc_params_limbs,
        signature_limbs,
    );

    jwt.verify();

    jwt.assert_claim_number("recyclabilityPercentage".as_bytes(), 85);

    true
}