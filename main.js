window.open('', '_self', '');

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
            <input type="number" placeholder="" dir="auto" autocomplete="off" id="phone">
    
            <label for="active">:النشاط</label>
            <select dir="auto" id="active" name="carlist" form="carform" style="font-weiht: bold; padding: 5px 5px; width: 98%; margin: auto 10px auto 0px; border: 2px solid black; border-radius: 6px;">
                <option value=""></option>
                <option value="تسويق الكتروني">
              تسويق الكتروني
              </option>
              <option value="تصميم موقع الكترونية">
              تصميم موقع الكترونية
              </option>
              <option value="تصميم متجر الكترونية">
              تصميم متجر الكترونية
              </option>
              <option value="تصميم متجر علي منصة سلة">
              تصميم متجر علي منصة سلة
              </option>
              <option value="تصميم متجر علي منصة زيد">
              تصميم متجر علي منصة زيد
              </option>
              <option value="ربط خدامات">
              ربط خدامات
              </option>
              <option value="نقاط بيع">
              نقاط بيع
              </option>
              <option value="صيانة متجر سلة">
              صيانة متجر سلة
              </option>
              <option value="تصميم منيو مطعم الكتروني">
              تصميم منيو مطعم الكتروني
              </option>
              <option value="برامج محاسبية متاكملة">
              برامج محاسبية متاكملة
              </option>
              <option value="برامج معامل تحاليل طبية">
              برامج معامل تحاليل طبية
              </option>
              <option value="برامج مستوصفات طبية">
              برامج مستوصفات طبية
              </option>
              <option value="audi">
              شي اخر..
              </option>
            </select>
    
            <label for="city">:المدينة</label>
            <input type="text" dir="rtl" autocomplete="off" id="city" value="">
    
        </div>
        
        
        `,
        confirmButtonText: 'ارسال',
    }).then(async (result) => {    
        if (result.isConfirmed) {


            
            const inputOptions = new Promise(() => {
                setTimeout(() => {

                }, 4000)
            })
            
            
            
  

            let name=document.querySelector("#name").value;
            let phone=document.querySelector("#phone").value;
            let active=document.querySelector("#active").value;
            let city=document.querySelector("#city").value;



            


            if((name).trim()!==""&&(phone).trim()!==""&&(active).trim()!==""&&(city).trim()!==""){

                SendData(name,phone,active,city);

                await Swal.fire({
                    title: '..برجاء الانتظار',
                    input: 'radio',
                    inputOptions: inputOptions,
                })

                
                
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'برجاء كتابة البيانات بشكل صحيح',
                }).then((x)=>{
                    swool();
                });
            }


            
            
        };
    });

};

document.querySelector("#simpleBtn").addEventListener("click",()=>{

    swool();
    getPersonCity();

});



async function SendData(name,phone,active,city){

    
    let country_calling_code;
    await fetch("https://ipapi.co/json/").then(e=>e.json()).then(data=>{
        country_calling_code=data.country_calling_code;
    });


    /* Start Send Whatsapp Massage */

    let HelloMassage=`
    مرحبا ${name} 
    لقد قمت بطلب ${active}
    وسوف نتواصل معك قريبآ    
    `;
    HelloMassage=HelloMassage.trim();
    let whatappAPI=`https://karzoun.app/api/send.php?number=${country_calling_code.slice(1)+Number(`${phone}`)}&type=text&message=${encodeURIComponent(HelloMassage)}&instance_id=63C05BF69B191&access_token=1757991908`;
    fetch(whatappAPI);

    /* End Send Whatsapp Massage */

    addDoc(collection(db,"Persons"),{
        name: name,
        phone: phone,
        active: active,
        city: city,
        date: Date.now(),
        orderDate: showDate(),
        country_calling_code: country_calling_code,
    }).then(e=>{
        Swal.fire('تم الارسال سنقوم بالتواصل معك ', '', 'success').then((e)=>{
            window.close();
        });
    })

    setIdForAllOrders();


};






/* start fuction to set id on all Orders */

async function setIdForAllOrders(){

    await getDocs(collection(db, "Persons")).then(snap=>{
        snap.docs.forEach(el=>{
            setDoc(doc(db, "Persons",el.id), {
                ...el.data(),
                id: el.id,
            })
        })
    })

};
/* end fuction to set id on all Orders */














/* 1 start function to get data now */
function showDate(){
  
    const d = new Date();
    
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let hour = d.getHours();
    let mint = d.getMinutes();
    
    if(mint<10){
      mint=`0${mint}`
    }
    
    let dateNow;


    if (hour>=12){
      
      dateNow= `
        ${year}/${month+1}/${day}
        => ${hour-12}:${mint} PM
        `;

    } else if (hour<=11){
      
        dateNow = `
        
        ${year}/${month+1}/${day}
           ${hour}:${mint} AM
        
        `;
    }
    return dateNow;
}


/* 1 end function to get data now */





/* 2 start function to get differnce between data now */
function getDiffDate(oldDate){
        
    var starts = moment(`${oldDate}`);
    var ends   = moment();

    var duration = moment.duration(ends.diff(starts));

    // with ###moment precise date range plugin###
    // it will tell you the difference in human terms

    var diff = moment.preciseDiff(starts, ends, true); 
    // example: { "years": 2, "months": 7, "days": 0, "hours": 6, "minutes": 29, "seconds": 17, "firstDateWasLater":  false }


    // or as string:
    var diffHuman = moment.preciseDiff(starts, ends);
    // example: 2 years 7 months 6 hours 29 minutes 17 seconds

    let diffDate=diff;

    if(diffDate.years!==0){
        diffDate={
            "diffDateNum": diffDate.years,
            "diffDateName": "سنة",
        };
    } else if(diff.months!==0){
        diffDate={
            "diffDateNum": diffDate.months,
            "diffDateName": "شهر",
        };
    } else if(diff.days!==0){
        diffDate={
            "diffDateNum": diffDate.days,
            "diffDateName": "يوم",
        };
    } else if(diff.hours!==0){
        diffDate={
            "diffDateNum": diffDate.hours,
            "diffDateName": "ساعة",
        };
    } else if(diff.minutes!==0){
        diffDate={
            "diffDateNum": diffDate.minutes,
            "diffDateName": "دقيقة",
        };
    } else {
        diffDate={
            "diffDateNum": 0,
            "diffDateName": "الان",
        };
    }

    let stringDiffDate = `منذ ${diffDate.diffDateNum + " " + diffDate.diffDateName}`;
    // منذ 1 سنة

    if(diffDate.diffDateName=="الان"){
      stringDiffDate="الان";
    }
    
    // diffDate => json like {diffDateNum: 1, diffDateName: 'سنة'}

    return stringDiffDate;
}

// console.log(getDiffDate("2022/1/1 => 5:55 PM"));
/* 2 end function to get differnce between data now */


/* 3 start get person ciy and code */

function getPersonCity(){

    fetch("https://ipapi.co/json/").then(e=>e.json()).then(data=>{
        document.querySelector("#city").value=data.city;
        // translateText(data.city);
    });
    
    
    async function translateText(text){

        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=English|Arabic`;
        await fetch(apiUrl).then(res => res.json()).then(data => {
            let x = data.responseData.translatedText;
            document.querySelector("#city").value=x;
        });
    
    };

};

getPersonCity();



/* 3 end get person ciy and code */

