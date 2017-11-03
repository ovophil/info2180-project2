var tile;
var Bkground;
var timer;
var freeSpace = '300px';
var freeSpace1 = '300px';

window.onload = function ()
{
    var puzzle = document.getElementById('puzzlearea');
    
    tile = puzzle.getElementsByTagName('div');

    for (var i=0; i<tile.length; i++)
    {
        tile[i].style.backgroundImage="url('grass.jpg')";
        tile[i].className = 'puzzlepiece';
        tile[i].style.left = (i%4*100)+'px';
        tile[i].style.top = (parseInt(i/4)*100) + 'px';
        tile[i].style.backgroundPosition= '-' + tile[i].style.left + ' ' + '-' + tile[i].style.top;
        tile[i].onmouseover = function()
        {
            if (move(parseInt(this.innerHTML)))
            {
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
        tile[i].onmouseout = function()
        {
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };

        tile[i].onclick = function()
        {
            if (move(parseInt(this.innerHTML)))
            {
                swap(this.innerHTML-1);
                if (finish())
                {
                    Gamewin();
                }
                return;
            }
        };
    }

     
     

    var shuffle = document.getElementById('shufflebutton');
    shuffle.onclick = function()
    {

        for (var i=0; i<250; i++)
        {
            var rand = parseInt(Math.random()* 100) %4;
            if (rand == 0)
            {
                var mve = mveUp(freeSpace, freeSpace1);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }
            if (rand == 1)
            {
                var mve = mveDown(freeSpace, freeSpace1);
                if ( mve != -1) 
                {
                    swap(mve);
                }
            }

            if (rand == 2)
            {
                var mve = mveLeft(freeSpace, freeSpace1);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }

            if (rand == 3)
            {
                var mve = mveRight(freeSpace, freeSpace1);
                if (mve != -1)
                {
                    swap(mve);
                }
            }
        }
    };
};

function move(pos)
{
    if (mveLeft(freeSpace, freeSpace1) == (pos-1))
    {
        return true;
    }

    if (mveDown(freeSpace, freeSpace1) == (pos-1))
    {
        return true;
    }

    if (mveUp(freeSpace, freeSpace1) == (pos-1))
    {
        return true;
    }

    if (mveRight(freeSpace, freeSpace1) == (pos-1))
    {
        return true;
    }
}
function change()
{
    var text = document.getElementsByClassName("explanation");
    Bkground --;
    if (Bkground == 0)
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#FFFFFF";
        text[0].innerHTML = "CONGRATULATION YOU WIN";
        text[1].innerHTML = "CONGRATULATION YOU WIN";
        return;
    }
    if (Bkground % 2)
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#1302fc";    
    }
    else
    {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#02fcfc";
    }
    timer = setTimeout(change, 100);
}

function Gamewin()
{
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#FF0000";
    Bkground = 10;
    timer = setTimeout(change, 100);
    var newtimer = setTimeout(reload, 2000);
    function reload(){
        location.reload();
    }
}

function finish()
{
    var flag = true;
    for (var i = 0; i < tile.length; i++) {
        var y = parseInt(tile[i].style.top);
        var x = parseInt(tile[i].style.left);

        if (x != (i%4*100) || y != parseInt(i/4)*100)
        {
            flag = false;
            break;
        }
    }
    return flag;
}

function swap (pos) {
    var temp = tile[pos].style.top;
    tile[pos].style.top = freeSpace1;
    freeSpace1 = temp;

    temp = tile[pos].style.left;
    tile[pos].style.left = freeSpace;
    freeSpace = temp;
}

function mveRight (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (xx < 300)
    {
        for (var i =0; i<tile.length; i++){
            if (parseInt(tile[i].style.left) - 100 == xx && parseInt(tile[i].style.top) == yy) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}
function mveLeft(x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);

    if (xx > 0)
    {
        for (var i = 0; i < tile.length; i++) 
        {
            if (parseInt(tile[i].style.left) + 100 == xx && parseInt(tile[i].style.top) == yy)
            {
                return i;
            } 
        }
    }
    else 
    {
        return -1;
    }
}


function mveDown (x, y)
{
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy < 300)
    {
        for (var i=0; i<tile.length; i++)
        {
            if (parseInt(tile[i].style.top) - 100 == yy && parseInt(tile[i].style.left) == xx) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function mveUp (x, y) {
    var xx = parseInt(x);
    var yy = parseInt(y);
    if (yy > 0)
    {
        for (var i=0; i<tile.length; i++)
        {
            if (parseInt(tile[i].style.top) + 100 == yy && parseInt(tile[i].style.left) == xx) 
            {
                return i;
            }
        } 
    }
    else 
    {
        return -1;
    }
}
