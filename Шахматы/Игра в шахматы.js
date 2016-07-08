Action.Hint = 'Загрузка игры...';
system.require('chessengine.inc');

modelboard = AddBlock('Доска');
modelboard.Load('Доска.fr3d');

ModelsNames = ['Пешка', 'Пешка', 'Пешка', 'Пешка', 'Пешка', 'Пешка', 'Пешка', 'Пешка',
    'Ладья', 'Ладья', 'Конь', 'Конь', 'Слон', 'Слон', 'Ферзь', 'Король'
];

Progress = 0;
suffix = '';
LoadPiece = function(model) {
    piece = AddBlock(model);
    piece.Load(model + suffix);
    piece.Visible = false;
    Progress++
    Action.Hint = 'Загрузка игры... ' + Math.round(Progress / 32 * 100) + '%';
    return piece;
}

suffix = 'Б.fr3d'
WhitePieces = ModelsNames.map(LoadPiece);
suffix = 'Ч.fr3d'
BlackPieces = ModelsNames.map(LoadPiece);

function HidePieces() {
    for (i = 0; i < WhitePieces.length; i++)
        WhitePieces[i].Visible = false;
    for (i = 0; i < BlackPieces.length; i++)
        BlackPieces[i].Visible = false;
}

function FindPiece(Type) {
    List = WhitePieces;
    if ((Type % 2) == 1) {
        List = BlackPieces;
        Type--;
    }
    var mname = '';
    if (Type == 2) {
        mname = 'Пешка'
    };
    if (Type == 4) {
        mname = 'Ладья'
    };
    if (Type == 6) {
        mname = 'Конь'
    };
    if (Type == 8) {
        mname = 'Слон'
    };
    if (Type == 10) {
        mname = 'Ферзь'
    };
    if (Type == 12) {
        mname = 'Король'
    };
    for (i = 0; i < List.length; i++) {
        obj = List[i];
        if ((obj.Name == mname) && !obj.Visible) {
            return obj;
        }
    }
    return false;
}

function initGame() {
    start = 0;
    draw_offers = 0;
    board_state = p4_new_game();
    UnSelectAll();
    refresh();
    next_move();
    Action.Hint = 'Кликните по фигуре, а затем в поле куда хотите пойти';
}

BtnUndo = NewButtonInput("Ход назад");
BtnStop = NewButtonInput("Закончить игру");
BtnNew = NewButtonInput("Новая игра");
players = ['human', 'computer'];
computer_level = 3;
makeBoard();
initGame();
SetCamera(p3dPerspective);
ViewAll();
Action.Continue();

var oldpiecepos;

Action.OnClick = function() {
    Pos = Action.Find3DPoint();
    bx = Math.floor(Pos.z / 45 + 1);
    by = Math.floor(Pos.x / 45 + 2);
    square = by * 10 + bx;
    if (Model.Selected)
        Model.Selected.Position = oldpiecepos;
    Model.Selected = null;
    var board = board_state.board;
    var mover = board_state.to_play;
    if (players[mover] == 'computer') {
        return;
    }
    var piece = board[square];
    if (start == square) {
        stop_moving_piece();
    } else if (piece && (mover == (piece & 1))) {
        start_moving_piece(square);
    } else if (this.move(this.start, square, P4_QUEEN)) {
        stop_moving_piece();
    }
}

Action.OnMove = function() {
    if (Model.Selected) {
        p = Action.Find3DPointXZPlane();
        p.y = 15;
        Model.Selected.Position = p;
    }
}

function $input(id) {
    switch (id) {
        case BtnUndo.id:
            stop_moving_piece();
            goto_move(-2);
            break;
        case BtnStop.id:
            if (confirm('Завершить текущую игру?'))
                return true;
            break;
        case BtnNew.id:
            if (confirm('Начать новую игру?'))
                initGame();
            break;
    }
}

function move(start, end, promotion) {
    var state = board_state;
    var move_result = state.move(start, end, promotion);
    if (move_result.ok) {
        Action.Hint = move_result.string;
        Model.Selected = null;
        refresh();
        if (!(move_result.flags & P4_MOVE_FLAG_MATE)) {
            next_move();
        }
    } else {
        Action.ErrorHint = "Неверный ход";
    }
    return move_result.ok;
};

function next_move() {
    var mover = board_state.to_play;
    if (players[mover] == 'computer') {
        Action.Hint = 'Думаю...';
        computer_move();
    }
};

function computer_move() {
    auto_play_timeout = undefined;
    var state = board_state;
    var mv;
    var depth = computer_level + 1;
    var start_time = Date.now();
    mv = state.findmove(depth);
    move(mv[0], mv[1]);
};

function goto_move(n) {
    var delta;
    if (n < 0)
        delta = -n;
    else
        delta = board_state.moveno - n;
    if (delta > board_state.moveno)
        delta = board_state.moveno;
    board_state.jump_to_moveno(n);
    refresh();
    next_move();
};


function refresh() {
    var board = board_state.board;
    HidePieces();
    for (var i = 20; i < 100; i++) {
        if (board[i] != P4_EDGE) {
            var cpiece = FindPiece(board[i]);
            if (cpiece) {
                cpiece.Owner = pieces[i];
                cpiece.Visible = true;
            }
        }
    }
};

function start_moving_piece(position) {
    stop_moving_piece();
    start = position;
    Model.Selected = pieces[position];
    oldpiecepos = Model.Selected.Position;
};

function stop_moving_piece() {
    start = 0;
};

function makeBoard() {
    pieces = [];
    for (var y = 9; y > 1; y--) {
        for (var x = 1; x < 9; x++) {
            var i = y * 10 + x;
            var img = AddBlock("Поле");
            img.PositionZ = x * 45 - 45 + 45 / 2;
            img.PositionX = y * 45 - 90 + 45 / 2;
            img.PositionY = 13;
            pieces[i] = img;
        }
    }
};