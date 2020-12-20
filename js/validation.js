function Validation() {
    this.KiemTraRong = function(input, mess) {
        if (input == "") {
            alert(mess);
            return false;
        }
        return true;
    }
    this.KiemTraTrung = function(input, arr, mess) {
        var check = true;
        arr.filter(function(item) {
            if (item.textTodo === input) {
                check &= false;
            }
        });
        if (check == false) {
            alert(mess);
        }
        return check;
    }
}