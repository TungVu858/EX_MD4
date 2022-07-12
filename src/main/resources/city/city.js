function showAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities",
        success: function (data) {
            console.log(data)
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${data[i].name}</td>
                    <td>${data[i].country}</td>
                    <td onclick="showEditForm(${data[i].id})" class="btn btn-primary">Sửa</td>
                    <td onclick="showDelete(${data[i].id})" class="btn btn-danger">Xoá</td>
                </tr>`
            }
            document.getElementById("display").innerHTML = content;
        }
    })
}

function showAdd() {
    $('#exampleModal').modal('show')
}

showAll();

function addCity() {
    let name = document.getElementById("name").value;
    let country = document.getElementById("country").value;
    let population = document.getElementById("population").value;
    let area = document.getElementById("area").value;
    let GDP = document.getElementById("GDP").value;
    let description = document.getElementById("description").value;
    let city = {
        name: name,
        country: country,
        population: population,
        area: area,
        gdp: GDP,
        description: description
    }
    $.ajax({
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/cities",
        data: JSON.stringify(city),
        success: function () {
            $('#exampleModal').modal('hide');
            showAll();
        }
    })
}

function showEditForm(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        success: function (data) {
            console.log(data)
            $('#exampleModal1').modal('show')
            document.getElementById("nameEdit").value = data.name;
            document.getElementById("id").value = data.id;
            document.getElementById("countryEdit").value = data.country;
            document.getElementById("populationEdit").value = data.population;
            document.getElementById("areaEdit").value = data.area;
            document.getElementById("GDP1").value = data.gdp;
            document.getElementById("descriptionEdit").value = data.description;

        }
    })
}

function editCity() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("nameEdit").value;
    let country = document.getElementById("countryEdit").value;
    let area = document.getElementById("areaEdit").value;
    let population = document.getElementById("populationEdit").value;
    let gdp = document.getElementById("GDP1").value;
    let description = document.getElementById("descriptionEdit").value;
    let city = {
        name: name,
        country: country,
        population: population,
        area: area,
        gdp: gdp,
        description: description
    }
    $.ajax({
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8080/cities/" + id,
        data: JSON.stringify(city),
        success: function () {
            $('#exampleModal1').modal('hide');
            showAll();
        }
    })
}
let deleteId = 0;
function showDelete(id) {
    $('#modalDeleteForm').modal('show')
    deleteId = id;
}

function acceptModal() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/cities/" + deleteId,
        success: function (data) {
            console.log(data)
            deleteId = 0;
            showAll();
        }
    })
}

