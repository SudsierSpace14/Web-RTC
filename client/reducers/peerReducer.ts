import { IPeer } from "../types/peer";
import {
    ADD_PEER_STREAM,
    REMOVE_PEER_STREAM,
    ADD_PEER_NAME,
    ADD_ALL_PEERS,
    ADD_PEER,
    REMOVE_PEER
} from "./peerActions";

export type PeerState = Record<
    string,
    { stream?: MediaStream; }
>;

type PeerAction = | {
    type: typeof ADD_PEER;
    payload: { peerId: string; stream: MediaStream };
} | {
    type: typeof REMOVE_PEER;
    payload: { peerId: string };
} | {
    type: typeof ADD_PEER_NAME;
    payload: { peerId: string; userName: string };
} | {
    type: typeof ADD_ALL_PEERS;
    payload: {
        peers: Record<string, IPeer>;
    };
};

export const peersReducer = (state: PeerState, action: PeerAction) => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: {
                    stream: action.payload.stream
                }
            }
        case REMOVE_PEER:
            const { [action.payload.peerId]: deleted, ...rest } = state
            return rest
        default:
            return { ...state };
    }
}