const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes ={
    404:"./src/pages/404.html",
    "/":"./src/pages/index.html",
    "/about":"./src/pages/about.html",
    "/holiday":"./src/pages/exchange.html"
}

const handleLocation = async ()=>{
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data)=>data.text());
    document.getElementById("app").innerHTML = html;
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