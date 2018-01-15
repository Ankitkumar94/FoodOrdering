using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FoodOrdering.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return File("~/Views/Home/index.html", "text/html");
        }
    }
}