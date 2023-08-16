//prevodimo na engleski jezik dinamicki
function translate(){
    //dohvatamo switch element koji je ustv checkbox
    const checkBox = document.getElementById('toggle-lang-switch');
    checkBox.addEventListener('change', ()=>{
        //dohvatamo sve elemente na srpskom i sve na engleskom
        const en = document.getElementsByClassName('en');
        const rs = document.getElementsByClassName('rs');
        if(checkBox.checked){
            for(const e of en){
                // e.style.display='initial';
                e.classList.remove('hide');
            }
            for(const r of rs){
                // r.style.display='none';
                r.classList.add('hide');
            }
        }else{
            for(const e of en){
                // e.style.display='none';
                e.classList.add('hide');
            }
            for(const r of rs){
                // r.style.display='initial';
                r.classList.remove('hide');
            }
        }
    })
}
translate();

function heroSlideShow(){
    // vrtimo hero slideshow tj carousel
    //dohvatamo potrebne elemente
    const slider = document.getElementById('hero-slider');
    const wrapper = document.querySelector(".slides-wrapper");
    const heroSlides = document.getElementsByClassName('hero-slide');
    const sliderNav = document.querySelectorAll('.carousel-nav');
    let slideDuration;
    //dodeljujemo listenere tako da moze da se krece kroz slajdove rucno
    for(const nav of sliderNav){
        nav.addEventListener('click', (e)=>{
            const slideNav = e.target;
            const id = slideNav.id;
            let slideNumber;
            //proveravamo koji slajd treba prikazati
            switch (id){
                case "first-slide-nav":
                    slideNumber = 1;
                    break;
                case "second-slide-nav":
                    slideNumber = 2;
                    break;
                case "third-slide-nav":
                    slideNumber = 3;
                    break;
                case "fourth-slide-nav":
                    slideNumber = 4;
                    break;
            }
            // sve druge vracamo na pocetno stanje
            for(const nav of sliderNav){
                nav.style.backgroundColor = 'var(--gold)';
            }
            // podesavamo pozicije
            nextSlide = slideNumber - 1;
            currentSlide = nextSlide - 1;
            prevSlide = currentSlide -1;
            //prekidamo trenutni prikaz i prikazujemo odabrani slajd
            clearInterval(slideDuration);
            showSlide();
            slideDuration = setInterval(showSlide, 5000);
        })
    }

    //podesavamo sirinu slajda na sirinu pogleda pregledaca
    let width = wrapper.clientWidth / 4;

    // for(const slide of heroSlides){
    //     slide.style.width=width + 'px';
    // }

    //podesavamo pocetne pozicije slajdova i zapocinjemo 
    // vremensku rotaciju
    let nextSlide = 1;
    let currentSlide = nextSlide - 1;
    let prevSlide = currentSlide - 1;

    slideDuration = setInterval(showSlide, 5000);

    //obelezavamo trenutno prikazan slajd
    sliderNav[currentSlide].style.backgroundColor = 'var(--navy)';

    function showSlide(){
        //ovde skrolujemo do konkretnog slajda
        if(nextSlide === heroSlides.length){
            nextSlide = 0;
        }
        slider.style.translate = '-' + (width * nextSlide) +'px';
        slider.style.transition='translate 1s';
        //pomeramo brojace pozicija slajda da znamo dokle smo stigli
        nextSlide++;
        currentSlide = nextSlide - 1;
        prevSlide = currentSlide - 1;

        //menjamo boje da bismo pokazali korisniku na kom smo slajdu trenutno
        sliderNav[currentSlide].style.backgroundColor = 'var(--navy)';
        if(prevSlide >= 0){
            sliderNav[prevSlide].style.backgroundColor = 'var(--gold)';
        }else{
            sliderNav[sliderNav.length - 1].style.backgroundColor = 'var(--gold)';
        }
    }
}
heroSlideShow();

function prikaziAboutKartice(){
    //kada prvi put udje u about one iskoce

    const kartice = document.getElementById('about-cards');
    const cards = document.querySelectorAll('.about-card')
    const about = document.getElementById('about');

    const observer = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            // kartice.classList.remove('invisible');
            for(const card of cards){
                card.style.transform = "translateY(-50%)";
            }
            // observer.unobserve(about);
        }else{
            // kartice.classList.add('invisible');
            for(const card of cards){
                card.style.transform = "translateY(50%)";
            }
        }
    },{threshold: 0.15});
    observer.observe(about);
}
// prikaziAboutKartice();


function bgScreenFunction(q){
    if(q.matches){

        //za velike ekrane
        // da se sakriva i pojavljuje nav bar
        const bScreen = document.getElementById('hero');
        const list = document.getElementById('nav-list');

        const observer = new IntersectionObserver(entries =>{
            if(entries[0].isIntersecting){
                list.style.display='block';
            }else{
                list.style.display='none';
            }
        }, {threshold: 0.2});
        observer.observe(bScreen);

    }
}
let x = window.matchMedia("(min-width: 1024px)");
bgScreenFunction(x);
x.addEventListener('change',bgScreenFunction);

function prikaziUsluge(){
    //kada prvi put udje u usluge one iskoce

    const prviRedUsluga = document.getElementById('services-first-row');
    const drugiRedUsluga = document.getElementById('services-second-row');
    const services = document.getElementById('services');

    //za prvi red usluga
    const observer1 = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            prviRedUsluga.classList.remove('hide');
            // observer1.unobserve(services);

        }else{
            prviRedUsluga.classList.add('hide');
        }
    },{rootMargin: "200% 0px -25% 0px"});
    observer1.observe(services);

    //za drugi red usluga
    const observer2 = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            drugiRedUsluga.classList.remove('hide');
            // observer2.unobserve(services);
        }else{
            drugiRedUsluga.classList.add('hide');
        }
    },{rootMargin: "200% 0px -60% 0px"});
    observer2.observe(services);
}
prikaziUsluge();

function prikaziPromo(){
    const content = document.querySelector("#make-appointment .content-wrapper");
    const section = document.querySelector("#make-appointment");
    const observer =  new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            content.classList.remove("hide");
        }
    }, {threshold:0.8});
    observer.observe(section);
}
prikaziPromo();

function verifikujKontakt(){
    const form = document.querySelector("#contact-form form");
    form.addEventListener("submit", (e)=>{
        let valid = true;
        e.preventDefault();
        const to = "office@cabarkapa.com"
        const names = document.querySelectorAll("#name");
        const email = document.querySelector("#email").value.trim();
        const titles = document.querySelectorAll("#message-title");
        const message = document.querySelector("#message").value.trim();
        //ovo sad radimo jer imamo vise istih polja zbog visejezicnosti sajta
        let senderName;
        let messageTitle;
        for(const name of names){
            if(!name.classList.contains("hide")){
                senderName = name.value.trim();
            }
        }
        for(const title of titles){
            if(!title.classList.contains("hide")){
                messageTitle = title.value.trim();
            }
        }
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!senderName.match(nameRegex)){
            valid= false;
            for(const name of names){
                if(!name.classList.contains("hide")){
                    name.focus();
                }
            }
        }
        if(!email.match(emailRegex)){
            valid= false;
            document.querySelector("#email").focus();
        }
        if(messageTitle.length<5 || messageTitle.length>30){
            valid=false;
            for(const title of titles){
                if(!title.classList.contains("hide")){
                    title.focus();
                }
            }
        }
        if(message.length < 10){
            document.querySelector("#message").focus();
            valid=false;
        }


        if(valid){
            sendMail(to, senderName, email, messageTitle, message);
        }
    })
}
verifikujKontakt();

function sendMail(to, senderName, email, messageTitle, message){
    console.log('poslato');
    fetch('https://cabarkapa.com/sendMail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `to=${encodeURIComponent(to)}&name=${encodeURIComponent(senderName)}&email=${encodeURIComponent(email)}&title=${encodeURIComponent(messageTitle)}&message=${encodeURIComponent(message)}`
      })
      .then(response => response.text())
      .then(text => {
        console.log(text);
        const btns = document.querySelector("input[type='submit']");
        for(const btn of btns){
            btn.disabled= true;
            if(btn.classList.contains("en")){
                btn.value="Sent";
            }else{
                btn.value= "Poslato";
            }
        }
      })
      .catch(error => {
        alert('Ups! Doslo je do greske! Pokusajte opet');
        console.error(error);
      });
}

function footerYear(){
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const spans = document.querySelectorAll("#footer .year");
    for(const span of spans){
        span.innerText = currentYear;
    }
}
footerYear();

function faqFunction(){
    const faqs = document.querySelectorAll(".pitanje-odgovor-wrapper");
    for(const faq of faqs){
        faq.addEventListener("click", (e)=>{
            faq.querySelector(".odgovor-wrapper").classList.toggle("hide");
            faq.querySelector(".plus").classList.toggle("open");
        })
    }
}
faqFunction();

function chat(){
    const container = document.querySelector(".chat-container");
    setTimeout(()=>{
        container.classList.remove("hide");
    }, 10000);
    const wrapper = document.querySelector(".chat-wrapper");
    const head = document.querySelector(".chat-head");
    const message = document.querySelector(".chat-first-message");
    const thread = document.querySelector(".chat-thread");
    const warning = document.querySelector(".chat-warning");
    const closeContainer = document.querySelector(".chat-container-close-btn");
    const minimizeContainer = document.querySelector(".chat-container-minimize-btn");
    wrapper.addEventListener("click", ()=>{
        // wrapper.style.width="100%";
        // wrapper.style.height="100%";
        wrapper.classList.add("enlarge");

        head.classList.add("hide");
        message.classList.add("hide");
        closeContainer.classList.add("hide");
        thread.classList.remove("hide");
        warning.classList.remove("hide");
        minimizeContainer.classList.remove("hide");
    })
    closeContainer.addEventListener("click", ()=>{
        container.classList.add("hide");
    })
    minimizeContainer.addEventListener("click", ()=>{
        wrapper.classList.add("minimized");
        head.classList.remove("hide");
        thread.classList.add("hide");
        warning.classList.add("hide");
        minimizeContainer.classList.add("hide");
    })
}
chat();


// AIzaSyDDUF6iVimObXbdZqjRMcU_tqIssRC5K7M
//44.789412, 20.473808

function initMap() {
    var customMapStyle = [
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#A08050" // Change the color of roads
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#A08050" // Change the color of land
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#A08050" // Change the color of points of interest
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#A08050" // Change the color of water bodies
                }
            ]
        },
        {
            "featureType": "building",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#A08050" // Change the color of buildings
                }
            ]
        }
        // You can add more style rules here
    ];
    // Create a new map instance
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 44.789412, lng: 20.473808 }, // Set the initial center of the map
        zoom: 15, // Set the initial zoom level
        fullscreenControl: false, // Disable the fullscreen button
        disableDefaultUI: true, // Disable all default UI controls
        zoomControl: false,     // Disable zoom control
        mapTypeControl: false,  // Disable map type control
        scaleControl: false,    // Disable scale control
        streetViewControl: false, // Disable street view control
        styles: customMapStyle // Apply your custom style
    });

    var marker = new google.maps.Marker({
        position: { lat: 44.789412, lng: 20.473808 },
        map: map, // The map instance you created
        title: 'Advokatska kancelarija'
    });

    // You can add markers, polygons, or other map features here
}
initMap();