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
    let div_modal_footer = $('<div class="modal-footer"><button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Save</button></div>');
    let form = $("<form class='edit-player'></form>");
    let label_id = $("<label for='player_id'></label>")
    let input_id = $("<input type='number'>");
    input_id.attr({
        'hidden':'hidden',
        'id':'player_id',
        'name':'player_id',
        'value':data.id
    });
    let role = $('<label for="editRole'+i+'">Role: <select class="form-select" id="editRole'+i+'" name="editRole'+i+'"><option>FORWARD</option><option>MIDFIELDER</option><option>DEFENDER</option><option>GOALKEEPER</select></label>');
    label_id.append(input_id);
    let label_name = $("<label for='editName"+i+"'>Name: </label>");
    let input_name = $("<input type='text'>");
    input_name.attr({
        'id':'editName'+i,
        'name':'editName'+i,
        'value':data.name,
        'placeholder':'Player name'
    });
    label_name.append(input_name);
    div_modal_body.append(label_id, label_name, "<br>", role, "<br>");
    form.append(div_modal_body, div_modal_footer);
    div_modal_content.append(div_modal_header, form);
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
        url:'players',
        success(data) {
            let table = $("table");
            for (let i = 0; i < data.length; i++) {
                let row = $("<tr></tr>")
                row.append(createCell(i+1));
                row.append(createCell(data[i].name));
                row.append(createCell(data[i].role));
                let td = createCell(data[i].team.name);
                td.attr("id", data[i].team.id);
                td.attr("class", "team_id");
                row.append(createCell(data[i].team.name));
                row.append(createCell(data[i].goalsScored));
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
$(document).on("click", ".editPlayer", function (event) {
    event.stopPropagation();
    let number = Number($(this).parent().parent().parent().children().first().text())-1;
    if($("label[for=editTeam"+number+"]").length>0) {
        $("label[for=editTeam"+number+"]").remove();
    }
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
});
$(document).on("submit", ".edit-player", function (event) {
    event.preventDefault();
    let input_val = $(this).find("label");
    for(let i = 1; i<=3; i++) {
        $(this).closest("tr").find("td").eq(i).text(input_val.eq(i).children().first().val());
    }
    let team = $(this).find("select").eq(1);
    let player_id = $(this).find("input").eq(0).val();
    let update = {
        'name':$(this).find("input").eq(1).val(),
        'role':$(this).find("select").eq(0).val(),
    };
    $.ajax({
        type:'GET',
        url: 'teams?name='+team.val(),
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
            update.team = team;
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
    if($("label[for=team]").length == 0) {
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
    }
});
$(document).on("click", ".delete-player", function (event) {
    let player_name = $(this).closest("tr").children().eq(1);
    $.ajax({
        type:'GET',
        url: 'players?name='+player_name.text(),
        success: function (data) {
            for (let i = 0; i<data.length; i++) {
                if (data[i].name == player_name.text() && data[i].role == player_name.next().text() && data[i].team.name == player_name.next().next().text() && data[i].goalsScored == player_name.next().next().next().text()) {
                    let player_id = data[i].id;
                    $.ajax({
                        type: 'DELETE',
                        url: 'players/' + player_id,
                        success: function (data) {
                            player_name.parent().remove();
                        }
                    });
                    break;
                }
            }
        }
    });
});
$(document).on("submit", "#add_player", function (event) {
    event.preventDefault();
    let row = $("<tr></tr>")
    row.append(createCell(j));
    row.append(createCell($("#name").val()));
    row.append(createCell($("#role").val()));
    row.append(createCell($("#team").val()));
    row.append(createCell(0));
    let data = {
        'id':k,
        'name':$("#name").val(),
        'role':$("#role").val(),
        'team':$("#team").val()
    }
    let buttonEdit = editButton(data, $("table").children().length);
    row.append(createCell(buttonEdit));
    row.append(createCell($("<button class='delete-player btn btn-primary'>Delete</button>")));
    $("table").append(row);
    let team = $("#team").val()
    let player = {
        "name": $("#name").val(),
        "role": $("#role").val(),
        "team":team
    };
    $.ajax({
        type:'GET',
        url: 'teams?name='+team,
        success(data) {
            player.team = {
                'id':data.id,
                'name':data.name,
                'goalsScored':data.goalsScored,
                'goalsReceived':data.goalsReceived,
                'victories':data.victories,
                'draws':data.draws,
                'defeats': data.defeats
            };
            $.ajax({
                type:'POST',
                url:'players',
                contentType:'application/json',
                data: JSON.stringify(player)
            });
            $("label[for=team]").remove();
        }
    });
    j++;
})
