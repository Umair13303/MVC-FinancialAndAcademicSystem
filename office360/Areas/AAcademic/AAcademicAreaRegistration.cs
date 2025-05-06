using System.Web.Mvc;

namespace office360.Areas.AAcademic
{
    public class AAcademicAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "AAcademic";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "AAcademic_default",
                "AAcademic/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}