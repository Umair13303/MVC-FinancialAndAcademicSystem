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
    static DATATABLE_DETAIL_CONTROL(Class) {
        return "<a class='btn btn-sm  " + Class + " view'><i class='far fa-plus " + Class + "'></i></a>";
    }
}
class HTML_LABEL {
    static TEXT_DISPLAY(DisplayText) {
        var Class = "info";
        var Label = '<td> <span class="badge badge-' + Class + '">' + DisplayText + '</span></td>';
        return Label;
    }
}
class CONVERSION {
    static BOOL_CONFIRMATION(Value) {
        const TruthValue = ["1", "true", "on", "yes"];
        const FalseValue = ["0", "false", "off", "no"];
        if (TruthValue.includes(String(Value))) {
            return "YES";
        } else if (FalseValue.includes(String(Value))) {
            return "NO";
        }
    }
    static TO_DISPLAY_DATE(ServerSideDate, Format) {
        if (!ServerSideDate) return "";
        let jsDate;
        if (/\/Date\((\d+)\)\//.test(ServerSideDate)) {
            jsDate = new Date(parseInt(ServerSideDate.match(/\d+/)[0], 10));
        } else {
            jsDate = new Date(ServerSideDate);
        }
        if (isNaN(jsDate)) return "";
        return flatpickr.formatDate(jsDate, Format);
    }
    static TO_BOOL(Value) {
        if (Value == null) return false;
        const str = String(Value).toLowerCase().trim();
        const TruthValue = ["1", "true", "on", "yes"];
        const FalseValue = ["0", "false", "off", "no"];
        if (TruthValue.indexOf(str) >= 0) return true;
        if (FalseValue.indexOf(str) >= 0) return false;
        return Boolean(Value);
    }
}