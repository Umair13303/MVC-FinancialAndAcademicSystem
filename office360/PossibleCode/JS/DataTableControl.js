drawCallback: function (settings) {
    DataTableGroupBy_Index_Detail_InputLastGroup(
        this,
        MainTableACCM_ClassCurriculum,
        ['2'],
        function (groupValue) {
            var ControlGroupMaster = groupValue.replace(/[\[\]\.\W_]/g, '');
            var ControlClass = "Master Group_Checkbox" + ControlGroupMaster;
            var ControlId = "Checkbox" + ControlGroupMaster;
            var ControlName = "Checkbox" + ControlGroupMaster;
            return GetCheckBox(ControlId, ControlName, ControlClass);
        }
    );
}
