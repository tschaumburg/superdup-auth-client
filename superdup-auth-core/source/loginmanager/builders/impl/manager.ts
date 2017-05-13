﻿import { ILog } from "superdup-auth-log";
import { ILogin } from "../../ilogin";
import { IBuilderManager, IInternalBuilderManager } from "../imanager";
import { ILoginManager } from "../../iloginmanager";

import { ImplicitBuilder } from "./implicit";
import { IImplicitBuilder } from "../iimplicit";
import { IImplicitProvider } from "../../../providermanager";

import { HybridBuilder } from "./hybrid";
import { IHybridBuilder } from "../ihybrid";
import { IHybridProvider } from "../../../providermanager";

class BuilderManager implements IInternalBuilderManager
{
    constructor(private readonly loginManager: ILoginManager) { }

    public useImplicitFlow<TOptions>(
        flow: new (args: TOptions, log: ILog) => IImplicitProvider
    ): ImplicitBuilder<TOptions>
    {
        return new ImplicitBuilder<TOptions>(this, this.loginManager, flow);
    }

    public useHybridFlow<TOptions>(
        flow: new (args: TOptions, log: ILog) => IHybridProvider
    ): HybridBuilder<TOptions>
    {
        return new HybridBuilder<TOptions>(this, this.loginManager, flow);
    }

    private readonly _logins: { [id: string]: ILogin; } = {};
    public registerLogin(loginName: string, login: ILogin): void
    {
        this._logins[loginName] = login;
    }
    public getLogin(loginName: string): ILogin
    {
        return this._logins[loginName];
    }
    public getLoginNames(): string[]
    {
        var res: string[] = [];
        for (var name in this._logins)
        {
            res.push(name);
        }
        return res;
    }
}

//var _builderManager: IBuilderManager = null; 
//export function getBuilderManager(loginManager: ILoginManager): IBuilderManager
//{
//    if (!_builderManager)
//        _builderManager = new BuilderManager(loginManager);

//    return _builderManager;
//}

export function createBuilderManager(loginManager: ILoginManager): IBuilderManager {
    return new BuilderManager(loginManager);
}