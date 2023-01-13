
/* start custom function */
function $(e) {
    return document.querySelector(e)
}

function $all(e) {
    return document.querySelector(e)
}

function cs(e) {
    return console.log(e)
}
/* end custom function */









/////* start firebase */////



/*1*/
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

// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let X;

async function getCit(db,X) {
  const citiesCol = collection(db,`${X}`);
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
/*1*/



/* start set id on all docs */
function setIdForAllDoc(){
    getDocs(collection(db,"accounts")).then(snap=>{
        snap.docs.forEach(el=>{
            setDoc(doc(db,"accounts",el.id), {
                ...el.data(),
                id: el.id,
            })
        });
        getCards();
    })
}
setIdForAllDoc();
/* end set id on all docs */




/* start get accounts */
let AllAccounts;
function getCards() {
    getCit(db, 'accounts').then(async (e) => {
        AllAccounts = e;
    })
}
/* end get accounts */



/*Start Sing In*/


$(".btn-sign-in").addEventListener("click",()=>{
    var username = $(".username-in").value;
    var password = $(".password-in").value;
    var numOfFalse=0;
    if (username!=""&&password!="") {
        AllAccounts.forEach(e=>{
            
            numOfFalse++;
            if(username==e.username&&password==e.password&&e.id!==undefined) {
                $(".username-in").value=""
                $(".password-in").value=""
                /**/
                localStorage.setItem("doc-digital-id",e.id);
                /**/
                numOfFalse="true"
                location.href="../Dashboard-Orders.html"
            } else {
                Swal.fire("","Error");
            }

            if (numOfFalse>=AllAccounts.length){
                Swal.fire("","Usename Or Password Are Wrong");
            } else if(numOfFalse=="true"){
                location.href="../Dashboard-Orders.html";
            }

        })
    } else {Swal.fire("","Enter Usename And Password")}

});







/*End Sing In*/


/////* end firebase */////

const AdminCode="951";




/* start create account */

$(".btn-sign-up").addEventListener("click",()=>{
    var username = $(".username-up").value
    var password = $(".password-up").value
    var password2 = $(".password-up-2").value
    var email = $(".email-up").value


    

    if(username!=""&&password!=""&&password2!=""&&email==AdminCode&&password==password2)
    {

      addDoc(collection(db,"accounts"),{
        username: username,
        password: password,
        time: Date.now(),
      });
  
      setIdForAllDoc();

      $(".username-up").value=""
      $(".password-up").value=""
      $(".email-up").value=""
      $(".password-up-2").value=""

      /**/
      Swal.fire(
        'تم انشاء الحساب',
        'يمكنك الان تسجيل الدخول',
        'success'
      )
      /**/

      $("#tab-1").click()

    }else if(email!=AdminCode) {
        Swal.fire("","Error, Admin Code Not True","")
    } else if(username!=""&&password!=password2) {
        Swal.fire("","The Two Password Should be the Same and Enter Admin Code","")
    } else {
        Swal.fire("","Enter Username,Password,admin code and Email","")
    }
})

/* end create account */





// await getDoc(doc(db, "accounts", "L8tRIutxitBgha5OdTby")).then(e=>cs(e.data()))
