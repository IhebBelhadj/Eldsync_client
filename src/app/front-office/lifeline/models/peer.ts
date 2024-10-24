import { Asset } from "./asset";
import { Note } from "./note";

export interface Peer {
    idPeer: string;
    elderId: number;
    peerFullName: string;
    linkedAccount: string;
    bioDescription: string;
    profilePicture: Asset;
    notes?: Note[];
}
