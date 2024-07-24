var network = document.querySelector(".network-plan");
var data = document.querySelector(".data");
var msg = document.querySelector(".msg");
var balance = document.querySelector(".balance");
var phone = document.getElementById("phone");
const showPaymentPage = document.querySelector(".payment-page");
var errorReporter = document.querySelector(".error-reporter");
let submitInfo = document.querySelector(".submitInfo");
var phoneInput = document.getElementById("phone");
let confirmData = document.querySelector(".confirm-data");
let confirmNetwork = document.querySelector(".confirm-network");
let confirmPhone = document.querySelector(".confirm-phone");
let confirmButton = document.querySelector(".confirm-button")
let hideBalance = document.querySelector(".hide-balance") 

let walletBalance = 5000;

function login() {
    let startPage = document.querySelector(".start-page");
    let container = document.querySelector(".container");
    let logo = document.querySelector(".logo");
    let firstName = document.querySelector(".name");
    let lastName = document.querySelector(".last-name");
    if (firstName.value != "" && lastName.value != "") {
        logo.innerText = `${firstName.value} ${lastName.value}`;
        startPage.style.display = "none";
        container.style.display = "block";
        firstName.value = "";
        lastName.value = ""
    } else {
        let login = document.querySelector(".login");
        login.classList.add("animate-error");
        setTimeout(function () {
            login.classList.remove("animate-error");
        }, 500);
    }
}

function shakeButton() {
    submitInfo.classList.add("animate-error");
    setTimeout(function () {
        submitInfo.classList.remove("animate-error");
    }, 500);
}

function confirmation() {
    confirmPhone.innerText = phone.value;
    confirmNetwork.innerText = "Network: " + network.value;
    confirmData.innerText = "Data Plan: " + data.value;
    let errorPage = document.querySelector(".payment-page");
    errorPage.style.display = "flex";
}
function menuControl(){
    let menuDisplayer = document.querySelector(".cont-number")
    let menuContainer = document.querySelector(".menu")
    if (menuContainer.style.height == "0px"){
        menuContainer.style.height = "250px"
        removeWallet()
    }else{
        menuContainer.style.height = "0px"
    }
}

function hideMainBalance(){
    if (balance.innerText !== "*******"){
        hideBalance.innerText = "Show balance amount"
        balance.innerText = "*******"
    }else{
        hideBalance.innerText = "Hide balance amount"
        balance.innerText = "N" + walletBalance + '.00'
    }

}
function addWallet(){
    document.querySelector(".fund-wallet").style.height = "250px";
    
    //document.querySelector('.menu').style.height = "0px"
}
function removeWallet(){
    document.querySelector(".fund-wallet").style.height = "0px"
}
function creditWallet(){
    let creditAmount = document.getElementById("credit-amount").value
    let creditMoney = Number(creditAmount)
    let regex = /^[0-9]+$/;
    if (regex.test(creditMoney) && walletBalance <= 20000){
        walletBalance = walletBalance + creditMoney
        balance.innerText = "N" + walletBalance + ".00"
        document.getElementById("credit-amount").value = ""
    }
}
function logOut(){
    let startPage = document.querySelector(".start-page");
    let container = document.querySelector(".container");
    document.querySelector(".menu").style.height = "0px"
    startPage.style.display = "flex";
    container.style.display = "none";
    network.selectedIndex = 0
    data.selectedIndex = 0
    msg.innerText = ""
    phone.value = ""
    document.getElementById("credit-amount").value = ""
    
}

function processTransaction() {
    // Validate phone number
    var phoneNumber = phoneInput.value;
    const isNumeric = /^[0-9]+$/.test(phoneNumber);
    
    if (phoneNumber.indexOf('0') !== 0 || phoneNumber.length !== 11 || !isNumeric) {
        errorReporter.innerText = "Please use a valid phone number and try again.";
        setTimeout(function () {
            errorReporter.innerText = "";
        }, 3000);
        shakeButton();
        return;
    }
    
    // Validate other fields
    if (data.selectedIndex == 0 || network.selectedIndex == 0 || phone.value == "") {
        shakeButton();
        errorReporter.innerText = "Please fill all the fields";
        setTimeout(function () {
            errorReporter.innerText = "";
        }, 3000);
        return;
    }

    let msgText = msg.innerText;
    let firstChar = msgText.charAt(0); 
    if (isNaN(firstChar)) {
        msgText = msgText.slice(1);
    }

    const msgAmount = parseFloat(msgText);

    if (!isNaN(msgAmount) && msgAmount <= walletBalance && walletBalance >= 0) {
        confirmation();
        confirmButton.onclick = function() {
            walletBalance -= msgAmount;
            balance.innerText = "N" + walletBalance.toFixed(2);
            msg.innerText = firstChar + msgText;
            submitPayment();  // Close the confirmation dialog after transaction
            
            let successAlert = document.querySelector(".success-image")
            setTimeout(function(){
                successAlert.style.display = "flex"
            },1000)

            setTimeout(function(){
                successAlert.style.display = "none"
            },3000)
        };
    } else {
        errorReporter.innerText = "Insufficient Balance";
        setTimeout(function () {
            errorReporter.innerText = "";
        }, 3000);
        shakeButton();
    }
}

function submitPayment() {
    showPaymentPage.style.display = "none";
    network.selectedIndex = 0
    data.selectedIndex = 0
    msg.innerText = ""
    phone.value = ""
}

function displayError() {
    showPaymentPage.style.display = "flex";
}
function cancelPayment(){
    showPaymentPage.style.display = "none";
}
function checkSelection() {
    // MTN Nigeria
    if (network.value == "mtn" && data.value == "500") {
        msg.innerText = "N125";
    }
    else if (network.value == "mtn" && data.value == "1gb") {
        msg.innerText = "N250";
    }
    else if (network.value == "mtn" && data.value == "2gb") {
        msg.innerText = "N500";
    }
    else if (network.value == "mtn" && data.value == "3gb") {
        msg.innerText = "N750";
    }
    else if (network.value == "mtn" && data.value == "4gb") {
        msg.innerText = "N1000";
    }
    else if (network.value == "mtn" && data.value == "5gb") {
        msg.innerText = "N1250";
    }
    else if (network.value == "mtn" && data.value == "6gb") {
        msg.innerText = "N1500";
    }
    else if (network.value == "mtn" && data.value == "7gb") {
        msg.innerText = "N1750";
    }
    else if (network.value == "mtn" && data.value == "8gb") {
        msg.innerText = "N2000";
    }
    else if (network.value == "mtn" && data.value == "9gb") {
        msg.innerText = "N2250";
    }
    else if (network.value == "mtn" && data.value == "10gb") {
        msg.innerText = "N2500";
    }
    else if (network.value == "mtn" && data.value == "11gb") {
        msg.innerText = "N2750";
    }
    else if (network.value == "mtn" && data.value == "12gb") {
        msg.innerText = "N3000";
    }
    
    // Airtel Nigeria
    else if (network.value == "airtel" && data.value == "500") {
        msg.innerText = "N150";
    }
    else if (network.value == "airtel" && data.value == "1gb") {
        msg.innerText = "N300";
    }
    else if (network.value == "airtel" && data.value == "2gb") {
        msg.innerText = "N600";
    }
    else if (network.value == "airtel" && data.value == "3gb") {
        msg.innerText = "N900";
    }
    else if (network.value == "airtel" && data.value == "4gb") {
        msg.innerText = "N1200";
    }
    else if (network.value == "airtel" && data.value == "5gb") {
        msg.innerText = "N1500";
    }
    else if (network.value == "airtel" && data.value == "6gb") {
        msg.innerText = "N1800";
    }
    else if (network.value == "airtel" && data.value == "7gb") {
        msg.innerText = "N2100";
    }
    else if (network.value == "airtel" && data.value == "8gb") {
        msg.innerText = "N2400";
    }
    else if (network.value == "airtel" && data.value == "9gb") {
        msg.innerText = "N2700";
    }
    else if (network.value == "airtel" && data.value == "10gb") {
        msg.innerText = "N3000";
    }
    else if (network.value == "airtel" && data.value == "11gb") {
        msg.innerText = "N3300";
    }
    else if (network.value == "airtel" && data.value == "12gb") {
        msg.innerText = "N3600";
    }
    // 9 Mobile
    else if (network.value == "9mobile" && data.value == "500") {
        msg.innerText = "N100";
    }
    else if (network.value == "9mobile" && data.value == "1gb") {
        msg.innerText = "N200";
    }
    else if (network.value == "9mobile" && data.value == "2gb") {
        msg.innerText = "N400";
    }
    else if (network.value == "9mobile" && data.value == "3gb") {
        msg.innerText = "N600";
    }

    else if (network.value == "9mobile" && data.value == "4gb"){
        msg.innerText = "N800"
    }
    else if (network.value == "9mobile" && data.value == "5gb"){
        msg.innerText = "N1000"
    }
    else if (network.value == "9mobile" && data.value == "6gb"){
        msg.innerText = "N1200"
    }
    else if (network.value == "9mobile" && data.value == "7gb"){
        msg.innerText = "N1400"
    }
    else if (network.value == "9mobile" && data.value == "8gb"){
        msg.innerText = "N1600"
    }
    else if (network.value == "9mobile" && data.value == "9gb"){
        msg.innerText = "N1800"
    }
    else if (network.value == "9mobile" && data.value == "10gb"){
        msg.innerText = "N2000"
    }
    else if (network.value == "9mobile" && data.value == "11gb"){
        msg.innerText = "N2200"
    }
    else if (network.value == "9mobile" && data.value == "12gb"){
        msg.innerText = "N2400"
    }
    
    // Glo Nigeria
    else if (network.value == "glo" && data.value == "500"){
        msg.innerText = "N120"
    }
    else if (network.value == "glo" && data.value == "1gb"){
        msg.innerText = "N240"
    }
    else if (network.value == "glo" && data.value == "2gb"){
        msg.innerText = "N480"
    }
    else if (network.value == "glo" && data.value == "3gb"){
        msg.innerText = "N720"
    }
    else if (network.value == "glo" && data.value == "4gb"){
        msg.innerText = "N960"
    }
    else if (network.value == "glo" && data.value == "5gb"){
        msg.innerText = "N1200"
    }
    else if (network.value == "glo" && data.value == "6gb"){
        msg.innerText = "N1440"
    }
    else if (network.value == "glo" && data.value == "7gb"){
        msg.innerText = "N1680"
    }
    else if (network.value == "glo" && data.value == "8gb"){
        msg.innerText = "N1920"
    }
    else if (network.value == "glo" && data.value == "9gb"){
        msg.innerText = "N2160"
    }
    else if (network.value == "glo" && data.value == "10gb"){
        msg.innerText = "N2400"
    }
    else if (network.value == "glo" && data.value == "11gb"){
        msg.innerText = "N2640"
    }
    else if (network.value == "glo" && data.value == "12gb"){
        msg.innerText = "N2880"
    }
    
    
    
    else{
        msg.innerText = ""
    }
}
