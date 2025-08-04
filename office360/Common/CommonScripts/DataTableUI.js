function GET_DATATABLE_COLUMNINDEXBYTITLE(Table, Titles) {
    var Columns = Table.settings().init().columns;
    return Titles.reduce((Map, Title) => {
        var Index = Columns.findIndex(col => col.title === Title);
        if (Index !== -1) Map[Title] = Index;
        return Map;
    }, {});
}
