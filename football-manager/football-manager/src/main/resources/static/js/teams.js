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
                    '</div><form class="edit_team"><div class="modal-body">\n' +
                    '<label for="team_id"><input type="number" hidden="hidden" id="team_id" name="team_id" value="' + data[i].id + '"></label>' +
                    '<label for="editName'+i+'"><input type="text" id="editName'+i+'" name="name" placeholder="Team name" value="' + data[i].name + '"></label>\n' +
                    '</div><div class="modal-footer">\n' +
                    '<button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Save</button></div></form>\n' +
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
    let team_id = $(this).find("input").eq(0);
    let new_name = $(this).find("input").eq(1);
    let old_name = $(this).closest("tr").children().eq(1);
    old_name.text(new_name.val());
    let update = {
        "name": new_name.val(),
    };
    $.ajax({
        type: 'PUT',
        url: 'teams/'+team_id.val(),
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
    j--;
});

$(document).on("submit", "#add_team", function (event) {
    event.preventDefault();
    let team = {
        "name":$("#name").val(),
    }
    $.when(
        $.ajax({
            type: 'POST',
            url: 'teams',
            contentType: 'application/json',
            data: JSON.stringify(team),
        }),
    ).then(function () {
        $.ajax({
            type:'GET',
            url:'teams?name='+team.name,
            success: function (data) {
                let row = $("<tr></tr>")
                row.append(createCell(j));
                row.append(createCell($("#name").val()));
                row.append(createCell(0));
                row.append(createCell(0));
                row.append(createCell(0));
                row.append(createCell(0));
                row.append(createCell(0));
                row.append(createCell(0));
                let buttonEdit = $('<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editTeam' + j + '">Edit Team</button>\n' +
                    '<div class="modal" id="editTeam' + j + '"><div class="modal-dialog"><div class="modal-content">\n' +
                    '<div class="modal-header"><h4 class="modal-title">Edit Team</h4><button type="button" class="btn-close" data-bs-dismiss="modal"></button>\n' +
                    '</div><form class="edit_team"><div class="modal-body">\n' +
                    '<label for="team_id"><input type="number" hidden="hidden" id="team_id" name="team_id" value="'+data.id+'"></label>' +
                    '<label for="editName'+j+'">Team: <input type="text" id="editName'+j+'" name="name" placeholder="Team name" value="'+data.name+'"></label><br>\n' +
                    '</div><div class="modal-footer">\n' +
                    '<button type="submit" class="btn btn-danger" data-bs-dismiss="modal">Save</button></div></form>\n' +
                    '</div></div></div>');
                row.append(createCell(buttonEdit));
                row.append(createCell($("<button class='deleteTeam btn btn-primary'>Delete</button>")));
                $("table").append(row);
            }
        })
    })
});