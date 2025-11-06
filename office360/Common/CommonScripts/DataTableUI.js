/*-------------- :: TO GET DATATABLE COLUMN INDEX BY GIVING COLUMN_TITLE    :: --------------*/
function GET_DATATABLE_COLUMN_INDEX_BY_TITLE(Table, Titles) {
    var Columns = Table.settings().init().columns;
    return Titles.reduce((Map, Title) => {
        var Index = Columns.findIndex(col => col.title === Title);
        if (Index !== -1) Map[Title] = Index;
        return Map;
    }, {});
}

/*-------------- :: TO GET DATATABLE => GROUP BY COLUMN_DATA                :: --------------*/
function GET_DATATABLE_GROUP_BY_COLUMN_DATA() {

}
/*-------------- :: TO GET DATATABLE => DROPDOWNLIST BY COLUMN_DATA         :: --------------*/
function GET_DATATABLE_DROPDOWNLIST_BY_COLUMN_DATA(TableId, CSSClass, DropDownListId) {
    const Table = $('#' + TableId).DataTable();
    const FilteredColumnList = Table.columns().indexes().toArray().filter(i =>
        $(Table.column(i).header()).hasClass(CSSClass)
    ).map(i => ({
        Id: i,
        Description: $(Table.column(i).header()).text().trim()
    }));

    if (DropDownListId && $('#' + DropDownListId).length) {
        const $DropDown = $('#' + DropDownListId).empty().append('<option value="-1">Select an option</option>');
        FilteredColumnList.forEach(Col => $DropDown.append(`<option value="${Col.Id}">${Col.Description}</option>`));
    }
    return FilteredColumnList;
} 


