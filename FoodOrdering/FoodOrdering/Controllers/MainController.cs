using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FoodOrdering.Controllers
{
    public class MainController : Controller
    {
        // GET: Main
        public ActionResult ClientIndex()
        {
            return File("~/Views/Home/mainClient.html", "text/html");
        }
        public ActionResult VendorIndex()
        {
            return File("~/Views/Home/mainVendor.html", "text/html");
        }
    }
}