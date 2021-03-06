const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');






loadEventListeners();

function loadEventListeners() {

    courses.addEventListener('click', buyCourse);


    shoppingCartContent.addEventListener('click', removeCourse);


    clearCartBtn.addEventListener('click', clearCart);


    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}







function buyCourse(e) {
    e.preventDefault();

    if(e.target.classList.contains('add-to-cart')) {
        
        const course = e.target.parentElement.parentElement;


        getCourseInfo(course);
    }
}

function getCourseInfo(course) {
    
    const courseInfo = {
        image: course.querySelector('img').src,
        tittle: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    
    addIntoCart(courseInfo);
}

function addIntoCart(course) {

    const row = document.createElement('tr');


    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=120>
            </td>
            <td>${course.tittle}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">x</a>
            </td>           
        </tr>
    `;

    shoppingCartContent.appendChild(row);


    saveIntoStorage(course);
}



function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();


    courses.push(course);


    localStorage.setItem('courses', JSON.stringify(courses) );

}

function getCoursesFromStorage() {

    let courses;


    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;

}


function removeCourse(e) {
    let course, courseid;

    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);

    removeCourseLocalStorage(courseId);

}

function removeCourseLocalStorage(id) {

    let coursesLS = getCoursesFromStorage();

    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 3);
        }
    });

    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

function clearCart() {
    

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }



    clearLocalStorage();
}

function clearLocalStorage() {
    localStorage.clear();
}

function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();


    coursesLS.forEach(function(course) {

        const row = document.createElement('tr');


        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=120>
                </td>
                <td>${course.tittle}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">x</a>
                </td>           
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}


