// Start from control coding
var cadd = document.querySelector(".cadd");

var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
var form_register = document.getElementById("form_register");
var allInput =form_register.querySelectorAll("input")
cadd.onclick = function () {
    modal.classList.add("active");
}
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    var i;
    for(i=0;i<allInput.length;i++){
        allInput[i].value="";
    }
})




// global variables
var userData = [];
var profile_picEl = document.querySelector("#profile_pic");
var upload_picEl = document.querySelector("#upload_pic");
var fnameEl = document.getElementById("f_name");
var lnameEl = document.getElementById("l_name");
var phoneEl = document.getElementById("ph_no");
var mailEl = document.getElementById("mail");
var table_data = document.querySelector("#table_data");
var imgUrl;
var allDelBtn;
var tr;
var allEditBtn;

//main var
var contactSave = document.querySelector("#save");
var contactEdit = document.querySelector("#edit");

if (localStorage.getItem("userData") != null) {

    userData = JSON.parse(localStorage.getItem("userData"));

}


contactSave.onclick = (e) => {
    e.preventDefault();
    registrationData();
    form_register.reset();
    getDataFromLocalStorage();
    swal("Voila!", "Contact Saved!", "success")


    closeBtn.click();

};


//functions
const registrationData = () => {
    userData.push({
        profile_pic : imgUrl== undefined ? "Assets/profile.png" : imgUrl,
        f_name: fnameEl.value,  // id ki key banani hai 
        l_name: lnameEl.value,
        ph_no: phoneEl.value,
        mail: mailEl.value,
    })
    var userStr = JSON.stringify(userData);  // local storage mein bssh string mein he data store hota hai 
    localStorage.setItem("userData", userStr);
}


//getting data from localStorage


const getDataFromLocalStorage=() =>{

    table_data.innerHTML = "";
    userData.forEach((data,index) => {

        table_data.innerHTML += `

   <tr index=${index}>
   <td>${index + 1}</td>
   <td><img src="${data.profile_pic}" style="heigh:20px" width="50px"></td>
   <td>${data.f_name}</td>
   <td>${data.l_name}</td>
   <td>${data.ph_no}</td>
   <td>${data.mail}</td>
   <td id="special">
       <button class="edit_btn"><i id= "view" class="fa-solid fa-eye" style="color: #008cb4;"></i> </button>

       <button class="del_btn" ><i id="del" class="fa-solid fa-trash" style="color: #008cb4;"></i></button>
   </td>
   


</tr>
   `;
    })

    // start deleting here
    var i = 0;
    allDelBtn = document.querySelectorAll(".del_btn");
    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = function () { 
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this Contact",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        
                        swal("Poof! Your Contact has been deleted!", {
                            icon: "success",
                        });
                        userData.splice(ind, 1);
                        localStorage.setItem("userData", JSON.stringify(userData));
                        tr.remove();

                    } else {
                        swal("Your Contact is safe!");
                    }
                });
            tr = this.parentElement.parentElement;
            var ind = tr.getAttribute("index");




        }
    }
    //all coding of Ediitng
    allEditBtn = document.querySelectorAll(".edit_btn");
    console.log(allEditBtn);
    var i = 0;
    for (i = 0; i < allEditBtn.length; i++) {
        allEditBtn[i].onclick = function () {
            var tr = this.parentElement.parentElement;
            var td = tr.querySelectorAll("td");
            var index = tr.getAttribute("index");
            var imgTag = td[1].getElementsByTagName("img");
            var profilePic = imgTag[0].src;
            var f_name = td[2].innerHTML;
            var l_name = td[3].innerHTML;
            var ph_no = td[4].innerHTML;
            var mail = td[5].innerHTML;
            contactSave.disabled = true;
            contactEdit.disabled = false;
            cadd.click();
            fnameEl.value = f_name;
            lnameEl.value = l_name;
            phoneEl.value = ph_no;
            mailEl.value = mail;
            profile_picEl.src = profilePic;
            
            contactEdit.onclick =function(e){
                   userData[index] = {
                    profile_pic: upload_picEl.value == "" ? profile_picEl.src :imgUrl,
                    f_name: fnameEl.value,  // id ki key banani hai 
                    l_name: lnameEl.value,
                    ph_no: phoneEl.value,
                    mail: mailEl.value,
                    
                }

                localStorage.setItem("userData",JSON.stringify(userData));
                
            }
         





        }
    }

}

getDataFromLocalStorage();
//Table

//profile picture processing

upload_picEl.onchange = function () {
    if (upload_picEl.files[0].size <2000000) {
        var fReader = new FileReader();
        fReader.onload = function (e) {
            imgUrl = e.target.result;
            profile_picEl.src = imgUrl;
        }
        fReader.readAsDataURL(upload_picEl.files[0]);

    }
    else {
        alert("File size is greater than desired");
    }
}

//Start search coding
var searchEl= document.querySelector("#contactId");
searchEl.oninput=function(){
    searchFun();
}
function searchFun(){
var tr=table_data.querySelectorAll("tr");
var filter=searchEl.value.toLowerCase();
var i=0;
for(i=0;i<tr.length;i++){
    var td=tr[i].getElementsByTagName("td")[2];
    var td2=tr[i].getElementsByTagName("td")[3];
    var td3=tr[i].getElementsByTagName("td")[4];
    var td4=tr[i].getElementsByTagName("td")[5];

    var s_fname=td.innerHTML.toLowerCase();
    var s_lname=td2.innerHTML.toLowerCase();
    var s_phno= td3.innerHTML.toLowerCase();
    var s_mail= td4.innerHTML.toLowerCase();

    if(s_fname.indexOf(filter)>-1 || s_lname.indexOf(filter)>-1 || s_phno.indexOf(filter)>-1 || s_mail.indexOf(filter)>-1){
     tr[i].style.display="";
    }
    else{
        tr[i].style.display="none";
    }


}

}

//Clearing all data of RESET button
var delAllBtn= document.querySelector("#cresetid");
var resetBox= document.querySelector("#delete_all_box");
delAllBtn.addEventListener("click",()=>{
 if(resetBox.checked==true){
    //confimation message
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover all those Contacts",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("userData");
                window.location=location.href;
                swal("Poof! Your All Contacts have been deleted!", {
                    icon: "success",
                });
               

            } else {
                swal("Your All Contacts are safe!");
            }

            //confirmation end


        });
 }
 else{
    swal("Tick on the box", "Check the Box to Delete All Contacts at once", "warning");
 }
})
