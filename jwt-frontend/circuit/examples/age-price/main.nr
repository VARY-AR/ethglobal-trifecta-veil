use jwt::JWT;

fn main(
    data: BoundedVec<u8, 1024>,
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

    let unitPrice: u64 = jwt.get_claim_number("unitPrice".as_bytes());
    assert(unitPrice >= 10000);

    let iat: u64 = jwt.get_claim_number("iat".as_bytes());
    let today_year_ago: u64 = 1742733610 - 31556926;

    // Products purchased in last 12 months
    assert(iat > today_year_ago);

    (iat > today_year_ago) & (unitPrice >= 10000)
}
