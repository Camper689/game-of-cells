package com.game_of_cells.gameofcells.grid;

import com.game_of_cells.gameofcells.cell.Cell;
import org.jetbrains.annotations.NotNull;

import java.util.function.Supplier;

public class ArrayCellGrid extends AbstractCellGrid {

    private final Cell[][] grid;

    public ArrayCellGrid(int width, int height, @NotNull Supplier<Cell> cellCreator) {
        super(width, height);

        this.grid = new Cell[width][height];

        forEach((x, y) -> {
            Cell cell = cellCreator.get();
            setCell(cell, x, y);
        });
    }

    @Override
    public @NotNull Cell getCell(int x, int y) {
        return grid[x][y];
    }

    @Override
    public void setCell(@NotNull Cell cell, int x, int y) {
        grid[x][y] = cell;
    }

    @Override
    public Cell[] getNeighbours(int x, int y) {
        int leftBorder = Math.max(x - 1, 0);
        int rightBorder = Math.min(x + 1, getWidth() - 1) + 1;

        int topBorder = Math.max(y - 1, 0);
        int bottomBorder = Math.min(y + 1, getHeight() - 1) + 1;

        int total = (rightBorder - leftBorder) * (bottomBorder - topBorder) - 1;
        int current = 0;

        Cell[] res = new Cell[total];

        for (int i = leftBorder; i < rightBorder; i++) {
            for (int j = topBorder; j < bottomBorder; j++) {
                if(i == x && j == y)
                    continue;

                Cell cell = getCell(i, j);
                res[current++] = cell;
            }
        }

        return res;
    }
}
