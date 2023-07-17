function createCell(data) {
    let cell = $("<td></td>");
    cell.append(data);
    return cell;
}
$(document).ready(function () {
    $.ajax({
        type:'GET',
        url:'teams',
        success(data) {
            for(let i = 0; i<data.length; i++) {
                let row = $("<tr></tr>")
                row.append(createCell(i+1));
                row.append(createCell(data[i].name));
                row.append(createCell(data[i].goalsScored));
                row.append(createCell(data[i].goalsReceived));
                row.append(createCell(data[i].victories));
                row.append(createCell(data[i].draws));
                row.append(createCell(data[i].defeats));
                let points = (data[i].victories*3)+data[i].draws;
                row.append(createCell(points));
                let buttonEdit = $('<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editTeam' + i + '">Edit Team</button>\n' +
                    '<div class="modal" id="editTeam' + i + '"><div class="modal-dialog"><div class="modal-content">\n' +
                    '<div class="modal-header"><h4 class="modal-title">Edit Team</h4><button type="button" class="btn-close" data-bs-dismiss="modal"></button>\n' +
                    '</div><div class="modal-body"><form class="edit_team">\n' +
                    '<label for="team_id"><input type="number" hidden="hidden" id="team_id" name="team_id" value="' + data[i].id + '"></label>' +
                    '<label for="editName'+i+'"><input type="text" id="editName'+i+'" name="name" placeholder="Team name" value="' + data[i].name + '"></label>\n' +
                    '<label for="goals"><input type="number" id="editGoals'+i+'" name="goals" placeholder="Goals scored" value="' + data[i].goalsScored + '"></label>\n' +
                    '<label for="goalsRec"><input type="number" id="editGoalsRec'+i+'" name="goalsRec" placeholder="Goals received" value="' + data[i].goalsReceived + '"></label>\n' +
                    '<label for="victory"><input type="number" id="editVictory'+i+'" name="victory" placeholder="Victories" value="' + data[i].victories + '"></label>\n' +
                    '<label for="draws"><input type="number" id="editDraws'+i+'" name="draws" placeholder="Draws" value="' + data[i].draws + '"></label>\n' +
                    '<label for="defeats"><input type="number" id="editDefeats'+i+'" name="defeats" placeholder="Defeats" value="' + data[i].defeats + '"></label>\n' +
                    '<input type="submit" value="Submit"></form></div><div class="modal-footer">\n' +
                    '<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button></div>\n' +
                    '</div></div></div>');
                row.append(createCell(buttonEdit));
                row.append(createCell($("<button class='deleteTeam btn btn-primary'  id='"+data[i].id+"' type='button' >Delete</button>")));
                $("table").append(row);
            }
            j = data.length+1;
        }
    });
});

$(document).on("submit", ".edit_team", function (event) {
    event.preventDefault();
    alert("test1");
    let curr_cell = $(this).closest("tr").children().eq(1);
    let old_team = {
        'name': $(this).closest("tr").children().eq(1),
        'goals':Number($(this).closest("tr").children().eq(2)),
        'goalsRec':Number($(this).closest("tr").children().eq(3)),
        'victories':Number($(this).closest("tr").children().eq(4)),
        'draws':Number($(this).closest("tr").children().eq(5)),
        'defeats':Number($(this).closest("tr").children().eq(6))
    }
    let curr_input_val = $(this).children().eq(1).children().first();
    for(let i = 0; i<=5; i++) {
        curr_cell.text(curr_input_val.val());
        curr_cell = curr_cell.next();
        curr_input_val = curr_input_val.parent().next().children().first();
    }
    let victories = $(this).children().eq(4).children().first();
    let draws = victories.parent().next().children().first();
    let points = Number(victories.val())*3+Number(draws.val());
    curr_cell.text(points);
    let curr = $(this).children().eq(1).children().first();
    let update = {
        "name": curr.val(),
        "goalsScored":curr.parent().next().children().first().val(),
        "goalsReceived":curr.parent().eq(1).children().first().val(),
        "victories":victories.val(),
        "draws":draws.val(),
        "defeats": draws.parent().next().children().first().val()
    };
    $.ajax({
        type: 'PUT',
        url: 'teams/'+$(this).children().first().children().first().val(),
        contentType: 'application/json',
        data: JSON.stringify(update)
    });
});

$(document).on("click", ".deleteTeam", function (event) {
    let team_name = $(this).parentsUntil("tr")
    let row = $(this).parent().parent().remove()
    $.ajax({
        type:'DELETE',
        url:'teams/'+$(this).attr("id"),
        contentType: 'application/json',
    });
});

