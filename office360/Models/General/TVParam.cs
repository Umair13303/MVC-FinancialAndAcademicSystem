using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
namespace office360.Models.General
{
    public class TVParam
    {
        public partial class ACCM_ClassCurriculumSubject
        {
            public int? Id { get; set; }
            public Guid? GuID { get; set; }
            public int? ClassCurriculumId { get; set; }
            public int? SemesterId { get; set; }
            public int? SubjectId { get; set; }
            public int? CreatedOn { get; set; }
            public int? CreatedBy { get; set; }
            public int? UpdatedOn { get; set; }
            public int? UpdatedBy { get; set; }
            public int? DocType { get; set; }
            public int? DocumentStatus { get; set; }
            public int? Status { get; set; }
        }

    }
}