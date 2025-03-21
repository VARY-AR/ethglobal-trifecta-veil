use dep::aztec::macros::aztec;

#[aztec]
pub contract Veil {
    use aztec::macros::{functions::{initializer, private}, storage::storage};
    use aztec::prelude::{AztecAddress, Map};
    use aztec::protocol_types::traits::{FromField, ToField};
    use easy_private_state::EasyPrivateUint;
    use value_note::{balance_utils, value_note::ValueNote};

    #[storage]
    struct Storage<Context> {
        counters: Map<AztecAddress, EasyPrivateUint<Context>, Context>,
    }

    #[initializer]
    #[private]
    // We can name our initializer anything we want as long as it's marked as aztec(initializer)
    fn initialize(headstart: u64, owner: AztecAddress) {
        let counters = storage.counters;
        counters.at(owner).add(headstart+1, owner, context.msg_sender());
    }

    #[private]
    fn increment(owner: AztecAddress, sender: AztecAddress) {
        unsafe {
            dep::aztec::oracle::debug_log::debug_log_format(
                "Incrementing counter for owner {0}",
                [owner.to_field()],
            );
        }
        let counters = storage.counters;
        counters.at(owner).add(1, owner, sender);
    }

    unconstrained fn get_counter(owner: AztecAddress) -> pub Field {
        let counters = storage.counters;
        balance_utils::get_balance(counters.at(owner).set)
    }
}


