// grouped drop down
function PopulateLK_Right_List() {
    $.ajax({
        type: "POST",
        url: BasePath + "/AUser/CRightSettingManagmentUI/GET_LK1_RIGHT",
        data: {},
        beforeSend: function () {
            startLoading();
        },
        success: function (data) {
            const groupedData = data.reduce((g, item) => {
                (g[item.Menu] ||= []).push(`<option value="${item.Id}">${item.Description}</option>`);
                return g;
            }, {});

            const options = ['<option value="-1">Select an option</option>']
                .concat(Object.entries(groupedData).map(([menu, items]) =>
                    `<optgroup label="${menu}">${items.join('')}</optgroup>`
                ));

            $("#DropDownListRight").html(options.join(''));
        },
        complete: function () {
            stopLoading();
        },
    });
}
