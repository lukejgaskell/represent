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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVotesArgs = exports.VotesResponse = void 0;
const type_graphql_1 = require("type-graphql");
let Tally = class Tally {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Tally.prototype, "yes", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Tally.prototype, "no", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Tally.prototype, "present", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Tally.prototype, "notVoting", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Tally.prototype, "majorityPosition", void 0);
Tally = __decorate([
    type_graphql_1.ObjectType()
], Tally);
let Items = class Items {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Items.prototype, "result", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], Items.prototype, "billTitle", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Items.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Items.prototype, "rollCall", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Items.prototype, "date", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Items.prototype, "time", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Items.prototype, "voteType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Items.prototype, "question", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Items.prototype, "billId", void 0);
__decorate([
    type_graphql_1.Field(() => Tally),
    __metadata("design:type", Tally)
], Items.prototype, "republican", void 0);
__decorate([
    type_graphql_1.Field(() => Tally),
    __metadata("design:type", Tally)
], Items.prototype, "democratic", void 0);
__decorate([
    type_graphql_1.Field(() => Tally),
    __metadata("design:type", Tally)
], Items.prototype, "independent", void 0);
__decorate([
    type_graphql_1.Field(() => Tally),
    __metadata("design:type", Tally)
], Items.prototype, "total", void 0);
Items = __decorate([
    type_graphql_1.ObjectType()
], Items);
let VotesResponse = class VotesResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], VotesResponse.prototype, "chamber", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], VotesResponse.prototype, "offset", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], VotesResponse.prototype, "count", void 0);
__decorate([
    type_graphql_1.Field(() => [Items]),
    __metadata("design:type", Array)
], VotesResponse.prototype, "items", void 0);
VotesResponse = __decorate([
    type_graphql_1.ObjectType()
], VotesResponse);
exports.VotesResponse = VotesResponse;
let GetVotesArgs = class GetVotesArgs {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { defaultValue: 0 }),
    __metadata("design:type", Number)
], GetVotesArgs.prototype, "offset", void 0);
GetVotesArgs = __decorate([
    type_graphql_1.ArgsType()
], GetVotesArgs);
exports.GetVotesArgs = GetVotesArgs;
//# sourceMappingURL=votes.model.js.map