﻿import { UserInfo } from "../userinfo";
import { ILogger } from "../logger";

export interface IHybridProvider
{
    login(
        requestRefreshToken: boolean,
        nonce: string,
        userstate: string,
        accessToken: { name: string, resource: string, scopes: string[] },
        success: (user: UserInfo, accessToken: string) => void,
        redirecting: () => void,
        error: (reason: any) => void
    ): void;

    handleRedirect(
        actualRedirectUrl: string,
        nonce: string,
        success: (user: UserInfo, accessToken: string) => void,
        error: (reason: any) => void
    ): void;

    acquireAccessToken(
        resource: string,
        scopes: string[],
        success: (accessToken: string) => void,
        error: (reason: any) => void
    ): void;

    logout(): void;
}
