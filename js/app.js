// variables

const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody');



// listeners

loadEventListeners();

function loadEventListeners() {
    courses.addEventListener('click', buyCourse);

}


// functions

function buyCourse(e) {
    e.preventDefault();

    if(e.target.classList.contains('add-to-cart')) {

        const course = e.target.parentElement.parentElement;

        getCourseInfo(course);

    }

}

function getCourseInfo(course){

    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
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
                 <img src="${course.image}"width=100>
           </td>
           <td>${course.title}</td>
           <td>${course.price}</td>
           <td>
               <a href="#" class="remove" data-id="${course.id}">X</a>
       </tr>
    
    `;

      shoppingCartContent.appendChild(row);


}





