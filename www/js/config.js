let routes = [
    {
        name: 'index',
        path: '/',
        componentUrl: './pages/home.html',
    },
    {
        name: 'home',
        path: '/home/',
        componentUrl: './pages/home.html',
    },
    {
        name: 'panel_lef',
        path: '/panel-left/',
        componentUrl: './pages/panel-left.html',
    },
    {
        name: 'about',
        path: '/about/',
        componentUrl: './pages/about.html',
    },
    {
        name: 'notifications',
        path: '/notifications/',
        componentUrl: './pages/notifications.html',
    },
    {
        name: 'notification_details',
        path: '/notification-details/:request_number/',
        componentUrl: './pages/notification-details.html',
    },
    {
        name: 'vendor_directory',
        path: '/vendor-directory/',
        componentUrl: './pages/vendor-directory.html',
    },
    {
        name: 'my_requests',
        path: '/my-requests/:which/',
        componentUrl: './pages/my-requests.html',
    },
    {
        name: 'my_request_details',
        path: '/request-details/:request_index/:request_id/:request_number/',
        componentUrl: './pages/request-details.html',
    },
    {
        name: 'approvers_requests',
        path: '/approvers-requests/',
        componentUrl: './pages/approvers-requests.html',
    },
    {
        name: 'approvers_request_details',
        path: '/approvers-details/:request_id/:request_number/',
        componentUrl: './pages/approvers-details.html',
    },
    {
        name: 'requests_to_watch',
        path: '/requests-to-watch/',
        componentUrl: './pages/request-to-watch.html',
    },
    {
        name: 'request_to_watch_details',
        path: '/request-to-watch-details/:request_id/:request_number/',
        componentUrl: './pages/request-to-watch-details.html',
    },
    {
        name: 'approved_denied_by_me',
        path: '/approved-denied-by-me/',
        componentUrl: './pages/approved-denied-by-me.html',
    },
    {
        name: 'approved_denied_by_me_details',
        path: '/approved-denied-by-me-details/:request_id/:request_number/',
        componentUrl: './pages/approved-denied-by-me-details.html',
    },
    {
        name: 'new_request',
        path: '/new-request/:request_id/:form_id/:team_id/',
        componentUrl: './pages/request-form.html',
    },
    {
        name: 'products',
        path: '/products/',
        componentUrl: './pages/products.html',
    },
    {
        name: 'product_details',
        path: '/product-details/:sku/',
        componentUrl: './pages/product-details.html',
    },
    {
        name: 'sct_home',
        path: '/sct-home/:sku',
        componentUrl: './pages/sct-home.html',
    },
    {
        name: 'sct_details',
        path: '/sct-details/:sku',
        componentUrl: './pages/sct-details.html',
    },
    {
        name: 'catalogue',
        path: '/catalogue/',
        componentUrl: './pages/catalogue.html',
    },
    {
        name: 'comparisons_view',
        path: '/comparisons-view/:request_id',
        componentUrl: './pages/comparisons-view.html',
    },
    {
        name: 'quotations_view',
        path: '/quotations-view/:request_id',
        componentUrl: './pages/quotations-view.html',
    },
    {
        name: 'my_profile',
        path: '/my-profile/',
        componentUrl: './pages/my-profile.html',
    },
    {
        name: 'login',
        path: '/login/',
        componentUrl: './pages/login.html',
    },
    // Default route, match to all pages (e.g. 404 page)
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];

let CONFIG = {
    NAME : "Supply Zone",
    DESCRIPTION : "",
    VERSION : "1.0.0",
    COPYRIGHT : "(c) 2021. SupplyZone All Rights Resolved.",
    DEVELOPER : "Inbox Corporation",
    REVERSE_DNS : "org.supplyzone",
    WEBSITE : "supplyzone.org",
    SUPPORT_URL : "supplyzone.org/support",
    SUPPORT_EMAIL : "info@supplyzone.org",
    THEME_TYPE : "ios",
    THEME_COLOR : "#1a3d76",
    THEME_MODE : "",
    SHADED_HEADERS : false,
    ROUTES: routes
};
