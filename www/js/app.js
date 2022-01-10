document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    app.tab.show("#view-home",true);
    MainApp.views.current.router.back();
}

////////
window.onOnline = function () {
    window.MainView.emit("NETWORK_CHANGE", true);
};

window.onOffline = function () {
    window.MainView.emit("NETWORK_CHANGE", false);
};

window.MainApp = new Framework7({
    // App root element
    el: '#app',
    // App Name
    name: CONFIG.NAME,
    // App id
    id: CONFIG.REVERSE_DNS,
    // Enable swipe panel
    panel: {
        swipe: true,
        visibleBreakpoint: 1024,
    },
    // Extended by Dialog component:
    dialog: {
        title: CONFIG.NAME,
    },
    // Extended by Statusbar component:
    statusbar: {
        iosOverlaysWebview: true,
    },
    view: {
        stackPages: true,
        pushState: true,
        animateWithJS: true
    },
    navbar: {
        scrollTopOnTitleClick: true,
    },
    pushState : true,
    // Add default routes
    routes: CONFIG.ROUTES,
    // ... other parameters
    on: {
        init: function () {
            console.log('App initialized');
            onFramework7Ready();
        },
        pageInit: function () {
            console.log('Global Page initialized');
        },
    }
});

const $$ = Dom7;

const app = MainApp;

function onDeviceReady() {


}

function onFramework7Ready() {
    // Now safe to use device APIs

    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);

    window.MainAppData = {};

    window.MainAppViews = {

        create: function (element_id, url) {

            console.log("CREATE:", element_id, url);

            window.MainApp.views.create('#' + element_id, {
                url: url
            });

        }

    };

    window.MainAppNavigation = {

        post: function (name, params) {

            router.navigate({
                name: name,
                params: params,
            });

        },

        reload: function () {

            router.navigate(router.currentRoute.url, {
                reloadCurrent: true,
                ignoreCache: true,
            });

        }

    };

    window.MainAppProperties = {

        getId: function () {

            return window.MainApp.id;
            // App ID passed in parameters app.name App name passed in parameters ;

        },
        getVersion: function () {

            return window.MainApp.version;
            // App version ;

        },
        getRoutes: function () {

            return window.MainApp.routes;
            //App routes ;

        },
        getLanguage: function () {

            return window.MainApp.language;
            // App language ;

        },
        getRootElement: function () {

            return window.MainApp.el;
            //App root HTML element ;

        },
        getDom7: function () {

            return window.MainApp.$el;
            // Dom7 instance with app root HTML element ;

        },
        getIsRTL: function () {

            return window.MainApp.rtl;
            // Boolean property indicating app is in RTL layout or not ;

        },
        getTheme: function () {

            return window.MainApp.theme;
            // String with current app theme.Can be md, ios or aurora ;

        },
        getIsDarkTheme: function () {

            return window.MainApp.darkTheme;
            // Boolean property that indicates whether the dark theme active or not.
            // This property has effect only when autoDarkTheme enabled.app.width App width in px ;

        },
        getHeight: function () {

            return window.MainApp.height;
            // App height in px ;

        },
        getLeft: function () {

            return window.MainApp.left;
            // App left offset in px ;

        },
        getTop: function () {

            return window.MainApp.top;
            // App top offset in px ;

        },
        getIsInit: function () {

            return window.MainApp.initialized;
            // Boolean property indicating app is initialized or not ;

        },
        get$: function () {

            return window.MainApp.$;
            // Dom7 alias ;

        },
        getParams: function () {

            return window.MainApp.params;
            // App parameters ;

        },
        getSupported: function () {

            return window.MainApp.support;
            // Object with properties about supported features.Check the Support utilities section ;

        },
        getDevice: function () {

            return window.MainApp.device;
            // Object with properties about device.Check the Device utilities section ;

        },
        getUtils: function () {

            return window.MainApp.utils;
            // Object with some useful utilities.Check the Utils section ;

        },
        getRequest: function () {

            return window.MainApp.request;
            // Contains methods to work with XHR requests.Check the Request utilities section ;

        },
        getServiceWorkerRegistration: function () {

            return window.MainApp.serviceWorker.registration;
            // Array with registered service workers ;

        },
        getIsOnline: function () {

            return window.MainApp.online;
            // Boolean check if the app is online

        }

    };

    window.MainAppMethods = {

        create_views: function () {

            window.MainAppViews.create("view-home", "/login/");

            window.MainAppViews.create("view-catalogue", "/catalogue/");

            window.MainAppViews.create("view-products", "/products/");

            window.MainAppViews.create("view-messages", "/notifications/");

            window.MainAppViews.create("view-left-panel", "/panel-left/");

        }

    };

    window.MainAppAuth = {

        logOut: function (callbackSuccess, callbackError) {

            MainAppStorage.secure.getKey("user_data",
                function (stored_object) {

                    if (stored_object) {

                        let decData = GibberishAES.dec(stored_object, CONFIG.REVERSE_DNS);

                        let userData = JSON.parse(decData);

                        console.log("DEC DATA:", userData);

                        let encData = GibberishAES.enc(userData.response.user_data, CONFIG.REVERSE_DNS);

                        MainAppStorage.secure.delKey("user_data",
                            function () {

                                MainApp.request.post(
                                    'https://commercial.hyperefficient2.net/user/authenticate_app_logout',
                                    {user_data: encData}
                                ).then(function (res) {

                                    let logout_data = JSON.parse(res.data);

                                    console.log("LOGOUT RESULT", logout_data);

                                    if (logout_data.loggedOut) {

                                        callbackSuccess(logout_data);

                                    } else {

                                        callbackError(error);

                                    }

                                }).catch(function (err) {
                                    console.log("HTTP ERROR");
                                    console.log(err.xhr);
                                    console.log(err.status);
                                    console.log(err.message);
                                    MainAppErrors.error_http(err);
                                });

                            },
                            function (error) {

                                callbackError(error);

                            });

                    }

                },
                function (error) {

                    console.log("LOGOUT FAIL X1", error);

                });

        },

        checkLogin: function (callbackSuccess, callbackError) {

            if( window.localStorage.getItem('userData') != null ){
                let userData = JSON.parse(window.localStorage.getItem('userData'));


                //console.log("DEC DATA:", userData);



                setTimeout(function () {


                    try {
                        window.FirebasePlugin.getToken(function (token) {


                            MainApp.request.post(
                                'https://commercial.hyperefficient2.net/app/save_device_token',
                                {user_id: window.localStorage.getItem('userId'), device_id: token}
                            ).then(function (res) {
                            })
                                .catch(function (err) {
                                });

                        }, function (error) {
                            console.log(error);
                        });
                        window.FirebasePlugin.onMessageReceived(function (message) {

                            console.log(message);
                            refreshCounters();

                            console.log("Request "+message.title+" requires your Approval");
                            if( message.body === "Request "+message.title+" requires your Approval" ){
                                console.log("TO Request");
                                MainApp.views.main.router.navigate('/request-details/0/' + message.request_id + '/' + message.title + '/', {
                                    reloadCurrent: true,
                                    ignoreCache: true,
                                });
                            }else {
                                MainApp.views.main.router.navigate('/notification-details/' + message.title + '/', {
                                    reloadCurrent: true,
                                    ignoreCache: true,
                                });
                            }



                        }, function (error) {
                            console.error(error);
                        });



                    }catch(ex){}

                    $$('#app-toolbar').show();
                    MainApp.views.main.router.navigate('/home/', {
                        reloadCurrent: true,
                        ignoreCache: true,
                    });


                    MainApp.emit("REFRESH_USER_DATA", userData);

                }, 3000);
            }else{
                callbackError("NO_SESSION");
            }

            /*MainAppStorage.secure.getKey("user_data",
                function (stored_object) {

                    if (stored_object) {

                        let decData = GibberishAES.dec(stored_object, CONFIG.REVERSE_DNS);

                        let userData = JSON.parse(decData);

                        console.log("DEC DATA:", userData);

                        setTimeout(function () {

                            MainApp.emit("REFRESH_USER_DATA", userData);

                        }, 3000);

                        let encData = GibberishAES.enc(userData.response.user_data, CONFIG.REVERSE_DNS);

                        MainApp.request.post(
                            'https://commercial.hyperefficient2.net/user/authenticate_app_session',
                            {user_data: encData}
                        ).then(function (res) {

                            let session_data = JSON.parse(res.data);

                            console.log("SESSION CHECK RESULT", session_data);

                            if (session_data.session_valid) {

                                callbackSuccess(session_data);

                            } else {

                                callbackError("INVALID_SESSION");

                            }

                        }).catch(function (err) {
                            console.log("HTTP ERROR");
                            console.log(err.xhr);
                            console.log(err.status);
                            console.log(err.message);
                            MainAppErrors.error_http("Network Error: Please check your internet connection.");
                        });

                    } else {

                        callbackError("NO_SESSION");

                    }

                },
                function (error) {

                    console.log("CHECK LOGIN FAIL X2", error);

                }); */

        },



    };

    window.MainAppStorage = {

        secure: {

            init: function () {

                window.MainAppSecureStorageObject = new SecureStorage(
                    function () {
                        //console.log("Success");
                    },
                    function (error) {
                        console.log("Error " + error);
                    },
                    CONFIG.REVERSE_DNS,
                    {
                        android: {
                            packageName: CONFIG.REVERSE_DNS
                        }
                    }
                );

            },

            delKey: function (key, callbackSuccess, callbackError) {

                window.MainAppSecureStorageObject.remove(
                    function (key) {
                        //console.log("Removed:" + key);
                        store.remove(key);
                        callbackSuccess(key);
                    },
                    function (error) {
                        console.log("Error removing:" + key, "Error", error);
                        callbackError(error);
                    },
                    key
                );

            },

            getAllKeys: function (callbackSuccess, callbackError) {

                window.MainAppSecureStorageObject.keys(
                    function (keys) {
                        //console.log("Keys found:" + keys);
                        callbackSuccess(keys);
                    },
                    function (error) {
                        console.log("Error retrieving keys:", "Error", error);
                        callbackError(error);
                    },
                    key
                );

            },

            clearKeys: function (callbackSuccess, callbackError) {

                window.MainAppSecureStorageObject.clear(
                    function () {
                        console.log("Keys cleared:");
                        store.clear();
                        callbackSuccess(key);
                    },
                    function (error) {
                        console.log("Error removing keys", "Error", error);
                        callbackError(error);
                    },
                    key
                );

            },

            getKey: function (key, callbackSuccess, callbackError) {

                window.MainAppSecureStorageObject.get(
                    function (stored_string) {

                        let stored_object = JSON.parse(stored_string);

                        let _value = null;

                        switch (stored_object.typeof) {

                            case "object" : {
                                _value = JSON.parse(stored_object.data);
                                break;
                            }

                            case "boolean" : {
                                _value = parseInt(stored_object.data) > 0;
                                break;
                            }

                            case "number" : {
                                _value = parseFloat(stored_object.data);
                                break;
                            }

                            default : {
                                _value = stored_object.data;
                                break;
                            }

                        }

                        console.log("Get:" + key, "Value", _value);

                        callbackSuccess(_value);

                    },
                    function (error) {

                        console.log("Trying Storejs .... Error retrieving:" + key, "Error", error);

                        MainAppStorage.storejs.getKey(key, callbackSuccess, callbackError);

                        //return;

                        //Skip below and give StoreJS a chance, probably its a browser
                        //callbackError(error);

                    },
                    key
                );

            },

            setKey: function (key, value, callbackSuccess, callbackError) {

                let _value = {};

                switch (typeof value) {

                    case "object" : {
                        _value.data = JSON.stringify(value);
                        break;
                    }

                    case "boolean" : {
                        _value.data = value ? "1" : "0";
                        break;
                    }

                    case "number" : {
                        _value.data = value.toString();
                        ;
                        break;
                    }

                    default : {
                        _value.data = value.toString();
                        break;
                    }

                }

                _value.typeof = typeof value;

                window.MainAppSecureStorageObject.set(
                    function (key) {
                        console.log("Set:" + key, "Value", _value);
                        callbackSuccess(key, _value);
                    },
                    function (error) {

                        console.log("Trying StoreJS.... Error setting:" + key, "Value", _value, "Error", error);

                        MainAppStorage.storejs.setKey(key, value, callbackSuccess, callbackError);

                        //return;

                        //Skip below and give StoreJS a chance, probably its a browser
                        //callbackError(error);

                    },
                    key,
                    JSON.stringify(_value)
                );

            },

        },

        storejs: {

            delKey: function (key, callbackSuccess, callbackError) {

                store.remove(key);

                callbackSuccess();

            },

            getAllKeys: function (callbackSuccess, callbackError) {

                let _keys = [];

                store.each(function (value, key) {
                    _keys.push(key);
                });

                callbackSuccess(_keys);

            },

            clearKeys: function (callbackSuccess, callbackError) {

                store.clear();

                callbackSuccess();

            },

            getKey: function (key, callbackSuccess, callbackError) {

                let value = store.get(key);

                callbackSuccess(value);

            },

            setKey: function (key, value, callbackSuccess, callbackError) {

                store.set(key, value);

                callbackSuccess(key, value);

            },


        }

    };

    window.MainAppStorage.secure.init();

    window.MainAppErrors = {

        error_http: (error, message) => {

            MainApp.toast.create({
                text: message ? message : "There was a network error. Please check your internet connection.",
                position: 'bottom',
                closeTimeout: 3000,
                on: {
                    opened: function () {
                        console.log('Toast opened')
                    }
                }
            }).open();

            MainApp.dialog.close();

        }

    };

    window.MainAppMethods.create_views();

}

setInterval(function(){
    if( window.localStorage.getItem('userData') != null ) {
        $$('.fab-right-bottom').show();
    }

    if($$(".page-current .title").html() === "Messages"){
        $$('.fab-right-bottom').hide();
    }

    if($$(".page-current").find(".messagebar").length > 0){
        $$('#app-toolbar').hide();
        $$('.fab-right-bottom').hide();
    }else{
        if( window.localStorage.getItem('userData') != null ) {
            $$('#app-toolbar').show();
        }
    }
}, 300);


