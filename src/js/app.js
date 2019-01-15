import $ from 'jquery';
import 'slick-carousel';
import { TweenLite, TimelineMax } from 'gsap';
import SplitText from './plugins/SplitText';


class App {

    initEvents() {

        // hide preloader

        setTimeout(function () {
            document.getElementById("preloader").style.display = "none";
            document.getElementById("overlay").style.display = "none";

            document.body.classList.remove('no-scroll');
        }, 1000);

    }

    initMenu() {

        // nav menu

        function menu() {
            let navMenu = document.querySelector('.js-navMenu');
            let navBtn = document.querySelector('.js-navBtn');
            let navCloseBtn = document.querySelector('.js-navCloseBtn');

            navBtn.addEventListener('click', function () {
                navMenu.classList.add('is-active');

                // animate nav menu links

                let st = new SplitText('.menu__link', {type: 'words'});
                let tlNavLink = new TimelineMax();

                tlNavLink.staggerFrom(st.words, 2.5, { y: 80, opacity: 0, ease:Power4.easeOut}, 0.04);
            });

            navCloseBtn.addEventListener('click', function () {
                navMenu.classList.remove('is-active');
            })
        }
        menu();
    }

    initModals() {

        // modal

        function modal() {

            let modalBtns = [...document.querySelectorAll('.js-modalBtn')];
            modalBtns.forEach(function(btn) {
                btn.onclick = function() {
                    let modal = btn.getAttribute('data-modal');
                    document.getElementById(modal).classList.add('is-active');
                };
            });


            let closeBtns = [...document.querySelectorAll('.js-modalCloseBtn')];
            closeBtns.forEach(function(btn) {
                btn.onclick = function() {
                    let modal = btn.closest('.js-modal');
                    modal.classList.remove('is-active');
                }
            });

            let modalMain = document.querySelector('.js-modal');
            window.onclick = function(event) {
                if (event.target === modalMain) {
                    modalMain.classList.remove('is-active');
                }
            }
        }
        modal();
    }

    initSlider() {

        // catalog item slider

        function slickInit() {

            $('.catalog__item__slider').slick({
                dots: true,
                infinite: true,
                arrows: false,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            });
        }
        slickInit();
    }

    initAnimate() {

        // animate h1 title

        setTimeout(function () {
            let mySplitText = new SplitText(".intro__title", {type:"words"}),
                tl = new TimelineMax({
                    repeatDelay: 5,
                    repeat: -1
                }),
                numWords = mySplitText.words.length;

            TweenLite.delayedCall(0.08, function() {
                for(let i = 0; i < numWords; i++){
                    tl.from(mySplitText.words[i], 1,
                        {force3D:true, scale:Math.random() >0.5 ? 0 : 2, opacity:0}, Math.random());
                }
            });
        }, 500);
    }

    initScroll() {

        // change header size on scroll

        window.addEventListener('scroll', function(event) {
            event.preventDefault();
            let headerMain = document.querySelector('.js-headerMain');

            if (window.scrollY >= 200) {
                headerMain.classList.add('is-scroll');
            } else {
                headerMain.classList.remove('is-scroll');
            }
        });

    }

    run() {
        this.initEvents();
        this.initMenu();
        this.initScroll();
        this.initSlider();
        this.initModals();
        this.initAnimate();
    }
}


document.addEventListener('DOMContentLoaded', function() {

    const app = new App();

    app.run();

});



