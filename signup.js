import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {getAuth,createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {firebaseConfig} from './firebase-config.js';
const $=id=>document.getElementById(id),error=$('error');
let auth;
try{auth=getAuth(initializeApp(firebaseConfig))}catch(e){error.textContent='ตั้งค่า Firebase ไม่ถูกต้อง: '+e.message}
const messages={'auth/email-already-in-use':'อีเมลนี้มีบัญชีแล้ว ลองเข้าสู่ระบบ','auth/invalid-email':'อีเมลไม่ถูกต้อง','auth/weak-password':'รหัสผ่านสั้นเกินไป','auth/operation-not-allowed':'ยังไม่ได้เปิด Email/Password ใน Firebase Authentication','auth/unauthorized-domain':'ยังไม่ได้เพิ่มโดเมนเว็บใน Firebase Authorized domains','auth/network-request-failed':'เชื่อมต่อ Firebase ไม่สำเร็จ'};
$('signupForm').onsubmit=async e=>{e.preventDefault();error.textContent='';if($('password').value!==$('confirmPassword').value){error.textContent='รหัสผ่านทั้งสองช่องไม่ตรงกัน';$('confirmPassword').focus();return}if(!auth){error.textContent='เชื่อมต่อ Firebase ไม่สำเร็จ';return}let button=$('submitBtn');button.disabled=true;button.textContent='กำลังสร้างบัญชี…';try{await createUserWithEmailAndPassword(auth,$('email').value.trim(),$('password').value);location.replace('index.html')}catch(e){error.textContent=messages[e.code]||e.message||'สร้างบัญชีไม่สำเร็จ';button.disabled=false;button.textContent='สร้างบัญชี'}};
