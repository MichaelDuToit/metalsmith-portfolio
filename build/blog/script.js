var navBtn = document.getElementById('nav__btn');
var navStatus = false;

function menu(){
    var navBtnLines = document.getElementsByClassName('nav__btn__lines')[0];
    var navMenu = document.getElementById('nav__menu');
    if (navStatus == true){
        navMenu.classList.add('hide');
        navMenu.classList.remove('show');
        navBtnLines.classList.remove('open');
        return navStatus = false;
    } else {
        navMenu.classList.add('show');
        navMenu.classList.remove('hide');
        navBtnLines.classList.add('open');
        return navStatus = true;
    }   
};
navBtn.addEventListener('click', menu);

function is_mobile(){
    var bodyEl = document.getElementsByTagName('body')[0];
    var screenBreakpoint = 700;
    if (bodyEl.clientWidth <= screenBreakpoint || document.documentElement.clientWidth <= screenBreakpoint ){
        return navStatus = true, menu();
    } else {
        return navStatus = false, menu();
    }
};
window.addEventListener('load', is_mobile);
window.addEventListener('resize', is_mobile);
