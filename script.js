const tableFunc = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const json = await response.json();
  return json;
};

const tableBody = document.querySelector("#tableBody");
const pagination = document.querySelector("#pagination");
const dropDown = document.querySelector("#dropDown");

// console.log(dropDown);

const callingFunc = tableFunc();
callingFunc.then((data) => {
  //   console.log(data);
  // console.log(typeof dropDown)

  let item = [];
  let paginationNumber = [];
  let paginationDropDown = [];

  data.forEach((element, index) => {
    item += `<tr class="tableRow">  
        <td>${index + 1}</td>  
        <td>${element.name}</td>  
        <td>${element.email}</td>  
        <td>${element.address.street}, ${element.address.city}, ${
      element.address.zipcode
    }</td>  
    </tr> `;

    if (
      index == parseInt(data.length) - 1 ||
      index == parseInt(data.length / 2) - 1 ||
      index == parseInt(data.length / 2 / 2) - 1
    ) {
      paginationDropDown += `
    <option value=${index + 1} class= option-${index + 1}>${index + 1}</option>
    `;
    }

    paginationNumber += `
    <li class="page-item" onclick="tableRowFunc(pagination.children[${
      index + 1
    }].children[0].innerHTML)"><a class="page-link">${index + 1}</a></li>
    `;
  });

  tableBody.innerHTML = item;
  dropDown.innerHTML = `
                    <option class='me-3' style='font-size='0.776em; color: #4ca392;' disabled>Open this select menu</option>
                    ${paginationDropDown}`;
  pagination.innerHTML = `<li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                          ${paginationNumber}
                          <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>`;

  dropDown.lastElementChild.setAttribute("selected", true);
});

const myFunc = (value) => {
  const tableRow = document.querySelectorAll(".tableRow");
  pagination.classList.remove("d-none");

  for (i = 0; i < tableRow.length; i++) {
    tableRow[i].classList.remove("d-none");
  }

  if (value == tableBody.childElementCount) {
    if (pagination.classList.contains("d-none")) {
      return;
    } else {
      pagination.classList.add("d-none");
    }
    console.log(pagination.classList);
  } else if (
    value >= tableBody.childElementCount / 2 &&
    value < tableBody.childElementCount
  ) {
    for (
      let i =
        tableBody.childElementCount / (tableBody.childElementCount / 2) + 1;
      i <= tableBody.childElementCount;
      i++
    ) {
      pagination.children[i].classList.add("d-none");
    }

    for (i = value; i < tableBody.childElementCount; i++) {
      tableRow[i].classList.add("d-none");
    }
  } else {
    for (let i = 1; i <= parseInt(tableBody.childElementCount / value); i++) {
      pagination.children[i].classList.remove("d-none");
    }
  }
  for (
    let i = parseInt(tableBody.childElementCount / value) + 1;
    i <= parseInt(tableBody.childElementCount);
    i++
  ) {
    pagination.children[i].classList.add("d-none");
  }

  for (i = value; i < tableBody.childElementCount; i++) {
    tableRow[i].classList.add("d-none");
  }
};

const tableRowFunc = (pageValue) => {
  const tableRow = document.querySelectorAll(".tableRow");
    for(let i=0; i<pageValue; i++) {
      tableRow.children[i].classList.add('d-none')
      if (pageValue == 1) {

      } 
    }
};
