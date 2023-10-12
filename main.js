var courseName = document.querySelector("#courseName");
var courseCategory = document.querySelector("#courseCategory");
var coursePrice = document.querySelector("#coursePrice");
var courseDescription = document.querySelector("#courseDescription");
var courseCapacity = document.querySelector("#courseCapacity");
var addBtn = document.querySelector("#click");
var inputs = document.querySelectorAll(".inputs");

var search = document.querySelector("#search");
var nameError = document.querySelector(".nameError");
var isNameTrue = false;
var deleteBtn = document.getElementById("deleteBtn");

if(JSON.parse(localStorage.getItem("coureses") == null)){
    var courses = [];
}
else{
    courses = JSON.parse(localStorage.getItem("courses"));
    displayData();
}

addBtn.addEventListener("click", function(e) {
    e.preventDefault();
    addCourse();
    clearInput();
    displayData();
});

 function addCourse(){
    var course = {
        name: courseName.value,
        category : courseCategory.value,
        price : coursePrice.value,
        description : courseDescription.value,
        capacity : courseCapacity.value
        };
        
        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));
        Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Course Added successfully',
            showConfirmButton: false,
            timer: 1500
          })
 }

 function clearInput(){
    for(var i = 0 ; i < inputs.length ; i++){
        inputs[i].value = "";
    }
 }

 function displayData(){
    var result = ``;
    for(var i = 0 ; i < courses.length ; i++){
        result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td>${courses[i].capacity}</td>
            <td><button class="btn btn-outline-info">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("data").innerHTML=result;
 }

 function deleteCourse(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(id,1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayData();
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
 }

deleteBtn.addEventListener("click",function(e){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(0,courses.length);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayData();
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
})

search.addEventListener("keyup",function(e){
    var result = ``;
    for(var i = 0 ; i < courses.length ; i++){
        if(courses[i].name.toLowerCase().includes(e.target.value.toLowerCase())){
        result += `
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td>${courses[i].capacity}</td>
            <td><button class="btn btn-outline-info">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteCourse(${i})">Delete</button></td>
        </tr>
        `;
    }}
    document.getElementById("data").innerHTML=result;
})

courseName.addEventListener("keyup",function(){
    var pattern = /^[A-Z][a-z]{2,10}$/;
    if(pattern.test(courseName.value)){
        if(courseName.classList.contains("is-invalid")){
            courseName.classList.remove('is-invalid');
            courseName.classList.add("is-valid");
        }
        courseName.classList.add("is-valid");
        nameError.style.cssText="display : none";
        isNameTrue =true;
    }
    else{
        if(courseName.classList.contains("is-valid")) {
            courseName.classList.remove("is-valid");
            courseName.classList.add("is-invalid");
    }
    courseName.classList.add("is-invalid");
    nameError.style.cssText="display : block";
    isNameTrue=false;
}
if(isNameTrue){
    addBtn.removeAttribute("disabled");
}
else{
    addBtn.setAttribute("disabled","disabled");
}
})