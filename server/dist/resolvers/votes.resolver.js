"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesResolver = void 0;
const axios_1 = __importDefault(require("axios"));
const type_graphql_1 = require("type-graphql");
const votes_model_1 = require("./votes.model");
const config_1 = __importDefault(require("../config"));
let VotesResolver = class VotesResolver {
    votes({ offset }) {
        return axios_1.default
            .get(`${config_1.default.apiBaseUrl}/house/votes/recent.json`, {
            headers: { "X-API-Key": config_1.default.apiKey },
            params: { offset },
        })
            .then(res => res.data)
            .then((data) => {
            return {
                chamber: data.results.chamber,
                offset: data.results.offset,
                count: data.results.num_results,
                items: data.results.votes.map(v => {
                    return {
                        result: v.result,
                        billTitle: v.bill.title,
                        description: v.description,
                        rollCall: v.roll_call,
                        date: v.date,
                        time: v.time,
                        voteType: v.vote_type,
                        question: v.question,
                        billId: v.bill.bill_id,
                        republican: {
                            yes: v.republican.yes,
                            no: v.republican.no,
                            present: v.republican.present,
                            notVoting: v.republican.not_voting,
                            majorityPosition: v.republican.majority_position,
                        },
                        democratic: {
                            yes: v.democratic.yes,
                            no: v.democratic.no,
                            present: v.democratic.present,
                            notVoting: v.democratic.not_voting,
                            majorityPosition: v.democratic.majority_position,
                        },
                        independent: {
                            yes: v.independent.yes,
                            no: v.independent.no,
                            present: v.independent.present,
                            notVoting: v.independent.not_voting,
                        },
                        total: {
                            yes: v.total.yes,
                            no: v.total.no,
                            present: v.total.present,
                            notVoting: v.total.not_voting,
                        },
                    };
                }),
            };
        });
    }
};
__decorate([
    type_graphql_1.Query(() => votes_model_1.VotesResponse),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [votes_model_1.GetVotesArgs]),
    __metadata("design:returntype", Promise)
], VotesResolver.prototype, "votes", null);
VotesResolver = __decorate([
    type_graphql_1.Resolver()
], VotesResolver);
exports.VotesResolver = VotesResolver;
//# sourceMappingURL=votes.resolver.js.map