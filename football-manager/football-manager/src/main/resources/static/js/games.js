function createCell(data) {
    let cell = $("<td></td>");
    cell.append(data);
    return cell;
}
function editButton(data, i) {
    let button = $('<button type="button" class="editGame btn btn-primary" data-bs-toggle="modal" data-bs-target="#editGame'+i+'">Edit Game</button>');
    let div_modal = $('<div class="modal" id="editGame'+i+'"></div>');
    let div_modal_dialog = $('<div class="modal-dialog"></div>');
    let div_modal_content = $('<div class="modal-content"></div>');
    let div_modal_header = $('<div class="modal-header"><h4 class="modal-title">Edit Game</h4><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>');
    let div_modal_body = $('<div class="modal-body"></div>');
    let div_modal_footer = $('<div class="modal-footer"><button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button></div>');
    let form = $("<form class='edit-game'></form>");
    let label_id = $("<label for='game_id'></label>")
    let input_id = $("<input type='number'>");
    input_id.attr({
        'hidden':'hidden',
        'id':'game_id',
        'name':'game_id',
        'value':data.id
    });
    label_id.append(input_id);
    let label_date = $("<label for='editDate"+i+"'>Date: </label>");
    let input_date = $("<input type='datetime-local'>");
    input_date.attr({
        'id':'editDate'+i,
        'name':'editDate'+i,
        'value':data.date,
        'placeholder':'Date'
    });
    label_date.append(input_date);
    let label_result1 = $("<label for='editResult1"+i+"'>Goals for Team 1: </label>");
    let input_result1 = $("<input type='number'>");
    input_result1.attr({
        'id':'editResult1'+i,
        'name':'editResult1'+i,
        'placeholder':"Goals for Team 1"
    });
    let current_date = new Date();
    current_date.setHours(current_date.getHours()-2);
    let game_date = new Date(data[i].date);
    if(game_date < current_date) {

    }
    if (data.result != null) {
        input_result1.attr("value", data.result.goalsTeamOne);
    }
    label_result1.append(input_result1);
    let label_result2 = $("<label for='editResult2"+i+"'>Goals for Team 2: </label>");
    let input_result2 = $("<input type='number'>");
    input_result2.attr({
        'id':'editResult2'+i,
        'name':'editResult2'+i,
        'placeholder':"Goals for Team 2"
    });
    if (data.result!=null) {
        input_result2.attr("value", data.result.goalsTeamTwo);
    }
    label_result2.append(input_result2);
    let submit = $('<input type="submit" value="Submit">');
    form.append(label_id, label_date, "<br>", label_result1, "<br>", label_result2, "<br>", submit);
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
        url:'games',
        success: function (data) {
            let table = $("table");
            $("#add_game").children().eq(2).attr("name", )
            for (let i = 0; i < data.length; i++) {
                let row = $("<tr></tr>")
                row.append(createCell(i+1));
                row.append(createCell(data[i].teamOne.name));
                row.append(createCell(data[i].teamTwo.name));
                row.append(createCell(data[i].stadium.name));
                row.append(createCell(data[i].date));
                let result;
                let current_date = new Date();
                current_date.setHours(current_date.getHours()-2);
                let game_date = new Date(data[i].date);
                if(game_date < current_date) {
                    result = data[i].result.goalsTeamOne + ':' + data[i].result.goalsTeamTwo;
                } else {
                    result = "-:-";
                }
                let res = createCell(result);
                res.attr("name", data[i].result.id);
                row.append(res);
                let button = editButton(data[i], data[i].id);
                row.append(createCell(button));
                row.append(createCell($("<button class='delete-game btn btn-primary'>Delete</button>")));
                table.append(row);
            }
            j = data.length+1;
        }
    });
});

$(document).on("click", "#createGame", function (event) {
    $.ajax({
        type:'GET',
        url:'teams',
        success: function (data) {
            let team1 = $("<label for='team1'>Team1: </label>");
            let select1 = $("<select id='team1' name='team1' class='form-select'></select>");
            let team2 = $("<label for='team2'>Team2: </label>");
            let select2 = $("<select id='team2' name='team2' class='form-select'></select>");
            for (let i = 0; i < data.length; i++) {
                let option = $("<option>" + data[i].name + "</option>");
               // alert("test");
                //alert(select1.html());
                select2.append(option);
                //alert(select2.html());
            }
            for (let i = 0; i < data.length; i++) {
                let option = $("<option>" + data[i].name + "</option>");
                select1.append(option);
            }
            team1.append(select1);
            team2.append(select2);
            $("label[for=date]").before(team1, "<br>");
            $("label[for=date]").before(team2, "<br>");
        }
    });
    $.ajax({
        type:'GET',
        url:'stadiums',
        success: function (data) {
            let stadium = $("<label for='stadium'>Stadium: </label>");
            let select = $("<select id='stadium' name='stadium' class='form-select'></select>");
            for (let i = 0; i < data.length; i++) {
                let option = $("<option name='"+data[i].id+"'>" + data[i].name + "</option>");
                select.append(option);
            }
            stadium.append(select);
            $("label[for=date]").before(stadium, "<br>");
        }
    });
})
$(document).on("submit", "#add_game", function (event) {
    event.preventDefault();
    let game = {
        'teamOne': $("#team1").val(),
        'teamTwo': $("#team2").val(),
        'stadium':$("#stadium").val(),
        'date': $("#date").val(),
        'result': {
            'goalsTeamOne':$("#result1").val(),
            'goalsTeamTwo':$("#result2").val(),
        }
    };

    $.when(
        $.ajax({
            type:'GET',
            url:'teams?name='+game.teamOne,
            success: function (data) {
                game.teamOne = {
                    'id':data.id,
                    'name': data.name,
                    'goalsScored':data.goalsScored,
                    'goalsReceived':data.goalsReceived,
                    'victories':data.victories,
                    'draws':data.draws,
                    'defeats':data.defeats
                }
            }
        }),
        $.ajax({
            type:'GET',
            url:'teams?name='+game.teamTwo,
            success: function (data) {
                game.teamTwo = {
                    'id':data.id,
                    'name': data.name,
                    'goalsScored':data.goalsScored,
                    'goalsReceived':data.goalsReceived,
                    'victories':data.victories,
                    'draws':data.draws,
                    'defeats':data.defeats
                }
            }
        }),
        $.ajax({
            type:"GET",
            url: 'stadiums?name='+game.stadium,
            success: function (data) {
                game.stadium = {
                    'id': data.id,
                    'name':data.name,
                    'location':data.location
                }
            }
        }),
        $.ajax({
            type:'POST',
            url:'results',
            contentType: 'application/json',
            data: JSON.stringify(game.result),
            success: function (data) {
                game.result.id = data.id
            }
        })
    ).then(function (){
        $.ajax({
            type: 'POST',
            url: 'games',
            contentType: "application/json",
            data: JSON.stringify(game),
            success: function (data) {
                let row = $("<tr></tr>");
                row.append(createCell(j));

                row.append(createCell($("#team1").val()));
                let team2 = $("#team2").val();
                row.append(createCell(team2));
                row.append(createCell($("#stadium").val()));
                row.append(createCell($("#date").val()));
                let result = createCell($("#result").val());
                result.attr("name", data.result.id);
                row.append(result);
                game.id = data.id
                row.append(createCell(editButton(data, $("table").children().length)));
                row.append(createCell($("<button class='delete-game btn btn-primary'>Delete</button>")));
                $("table").append(row);
                $("label[for=team1]").remove();
                $("label[for=team2]").remove();
                $("label[for=stadium]").remove();
            }
        });
    })

});

$(document).on("click", ".editGame", function (event) {
    let y = 0;
    let x = $(this).parent().find("form").children().eq(1).attr("for");
    let date = $(this).parent().find("form").children().eq(1);
    $.when(
        $.ajax({
            type:'GET',
            url:'teams',
            success: function (data) {
                y = x[x.length-1];
                let team1 = $("<label for='team1"+y+"'>Team1: </label>");
                let select1 = $("<select id='team1"+y+"' name='team1"+y+"' class='form-select'></select>");
                let team2 = $("<label for='team2"+y+"'>Team2: </label>");
                let select2 = $("<select id='team2"+y+"' name='team2"+y+"' class='form-select'></select>");
                for (let i = 0; i < data.length; i++) {
                    let option = $("<option>" + data[i].name + "</option>");
                    select2.append(option);
                }
                for (let i = 0; i < data.length; i++) {
                    let option = $("<option>" + data[i].name + "</option>");
                    select1.append(option);
                }
                team1.append(select1);
                team2.append(select2);
                date.before(team1, "<br>");
                date.before(team2, "<br>");
            }
        }),
    ).then(function () {
        $.ajax({
            type:'GET',
            url:'stadiums',
            success: function (data) {
                let stadium = $("<label for='stadium"+y+"'>Stadium: </label>");
                let select = $("<select id='stadium"+y+"' name='stadium"+y+"' class='form-select'></select>");
                for (let i = 0; i < data.length; i++) {
                    let option = $("<option name='"+data[i].id+"'>" + data[i].name + "</option>");
                    select.append(option);
                }
                stadium.append(select);
                date.before(stadium, "<br>");
            }
        })
    });
})

$(document).on("submit", ".edit-game", function (event) {
    event.preventDefault();
    let curr_cell = $(this).closest("tr").children().eq(1);
    let id = $(this).children().first().children().first().val();
    let curr_input_val = $(this).children().eq(1).children().first();
    for(let i = 0; i<5; i++) {
        curr_cell.text(curr_input_val.val());
        curr_cell = curr_cell.next();
        curr_input_val = curr_input_val.parent().next().next().children().first();
    }
    let game_id = $(this).children().first().children().first().val();
    let game = {
        'teamOne':$(this).children().eq(1).children().first().val(),
        'teamTwo':$(this).children().eq(3).children().first().val(),
        'stadium':$(this).children().eq(5).children().first().val(),
        'date':$(this).children().eq(7).children().first().val(),
        'result': {
            'id': $(this).closest("tr").children().eq(5).attr("name"),
            'goalsTeamOne': $(this).children().eq(9).children().first().val(),
            'goalsTeamTwo': $(this).children().eq(11).children().first().val(),
        }
    }
    let labels = $(this).children();
    $.when(
        $.ajax({
            type:'GET',
            url:'teams?name='+game.teamOne,
            success: function (data) {
                game.teamOne = {
                    'id':data.id,
                    'name':data.name,
                    'goalsScored':data.goalsScored,
                    'goalsReceived':data.goalsReceived,
                    'victories':data.victories,
                    'draws':data.draws,
                    'defeats':data.defeats
                }
            }
        }),
        $.ajax({
            type:'GET',
            url:'teams?name='+game.teamTwo,
            success: function (data) {
                game.teamTwo = {
                    'id':data.id,
                    'name':data.name,
                    'goalsScored':data.goalsScored,
                    'goalsReceived':data.goalsReceived,
                    'victories':data.victories,
                    'draws':data.draws,
                    'defeats':data.defeats
                }
            }
        }),
        $.ajax({
            type:'GET',
            url:'stadiums?name='+game.stadium,
            success: function (data) {
                game.stadium = {
                    'id':data.id,
                    'name':data.name,
                    'location':data.location
                }
            }
        }),
    ).then(function (data) {
        $.ajax({
            type:'PUT',
            url:'games/'+game_id,
            contentType:'application/json',
            data: JSON.stringify(game),
            success: function () {
                for(let i = 1; i<7; i++) {
                    labels.eq(i).remove();
                }
            }
        })
    })
})

$(document).on("click", ".delete-game", function (event){
    let game_id = $(this).closest("tr").children().eq(6).find("form").children().first().children().first();
    let row = $(this).closest("tr");
    $.ajax({
        type: 'DELETE',
        url: 'games/'+game_id.val(),
        success: function (data) {
            row.remove();
            j--;
        }
    })
})

myInterval = setInterval(check_result, 30000);
function check_result() {
    $.ajax({
        type:'GET',
        url:'results',
        success:function (data){
            let current_date = new Date();
            for (let i = 0; i<data.length; i++) {
                let start_date = new Date(data[i].date);
                let end_date = start_date.setHours(start_date.getHours()+2)
                if(data[i].over && end_date<current_date) {
                    let result1 = Math.floor(Math.random()*6);
                    let result2 = Math.floor(Math.random()*6);
                    $("table").children().eq(i+1).children().eq(5).text(result1+":"+result2);
                    $.ajax({
                        type:'PUT',
                        url: 'results/'+data[i].id,
                        data: {
                            'id':data[i].id,
                            'goalsTeamOne':result1,
                            'goalsTeamTwo':result2,
                            'over': true
                        }
                    });
                }
            }
        }

    })
}