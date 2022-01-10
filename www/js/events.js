window.MainAppEventsInit = {

    init: () => {

        window.MainApp.on('panelOpen', function (panel) {
            console.log('Panel ' + panel.side + ' opened');
        });

        window.MainApp.on('connection', function (isOnline) {
            if (isOnline) {
                console.log('app is online now')
            } else {
                console.log('app is offline now')
            }
        });

        window.MainApp.on('online', function (isOnline) {
            if (isOnline) {
                console.log('app is online now')
            } else {
                console.log('app is offline now')
            }
        });

        window.MainApp.on('offline', function (isOnline) {
            if (isOnline) {
                console.log('app is offline now')
            } else {
                console.log('app is online now')
            }
        });

        window.MainApp.on('darkThemeChange', function (isDark) {
            if (isDark) {
                console.log('color scheme changed to Dark')
            } else {
                console.log('color scheme changed to Light')
            }
        });

        window.MainApp.on('darkThemeChange', function (isDark) {
            if (isDark) {
                console.log('color scheme changed to Dark')
            } else {
                console.log('color scheme changed to Light')
            }
        });

        window.MainAppEvents = {

            names: {},

            addEventListener: function (eventName, listenerFunction, ...args) {

                window.MainApp.on(eventName, listenerFunction, args);

            },

            removeEventListener: function (eventName, listenerFunction) {

                window.MainApp.off(eventName, listenerFunction);

            },

            removeAllEventListeners: function (eventName) {

                window.MainApp.off(eventName);

            },

            dispatch: function (eventName, ...args) {

                window.MainApp.emit(eventName, args);

            }

        };

    }

};