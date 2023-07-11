import { IPeer } from "../types/peer";

export const getUsers = ({
    participants,
}: {
    participants: Record<string, IPeer>[];
}) => {
    console.log(participants)
    // dispatch(addAllPeersAction(participants));
};