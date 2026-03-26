
import './js/bootstrap';
import Alpine from 'alpinejs'

import './js/progressbar.min';

import $ from 'jquery';
window.$ = $;
window.jQuery = $;

window.Alpine = Alpine

Alpine.store('navigateTo', {
    auth: false,
    user: [],
    navigate(page) {
        navigatePage(`${page}/component`);
    },
    authenticate(user) {
        this.auth = true;
        this.user = user;
    },
    axiosApiRequest(method, url, app_secret, data = null) {
        const axiosApi = axios.create({
            baseURL: '/api',
            headers: {
                'X-API-SECRET': app_secret,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return axiosApi({
            method: method,
            url: url,
            data: data,
        });
    }
})

Alpine.start()

function axiosApiRequest(method, url, app_secret, data = null) {
    const axiosApi = axios.create({
        baseURL: '/api',
        headers: {
            'X-API-SECRET': app_secret,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    return axiosApi({
        method: method,
        url: url,
        data: data,
    });
}



document.addEventListener('DOMContentLoaded', function () {
    { location.pathname === '/' ? navigatePage('/home/component') : navigatePage(location.pathname + '/component') }
})


document.querySelectorAll('[component]').forEach((a) => {
    a.addEventListener('click', function (e) {
        e.preventDefault();
        linkInActive();
        a.classList.add('active');
        history.pushState(null, null, a.href);
        var title = "Khmer calendar holidays";
        document.title = a.getAttribute('title') + " | " + title;
        navigatePage(a.getAttribute('component'));
    })
})

function navigatePage(component) {

    $.get(component, function (data) {
        $("#content").empty().append(data);
        if ($('#menu-toggle').is(':checked')) {
            $('#menu-close').trigger('click');
        }

    }).fail(function (err) {
        console.log('Response error', err);
        if (err.status == 401) {
            location.reload();
        } else {
            console.log('Failed: ' + err.statusText);
        }
    });
}

function linkInActive() {
    document.querySelectorAll('[component]').forEach((a) => {
        a.classList.remove('active');
    });
}

// Handle the popstate event to detect changes in the browsing history
window.addEventListener("popstate", function (event) {
    // Update the content based on the state object
    navigatePage(location.pathname + '/component');
});


