class INPUT_FIELD {
    static CHECKBOX(Id, Name, ClassName = '') {
        return "<input type='checkbox' id='" + Id + "' name='" + Name + "' class='" + ClassName + "' />";
    }
}

class HTML_BUTTON {
    static PRINT(Id,Title,URL) {
        return "<a onclick=" + URL + " id=" + Id + " title='Click here to View " + Title + "' class='btn btn-sm PRINT'><i class='far fa-eye'></i> " + '' + "</a>";
    }
    static EDIT (Id, Title, URL) {
        return "<a onclick=" + URL + " id=" + Id + " title='Click here to Edit " + Title + "' class='btn btn-sm EDIT'><i class='far fa-edit'></i> " + '' + "</a>";
    }
    static EDIT_IN_LIST(Id, Title) {
        return "<a id=" + Id + " title='Click here to Edit " + Title + "' class='btn btn-sm EDIT_IN_LIST'><i class='far fa-edit'></i> " + '' + "</a>";
    }
    static DELETE(Id, Title, URL) {
        return "<a onclick=" + URL + " id=" + Id + " title='Click here to Delete " + Title + "' class='btn btn-sm DELETE'><i class='far fa-trash'></i> " + '' + "</a>";
    }
    static DELETE_IN_LIST(Id, Title, URL) {
        return "<a title='Click here to Delete " + Title + "' class='btn btn-sm delete'><i class='far fa-trash-alt'></i> " + '' + "</a>";
    }
}