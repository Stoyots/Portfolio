from flask import Flask, render_template, request
import numpy as np
import random
import time

app = Flask(__name__, template_folder='templates')

def generate_empty_sudoku():
    return [['' for _ in range(9)] for _ in range(9)]

def is_valid_move(grid, row, col, num):
    if num in grid[row]:
        return False
    if num in [grid[i][col] for i in range(9)]:
        return False
    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for i in range(start_row, start_row + 3):
        for j in range(start_col, start_col + 3):
            if grid[i][j] == num:
                return False
    return True

# GRILLE DE BASE 
def fill_sudoku(grid):
    for row in range(9):
        for col in range(9):
            if grid[row][col] == '':
                for num in range(1, 10):
                    if is_valid_move(grid, row, col, num):
                        grid[row][col] = num
                        if fill_sudoku(grid):
                            return grid
                        grid[row][col] = ''
                return False
    return grid

def fill_with_zeros(grid):
    for row in range(9):
        for col in range(9):
            grid[row][col] = 0
            # time.sleep(0.1)  # Délai de 0.1 seconde entre chaque remplissage de cellule
    return grid

def shuffle_row_groups(grid):
    shuffled_grid = []
    for i in range(0, 9, 3):
        group = grid[i:i+3]
        random.shuffle(group)
        shuffled_grid.extend(group)
    return shuffled_grid

def generate_sudoku(difficulty):
    sudoku_grid = generate_empty_sudoku()
    fill_sudoku(sudoku_grid)
    
    if difficulty == 'empty':
        num_empty_cells = 81
    elif difficulty == 'easy':
        num_empty_cells = 45
    elif difficulty == 'medium':
        num_empty_cells = 55
    elif difficulty == 'hard':
        num_empty_cells = 65
    else:
        num_empty_cells = 75  # Default difficulty
    
    empty_cells = random.sample(range(81), num_empty_cells)
    for index in empty_cells:
        row = index // 9
        col = index % 9
        sudoku_grid[row][col] = ''
        
    
    # Shuffle row groups
    sudoku_grid = shuffle_row_groups(sudoku_grid)
    return sudoku_grid

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        difficulty = request.form.get('difficulty')
        sudoku_grid = generate_sudoku(difficulty)
        return render_template('index.html', grid=sudoku_grid)
    else:
        sudoku_grid = generate_empty_sudoku()
        return render_template('index.html', grid=sudoku_grid)

@app.route('/fill_with_zeros', methods=['POST'])
def fill_with_zeros_route():
    sudoku_grid = fill_with_zeros(generate_empty_sudoku())
    return render_template('index.html', grid=sudoku_grid)

if __name__ == '__main__':
    app.run(debug=True)
