import { Player } from "./Player";
export declare type Lobby = {
    admin: Player;
    name: string;
    players: Player[];
    bannedPlayers: string[];
};