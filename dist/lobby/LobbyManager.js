"use strict";
exports.__esModule = true;
var debug = require("debug")("sg:lobbyManager");
var model_1 = require("@socialgorithm/model");
var pub_sub_1 = require("../pub-sub");
var PubSub_1 = require("../pub-sub/PubSub");
var LobbyRunner_1 = require("./LobbyRunner");
var LobbyManager = (function () {
    function LobbyManager() {
        var _this = this;
        this.lobbyRunners = [];
        this.createLobby = function (data) {
            var admin = data.player;
            var lobbyRunner = new LobbyRunner_1.LobbyRunner(admin);
            _this.lobbyRunners.push(lobbyRunner);
            _this.pubSub.publish(pub_sub_1.Events.AddPlayerToNamespace, {
                namespace: lobbyRunner.getLobby().token,
                player: data.player
            });
            debug("Created lobby %s", lobbyRunner.getLobby().token);
            _this.pubSub.publish(pub_sub_1.Events.ServerToPlayer, {
                event: "lobby created",
                payload: {
                    lobby: lobbyRunner.getLobby()
                },
                player: data.player
            });
        };
        this.checkLobby = function (data) {
            var lobbyRunner = _this.lobbyRunners.find(function (each) { return each.getLobby().token === data.payload.token; });
            if (!lobbyRunner) {
                _this.pubSub.publish(pub_sub_1.Events.ServerToPlayer, {
                    event: model_1.LegacyEvents.EVENTS.LOBBY_EXCEPTION,
                    payload: {
                        error: "Unable to join lobby, ensure token is correct"
                    },
                    player: data.player
                });
            }
        };
        this.deleteExpiredLobbies = function () {
            debug("Deleting expired lobbies");
            _this.lobbyRunners = _this.lobbyRunners.filter(function (lobbyRunner) {
                var isExpired = lobbyRunner.isExpired() || lobbyRunner.isInactive();
                if (isExpired) {
                    lobbyRunner.destroy();
                    debug("Will delete " + lobbyRunner.getLobby().token);
                }
                return !isExpired;
            });
        };
        this.pubSub = new PubSub_1["default"]();
        this.pubSub.subscribe(pub_sub_1.Events.LobbyCreate, this.createLobby);
        this.pubSub.subscribe(pub_sub_1.Events.LobbyJoin, this.checkLobby);
        setInterval(function () { return _this.deleteExpiredLobbies(); }, 1000 * 60);
    }
    return LobbyManager;
}());
exports.LobbyManager = LobbyManager;
//# sourceMappingURL=LobbyManager.js.map