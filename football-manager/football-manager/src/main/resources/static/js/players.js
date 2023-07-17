function createCell(data) {
    let cell = $("<td></td>");
    cell.append(data);
    return cell;
}

function editButton(data, i) {
    let button = $('<button type="button" class="editPlayer btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPlayer'+i+'">Edit Player</button>');
    let div_modal = $('<div class="modal" id="editPlayer'+i+'"></div>');
    let div_modal_dialog = $('<div class="modal-dialog"></div>');
    let div_modal_content = $('<div class="modal-content"></div>');
    let div_modal_header = $('<div class="modal-header"><h4 class="modal-title">Edit Player</h4><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>');
    let div_modal_body = $('<div class="modal-body"></div>');
    let div_modal_footer = $('<div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button></div>');
    let form = $("<form class='edit-player'></form>");
    let label_id = $("<label for='player_id'></label>")
    let input_id = $("<input type='number'>");
    input_id.attr({
        'hidden':'hidden',
        'id':'player_id',
        'name':'player_id',
        'value':data.id
    });
    let role = $('<label for="editRole'+i+'">Role: <select class="form-select" id="editRole'+i+'" name="editRole'+i+'"><option>FORWARD</option><option>MIDFIELDER</option><option>DEFENDER</option><option>GOALKEEPER</select>');
    label_id.append(input_id);
    let label_name = $("<label for='editName"+i+"'>Name: </label>");
    let input_name = $("<input type='text'>");
    input_name.attr({
        'id':'editName'+i,
        'name':'editName'+i,
        'value':data.name,
        'placeholder':'Player name'
    });
    label_name.append(input_name, "<br>");
    let label_goals = $("<label for='editGoals"+i+"'>Goals Scored: </label>")
    let input_goals = $("<input type='number'>");
    input_goals.attr({
        'id':'editGoals'+i,
        'name':'editGoals'+i,
        'value':data.goalsScored,
        'placeholder':'Goals Scored',
    });
    label_goals.append(input_goals, "<br>");
    let submit = $('<input type="submit" value="Submit">');
    form.append(label_id, label_name, label_goals, role, submit);
    div_modal_body.append(form);
    div_modal_content.append(div_modal_header, div_modal_body, div_modal_footer);
    div_modal_dialog.append(div_modal_content);
    div_modal.append(div_modal_dialog);
    button.append(div_modal);
    return button;
}
$(document).ready(function () {
    $.ajax({
        type:'GET',
        url:'players',
        success(data) {
            let table = $("table");
            for (let i = 0; i < data.length; i++) {
                let row = $("<tr></tr>")
                row.append(createCell(i+1));
                row.append(createCell(data[i].name));
                row.append(createCell(data[i].goalsScored));
                row.append(createCell(data[i].role));
                let td = createCell(data[i].team.name);
                td.attr("id", data[i].team.id);
                td.attr("class", "team_id");
                row.append(createCell(data[i].team.name));
                let button = editButton(data[i], i);
                row.append(createCell(button));
                row.append(createCell($("<button class='delete-player btn btn-primary'>Delete</button>")));
                table.append(row);
            }
            j = data.length+1;
            k = data[j] + 1;
        }
    });
});

/*$("#add_player").submit(function (event) {
    event.preventDefault();
    alert('test1');
    $.ajax({
        type: 'GET',
        url: 'teams',
        success(data2) {
            let label = $("<label for='team'></label>");
            let select = $("<select id='team' name='team' class='select-form'></select>");
            for (let i = 0; i < data2.length; i++) {
                let option = $("<option>" + data2[i].name + "</option>");
                select.append(option);
            }
            label.append(select);
            let row = $("<tr></tr>")
            row.append(createCell($("#name").val()));
            row.append(createCell($("#goals").val()));
            row.append(createCell($("#role").val()));
            let data = {
                'id':k,
                'name':$("#name").val(),
                'goalsScored':$("#goals").val(),
                'role':$("#role").val(),
            }
            let buttonEdit = editButton(data, j, label);
            row.append(createCell(buttonEdit));
            row.append(createCell($("<button>Delete</button>")));
            $("table").append(row);
            let player = {
                "name": $("#name").val(),
                "goalsScored": $("#goals").val(),
                "role": $("#role").val(),
            };
            alert(player);
            $.ajax({
                type: 'POST',
                url: 'players',
                contentType: 'application/json',
                data: JSON.stringify(player)
            });
            j++;
            k++;
        }
    });
});*/

$(document).on("mousedown", ".editPlayer", function (event) {
    event.stopPropagation();
    let number = Number($(this).parent().parent().children().first().text())-1;
    if(!($("#editTeam"+number).length>0)) {
        $.ajax({
            type: 'GET',
            url: 'teams',
            success(data) {
                let label = $("<label for='editTeam" + number + "'>Team: </label>");
                let select = $("<select id='editTeam" + number + "' name='editTeam" + number + "' class='form-select'></select>");
                for (let i = 0; i < data.length; i++) {
                    let option = $("<option>" + data[i].name + "</option>");
                    select.append(option);
                }
                label.append(select);
                $("label[for=editRole"+number+"]").after(label);
            }
        });
    }
});
$(document).on("submit", ".edit-player", function (event) {
    event.preventDefault();
    let curr_cell = $(this).closest("tr").children().eq(1)
    let curr_input_val = $(this).children().first().next().children().first();
    for(let i = 0; i<3; i++) {
        curr_cell.text(curr_input_val.val());
        curr_cell = curr_cell.next();
        curr_input_val = curr_input_val.parent().next().children().first();
    }
    let curr = $(this).children().eq(1).children().first();
    let team = $(this).children().eq(4).children().first();
    let player_id = $(this).children().first().children().first().val();
    $.ajax({
        type:'GET',
        url: 'teams/'+team.val(),
        success(data) {
            let team = {
                'id':data.id,
                'name':data.name,
                'goalsScored':data.goalsScored,
                'goalsReceived':data.goalsReceived,
                'victories':data.victories,
                'draws':data.draws,
                'defeats': data.defeats
            }
            let update = {
                'name':curr.val(),
                'goalsScored':curr.parent().next().children().first().val(),
                'role':curr.parent().next().next().children().first().val(),
                'team': team
            };
            $.ajax({
                type:'PUT',
                url:'players/'+player_id,
                contentType:'application/json',
                data: JSON.stringify(update)
            });
        }
    });
})

$(document).on("click", "#createPlayer", function (event) {
    $.ajax({
        type: 'GET',
        url: 'teams',
        success(data2) {
            let label = $("<label for='team'></label>");
            let select = $("<select id='team' name='team' class='form-select'></select>");
            for (let i = 0; i < data2.length; i++) {
                let option = $("<option>" + data2[i].name + "</option>");
                select.append(option);
            }
            label.append(select);
            $("#createRole").after(label)
        }
    });
});

$(document).on("click", ".delete-player", function (event) {
    let player_name = $(this).parent().parent().children().first().next();
    $.ajax({
        type:'GET',
        url: 'players/name/'+player_name.text(),
        success: function (data) {
            for (let i = 0; i<data.length; i++) {
                if (data[i].name == player_name.text() && data[i].goalsScored == player_name.next().text() && data[i].role == player_name.next().next().text() && data[i].team.name == player_name.next().next().next().text()) {
                    let player_id = data[i].id;
                    $.ajax({
                        type: 'DELETE',
                        url: 'players/' + player_id,
                    });
                    break;
                }
            }
            player_name.parent().remove();
        }
    });
});