package com.nro.footballmanager.entity.dto;

import com.nro.footballmanager.entity.Result;
import lombok.Data;

@Data
public class ResultDTO {
    private Long id;
    private int goalsTeamOne;
    private int goalsTeamTwo;
    private boolean over;

    public static ResultDTO ResultToResultDTO(Result r) {
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setId(r.getId());
        resultDTO.setGoalsTeamOne(r.getGoals_team_one());
        resultDTO.setGoalsTeamTwo(r.getGoals_team_two());
        resultDTO.setOver(r.isOver());
        return resultDTO;
    }
    public static Result ResultFromResultDTO(ResultDTO r) {
        Result res = new Result();
        res.setId(r.getId());
        res.setGoals_team_one(r.getGoalsTeamOne());
        res.setGoals_team_two(r.getGoalsTeamTwo());
        res.setOver(r.isOver());
        return res;
    }
}
