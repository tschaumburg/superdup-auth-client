﻿import { ILogin } from "../../ilogin";
import { ILog } from "superdup-auth-log";
import { IHybridBuilder } from "../ihybrid";
import { IHybridProvider } from "../../../providermanager";

import { IBuilderManager, IInternalBuilderManager } from "../imanager";
import { ILoginManager } from "../../iloginmanager";

export class HybridBuilder<TOptions> implements IHybridBuilder<TOptions>
{
    constructor(
        private readonly builderManager: IInternalBuilderManager,
        private readonly loginManager: ILoginManager,
        private readonly flow: new (args: TOptions, log: ILog) => IHybridProvider
    ) { }

    private parameters: TOptions;
    public withParameters(parameters: TOptions): IHybridBuilder<TOptions>
    {
        this.parameters = parameters;
        return this;
    }

    private initialToken: { name: string, resource: string, scopes: string[], protectUrls: string[] } = null;
    public initialAccessToken(tokenName: string, resource: string, scopes: string[], protectUrls: string[]): IHybridBuilder<TOptions>
    {
        if (!!this.initialToken)
            throw new Error("Only one access token for an implicit flow");
        this.initialToken = { name: tokenName, resource: resource, scopes: scopes, protectUrls: protectUrls };
        return this;
    }

    private readonly tokens: {name: string, resource: string, scopes: string[], protectUrls: string[]}[] = [];
    public additionalAccessToken(tokenName: string, resource: string, scopes: string[], protectUrls: string[]): IHybridBuilder<TOptions>
    {
        this.tokens.push({ name: tokenName, resource: resource, scopes: scopes, protectUrls: protectUrls});
        return this;
    }

    private requestRefreshToken: boolean = false;

    private loginName: string;
    public registerAs(loginName: string): ILogin
    {
        this.loginName = loginName;

        var login = 
            this.loginManager.createHybridLogin(
                this.loginName,
                (log: ILog) => { return new this.flow(this.parameters, log); }, null, this.initialToken/*, this.tokens*/, this.requestRefreshToken);
        this.builderManager.registerLogin(this.loginName, login);

        return login;
    }

}