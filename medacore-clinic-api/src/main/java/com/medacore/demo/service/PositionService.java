package com.medacore.demo.service;

import com.medacore.demo.model.Position;
import com.medacore.demo.web.dto.request.PositionReq;

import java.util.List;

public interface PositionService {
    List<Position> getAllPosition();

    Position getPositionById(Integer id);

    void createPosition(PositionReq positionReq);

    void updatePosition(Integer id, PositionReq positionReq);

    void removePosition(Integer id);
}
