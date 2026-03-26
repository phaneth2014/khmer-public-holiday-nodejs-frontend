const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes ={
    404:"/frontend/src/pages/404.html",
    "/":"/frontend/src/pages/index.html",
    "/about":"/frontend/src/pages/about.html",
    "/holiday":"/frontend/src/pages/exchange.html"
}

const handleLocation = async ()=>{
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data)=>data.text());
    document.getElementById("root").innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

document.querySelectorAll('[component]').forEach((a) => {
    a.addEventListener('click', function () {
        route();
        console.log(a.href);
    })
});