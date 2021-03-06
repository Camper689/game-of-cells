package com.game_of_cells.gameofcells.cell;

import com.game_of_cells.gameofcells.GameOfLifeConfiguration;

public class Cell {

    protected CellState state;
    protected CellState nextState;

    public Cell(CellState state) {
        this.state = state;
    }

    public void calculateNextState(CellContext context, GameOfLifeConfiguration configuration) {
        String newState = state.evolve(context);
        if (newState != null) {
            this.nextState = configuration.getState(newState);
        } else {
            this.nextState = this.state;
        }
    }

    public void evolve() {
        this.state = this.nextState;
    }

    public String name() {
        return state.name();
    }

    public void evolveInto(CellState state) {
        this.nextState = state;
        this.evolve();
    }
}
