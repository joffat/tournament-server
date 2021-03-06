import { Match, Player } from "@socialgorithm/model";
export default interface IMatchMaker {
    isFinished(): boolean;
    updateStats(allMatches: Match[], tournamentFinished?: boolean): Match[] | void;
    getRemainingMatches(): Match[];
    getRanking(): Player[];
}
