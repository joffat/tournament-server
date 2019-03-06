import { Player } from "@socialgorithm/game-server/dist/constants";
import { Match } from "../match/Match";
export default interface IMatchMaker {
    isFinished(): boolean;
    updateStats(allMatches: Match[], tournamentFinished: boolean): Match[] | void;
    getRemainingMatches(): Match[];
    getRanking(): Player[];
}
