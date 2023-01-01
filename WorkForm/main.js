import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js';
import { getFirestore, collection, getDocs,getDoc, setDoc, addDoc, doc } from 'https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYwT_AKDrFzjZurqiHh4aTwvSNzn1uPT0",
    authDomain: "workform-95a5d.firebaseapp.com",
    projectId: "workform-95a5d",
    storageBucket: "workform-95a5d.appspot.com",
    messagingSenderId: "947978405979",
    appId: "1:947978405979:web:3abb1089942aa62587177e",
    measurementId: "G-KWLW01R1S1"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let X;

async function getCit(db,X) {
const citiesCol = collection(db,`${X}`);
const citySnapshot = await getDocs(citiesCol);
const cityList = citySnapshot.docs.map(doc => doc.data());
return cityList;
};


//////////////////////////////////////////////////////////////////////////












swool();
function swool(){

    Swal.fire({
        title: 'قم بملي البيانات التالية',
        html: `
        
        
        <div class="mainForm">
    
            <label for="name">:الاسم</label>
            <input type="text" dir="auto" autocomplete="off" id="name">
    
            <label for="phone">:رقم الجوال</label>
            <input type="text" dir="auto" autocomplete="off" id="phone">
    
            <label for="active">:النشاط</label>
            <input type="text" dir="auto" autocomplete="off" id="active">
    
            <label for="city">:المدينة</label>
            <input type="text" dir="auto" autocomplete="off" id="city">
    
        </div>
        
        
        `,
        confirmButtonText: 'ارسال',
    }).then((result) => {    
        if (result.isConfirmed) {
            SendData();
            Swal.fire('تم الارسال سنقوم بالتواصل معك ', '', 'success');
        };
    });

};

document.querySelector("#simpleBtn").addEventListener("click",()=>{

    swool();

});



function SendData(){
    let name=document.querySelector("#name").value;
    let phone=document.querySelector("#phone").value;
    let active=document.querySelector("#active").value;
    let city=document.querySelector("#city").value;

    addDoc(collection(db,"Persons"),{
        name: name,
        phone: phone,
        active: active,
        city: city,
    });


};

