function createCell(data) {
    let cell = $("<td></td>");
    cell.append(data);
    return cell;
}
function editButton(data, i) {
    let button = $('<button type="button" class="editStadium btn btn-primary" data-bs-toggle="modal" data-bs-target="#editStadium'+i+'">Edit Stadium</button>');
    let div_modal = $('<div class="modal" id="editStadium'+i+'"></div>');
    let div_modal_dialog = $('<div class="modal-dialog"></div>');
    let div_modal_content = $('<div class="modal-content"></div>');
    let div_modal_header = $('<div class="modal-header"><h4 class="modal-title">Edit Stadium</h4><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>');
    let div_modal_body = $('<div class="modal-body"></div>');
    let div_modal_footer = $('<div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button></div>');
    let form = $("<form class='edit-stadium'></form>");
    let label_id = $("<label for='stadium_id'></label>")
    let input_id = $("<input type='number'>");
    input_id.attr({
        'hidden':'hidden',
        'id':'stadium_id',
        'name':'stadium_id',
        'value':data.id
    });
    label_id.append(input_id);
    let label_name = $("<label for='editName"+i+"'>Name: </label>");
    let input_name = $("<input type='text'>");
    input_name.attr({
        'id':'editName'+i,
        'name':'editName'+i,
        'value':data.name,
        'placeholder':'Stadium name'
    });
    label_name.append(input_name, "<br>");
    let label_city = $("<label for='editCity"+i+"'>City: </label>")
    let input_city = $("<input type='text'>");
    input_city.attr({
        'id':'editCity'+i,
        'name':'editCity'+i,
        'value':data.location,
        'placeholder':'City',
    });
    label_city.append(input_city, "<br>");
    let submit = $('<input type="submit" value="Submit">');
    form.append(label_id, label_name, label_city, submit);
    div_modal_body.append(form);
    div_modal_content.append(div_modal_header, div_modal_body, div_modal_footer);
    div_modal_dialog.append(div_modal_content);
    div_modal.append(div_modal_dialog);
    let div_wrap = $("<div></div>");
    div_wrap.append(button);
    button.after(div_modal);
    return div_wrap;
}

$(document).ready(function () {
    $.ajax({
        type:'GET',
        url:'stadiums',
        success(data) {
            let table = $("table");
            for (let i = 0; i < data.length; i++) {
                let row = $("<tr></tr>")
                row.append(createCell(i+1));
                row.append(createCell(data[i].name));
                row.append(createCell(data[i].location));
                let button = editButton(data[i], i);
                row.append(createCell(button));
                row.append(createCell($("<button class='delete-stadium btn btn-primary'>Delete</button>")));
                table.append(row);
            }
            j = data.length+1;
        }
    });
});

$(document).on("submit", "#add_stadium", function (event) {
    event.preventDefault();
    let stadium = {
        'name': $("#name").val(),
        'location':$("#city").val()
    };
    $.ajax({
        type: 'POST',
        url: 'stadiums',
        contentType: "application/json",
        data: JSON.stringify(stadium),
        success: function (data) {
            alert("test");
            let row = $("<tr></tr>");
            row.append(createCell($("#name").val()));
            row.append(createCell($("#city")).val());
            stadium.id = data.id
            row.append(createCell(editButton(stadium, $("table").children().length)));
            row.append(createCell($("<button class='delete-stadium btn btn-primary'>Delete</button>")));
            $("table").append(row);
        }
    })
});

$(document).on("submit", ".edit-stadium", function (event) {
    event.preventDefault();
    let curr_cell = $(this).closest("tr").children().eq(1);
    let id = $(this).children().first().children().first().val();
    let new_name = $(this).children().eq(1).children().first().val();
    let new_loc = $(this).children().eq(2).children().first().val();
    curr_cell.text(new_name);
    curr_cell.next().text(new_loc);
    let update = {
        'name': new_name,
        'location':new_loc
    };
    $.ajax({
        type:'PUT',
        url:'stadiums/'+id,
        contentType: 'application/json',
        data: JSON.stringify(update)
    });
})

$(document).on("click", ".delete-stadium", function () {
    let id = $(this).parent().prev().find(".edit-stadium").children().eq(0).children().eq(0).val();
    alert(id);
    $.ajax({
        type:'DELETE',
        url:'stadiums/'+id
    });
    $(this).closest("tr").remove();
    j--;
})