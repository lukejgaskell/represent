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
    votes(offset = 0) {
        console.log("resolver called");
        return axios_1.default
            .get(`${config_1.default.apiBaseUrl}/house/votes/recent.json`, {
            headers: { "X-API-Key": config_1.default.apiKey },
            params: { offset },
        })
            .then(res => res.data);
    }
};
__decorate([
    type_graphql_1.Query(() => votes_model_1.VotesResponse),
    __param(0, type_graphql_1.Arg("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VotesResolver.prototype, "votes", null);
VotesResolver = __decorate([
    type_graphql_1.Resolver()
], VotesResolver);
exports.VotesResolver = VotesResolver;
//# sourceMappingURL=votes.resolver.js.map