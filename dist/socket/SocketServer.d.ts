import { GameServerInfoConnection } from "../game-server/GameServerInfoConnection";
export declare class SocketServer {
    private port;
    private gameServers;
    private io;
    private pubSub;
    private playerSockets;
    constructor(port: number, gameServers: GameServerInfoConnection[]);
    start(): void;
    private addPlayerToNamespace;
    private sendMessageToNamespace;
    private sendMessageToPlayer;
    private sendGameListToEveryone;
    private onMessageFromSocket;
    private translateSocketMessageToPubSub;
    private onPlayerDisconnect;
    private handler;
}
