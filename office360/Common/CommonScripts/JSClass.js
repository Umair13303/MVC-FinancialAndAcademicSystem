class Roles {
    static Admin = 1;
    static Developer = 2;
    static Manager = 3;
    static DEO = 4;
    static Teacher = 5;
    static Student = 6;
}
class Bool_Status {
    static Open = true;
    static Close = false;
}
class Css_Class {
    static DISABLED = "disabled";
    static ENABLE = "ENABLE";
    static DynamicGroupBy = "DynamicGroupBy";
}
class Coa_Account_Type {
    static PROPERTY_PLANT_AND_EQUIPMENTS = 1;
    static LONG_TERM_ASSETS = 2;
    static ACCUMULATED_DEPRECIATION = 3;
    static CURRENT_ASSETS = 4;
    static OTHER_CURRENT_ASSETS = 5;
    static LONG_TERM_LIABILITIES = 6;
    static CURRENT_LIABILITIES = 7;
    static OTHER_CURRENT_LIABILITIES = 8;
    static EQUITY_DOES_NOT_CLOSE = 9;
    static EQUITY_GETS_CLOSED = 10;
    static EQUITY_RETAINED_EARNINGS = 11;
    static SALES_REVENUES = 12;
    static OTHER_INCOME = 13;
    static COST_OF_SALES = 14;
    static EXPENSES_DIRECT = 15;
    static EXPENSES_ADMIN = 16;
    static EXPENSES_MARKETING = 17;
    static EXPENSES_FINANCIAL = 18;
    static EXPENSES_OTHER_INDIRECT = 19;
    static ACCOUNTS_RECEIVABLE = 20;
    static BANK_AND_CASH = 21;
    static ACCOUNTS_PAYABLE = 22;
    static INVENTORY = 23;
}
class FeeCatagory {
    static Academic_Fee = "1";
    static Other_Fee = "2";
}
class Status {
    static Open = true;
    static Close = false;
}
class FeeChargingMethod {
    static RECURRING = "1";
    static ONE_TIME = "2";
}
class MaskingClass {
    static Phone_Number = "PhoneNumber";
    static Mobile_Number = "MobileNumber";
    static Email_Address = "EmailAddress";
    static CNIC_Number = "CNICNumber";
    static NTN_Number = "NTNNumber";
    static Number_Only = "NumberOnly";
    static Date_Picker_Simple = "DatePickerSimple";
    static Date_Picker_Month_Year = "DatePickerMonthYear";
    static Date_Picker_Year = "DatePickerYear";
    static Date_Picker_Range = "DatePickerRange";
    static Date_Picker_Timer = "DatePickerTimer";
}
class DatePickerFormat {
    static Simple='Y-m-d'
}
//class ApplicableMasking {
class AppliedMasking {
    static Phone_Number = "(099) 999-9999";
    static Mobile_Number = "(0999) 999-9999";
    static Email_Address = "*{1,20}@*{1,20}.*{2,4}";
    static CNIC_Number = "99999-9999999-9";
    static Date_Picker_Simple = "9999-99-99";
    static NTN_Number = "9999999-9";
}
class DBOperation {
    static INSERT = "INSERT_DATA_INTO_DB";
    static UPDATE = "UPDATE_DATA_INTO_DB";
    static DELETE = "DELETE_DATA_INTO_DB";
}
class DocumentType {
    static COMPANY = 1;
    static USER = 2;
    static RIGHT_SETTING = 3;
    static USER_RIGHT = 4;
    static BRANCH = 5;
    static BRANCH_SETTING = 6;
    static ACADEMIC_CLASS = 7;
    static ACADEMIC_ADMISSION_SESSION = 8;
    static ACADEMIC_CLASS_SUBJECT = 9;

 }
class Http_DB_Response {
    static CODE_SUCCESS = 200;
    static CODE_DATA_UPDATED = 300;
    static CODE_DATA_ALREADY_EXIST = 107;
    static CODE_BAD_REQUEST = 400;
    static CODE_UNAUTHORIZED = 401;
    static CODE_DATA_DOES_NOT_EXIST = 404;
    static CODE_INTERNAL_SERVER_ERROR = 500;
    static CODE_UN_KNOWN_ACTIVITY = 510;
}

class DocumentStatus {
    static ACTIVE_COMPANY = 1;
    static INACTIVE_COMPANY = 2;
    static DELETED_COMPANY = 3;
    static ACTIVE_USER = 4;
    static INACTIVE_USER = 5;
    static DELETED_USER = 6;
    static ACTIVE_RIGHT_SETTING = 7;
    static INACTIVE_RIGHT_SETTING = 8;
    static ACTIVE_USER_RIGHT = 9;
    static INACTIVE_USER_RIGHT = 10;
    static ACTIVE_BRANCH = 11;
    static INACTIVE_BRANCH = 12;
    static DELETED_BRANCH = 13;
    static ACTIVE_BRANCH_SETTING = 14;
    static INACTIVE_BRANCH_SETTING = 15;
    static EXPIRED_BRANCH_SETTING = 16;
}
class DATEPICKER_INCREMENT {
    static FOR_ADMISSION_SESSION_ROUTINE = 365;
    static FOR_ADMISSION_OPENING_ROUTINE = 20;
}
class DBSubOperationType {
    ENRSTUDENT_NEWADMISSION_INSERT = "ENRSTUDENT_NEWADMISSION_INSERT";
    ENRSTUDENT_NEWADMISSION_INSERT_GENERATECHALLAN = "ENRSTUDENT_NEWADMISSION_INSERT_GENERATECHALLAN";
    ENRSTUDENT_NEWADMISSION_INSERT_EXCELUPLOAD = "ENRSTUDENT_NEWADMISSION_INSERT_EXCELUPLOAD";
    ENRSTUDENT_NEWADMISSION_INSERT_EXCELUPLOAD_GENERATECHALLAN = "ENRSTUDENT_NEWADMISSION_INSERT_EXCELUPLOAD_GENERATECHALLAN";
    ENRSTUDENT_NEWADMISSION_UPDATE = "ENRSTUDENT_NEWADMISSION_UPDATE";

}
class ChallanType {
    static CHALLAN_FOR_NEW_ADMISSION = "1";
    static CHALLAN_FOR_EXISTING_ADMISSION = "2";
}
class DynamicDTOperation {
    constructor(Id, Description) {
        this.Id = Id;
        this.Description = Description;
    }
}
class InputHTML {
    static TextField(Id, Name, ClassName = '') {
        return `<input type="text" id="${Id}" name="${Name}" class="${ClassName} form-control" />`;
    }

    static Checkbox(Id, Name, ClassName = '') {
        return `<input type="checkbox" id="${Id}" name="${Name}" class="${ClassName}" />`;
    }

    static DropDown(Id, Name, Options = [], ClassName = '') {
        const OptionTags = Options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
        return `<select id="${Id}" name="${Name}" class="${ClassName} form-control">${OptionTags}</select>`;
    }
}


class MDB_LIST_CONDITION {
    static CM_COMPANY_BY_SOLUTION_DEVELOPER_FORNEWINSERT = "CM_COMPANY_BY_SOLUTION_DEVELOPER_FORNEWINSERT";
    static CM_COMPANY_BY_SOLUTION_DEVELOPER_FORUPDATERECORD = "CM_COMPANY_BY_SOLUTION_DEVELOPER_FORUPDATERECORD";

    static UM_USER_BY_COMPANYID_FORNEWINSERT = "UM_USER_BY_COMPANYID_FORNEWINSERT";
    static UM_USER_BY_COMPANYID_FORUPDATERECORD = "UM_USER_BY_COMPANYID_FORUPDATERECORD";

    static BM_BRANCH_BY_COMPANYID_FORNEWINSERT = "BM_BRANCH_BY_COMPANYID_FORNEWINSERT";
    static BM_BRANCH_BY_COMPANYID_FORUPDATERECORD = "BM_BRANCH_BY_COMPANYID_FORUPDATERECORD";
    static BM_BRANCH_BY_ALLOWEDBRANCHIDS_FORNEWINSERT = "BM_BRANCH_BY_ALLOWEDBRANCHIDS_FORNEWINSERT";
    static BM_BRANCH_BY_ALLOWEDBRANCHIDS_FORUPDATERECORD = "BM_BRANCH_BY_ALLOWEDBRANCHIDS_FORUPDATERECORD";

    static ACM_CLASS_BY_CAMPUSID_FORNEWINSERT = "ACM_CLASS_BY_CAMPUSID_FORNEWINSERT";
    static ACM_CLASS_BY_CAMPUSID_FORUPDATERECORD = "ACM_CLASS_BY_CAMPUSID_FORUPDATERECORD";

    static ASM_SUBJECT_BY_COMPANYID_FORNEWINSERT = "ASM_SUBJECT_BY_COMPANYID_FORNEWINSERT";
    static ASM_SUBJECT_BY_COMPANYID_FORUPDATERECORD = "ASM_SUBJECT_BY_COMPANYID_FORUPDATERECORD";

}

class DOCUMENT_LIST_CONDITION {
    static CM_COMPANY_BY_SEARCH_PARAMETER_UPDATECOMPANY = "CM_COMPANY_BY_SEARCH_PARAMETER_UPDATECOMPANY";
    static RSM_RIGHTSETTING_BY_SEARCH_PARAMETER_UPDATERIGHTSETTING = "RSM_RIGHTSETTING_BY_SEARCH_PARAMETER_UPDATERIGHTSETTING";
    static UM_USER_BY_SEARCH_PARAMETER_UPDATEUSER = "UM_USER_BY_SEARCH_PARAMETER_UPDATEUSER";
    static URM_USERRIGHT_BY_SEARCH_PARAMETER_UPDATEUSERRIGHT = "URM_USERRIGHT_BY_SEARCH_PARAMETER_UPDATEUSERRIGHT";
    static BM_BRANCH_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATEBRANCH = "BM_BRANCH_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATEBRANCH";
    static ACM_CLASS_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATECLASS = "ACM_CLASS_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATECLASS";
    static ASM_SUBJECT_BY_COMPANYID_SEARCH_PARAMETER_UPDATESUBJECT = "ASM_SUBJECT_BY_COMPANYID_SEARCH_PARAMETER_UPDATESUBJECT";
    static AASM_ADMISSIONSESSION_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATEADMISSIONSESSION = "AASM_ADMISSIONSESSION_BY_ALLOWEDBRANCHIDS_SEARCH_PARAMETER_UPDATEADMISSIONSESSION";
}

