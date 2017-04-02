﻿import ng = require("angular");
import auth = require("superdup-auth-angular");
import auth0js = require("superdup-auth-auth0js");
var authSecrets = require("./auth-secrets.json");

//export function config(
//    authProvider: auth.AuthServiceProvider
//)
//{
//    {
//        authProvider
//            .setLog(console)
//            .registerPlugin("auth0js", new auth0js.Auth0jsPlugin())
//            .identityProvider(
//                "auth0",
//                {
//                    domain: authSecrets.auth0.domain,
//                    clientId: authSecrets.auth0.clientId,
//                    redirectUri: "http://localhost:58378", //authConf.redirectUri,
//                    flow: auth0js.AuthFlow.implicit,
//                }
//            )
//            //.accessToken(
//            //    "superdupApi",
//            //    "https://api.superdup.dk",
//            //    [
//            //        "read:boards",
//            //        "edit:boards"
//            //    ],
//            //    [
//            //        "https://api.superdup.dk/boards",
//            //        "https://api.superdup.dk/boards/long"
//            //    ]
//            //)
//            .accessToken(
//                "localSuperdupApi",
//                "https://localhost/SuperDup.API",
//                [
//                    "read:boards",
//                    "edit:boards"
//                ],
//                [
//                    "https://localhost/SuperDup.API"
//                ]
//            )
//            //.accessToken(
//            //    "userinfo",
//            //    "https://schaumburgit.auth0.com/userinfo",
//            //    [],
//            //    [
//            //        "https://api.superdup.dk/whoami"
//            //    ]
//            //)
//            .setDefault("auth0js", "auth0", "localSuperdupApi");
//    }
//}

export function config(
    authProvider: auth.AuthServiceProvider,
    url: string
): any
{
    {
        authProvider
            .setLog(console)
            .useImplicitFlow<auth0js.Auth0jsOptions>(
                "newauth0",
                auth0js.Auth0Implicit,
                {
                    domain: authSecrets.auth0.domain,
                    clientId: authSecrets.auth0.clientId,
                    redirectUri: "http://localhost:58378", //authConf.redirectUri,
                    flow: auth0js.AuthFlow.implicit,
                }
            )
            //.accessToken(
            //    "superdupApi",
            //    "https://api.superdup.dk",
            //    [
            //        "read:boards",
            //        "edit:boards"
            //    ],
            //    [
            //        "https://api.superdup.dk/boards",
            //        "https://api.superdup.dk/boards/long"
            //    ]
            //)
            .accessToken(
                "localSuperdupApi",
                "https://localhost/SuperDup.API",
                [
                    "read:boards",
                    "edit:boards"
                ],
                [
                    "https://localhost/SuperDup.API"
                ]
            )
            //.accessToken(
            //    "userinfo",
            //    "https://schaumburgit.auth0.com/userinfo",
            //    [],
            //    [
            //        "https://api.superdup.dk/whoami"
            //    ]
            //)
            //.setDefault("auth0js", "auth0", "localSuperdupApi")
            ;

        return authProvider.handleRedirect(url, null, null);
    }
}

//export function run(
//    superdupAuthService: auth.IAuthService,
//    currentUrl: string
//): void
//{
//    var self = this;
//    superdupAuthService
//        .handleRedirect(currentUrl)
//        .then((userstate: any) => { })
//        .catch((reason) => { /* not a redirect - never mind */ });
//}

export function run2(
    superdupAuthService: auth.IAuthService,
    currentUrl: string
): void
{
    //var self = this;
    //return superdupAuthService
    //    .handleRedirect2(currentUrl);
}