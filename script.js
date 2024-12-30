const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}document.addEventListener('click',activate,false);

function getStorageKeyByCategory(category) {
    switch (category) {
        case "1":
            return "events";
        case "2":
            return "events1";
        case "3":
            return "events2";
        case "4":
            return "events3";
        default:
            return null;
    }
}


function updateEvent() {
    const eventTitle = document.getElementById("eventTitle").value.trim();
    const eventPoster = document.getElementById("eventur").value.trim();
    const eventCategory = document.getElementById("inputGroupSelect01").value;
    const eventPrice = document.getElementById("eventpr").value.trim();
    const eventDetails = document.getElementById("eventText").value.trim();

    if (!eventTitle || !eventPoster || eventCategory === "Choose..." || !eventPrice || !eventDetails) {
        alert("Please fill out all fields correctly.");
        return;
    }
    const storageKey = getStorageKeyByCategory(eventCategory);
    

        if (!storageKey) {
            alert("Invalid category. Please try again.");
            return;
        }
    let events = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (events.length === 0) {
        alert("No events found in the system. Please add an event first.");
        return;
    }

    const eventIndex = events.findIndex(event => event.title.toLowerCase() === eventTitle.toLowerCase());

    if (eventIndex === -1) {
        alert("Event not found. Please check the name and try again.");
        return;
    }
    events[eventIndex] = {
        title: eventTitle,
        imageSrc: eventPoster,
        category: eventCategory,
        description: eventDetails,
        link: eventPrice,
        seat:0
    };
    localStorage.setItem(storageKey, JSON.stringify(events));
    
    alert("Event updated successfully!");
    location.reload();
}




function removeEvent() {
    const eventTitle = document.getElementById("eventTitle").value.trim();
    const eventCategory = document.getElementById("inputGroupSelect01").value;

    if (!eventTitle || eventCategory === "Choose...") {
        alert("Please enter a valid event title and select a category!");
        return;
    }
    const storageKey = getStorageKeyByCategory(eventCategory);

    if (!storageKey) {
        alert("Invalid category. Please try again.");
        return;
    }

    let events = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedEvents = events.filter(event => {
        return event.title.toLowerCase() !== eventTitle.toLowerCase();
    });

    if (updatedEvents.length === events.length) {
        alert("No event found with the specified title!");
        return;
    }

    localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
    alert(`Event '${eventTitle}' has been removed successfully!`);

    document.getElementById("eventTitle").value = "";
    document.getElementById("inputGroupSelect01").value = "Choose...";
    location.reload();
}

function addEvent() {
    const title = document.getElementById('eventTitle').value.trim();
    const category = document.getElementById('inputGroupSelect01').value.trim();
    const description = document.getElementById('eventText').value.trim();
    const imageSrc = document.getElementById('eventur').value.trim();
    const eventLink = document.getElementById('eventLink').value.trim();

    if (title && category !== "Choose..." && description && imageSrc && eventLink) {
        const storageKey = getStorageKeyByCategory(category);
        

        if (!storageKey) {
            alert("Invalid category. Please try again.");
            return;
        }

        const eventData = {
            title: title,
            description: description,
            imageSrc: imageSrc,
            link: eventLink,
            seat:0
        };

        const events = JSON.parse(localStorage.getItem(storageKey)) || [];

        events.push(eventData);

        localStorage.setItem(storageKey, JSON.stringify(events));
        

        alert('Event added successfully!');
        location.reload();
    } else {
        alert('Please fill in all fields!');
    }
}
function selectEvent(index) {
    localStorage.setItem('currentIndex', index);
}
function loadEvents() {
    const e1 = JSON.parse(localStorage.getItem('events')) || [];
    const cardGrid = document.getElementById('card-grid');
    for(let i=0;i<e1.length;i++){
        const event = e1[i];
        const cardHTML = `
            <div class="col">
                <div class="card" style="width: 25rem; margin-bottom:25px;">
                    <img src="${event.imageSrc}" class="card-img-top" alt="${event.title}"       onerror="this.onerror=null; this.src='https://t3.ftcdn.net/jpg/11/37/10/70/360_F_1137107050_ewkdUThdEhHr1gjF6XXoNQcssdvcqDy9.jpg';"
 height="250px">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">₹ ${event.link}.00</p>
                        <p class="card-text">${event.description}</p>
                        <a href="mseat.html" class="btn btn-primary" onclick="selectEvent(${i})">BOOK</a>
                    </div>
                </div>
            </div>
        `;
        cardGrid.innerHTML += cardHTML;
    }
}

function loadEvents1() {
    const events = JSON.parse(localStorage.getItem('events1')) || [];
    const bcardGrid = document.getElementById('bus-card-grid');

    for(let i=0;i<events.length;i++){
        const event = events[i];
        const cardHTML = `
            <div class="col">
                <div class="card" style="width: 25rem; margin-bottom:25px;">
                    <img src="${event.imageSrc}" class="card-img-top" alt="${event.title}"       onerror="this.onerror=null; this.src='https://t3.ftcdn.net/jpg/11/37/10/70/360_F_1137107050_ewkdUThdEhHr1gjF6XXoNQcssdvcqDy9.jpg';"
 height="250px">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">₹ ${event.link}.00</p>
                        <p class="card-text">${event.description}</p>
                        <a href="bseats.html" class="btn btn-primary" onclick="selectEvent(${i})">BOOK</a>
                    </div>
                </div>
            </div>
        `;
        bcardGrid.innerHTML += cardHTML;
    }
}


function loadEvents2() {
    const events = JSON.parse(localStorage.getItem('events2')) || [];
    const bcardGrid = document.getElementById('train-card-grid');

    for(let i=0;i<events.length;i++){
        const event = events[i]; 
        const cardHTML = `
            <div class="col">
                <div class="card" style="width: 25rem; margin-bottom:25px;">
                    <img src="${event.imageSrc}" class="card-img-top" alt="${event.title}"       onerror="this.onerror=null; this.src='https://t3.ftcdn.net/jpg/11/37/10/70/360_F_1137107050_ewkdUThdEhHr1gjF6XXoNQcssdvcqDy9.jpg';"
 height="250px">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">₹ ${event.link}.00</p>
                        <p class="card-text">${event.description}</p>
                        <a href="tseats.html" class="btn btn-primary" onclick="selectEvent(${i})">BOOK</a>
                    </div>
                </div>
            </div>
        `;
        bcardGrid.innerHTML += cardHTML;
    }
}
function loadEvents3() {
    const events = JSON.parse(localStorage.getItem('events3')) || [];
    const bcardGrid = document.getElementById('flight-card-grid');

    for(let i=0;i<events.length;i++){
        const event = events[i];
        const cardHTML = `
            <div class="col">
                <div class="card" style="width: 25rem; margin-bottom:25px;">
                    <img src="${event.imageSrc}" class="card-img-top" alt="${event.title}"       onerror="this.onerror=null; this.src='https://t3.ftcdn.net/jpg/11/37/10/70/360_F_1137107050_ewkdUThdEhHr1gjF6XXoNQcssdvcqDy9.jpg';"
 height="250px">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">₹ ${event.link}.00</p>
                        <p class="card-text">${event.description}</p>
                        <a href="fseat.html" class="btn btn-primary" onclick="selectEvent(${i})">BOOK</a>
                    </div>
                </div>
            </div>
        `;
        bcardGrid.innerHTML += cardHTML;
    }
}
function loady(){
    const e1 = JSON.parse(localStorage.getItem('events')) || [];
    const e2= JSON.parse(localStorage.getItem('events1')) || [];
    const e3 = JSON.parse(localStorage.getItem('events2')) || [];
    const e4 = JSON.parse(localStorage.getItem('events3')) || [];

    const m1=document.getElementById('moviex');
    const m2=document.getElementById('travelx');
    
    e1.forEach(event => {
        const cardHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${event.title}</div>
            ₹${event.link}.00
          </div>
          <span class="badge text-bg-primary rounded-pill">${event.seat}</span>
    </li>
        `;
        m1.innerHTML += cardHTML;
    });
    e2.forEach(event => {
        const cardHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${event.title}</div>
            ₹${event.link}.00
          </div>
          <span class="badge text-bg-primary rounded-pill">${event.seat}</span>
    </li>
        `;
        m2.innerHTML += cardHTML;
    });
    e3.forEach(event => {
        const cardHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${event.title}</div>
            ₹${event.link}.00
          </div>
          <span class="badge text-bg-primary rounded-pill">${event.seat}</span>
    </li>
        `;
        m2.innerHTML += cardHTML;
    });
    e4.forEach(event => {
        const cardHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${event.title}</div>
            ₹${event.link}.00
          </div>
          <span class="badge text-bg-primary rounded-pill">${event.seat}</span>
    </li>
        `;
        m2.innerHTML += cardHTML;
    });
    
}

function loadEvents4(){
    const e1 = JSON.parse(localStorage.getItem('events')) || [];
    const e2= JSON.parse(localStorage.getItem('events1')) || [];
    const e3 = JSON.parse(localStorage.getItem('events2')) || [];
    const e4 = JSON.parse(localStorage.getItem('events3')) || [];
    if(e1.length>0){
        let n=e1.length;
        if(n>=4) n=3;
        const m1=document.getElementById('m1-card-grid');
        const head= `<h3>Movies & Concerts</h3><hr/>`;
        m1.innerHTML+=head;
        for (let i = 0; i < n; i++) {
            const event = e1[i];
            const cardHTML = `
                <div class="col">
                    <div class="card" style="width: 25rem; margin-bottom:25px;">
                        <img src="${event.imageSrc}" class="card-img-top" alt="${event.title}"       onerror="this.onerror=null; this.src='https://t3.ftcdn.net/jpg/11/37/10/70/360_F_1137107050_ewkdUThdEhHr1gjF6XXoNQcssdvcqDy9.jpg';"
height="250px">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">₹ ${event.link}.00</p>
                            <p class="card-text">${event.description}</p>
                            <a href="mseat.html" class="btn btn-primary" onclick="selectEvent(${i})">BOOK</a>
                        </div>
                    </div>
                </div>
            `;
            m1.innerHTML += cardHTML;
        }
    }if(e2.length>0){
        let n=e2.length;
        if(n>=4) e2.length=3;
        const m2=document.getElementById('m2-card-grid');
        const head= `<h3>Bus</h3><hr/>`;
        m2.innerHTML+=head;
        for (let i = 0; i < e2.length; i++) {
            const event = e2[i];
            const cardHTML = `
                <div class="col">
                    <div class="card" style="width: 25rem; margin-bottom:25px;">
                        <img src="${event.imageSrc}" class="card-img-top" alt="${event.title}"       onerror="this.onerror=null; this.src='https://t3.ftcdn.net/jpg/11/37/10/70/360_F_1137107050_ewkdUThdEhHr1gjF6XXoNQcssdvcqDy9.jpg';"
height="250px">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">₹ ${event.link}.00</p>
                            <p class="card-text">${event.description}</p>
                            <a href="bseats.html" class="btn btn-primary" onclick="selectEvent(${i})">BOOK</a>
                        </div>
                    </div>
                </div>
            `;
            m2.innerHTML += cardHTML;
        }
    }if(e3.length>0){
        let n=e3.length;
        if(n>=4) n=3;
        const m3=document.getElementById('m3-card-grid');
        const head= `<h3>Trains</h3><hr/>`;
        m3.innerHTML+=head;
        for (let i = 0; i < e3.length; i++) {
            const event = e3[i];
            const cardHTML = `
                <div class="col">
                    <div class="card" style="width: 25rem; margin-bottom:25px;">
                        <img src="${event.imageSrc}" class="card-img-top" alt="${event.title}"       onerror="this.onerror=null; this.src='https://t3.ftcdn.net/jpg/11/37/10/70/360_F_1137107050_ewkdUThdEhHr1gjF6XXoNQcssdvcqDy9.jpg';"
height="250px">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">₹ ${event.link}.00</p>
                            <p class="card-text">${event.description}</p>
                            <a href="tseats.html" class="btn btn-primary" onclick="selectEvent(${i})">BOOK</a>
                        </div>
                    </div>
                </div>
            `;
            m3.innerHTML += cardHTML;
        }
    }if(e4.length>0){
        let n=e4.length;
        if(n>=4) n=3;
        const m4=document.getElementById('m4-card-grid');
        const head= `<h3>Flights</h3><hr/>`;
        m4.innerHTML+=head;
        for (let i = 0; i < e4.length; i++) {
            const event = e4[i];
            const cardHTML = `
                <div class="col">
                    <div class="card" style="width: 25rem; margin-bottom:25px;">
                        <img src="${event.imageSrc}" class="card-img-top" alt="${event.title}"       onerror="this.onerror=null; this.src='https://t3.ftcdn.net/jpg/11/37/10/70/360_F_1137107050_ewkdUThdEhHr1gjF6XXoNQcssdvcqDy9.jpg';"
height="250px">
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text">₹ ${event.link}.00</p>
                            <p class="card-text">${event.description}</p>
                            <a href="fseat.html" class="btn btn-primary" onclick="selectEvent(${i})">BOOK</a>
                        </div>
                    </div>
                </div>
            `;
            m4.innerHTML += cardHTML;
        }
    }
        
            
}

let x=localStorage.getItem('x')?parseInt(localStorage.getItem('x')):0;
let x1=localStorage.getItem('x1')?parseInt(localStorage.getItem('x1')):0;
function trun(){
    window.location.href="login.html";
    localStorage.setItem('x',0);
    localStorage.setItem('x1',0);
}
function mega1(){
    localStorage.setItem('x1',1);
}
function mega(){
    if(x1===0){
        localStorage.setItem('x',1);
        window.location.href="login.html";
        
    }else{
        window.location.href="admin.html";
    }
}


const pageName = window.location.pathname.split('/').pop();

if (pageName === 'movie.html') {
    loadEvents();
} else if (pageName === 'bus.html') {
    loadEvents1();
} else if (pageName === 'train.html') {
    loadEvents2();
} else if (pageName === 'flight.html') {
    loadEvents3();
} else {
    loadEvents4();
}

let ever = JSON.parse(localStorage.getItem('ever')) || [];
if (ever.length === 0) ever.push(0);
localStorage.setItem('ever', JSON.stringify(ever));






if (ever[0] === 0) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let events1 = JSON.parse(localStorage.getItem('events1')) || [];
    let events2 = JSON.parse(localStorage.getItem('events2')) || [];
    let events3 = JSON.parse(localStorage.getItem('events3')) || [];

    const phh = [
        {
            title: "The Gorge",
            description: "PVR 12:30",
            imageSrc: "https://4kwallpapers.com/images/wallpapers/the-gorge-2025-2880x1800-20234.jpg",
            link: 220,
            seat: 0
        },
        {
            title: "Captain America: Brave New World",
            description: "PVR 04:30",
            imageSrc: "https://bravenewcoin.com/wp-content/uploads/2024/11/Captain-America-Brave-New-World.jpg",
            link: 420,
            seat: 0
        },
        {
            title: "Moana 2",
            description: "PVR 01:30",
            imageSrc: "https://allexamreview.com/wp-content/uploads/2024/02/Moana-2-Release-Date.jpg",
            link: 320,
            seat: 0
        }
    ];
    const phh1 = [
        {
            title: "B.M.T.C-4235",
            description: "Chennai - Bangalore",
            imageSrc: "https://img.etimg.com/thumb/msid-36336169,width-640,height-480,imgsize-305896,resizemode-4/bmtcs-new-tourism-bus-service.jpg",
            link: 368,
            seat: 0
        },
        {
            title: "S.E.T.C-2135",
            description: "Kelambakkam - Trichy",
            imageSrc: "https://www.team-bhp.com/forum/attachments/commercial-vehicles/2396982d1672365206-travel-review-tnstc-setc-buses-img_20221224_144720.jpg",
            link: 224,
            seat: 0
        },
        {
            title: "S.E.T.C-2097",
            description: "Tricht - Madurai",
            imageSrc: "https://www.team-bhp.com/forum/attachments/commercial-vehicles/2396982d1672365206-travel-review-tnstc-setc-buses-img_20221224_144720.jpg",
            link: 196,
            seat: 0
        }
    ];
    const phh3 = [
        {
            title: "Indigo - 71249",
            description: "Chennai - Hong Kong",
            imageSrc: "https://media.assettype.com/freepressjournal/2023-02/89966cca-b741-40f6-a9f9-dc8f2d501e08/indigo_airlines.jpg",
            link: 26412,
            seat: 0
        },
        {
            title: "Air India - 2135",
            description: "New Delhi - Dubai",
            imageSrc: "https://www.traveltrendstoday.in/wp-content/uploads/2023/04/2.jpg",
            link: 68634,
            seat: 0
        },
        {
            title: "Indigo - 2097",
            description: "Chennai - Delhi",
            imageSrc: "https://media.assettype.com/freepressjournal/2023-02/89966cca-b741-40f6-a9f9-dc8f2d501e08/indigo_airlines.jpg",
            link: 5585,
            seat: 0
        }
    ];
    const phh2 = [
        {
            title: "Vandhe Bharat",
            description: "Chennai - Goa",
            imageSrc: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Vande_Bharat_Express_around_Mumbai.jpg",
            link: 1200,
            seat: 0
        },
        {
            title: "Shatabdi Express",
            description: "Chennai - Coimbatore",
            imageSrc: "https://static.wikia.nocookie.net/indianrail/images/7/75/ShatabdiCDG.JPG/revision/latest?cb=20090524064553",
            link: 638,
            seat: 0
        },
        {
            title: "Bullet",
            description: "All over Japan",
            imageSrc: "https://static.toiimg.com/img/104187838/Master.jpg",
            link: 26412,
            seat: 0
        }
    ];

    events.push(phh[0], phh[1], phh[2]);
    localStorage.setItem('events', JSON.stringify(events));

    events1.push(phh1[0], phh1[1], phh1[2]);
    localStorage.setItem('events1', JSON.stringify(events1));

    events2.push(phh2[0], phh2[1], phh2[2]);
    localStorage.setItem('events2', JSON.stringify(events2));

    events3.push(phh3[0], phh3[1], phh3[2]);
    localStorage.setItem('events3', JSON.stringify(events3));

    
    ever[0] = 1;
    localStorage.setItem('ever', JSON.stringify(ever));
}


